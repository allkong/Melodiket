// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MelodyToken.sol"; // MelodyToken 컨트랙트 가져오기
import "./TicketNFT.sol";   // TicketNFT 컨트랙트 가져오기
import "hardhat/console.sol";

contract ConcertManager {
    uint256 private _concertIdCounter;

    MelodyToken public melodyToken;
    TicketNFT public ticketNFT;

    struct Musician {
        address musicianAddress; // 뮤지션의 지갑 주소
        string status; // 뮤지션의 공연 승인 상태
        uint256 favoriteVotes; // 최애 뮤지션으로 받은 투표 수
    }


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

    // 공연 기본 정보
    struct Concert {
        uint256 id; // 콘서트 고유 번호
        string status; // 콘서트 상태
        address manager; // 콘서트 매니저 지갑 주소
        string posterCid; // 포스터 CID
        uint256 concertStartAt; // 콘서트 시작 일시
    }

    // 공연 참가 뮤지션 정보
    struct MusicianInvitationInfo {
        address[] pendingMusicianAddresses; // 수락 대기 중인 뮤지션들의 지갑 주소 배열
        address[] agreedMusicianAddresses; // 수락된 뮤지션들의 지갑 주소 배열
        address[] deniedMusicianAddresses; // 거절된 뮤지션들의 지갑 주소 배열
    }

    // 최애 투표 정보
    struct FavoriteVoteInfo {
        address[] favoriteMusicianAddresses; // 최애 뮤지션들의 지갑 주소 배열
        uint256[] favoriteVotes; // 최애 뮤지션들의 투표 수 배열
    }

    // 금액 관련 정보
    struct TicketPriceInfo {
        uint256 ticketPrice; // 티켓 한 장의 가격 (= venueEarningsPerTicket + (musicians.length * musicianBaseEarningsPerTicket) + favoriteBonus)
        uint256 venueEarningsPerTicket; // 공연장에게 주는 금액
        uint256 musicianBaseEarningsPerTicket; // 뮤지션에게 주는 공통 금액
        uint256 favoriteBonus; // 최애 뮤지션에게 주는 보너스 금액
        uint256 refundedTokenAmount; // 환불된 토큰 수
        uint256 transferAvailableAfter; // 정산 가능 일시
    }

    // 티켓팅 관련 정보
    struct TicketingPlanInfo {
        uint256[] tickets; // 발급된 티켓 목록
        uint256 numOfRestTickets; // 남은 티켓 수
        uint256 ticketingStartAt; // 티켓팅 시작 일시
        bool[][] isReserved; // 좌석 예약 여부
    }

    // 좌석 관련 정보
    struct ConcertSeatingInfo {
        bool isStanding; // 스탠딩 여부
        uint256[] seatSizes; // 전체 좌석의 행/렬 크기
    }

    mapping(uint256 => Concert) private concertBasicInfos;
    function getConcertBasicInfo(uint256 _concertId) public view returns (
        uint256 id,
        string memory status,
        address manager,
        string memory posterCid,
        uint256 concertStartAt
    ) {
        Concert storage concert = concertBasicInfos[_concertId];
        return (concert.id, concert.status, concert.manager, concert.posterCid, concert.concertStartAt);
    }

    mapping(uint256 => MusicianInvitationInfo) private concertMusicianInfos;
    function getConcertMusicianInfo(uint256 _concertId) public view returns (
        address[] memory pendingMusicianAddresses,
        address[] memory agreedMusicianAddresses,
        address[] memory deniedMusicianAddresses
    ) {
        MusicianInvitationInfo storage musicianInfo = concertMusicianInfos[_concertId];
        return (musicianInfo.pendingMusicianAddresses, musicianInfo.agreedMusicianAddresses, musicianInfo.deniedMusicianAddresses);
    }

    mapping(uint256 => FavoriteVoteInfo) private concertFavoriteVoteInfos;
    function getConcertFavoriteVoteInfo(uint256 _concertId) public view returns (
        address[] memory favoriteMusicianAddresses,
        uint256[] memory favoriteVotes
    ) {
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertId];
        return (favoriteVoteInfo.favoriteMusicianAddresses, favoriteVoteInfo.favoriteVotes);
    }

    mapping(uint256 => TicketPriceInfo) private concertTicketPriceInfos;
    function getConcertTicketPriceInfo(uint256 _concertId) public view returns (
        uint256 ticketPrice,
        uint256 venueEarningsPerTicket,
        uint256 musicianBaseEarningsPerTicket,
        uint256 favoriteBonus,
        uint256 refundedTokenAmount,
        uint256 transferAvailableAfter
    ) {
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertId];
        return (ticketPriceInfo.ticketPrice, ticketPriceInfo.venueEarningsPerTicket, ticketPriceInfo.musicianBaseEarningsPerTicket, ticketPriceInfo.favoriteBonus, ticketPriceInfo.refundedTokenAmount, ticketPriceInfo.transferAvailableAfter);
    }

    mapping(uint256 => TicketingPlanInfo) private concertTicketingInfos;
    function getConcertTicketingInfo(uint256 _concertId) public view returns (
        uint256[] memory tickets,
        uint256 numOfRestTickets,
        uint256 ticketingStartAt,
        bool[][] memory isReserved
    ) {
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertId];
        return (ticketingInfo.tickets, ticketingInfo.numOfRestTickets, ticketingInfo.ticketingStartAt, ticketingInfo.isReserved);
    }

    mapping(uint256 => ConcertSeatingInfo) private concertSeatingInfos;
    function getConcertSeatingInfo(uint256 _concertId) public view returns (
        bool isStanding,
        uint256[] memory seatSizes
    ) {
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertId];
        return (seatingInfo.isStanding, seatingInfo.seatSizes);
    }

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
        require(concertBasicInfos[_concertId].manager == msg.sender, "Only concert manager can call this function.");
        _;
    }

    function isBetween(uint256 a, uint256 b, uint256 c) private pure returns (bool) {
        return a <= b && b <= c;
    }

    function isSameString(string memory a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
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
        Concert storage newConcert = concertBasicInfos[concertId];

        // 기본 정보 초기화
        newConcert.id = concertId;
        newConcert.status = "PREPARING";
        newConcert.manager = msg.sender;
        newConcert.posterCid = _posterCid;
        newConcert.concertStartAt = _concertStartAt;

        // 공연 참가 뮤지션 정보 초기화
        MusicianInvitationInfo storage musicianInfo = concertMusicianInfos[concertId];
        musicianInfo.pendingMusicianAddresses = _musicians;
        musicianInfo.agreedMusicianAddresses = new address[](0);
        musicianInfo.deniedMusicianAddresses = new address[](0);

        // 최애 투표 정보 초기화
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[concertId];
        favoriteVoteInfo.favoriteMusicianAddresses = new address[](0);
        favoriteVoteInfo.favoriteVotes = new uint256[](0);

        // 금액 관련 정보 초가화
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[concertId];
        ticketPriceInfo.ticketPrice = _ticketPrice;
        ticketPriceInfo.venueEarningsPerTicket = _venueEarningsPerTicket;
        ticketPriceInfo.musicianBaseEarningsPerTicket = _musicianBaseEarningsPerTicket;
        ticketPriceInfo.favoriteBonus = _favoriteBonus;
        ticketPriceInfo.refundedTokenAmount = 0;
        ticketPriceInfo.transferAvailableAfter = _transferAvailableAfter;

        // 티켓 예매 현황 초기화
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[concertId];
        ticketingInfo.tickets = new uint256[](0);
        ticketingInfo.ticketingStartAt = _ticketingStartAt;

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
        Concert storage concert = concertBasicInfos[concertId];
        require(concert.id != 0, "Concert not found.");

        // 좌석 관련 정보 초기화
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[concertId];
        seatingInfo.isStanding = true;

        // 티켓팅 관련 정보 초기화
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[concertId];
        ticketingInfo.numOfRestTickets = _numOfRestTickets;

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
        Concert storage concert = concertBasicInfos[concertId];
        require(concert.id != 0, "Concert not found.");

        // 좌석 관련 정보 초기화
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[concertId];

        seatingInfo.isStanding = false;
        seatingInfo.seatSizes = new uint256[](2);
        seatingInfo.seatSizes[0] = _numOfSeatRows;
        seatingInfo.seatSizes[1] = _numOfSeatColumns;

        // 티켓팅 관련 정보 초기화
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[concertId];
        ticketingInfo.numOfRestTickets = _numOfSeatRows * _numOfSeatColumns;
        ticketingInfo.isReserved = new bool[][](seatingInfo.seatSizes[0]);
        for (uint256 i = 0; i < _numOfSeatRows; i++) {
            ticketingInfo.isReserved[i] = new bool[](_numOfSeatColumns);
        }
        emit ConcertCreated(concert.id, msg.sender);

        return concert.id;
    }

    function agreeToConcert(uint256 _concertId) public returns (bool) {
        // 준비 중인 콘서트이며, 뮤지션이 아직 응답하지 않은 경우에만 수락 가능
        Concert storage concert = concertBasicInfos[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "PREPARING"), "Concert is not preparing.");
        
        // 공연까지 하루 이상 남은 경우에만 거절 가능
        require(block.timestamp + 1 days < concert.concertStartAt, "Only available before 1 day of concert.");

        // 뮤지션 수락 처리
        MusicianInvitationInfo storage invitationInfo = concertMusicianInfos[_concertId];
        // 수락 대기 중인 뮤지션 목록에 있는 경우에만 거절 가능
        bool isPendingMusician = false;
        for (uint256 i = 0; i < invitationInfo.pendingMusicianAddresses.length; i++) {
            if (invitationInfo.pendingMusicianAddresses[i] == msg.sender) {
                invitationInfo.pendingMusicianAddresses[i] = invitationInfo.pendingMusicianAddresses[invitationInfo.pendingMusicianAddresses.length - 1];
                invitationInfo.pendingMusicianAddresses.pop();
                invitationInfo.agreedMusicianAddresses.push(msg.sender);
                isPendingMusician = true;
                break;
            }
        }

        require(isPendingMusician, "Musician not found.");

        // 모든 뮤지션이 수락하면 콘서트 상태를 활성화로 변경
        if (invitationInfo.pendingMusicianAddresses.length == 0 && invitationInfo.deniedMusicianAddresses.length == 0) {
            concert.status = "ACTIVE";
            emit AllMusicianAgreed(_concertId);
        }

        return true;
    }

    function denyConert(uint256 _concertId) public returns (bool) {
        // 준비 중인 콘서트이며, 뮤지션이 아직 응답하지 않은 경우에만 거절 가능
        Concert storage concert = concertBasicInfos[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "PREPARING"), "Concert is not preparing.");

        // 공연까지 하루 이상 남은 경우에만 거절 가능
        require(block.timestamp + 1 days < concert.concertStartAt, "Only available before 1 day of concert.");

        MusicianInvitationInfo storage invitationInfo = concertMusicianInfos[_concertId];
        // 수락 대기 중인 뮤지션 목록에 있는 경우에만 거절 가능
        bool isPendingMusician = false;
        for (uint256 i = 0; i < invitationInfo.pendingMusicianAddresses.length; i++) {
            if (invitationInfo.pendingMusicianAddresses[i] == msg.sender) {
                invitationInfo.pendingMusicianAddresses[i] = invitationInfo.pendingMusicianAddresses[invitationInfo.pendingMusicianAddresses.length - 1];
                invitationInfo.pendingMusicianAddresses.pop();
                invitationInfo.deniedMusicianAddresses.push(msg.sender);
                isPendingMusician = true;
                break;
            }
        }

        require(isPendingMusician, "Musician not found.");

        // 한 명의 뮤지션이라도 거절하면 공연 자체가 취소됨
        emit MusicianDenied(_concertId, msg.sender);
        concert.status = "CANCLED";
        emit ConcertCancled(_concertId);

        return true;
    }

    function purchaseTicket(uint256 _concertId, address _favoriteMusicianAddress, uint256 _seatRow, uint256 _seatCol) public {
        Concert storage concert = concertBasicInfos[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "ACTIVE"), "Concert is not active.");
        require(block.timestamp < concert.concertStartAt, "Concert is already started.");

        // 티켓 구매 가능 여부 확인
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertId];
        require(block.timestamp < ticketingInfo.ticketingStartAt, "Ticketing is not started yet.");
        require(ticketingInfo.numOfRestTickets > 0, "Sold out.");
        
        // 티켓 가격 확인
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertId];
        require(melodyToken.balanceOf(msg.sender) < ticketPriceInfo.ticketPrice, "Insufficient Melody Token");
        
        // 좌석 정보 확인
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertId];
        if (seatingInfo.isStanding) {
            require(isBetween(0, _seatRow, seatingInfo.seatSizes[0]-1), "Invalid seat row");
            require(isBetween(0, _seatCol, seatingInfo.seatSizes[1]-1), "Invalid seat column");
            require(!ticketingInfo.isReserved[_seatRow][_seatCol], "Seat is already reserved.");
        }

        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertId];
        bool isJoinedMusician = false;
        for (uint256 i = 0; i < favoriteVoteInfo.favoriteMusicianAddresses.length; i++) {
            address musicianAddress = favoriteVoteInfo.favoriteMusicianAddresses[i];
            if (musicianAddress == _favoriteMusicianAddress) {
                isJoinedMusician = true;
                favoriteVoteInfo.favoriteVotes[i]++;
                break;
            }
        }

        require(isJoinedMusician, "Favorite musician not found.");

        uint256 ticketId = ticketNFT.mintTicket(msg.sender, _concertId, _favoriteMusicianAddress, seatingInfo.isStanding, _seatRow, _seatCol);
        ticketingInfo.numOfRestTickets--;
        if (!seatingInfo.isStanding) {
            ticketingInfo.isReserved[_seatRow][_seatCol] = true;
        }
        melodyToken.transferFrom(msg.sender, address(this), ticketPriceInfo.ticketPrice);

        // 발급 티켓 목록에 추가
        ticketingInfo.tickets.push(ticketId);

        emit TicketPurchased(_concertId, msg.sender, ticketId);
    }
    
    function useTicket(uint256 _concertId, uint256 _ticketId) public {
        Concert storage concert = concertBasicInfos[_concertId];
        require(concert.id != 0, "Concert not found.");
        address concertManager = concert.manager;
        require(concertManager == msg.sender, "Only concert manager can call this function.");

        TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithId(_ticketId);
        require(ticket.id != 0, "Ticket not found.");
        require(ticket.status == TicketNFT.TicketStatus.UNUSED, "Ticket is already used.");
        ticketNFT.useTicket(_ticketId);
    }

    function refundTicket(uint256 _concertId, uint256 _ticketId) public {
        Concert storage concert = concertBasicInfos[_concertId];
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
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertId];
        uint256 refundAmount = (ticketPriceInfo.ticketPrice * refundRate) / 100;
        uint256 feeAmount = ticketPriceInfo.ticketPrice - refundAmount;
        ticketPriceInfo.refundedTokenAmount += feeAmount;
        melodyToken.transfer(msg.sender, refundAmount);

        // 좌석 및 표 수 복구
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertId];
        ticketingInfo.numOfRestTickets++;

        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertId];
        if (!seatingInfo.isStanding) {
            ticketingInfo.isReserved[ticket.seatRow][ticket.seatColumn] = false;
        }

        ticketNFT.refundTicket(_ticketId);
    }

    function closeConcert(uint256 _concertId) public onlyConcertManager(_concertId) {
        Concert storage concert = concertBasicInfos[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "ACTIVE"), "Concert is not in status to be closed.");

        // 공연 시작 후 1일이 지나야 정산 가능
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertId];
        require(block.timestamp >= ticketPriceInfo.transferAvailableAfter, "Concert can't be cancled before transfer available after.");

        // 환불로 인한 토큰이 있다면, 공연장 관리자와 뮤지션이 동등하게 수익을 나눠 받음
        MusicianInvitationInfo storage invitationInfo = concertMusicianInfos[_concertId];
        uint256 numOfMusicians = invitationInfo.agreedMusicianAddresses.length;
        uint256 refundedTokenPerMembers = ticketPriceInfo.refundedTokenAmount / (numOfMusicians + 1);

        // 공연장 관리자 수익 분배
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertId];
        uint256 totalManagerEarnings = (ticketingInfo.tickets.length * ticketPriceInfo.venueEarningsPerTicket) + refundedTokenPerMembers;
        melodyToken.transfer(concert.manager, totalManagerEarnings);

        // 뮤지션 수익 분배
        uint256 musicianBaseEarnings = (ticketingInfo.tickets.length * ticketPriceInfo.musicianBaseEarningsPerTicket) / numOfMusicians;
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertId];
        for (uint256 i = 0; i < numOfMusicians; i++) {
            address musicianAddress = favoriteVoteInfo.favoriteMusicianAddresses[i];
            uint256 favoriteBonus = ticketPriceInfo.favoriteBonus * favoriteVoteInfo.favoriteVotes[i];
            uint256 musicianTotalEarnings = musicianBaseEarnings + favoriteBonus + refundedTokenPerMembers;
            melodyToken.transfer(musicianAddress, musicianTotalEarnings);
        }

        concert.status = "TRANSFERRED";
        emit TicketPriceTransferred(_concertId);
    }

    function cancleConcert(uint256 _concertId) public onlyConcertManager(_concertId) {
        Concert storage concert = concertBasicInfos[_concertId];
        require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "ACTIVE"), "Concert status must be ACTIVE.");
        require(block.timestamp < concert.concertStartAt, "Concert is already started.");

        concert.status = "CANCLED";

        // 티켓 구매자들에게 전액 환불
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertId];
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertId];
        for (uint256 i = 0; i < ticketingInfo.tickets.length; i++) {
            TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithId(ticketingInfo.tickets[i]);
            if (ticket.status == TicketNFT.TicketStatus.UNUSED) {
                ticketNFT.refundTicket(ticket.id);
                melodyToken.transfer(ticket.owner, ticketPriceInfo.ticketPrice);
            }
        }
        emit ConcertCancled(_concertId);
    }
}
