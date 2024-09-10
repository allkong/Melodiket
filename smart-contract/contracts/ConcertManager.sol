// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MelodyToken.sol"; // MelodyToken 컨트랙트 가져오기
import "./TicketNFT.sol";   // TicketNFT 컨트랙트 가져오기
import "hardhat/console.sol";

contract ConcertManager {
    uint256 private _concertIdCounter;

    MelodyToken public melodyToken;
    TicketNFT public ticketNFT;

    // 뮤지션의 공연 승인 상태
    // 각각 승인 대기 중, 승인 완료, 승인 거부 상태
    enum JoinResponseStatus { PENDING, AGREED, DENIED }

    struct Musician {
        address musicianAddress; // 뮤지션의 지갑 주소
        JoinResponseStatus status; // 뮤지션의 공연 승인 상태
        uint256 favoriteVotes; // 최애 뮤지션으로 받은 투표 수
    }

    // 콘서트 상태
    // 각각 뮤지션 수락 대기 중, 모든 뮤지션 수락, 취소, 이체 완료 상태
    enum ConcertStatus { PREPARING, ACTIVE, CANCLED, TRANSFERED }

    struct ConcertCreateRequest {
        // 기본 정보
        address[] musicians; // 수락한 뮤지션들의 지갑 주소 배열
        // 금액 관련 정보
        uint256 ticketPrice; // 티켓 한 장의 가격 (= venueEarningsPerTicket + (musicians.length * musicianBaseEarningsPerTicket) + favoriteBonus)
        uint256 venueEarningsPerTicket; // 공연장에게 주는 금액
        uint256 musicianBaseEarningsPerTicket; // 뮤지션에게 주는 공통 금액
        uint256 favoriteBonus; // 최애 뮤지션에게 주는 보너스 금액
        // 티켓팅 관련 정보
        uint256 numOfTickets; // 남은 티켓 수
        uint256 ticketingStartAt; // 티켓팅 시작 일시
        uint256 concertStartAt; // 콘서트 시작 일시
        uint256 transferAvailableAfter; // 정산 가능 일시
    }

    struct Concert {
        // 기본 정보
        uint256 id; // 콘서트 고유 번호
        ConcertStatus status; // 콘서트 상태
        address manager; // 콘서트 매니저 지갑 주소
        uint256 numOfInvitations; // 요청된 뮤지션 수
        address[] joinedMusicians; // 수락한 뮤지션들의 지갑 주소 배열
        mapping(address => Musician) musicianInvitations; // 참가하는 뮤지션들의 정보
        uint256[] tickets; // 발급된 티켓 목록
        mapping(address => uint256) favoriteVotes; // 최애 뮤지션 투표 수
        // 금액 관련 정보
        uint256 ticketPrice; // 티켓 한 장의 가격 (= venueEarningsPerTicket + (musicians.length * musicianBaseEarningsPerTicket) + favoriteBonus)
        uint256 venueEarningsPerTicket; // 공연장에게 주는 금액
        uint256 musicianBaseEarningsPerTicket; // 뮤지션에게 주는 공통 금액
        uint256 favoriteBonus; // 최애 뮤지션에게 주는 보너스 금액
        // 티켓팅 관련 정보
        uint256 numOfRestTickets; // 남은 티켓 수
        uint256 ticketingStartAt; // 티켓팅 시작 일시
        uint256 concertStartAt; // 콘서트 시작 일시
        uint256 transferAvailableAfter; // 정산 가능 일시
        uint256 refundedTokenAmount; // 환불된 토큰 수
        // 좌석 관련 정보
        bool isStanding; // 스탠딩 여부
        uint256[] seatSizes; // 전체 좌석의 행/렬 크기
        bool[][] isReserved; // 좌석 예약 여부
        string posterCid; // 포스터 CID
    }

    mapping(uint256 => Concert) public concerts;

    event ConcertCreated(uint256 concertId, address manager);
    event MusicianAgreed(uint256 concertId, address musician);
    event MusicianDenied(uint256 concertId, address musician);
    event AllMusicianAgreed(uint256 concertId);
    event ConcertCancled(uint256 concertId);
    event TicketPurchased(uint256 concertId, address buyer, uint256 ticketId);
    event TicketPriceTransferred(uint256 concertId);

    constructor(address _melodyTokenAddress, address _ticketNFTAddress) {
        melodyToken = MelodyToken(_melodyTokenAddress);
        ticketNFT = TicketNFT(_ticketNFTAddress);
    }

    modifier onlyConcertManager(uint256 _concertId) {
        require(concerts[_concertId].manager == msg.sender, "Only concert manager can call this function.");
        _;
    }

    function isBetween(uint256 a, uint256 b, uint256 c) private pure returns (bool) {
        return a <= b && b <= c;
    }

    function createConcert(
        uint256 _ticketPrice, // 티켓 한 장의 가격
        uint256 _venueEarningsPerTicket, // 공연장 수익
        uint256 _musicianBaseEarningsPerTicket, // 티켓 한 장당 뮤지션에게 공통으로 주는 금액
        uint256 _ticketingStartAt, // 티켓팅 시작 일시
        uint256 _concertStartAt, // 콘서트 시작 일시
        address[] memory _musicians, // 참가하는 뮤지션들의 지갑 주소 배열
        string memory _posterCid // 포스터 CID
    ) private returns (uint256) {
        uint256 numOfInvitations = _musicians.length;
        uint256 sumOfMusicianEarnings = numOfInvitations * _musicianBaseEarningsPerTicket;

        // 티켓 가격 = 공연장 수익 + 뮤지션 수익 + (보너스 수익)
        require(_venueEarningsPerTicket + sumOfMusicianEarnings <= _ticketPrice, "Earnings exceed ticket price");
        uint256 _favoriteBonus = _ticketPrice - (_venueEarningsPerTicket + sumOfMusicianEarnings);

        // 티켓팅 시작 일시는 콘서트 시작 일시보다 빠르거나 같아야 함
        require(_ticketingStartAt <= _concertStartAt, "Ticketing start time should be earlier than concert start time");
        // 정산 가능 일시는 콘서트 시작 일시의 하루 뒤로 설정
        uint256 _transferAvailableAfter = _concertStartAt + 1 days;

        // 콘서트 ID 생성
        _concertIdCounter++;
        uint256 concertId = _concertIdCounter;
        Concert storage newConcert = concerts[concertId];

        // 기본 정보 초기화
        newConcert.id = concertId;
        newConcert.status = ConcertStatus.PREPARING;
        newConcert.manager = msg.sender;
        newConcert.posterCid = _posterCid;
        // 금액 관련 정보 초가화
        newConcert.ticketPrice = _ticketPrice;
        newConcert.venueEarningsPerTicket = _venueEarningsPerTicket;
        newConcert.musicianBaseEarningsPerTicket = _musicianBaseEarningsPerTicket;
        newConcert.favoriteBonus = _favoriteBonus;
        newConcert.refundedTokenAmount = 0;
        // 일자 관련 필드 초기화
        newConcert.ticketingStartAt = _ticketingStartAt;
        newConcert.concertStartAt = _concertStartAt;
        newConcert.transferAvailableAfter = _transferAvailableAfter;

        // 뮤지션 정보 초기화
        newConcert.numOfInvitations = numOfInvitations;
        newConcert.joinedMusicians = new address[](numOfInvitations);
        for (uint256 i = 0; i < numOfInvitations; i++) {
            newConcert.musicianInvitations[_musicians[i]] = Musician({
                musicianAddress: _musicians[i],
                status: JoinResponseStatus.PENDING,
                favoriteVotes: 0
            });
            newConcert.favoriteVotes[_musicians[i]] = 0;
        }

        return newConcert.id;
    }

    function createStandingConcert(
        uint256 _ticketPrice, // 티켓 한 장의 가격
        uint256 _venueEarningsPerTicket, // 공연장 수익
        uint256 _musicianBaseEarningsPerTicket, // 티켓 한 장당 뮤지션에게 공통으로 주는 금액
        uint256 _ticketingStartAt, // 티켓팅 시작 일시
        uint256 _concertStartAt, // 콘서트 시작 일시
        address[] memory _musicians, // 참가하는 뮤지션들의 지갑 주소 배열
        uint256 _numOfRestTickets, // 남은 티켓 수
        string memory _posterCid // 포스터 CID
    ) public returns (uint256) {
        uint256 concertId = createConcert(
            _ticketPrice,
            _venueEarningsPerTicket,
            _musicianBaseEarningsPerTicket,
            _ticketingStartAt,
            _concertStartAt,
            _musicians,
            _posterCid
        );
        Concert storage concert = concerts[concertId];
        require(concert.id != 0, "Concert not found.");

        concert.isStanding = true;
        concert.numOfRestTickets = _numOfRestTickets;
        emit ConcertCreated(concert.id, msg.sender);
        return concert.id;
    }

    function createSeatingConcert(
        uint256 _ticketPrice, // 티켓 한 장의 가격
        uint256 _venueEarningsPerTicket, // 공연장 수익
        uint256 _musicianBaseEarningsPerTicket, // 티켓 한 장당 뮤지션에게 공통으로 주는 금액
        uint256 _ticketingStartAt, // 티켓팅 시작 일시
        uint256 _concertStartAt, // 콘서트 시작 일시
        address[] memory _musicians, // 참가하는 뮤지션들의 지갑 주소 배열
        uint256 _numOfSeatRows, // 좌석 행 수
        uint256 _numOfSeatColumns, // 좌석 열 수
        string memory _posterCid // 포스터 CID
    ) public returns (uint256) {
        require(1 <= _numOfSeatRows, "Invalid number of seat rows");
        require(1 <= _numOfSeatColumns, "Invalid number of seat columns");

        uint256 concertId = createConcert(
            _ticketPrice,
            _venueEarningsPerTicket,
            _musicianBaseEarningsPerTicket,
            _ticketingStartAt,
            _concertStartAt,
            _musicians,
            _posterCid
        );
        Concert storage concert = concerts[concertId];
        require(concert.id != 0, "Concert not found.");

        concert.isStanding = false;
        concert.seatSizes = new uint256[](2);
        concert.seatSizes[0] = _numOfSeatRows;
        concert.seatSizes[1] = _numOfSeatColumns;
        concert.numOfRestTickets = _numOfSeatRows * _numOfSeatColumns;
        concert.isReserved = new bool[][](concert.seatSizes[0]);
        for (uint256 i = 0; i < concert.seatSizes[0]; i++) {
            concert.isReserved[i] = new bool[](concert.seatSizes[1]);
        }
        emit ConcertCreated(concert.id, msg.sender);

        return concert.id;
    }

    function getJoinedMusicians(uint256 _concertId) public view returns (address[] memory) {
        return concerts[_concertId].joinedMusicians;
    }

    function getTickets(uint256 _concertId) public view returns (uint256[] memory) {
        return concerts[_concertId].tickets;
    }

    function getSeatSizes(uint256 _concertId) public view returns (uint256[] memory) {
        return concerts[_concertId].seatSizes;
    }

    function getIsReserved(uint256 _concertId) public view returns (bool[][] memory) {
        return concerts[_concertId].isReserved;
    }

    function agreeToConcert(uint256 _concertId) public returns (bool) {
        // 준비 중인 콘서트이며, 뮤지션이 아직 응답하지 않은 경우에만 수락 가능
        Concert storage concert = concerts[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(concert.status == ConcertStatus.PREPARING, "Concert is not preparing.");
        
        Musician storage invitation = concert.musicianInvitations[msg.sender];
        require(invitation.musicianAddress != address(0), "Musician not found.");
        require(invitation.status == JoinResponseStatus.PENDING, "Musician has already replied.");

        // 공연까지 하루 이상 남은 경우에만 수락 가능
        if (block.timestamp > concert.concertStartAt - 1 days) {
            emit MusicianDenied(_concertId, msg.sender);
            return false;
        }

        // 뮤지션 수락 처리
        invitation.status = JoinResponseStatus.AGREED;
        emit MusicianAgreed(_concertId, msg.sender);

        // 모든 뮤지션이 수락하면 콘서트 상태를 활성화로 변경
        concert.joinedMusicians.push(msg.sender);
        if (concert.joinedMusicians.length == concert.numOfInvitations) {
            concert.status = ConcertStatus.ACTIVE;
            emit AllMusicianAgreed(_concertId);
        }

        return true;
    }

    function denyConert(uint256 _concertId) public returns (bool) {
        // 준비 중인 콘서트이며, 뮤지션이 아직 응답하지 않은 경우에만 거절 가능
        Concert storage concert = concerts[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(concert.status == ConcertStatus.PREPARING, "Concert is not preparing.");

        Musician storage invitation = concert.musicianInvitations[msg.sender];
        require(invitation.musicianAddress != address(0), "Musician not found.");
        require(invitation.status == JoinResponseStatus.PENDING, "Musician has already replied.");        
        require(concert.status == ConcertStatus.PREPARING, "Concert is not preparing.");

        // 공연까지 하루 이상 남은 경우에만 거절 가능
        if (block.timestamp > concert.concertStartAt - 1 days) {
            emit MusicianDenied(_concertId, msg.sender);
            return false;
        }

        // 한 명의 뮤지션이라도 거절하면 공연 자체가 취소됨
        invitation.status = JoinResponseStatus.DENIED;
        emit MusicianDenied(_concertId, msg.sender);
        concert.status = ConcertStatus.CANCLED;
        emit ConcertCancled(_concertId);

        return true;
    }

    function purchaseTicket(uint256 _concertId, address favoriteMusicianAddress, uint256 _seatRow, uint256 _seatCol) public {
        Concert storage concert = concerts[_concertId];
        require(concert.id != 0, "Concert not found.");

        // 티켓 구매 가능 여부 확인
        require(concert.status == ConcertStatus.ACTIVE, "Concert is not active.");
        require(block.timestamp < concert.ticketingStartAt, "Ticketing is not started yet.");
        require(block.timestamp < concert.concertStartAt, "Concert is already started.");
        require(concert.numOfRestTickets > 0, "Sold out.");
        
        // 티켓 가격 확인
        require(melodyToken.balanceOf(msg.sender) < concert.ticketPrice, "Insufficient Melody Token");
        
        // 좌석 정보 확인
        require(isBetween(0, _seatRow, concert.seatSizes[0]-1), "Invalid seat row");
        require(isBetween(0, _seatCol, concert.seatSizes[1]-1), "Invalid seat column");
        require(!concert.isReserved[_seatRow][_seatCol], "Seat is already reserved.");

        Musician storage targetMusician = concert.musicianInvitations[favoriteMusicianAddress];
        require(targetMusician.musicianAddress != address(0), "Musician not found.");

        uint256 ticketId = ticketNFT.mintTicket(msg.sender, favoriteMusicianAddress, concert.isStanding, _seatRow, _seatCol);
        concert.numOfRestTickets--;
        if (!concert.isStanding) {
            concert.isReserved[_seatRow][_seatCol] = true;
        }
        melodyToken.transferFrom(msg.sender, address(this), concert.ticketPrice);

        // 최애 뮤지션 투표
        concert.favoriteVotes[favoriteMusicianAddress]++;

        // 발급 티켓 목록에 추가
        concert.tickets.push(ticketId);

        emit TicketPurchased(_concertId, msg.sender, ticketId);
    }
    
    function useTicket(uint256 _concertId, uint256 _ticketId) public {
        Concert storage concert = concerts[_concertId];
        require(concert.id != 0, "Concert not found.");
        address concertManager = concert.manager;
        require(concertManager == msg.sender, "Only concert manager can call this function.");

        TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithId(_ticketId);
        require(ticket.id != 0, "Ticket not found.");
        require(ticket.status == TicketNFT.TicketStatus.UNUSED, "Ticket is already used.");
        ticketNFT.useTicket(_ticketId);
    }

    function refundTicket(uint256 _concertId, uint256 _ticketId) public {
        Concert storage concert = concerts[_concertId];
        require(concert.id != 0, "Concert not found.");

        TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithId(_ticketId);

        require(ticket.owner == msg.sender, "Only ticket owner can call this function.");
        require(ticket.status == TicketNFT.TicketStatus.UNUSED, "Ticket is already used.");
        require(block.timestamp < concert.concertStartAt, "Refund is not available because concert is started.");

        ticket.status = TicketNFT.TicketStatus.REFUNDED;
        // 공연 시작까지 10일 미만 남았으면 100%, 7일 미만 남았으면 80%, 3일 미만 남았으면 70% 환불
        uint256 refundRate = 100;
        if (block.timestamp > concert.concertStartAt - 10 days) {
            refundRate = 100;
        } else if (block.timestamp > concert.concertStartAt - 7 days) {
            refundRate = 80;
        } else if (block.timestamp > concert.concertStartAt - 3 days) {
            refundRate = 70;
        }

        // 토큰 환불 및 수수료 계산
        uint256 refundAmount = (concert.ticketPrice * refundRate) / 100;
        uint256 feeAmount = concert.ticketPrice - refundAmount;
        concert.refundedTokenAmount += feeAmount;
        melodyToken.transfer(msg.sender, refundAmount);

        // 좌석 및 표 수 복구
        concert.numOfRestTickets++;
        if (!concert.isStanding) {
            concert.isReserved[ticket.seatRow][ticket.seatColumn] = false;
        }

        ticketNFT.refundTicket(_ticketId);
    }

    function closeConcert(uint256 _concertId) public onlyConcertManager(_concertId) {
        Concert storage concert = concerts[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(concert.status == ConcertStatus.ACTIVE, "Concert is not in status to be closed.");
        require(block.timestamp >= concert.transferAvailableAfter, "Concert can't be cancled before transfer available after.");

        // 환불로 인한 토큰이 있다면, 공연장 관리자와 뮤지션이 동등하게 수익을 나눠 받음
        uint256 refundedTokenPerMembers = concert.refundedTokenAmount / (concert.joinedMusicians.length + 1);

        // 공연장 관리자 수익 분배
        uint256 totalManagerEarnings = (concert.tickets.length * concert.venueEarningsPerTicket) + refundedTokenPerMembers;
        melodyToken.transfer(concert.manager, totalManagerEarnings);

        // 뮤지션 수익 분배
        uint256 musicianBaseEarnings = (concert.tickets.length * concert.musicianBaseEarningsPerTicket) / concert.numOfInvitations;
        for (uint256 i = 0; i < concert.joinedMusicians.length; i++) {
            address musicianAddress = concert.joinedMusicians[i];
            uint256 favoriteBonus = concert.favoriteBonus * concert.favoriteVotes[musicianAddress];
            uint256 musicianTotalEarnings = musicianBaseEarnings + favoriteBonus + refundedTokenPerMembers;
            melodyToken.transfer(musicianAddress, musicianTotalEarnings);
        }

        concert.status = ConcertStatus.TRANSFERED;
        emit TicketPriceTransferred(_concertId);
    }

    function cancleConcert(uint256 _concertId) public onlyConcertManager(_concertId) {
        Concert storage concert = concerts[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(concert.status == ConcertStatus.ACTIVE, "Concert status must be ACTIVE.");
        require(block.timestamp < concert.concertStartAt, "Concert is already started.");

        concert.status = ConcertStatus.CANCLED;

        // 티켓 구매자들에게 전액 환불
        for (uint256 i = 0; i < concert.tickets.length; i++) {
            TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithId(concert.tickets[i]);
            if (ticket.status == TicketNFT.TicketStatus.UNUSED) {
                ticketNFT.refundTicket(ticket.id);
                melodyToken.transfer(ticket.owner, concert.ticketPrice);
            }
        }
        emit ConcertCancled(_concertId);
    }
}
