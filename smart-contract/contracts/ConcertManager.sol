// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import '@openzeppelin/contracts/utils/Strings.sol';

import "./MelodyToken.sol"; // MelodyToken 컨트랙트 가져오기
import "./TicketNFT.sol";   // TicketNFT 컨트랙트 가져오기
import "hardhat/console.sol";

contract ConcertManager {
    MelodyToken public melodyToken;
    TicketNFT public ticketNFT;

    // 공연 기본 정보
    struct Concert {
        string uuid; // 콘서트 고유 번호
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
        string[] tickets; // 발급된 티켓 목록
        uint256 numOfRestTickets; // 남은 티켓 수
        uint256 ticketingStartAt; // 티켓팅 시작 일시
        bool[][] isReserved; // 좌석 예약 여부
    }

    // 좌석 관련 정보
    struct ConcertSeatingInfo {
        bool isStanding; // 스탠딩 여부
        uint256[] seatSizes; // 전체 좌석의 행/렬 크기
    }

    mapping(string => Concert) private concertBasicInfos;
    function getConcertBasicInfo(string calldata _concertUuid) public view returns (
        string memory uuid,
        string memory status,
        address manager,
        string memory posterCid,
        uint256 concertStartAt
    ) {
        Concert storage concert = concertBasicInfos[_concertUuid];
        return (_concertUuid, concert.status, concert.manager, concert.posterCid, concert.concertStartAt);
    }

    mapping(string => MusicianInvitationInfo) private concertMusicianInfos;
    function getConcertMusicianInfo(string calldata _concertUuid) public view returns (
        address[] memory pendingMusicianAddresses,
        address[] memory agreedMusicianAddresses,
        address[] memory deniedMusicianAddresses
    ) {
        MusicianInvitationInfo storage musicianInfo = concertMusicianInfos[_concertUuid];
        return (musicianInfo.pendingMusicianAddresses, musicianInfo.agreedMusicianAddresses, musicianInfo.deniedMusicianAddresses);
    }

    mapping(string => FavoriteVoteInfo) private concertFavoriteVoteInfos;
    function getConcertFavoriteVoteInfo(string calldata _concertUuid) public view returns (
        address[] memory favoriteMusicianAddresses,
        uint256[] memory favoriteVotes
    ) {
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertUuid];
        return (favoriteVoteInfo.favoriteMusicianAddresses, favoriteVoteInfo.favoriteVotes);
    }

    mapping(string => TicketPriceInfo) private concertTicketPriceInfos;
    function getConcertTicketPriceInfo(string calldata _concertUuid) public view returns (
        uint256 ticketPrice,
        uint256 venueEarningsPerTicket,
        uint256 musicianBaseEarningsPerTicket,
        uint256 favoriteBonus,
        uint256 refundedTokenAmount,
        uint256 transferAvailableAfter
    ) {
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertUuid];
        return (ticketPriceInfo.ticketPrice, ticketPriceInfo.venueEarningsPerTicket, ticketPriceInfo.musicianBaseEarningsPerTicket, ticketPriceInfo.favoriteBonus, ticketPriceInfo.refundedTokenAmount, ticketPriceInfo.transferAvailableAfter);
    }

    mapping(string => TicketingPlanInfo) private concertTicketingInfos;
    function getConcertTicketingInfo(string calldata _concertUuid) public view returns (
        string[] memory tickets,
        uint256 numOfRestTickets,
        uint256 ticketingStartAt,
        bool[][] memory isReserved
    ) {
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        return (ticketingInfo.tickets, ticketingInfo.numOfRestTickets, ticketingInfo.ticketingStartAt, ticketingInfo.isReserved);
    }

    mapping(string => ConcertSeatingInfo) private concertSeatingInfos;
    function getConcertSeatingInfo(string calldata _concertUuid) public view returns (
        bool isStanding,
        uint256[] memory seatSizes
    ) {
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertUuid];
        return (seatingInfo.isStanding, seatingInfo.seatSizes);
    }

    event ConcertCreated(string concertUuid, address manager);
    event MusicianAgreed(string concertUuid, address musician);
    event MusicianDenied(string concertUuid, address musician);
    event AllMusicianAgreed(string concertUuid);
    event ConcertCanceled(string concertUuid);
    event TicketPurchased(string concertUuid, address buyer, string ticketUuid);
    event TicketPriceTransferred(string concertUuid);

    constructor(address _melodyTokenAddress, address _ticketNFTAddress) {
        melodyToken = MelodyToken(_melodyTokenAddress);
        ticketNFT = TicketNFT(_ticketNFTAddress);
    }

    modifier onlyConcertManager(string calldata _concertUuid) {
        require(concertBasicInfos[_concertUuid].manager == msg.sender, "Only concert manager can call this function.");
        _;
    }

    function isBetween(uint256 a, uint256 b, uint256 c) private pure returns (bool) {
        return a <= b && b <= c;
    }

    function isSameString(string memory a, string memory b) private pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function createConcert(
        string memory _concertUuid,
        uint256 _ticketPrice, // 티켓 한 장의 가격
        uint256 _venueEarningsPerTicket, // 공연장 수익
        uint256 _musicianBaseEarningsPerTicket, // 티켓 한 장당 뮤지션에게 공통으로 주는 금액
        uint256 _ticketingStartAt, // 티켓팅 시작 일시
        uint256 _concertStartAt, // 콘서트 시작 일시
        address[] memory _musicians, // 참가하는 뮤지션들의 지갑 주소 배열
        string memory _posterCid // 포스터 CID
    ) private returns (string memory) {
        uint256 numOfInvitations = _musicians.length;
        uint256 sumOfMusicianEarnings = numOfInvitations * _musicianBaseEarningsPerTicket;

        // 티켓 가격 = 공연장 수익 + 뮤지션 수익 + (보너스 수익)
        require(_venueEarningsPerTicket + sumOfMusicianEarnings <= _ticketPrice, "Earnings exceed ticket price");
        uint256 _favoriteBonus = _ticketPrice - (_venueEarningsPerTicket + sumOfMusicianEarnings);

        // 티켓팅 시작 일시는 콘서트 시작 일시보다 빠르거나 같아야 함
        require(_ticketingStartAt <= _concertStartAt, "Ticketing start time should be earlier than concert start time");
        // 정산 가능 일시는 콘서트 시작 일시의 하루 뒤로 설정
        // uint256 _transferAvailableAfter = _concertStartAt + 1 days;
        uint256 _transferAvailableAfter = _concertStartAt; // For debug

        Concert storage newConcert = concertBasicInfos[_concertUuid];

        // 기본 정보 초기화
        newConcert.uuid = _concertUuid;
        newConcert.status = "PREPARING";
        newConcert.manager = msg.sender;
        newConcert.posterCid = _posterCid;
        newConcert.concertStartAt = _concertStartAt;

        // 공연 참가 뮤지션 정보 초기화
        MusicianInvitationInfo storage musicianInfo = concertMusicianInfos[_concertUuid];
        musicianInfo.pendingMusicianAddresses = _musicians;
        musicianInfo.agreedMusicianAddresses = new address[](0);
        musicianInfo.deniedMusicianAddresses = new address[](0);

        // 최애 투표 정보 초기화
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertUuid];
        favoriteVoteInfo.favoriteMusicianAddresses = new address[](0);
        favoriteVoteInfo.favoriteVotes = new uint256[](0);

        // 금액 관련 정보 초가화
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertUuid];
        ticketPriceInfo.ticketPrice = _ticketPrice;
        ticketPriceInfo.venueEarningsPerTicket = _venueEarningsPerTicket;
        ticketPriceInfo.musicianBaseEarningsPerTicket = _musicianBaseEarningsPerTicket;
        ticketPriceInfo.favoriteBonus = _favoriteBonus;
        ticketPriceInfo.refundedTokenAmount = 0;
        ticketPriceInfo.transferAvailableAfter = _transferAvailableAfter;

        // 티켓 예매 현황 초기화
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        ticketingInfo.tickets = new string[](0);
        ticketingInfo.ticketingStartAt = _ticketingStartAt;

        return _concertUuid;
    }

    function createStandingConcert(
        string calldata _concertUuid,
        uint256 _ticketPrice, // 티켓 한 장의 가격
        uint256 _venueEarningsPerTicket, // 공연장 수익
        uint256 _musicianBaseEarningsPerTicket, // 티켓 한 장당 뮤지션에게 공통으로 주는 금액
        uint256 _ticketingStartAt, // 티켓팅 시작 일시
        uint256 _concertStartAt, // 콘서트 시작 일시
        address[] memory _musicians, // 참가하는 뮤지션들의 지갑 주소 배열
        uint256 _numOfRestTickets, // 남은 티켓 수
        string memory _posterCid // 포스터 CID
    ) public returns (string memory) {
        string memory _concertUuid = createConcert(
            _concertUuid,
            _ticketPrice,
            _venueEarningsPerTicket,
            _musicianBaseEarningsPerTicket,
            _ticketingStartAt,
            _concertStartAt,
            _musicians,
            _posterCid
        );
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.uuid, "Concert not found.");

        // 좌석 관련 정보 초기화
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertUuid];
        seatingInfo.isStanding = true;

        // 티켓팅 관련 정보 초기화
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        ticketingInfo.numOfRestTickets = _numOfRestTickets;

        emit ConcertCreated(_concertUuid, msg.sender);
        return _concertUuid;
    }

    function createSeatingConcert(
        string calldata _concertUuid,
        uint256 _ticketPrice, // 티켓 한 장의 가격
        uint256 _venueEarningsPerTicket, // 공연장 수익
        uint256 _musicianBaseEarningsPerTicket, // 티켓 한 장당 뮤지션에게 공통으로 주는 금액
        uint256 _ticketingStartAt, // 티켓팅 시작 일시
        uint256 _concertStartAt, // 콘서트 시작 일시
        address[] memory _musicians, // 참가하는 뮤지션들의 지갑 주소 배열
        uint256 _numOfSeatRows, // 좌석 행 수
        uint256 _numOfSeatColumns, // 좌석 열 수
        string memory _posterCid // 포스터 CID
    ) public returns (string memory) {
        require(1 <= _numOfSeatRows, "Invalid number of seat rows");
        require(1 <= _numOfSeatColumns, "Invalid number of seat columns");

        string memory _concertUuid = createConcert(
            _concertUuid,
            _ticketPrice,
            _venueEarningsPerTicket,
            _musicianBaseEarningsPerTicket,
            _ticketingStartAt,
            _concertStartAt,
            _musicians,
            _posterCid
        );
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");

        // 좌석 관련 정보 초기화
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertUuid];

        seatingInfo.isStanding = false;
        seatingInfo.seatSizes = new uint256[](2);
        seatingInfo.seatSizes[0] = _numOfSeatRows;
        seatingInfo.seatSizes[1] = _numOfSeatColumns;

        // 티켓팅 관련 정보 초기화
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        ticketingInfo.numOfRestTickets = _numOfSeatRows * _numOfSeatColumns;
        ticketingInfo.isReserved = new bool[][](seatingInfo.seatSizes[0]);
        for (uint256 i = 0; i < _numOfSeatRows; i++) {
            ticketingInfo.isReserved[i] = new bool[](_numOfSeatColumns);
        }
        emit ConcertCreated(_concertUuid, msg.sender);

        return _concertUuid;
    }

    function agreeToConcert(string calldata _concertUuid) public returns (bool) {
        // 준비 중인 콘서트이며, 뮤지션이 아직 응답하지 않은 경우에만 수락가능
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "PREPARING"), "Concert is not preparing.");
        
        // 공연까지 하루 이상 남은 경우에만 수락 가능
        // require(block.timestamp + 1 days <= concert.concertStartAt, "Only available before 1 day of concert.");
        string memory message = string.concat(string.concat(string.concat("Only available before 1 day of concert.", Strings.toString(block.timestamp)), ", "), Strings.toString(concert.concertStartAt));
        // require(block.timestamp <= concert.concertStartAt, message); // For debug

        // 뮤지션 수락 처리
        MusicianInvitationInfo storage invitationInfo = concertMusicianInfos[_concertUuid];
        // 뮤지션 선호 정보 초기화
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertUuid];
        
        // 수락 대기 중인 뮤지션 목록에 있는 경우에만 거절 가능
        bool isPendingMusician = false;
        for (uint256 i = 0; i < invitationInfo.pendingMusicianAddresses.length; i++) {
            if (invitationInfo.pendingMusicianAddresses[i] == msg.sender) {
                invitationInfo.pendingMusicianAddresses[i] = invitationInfo.pendingMusicianAddresses[invitationInfo.pendingMusicianAddresses.length - 1];
                invitationInfo.pendingMusicianAddresses.pop();
                invitationInfo.agreedMusicianAddresses.push(msg.sender);
                favoriteVoteInfo.favoriteMusicianAddresses.push(msg.sender);
                favoriteVoteInfo.favoriteVotes.push(0);
                isPendingMusician = true;
                break;
            }
        }

        require(isPendingMusician, "Musician not found.");

        emit MusicianAgreed(_concertUuid, msg.sender);
        // 모든 뮤지션이 수락하면 콘서트 상태를 활성화로 변경
        if (invitationInfo.pendingMusicianAddresses.length == 0 && invitationInfo.deniedMusicianAddresses.length == 0) {
            concert.status = "ACTIVE";
            emit AllMusicianAgreed(_concertUuid);
        }

        return true;
    }

    function denyToConcert(string calldata _concertUuid) public returns (bool) {
        // 준비 중인 콘서트이며, 뮤지션이 아직 응답하지 않은 경우에만 거절 가능
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "PREPARING"), "Concert is not preparing.");

        // 공연까지 하루 이상 남은 경우에만 거절 가능
        // require(block.timestamp + 1 days <= concert.concertStartAt, "Only available before 1 day of concert.");
        // require(block.timestamp <= concert.concertStartAt, "Only available before 1 day of concert."); // For debug

        MusicianInvitationInfo storage invitationInfo = concertMusicianInfos[_concertUuid];
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
        emit MusicianDenied(_concertUuid, msg.sender);
        concert.status = "CANCELED";
        emit ConcertCanceled(_concertUuid);

        return true;
    }

    function purchaseTicket(string calldata _ticketUuid, string calldata _concertUuid, address _favoriteMusicianAddress, uint256 _seatRow, uint256 _seatCol) public {
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "ACTIVE"), "Concert is not active.");

        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        // require(block.timestamp > ticketingInfo.ticketingStartAt, "Ticketing is not started yet."); // For debug
        // require(block.timestamp < concert.concertStartAt, "Concert is already started."); // For debug

        // 티켓 구매 가능 여부 확인
        require(ticketingInfo.numOfRestTickets > 0, "Sold out.");
        
        // 티켓 가격 확인
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertUuid];
        require(melodyToken.balanceOf(caller()) >= ticketPriceInfo.ticketPrice, "Insufficient Melody Token");
        
        // 좌석 정보 확인
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertUuid];
        if (!seatingInfo.isStanding) {
            require(isBetween(0, _seatRow, seatingInfo.seatSizes[0]-1), "Invalid seat row");
            require(isBetween(0, _seatCol, seatingInfo.seatSizes[1]-1), "Invalid seat column");
            require(!ticketingInfo.isReserved[_seatRow][_seatCol], "Seat is already reserved.");
        }

        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertUuid];
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

        uint256 ticketId = ticketNFT.mintTicket(_ticketUuid, caller(), _concertUuid, _favoriteMusicianAddress, seatingInfo.isStanding, _seatRow, _seatCol);
        ticketingInfo.numOfRestTickets--;
        if (!seatingInfo.isStanding) {
            ticketingInfo.isReserved[_seatRow][_seatCol] = true;
        }
        melodyToken.transferFrom(caller(), address(this), ticketPriceInfo.ticketPrice);

        // 발급 티켓 목록에 추가
        ticketingInfo.tickets.push(_ticketUuid);

        emit TicketPurchased(_concertUuid, caller(), _ticketUuid);
    }

    function caller() public view returns (address) {
        return msg.sender;
    }

    function useTicket(string calldata _concertUuid, string calldata _ticketId) public {
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");
        address concertManager = concert.manager;
        require(concertManager == msg.sender, "Only concert manager can call this function.");

        TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithUuid(_ticketId);
        require(ticket.id != 0, "Ticket not found.");
        require(isSameString(ticket.status, "UNUSED"), "Ticket is already used.");
        ticketNFT.useTicket(_ticketId);
    }

    function refundTicket(string calldata _concertUuid, string calldata _ticketUuid) public {
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");

        TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithUuid(_ticketUuid);

        require(ticket.owner == msg.sender, "Only ticket owner can call this function.");
        require(isSameString(ticket.status, "UNUSED"), "Ticket is already used.");
        // require(block.timestamp < concert.concertStartAt, "Refund is not available because concert is started."); // For debug

        ticket.status = "REFUNDED";
        // 공연 시작까지 10일 미만 남았으면 100%, 7일 미만 남았으면 80%, 3일 미만 남았으면 70% 환불
        uint256 refundRate = 100;
        if (block.timestamp + 10 days <= concert.concertStartAt) {
            refundRate = 100;
        } else if (block.timestamp + 7 days <= concert.concertStartAt) {
            refundRate = 80;
        } else {
            refundRate = 70;
        }

        // 토큰 환불 및 수수료 계산
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertUuid];
        uint256 refundAmount = ticketPriceInfo.ticketPrice * refundRate / 100;
        uint256 feeAmount = ticketPriceInfo.ticketPrice - refundAmount;
        ticketPriceInfo.refundedTokenAmount += feeAmount;
        // melodyToken.transferFrom(address(this), msg.sender, refundAmount);
        melodyToken.approve(ticket.owner, refundAmount);
        melodyToken.transfer(ticket.owner, refundAmount);

        // 좌석 및 표 수 복구
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        ticketingInfo.numOfRestTickets++;
        for(uint256 i = 0; i < ticketingInfo.tickets.length; i++) {
            if (isSameString(ticketingInfo.tickets[i], _ticketUuid)) {
                ticketingInfo.tickets[i] = ticketingInfo.tickets[ticketingInfo.tickets.length - 1];
                ticketingInfo.tickets.pop();
                break;
            }
        }

        // 인기 투표 내리기
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertUuid];
        for (uint256 i = 0; i < favoriteVoteInfo.favoriteMusicianAddresses.length; i++) {
            if (favoriteVoteInfo.favoriteMusicianAddresses[i] == ticket.favoriteMusicianAddress) {
                favoriteVoteInfo.favoriteVotes[i]--;
                break;
            }
        }

        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertUuid];
        if (!seatingInfo.isStanding) {
            ticketingInfo.isReserved[ticket.seatRow][ticket.seatColumn] = false;
        }

        ticketNFT.refundTicket(_ticketUuid);
    }

    function closeConcert(string calldata _concertUuid) public onlyConcertManager(_concertUuid) {
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");
        require(isSameString(concert.status, "ACTIVE"), "Concert is not in status to be closed.");

        // 공연 시작 후 1일이 지나야 정산 가능
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertUuid];
        // require(block.timestamp >= ticketPriceInfo.transferAvailableAfter, "Concert can't be canceled before transfer available after. "); // Debug

        // 환불로 인한 토큰이 있다면, 공연장 관리자와 뮤지션이 동등하게 수익을 나눠 받음
        MusicianInvitationInfo storage invitationInfo = concertMusicianInfos[_concertUuid];
        uint256 numOfMusicians = invitationInfo.agreedMusicianAddresses.length;
        uint256 refundedTokenPerMembers = ticketPriceInfo.refundedTokenAmount / (numOfMusicians + 1);

        // 공연장 관리자 수익 분배 (깔끔하게 다 분배하기 위해 뮤지션이 가져가고 남은 금액을 모두 전송 = 나눗셈 연산 오차 범위는 공연장 관리자의 몫)
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        uint256 totalManagerEarnings = ticketingInfo.tickets.length * ticketPriceInfo.ticketPrice + ticketPriceInfo.refundedTokenAmount;

        // 뮤지션 수익 분배
        uint256 musicianBaseEarnings = ticketingInfo.tickets.length * ticketPriceInfo.musicianBaseEarningsPerTicket;
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertUuid];
        for (uint256 i = 0; i < numOfMusicians; i++) {
            address musicianAddress = favoriteVoteInfo.favoriteMusicianAddresses[i];
            uint256 favoriteBonus = ticketPriceInfo.favoriteBonus * favoriteVoteInfo.favoriteVotes[i];
            uint256 musicianTotalEarnings = musicianBaseEarnings + favoriteBonus + refundedTokenPerMembers;

            melodyToken.transfer(musicianAddress, musicianTotalEarnings);
            totalManagerEarnings -= musicianTotalEarnings;
        }

        // 공연장 관리자에게 남은 금액 일괄 송금
        melodyToken.transfer(concert.manager, totalManagerEarnings);

        concert.status = "TRANSFERRED";
        emit TicketPriceTransferred(_concertUuid);
    }

    function cancelConcert(string calldata _concertUuid) public onlyConcertManager(_concertUuid) {
        Concert storage concert = concertBasicInfos[_concertUuid];
        // require(concert.id != 0, "Concert not found.");
        // require(isSameString(concert.status, "ACTIVE"), "Concert status must be ACTIVE.");
        require(block.timestamp < concert.concertStartAt, "Concert is already started.");

        concert.status = "CANCELED";

        // 티켓 구매자들에게 전액 환불
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertUuid];
        for (uint256 i = 0; i < ticketingInfo.tickets.length; i++) {
            TicketNFT.Ticket memory ticket = ticketNFT.getTicketWithUuid(ticketingInfo.tickets[i]);
            if (isSameString(ticket.status, "UNUSED")) {
                ticketNFT.refundTicket(ticket.uuid);
                melodyToken.transfer(ticket.owner, ticketPriceInfo.ticketPrice);
            }
        }
        emit ConcertCanceled(_concertUuid);
    }

    struct TotalConcertInfo {
        Concert concertInfo;
        MusicianInvitationInfo musicianInfo;
        FavoriteVoteInfo favoriteVoteInfo;
        TicketPriceInfo ticketPriceInfo;
        TicketingPlanInfo ticketingInfo;
        ConcertSeatingInfo seatingInfo;
    }

    function getTotalConcertInfo(string calldata _concertUuid) public view returns (
        string memory uuid,
        string memory status,
        address manager,
        string memory posterCid,
        uint256 concertStartAt,
        address[] memory pendingMusicianAddresses,
        address[] memory agreedMusicianAddresses,
        address[] memory deniedMusicianAddresses,
        address[] memory favoriteMusicianAddresses,
        uint256[] memory favoriteVotes,
        uint256 ticketPrice,
        uint256 venueEarningsPerTicket,
        uint256 musicianBaseEarningsPerTicket,
        uint256 favoriteBonus,
        uint256 refundedTokenAmount,
        uint256 transferAvailableAfter,
        string[] memory tickets,
        uint256 numOfRestTickets,
        uint256 ticketingStartAt,
        bool[][] memory isReserved,
        bool isStanding,
        uint256[] memory seatSizes
    ) {
        Concert storage concert = concertBasicInfos[_concertUuid];
        MusicianInvitationInfo storage musicianInfo = concertMusicianInfos[_concertUuid];
        FavoriteVoteInfo storage favoriteVoteInfo = concertFavoriteVoteInfos[_concertUuid];
        TicketPriceInfo storage ticketPriceInfo = concertTicketPriceInfos[_concertUuid];
        TicketingPlanInfo storage ticketingInfo = concertTicketingInfos[_concertUuid];
        ConcertSeatingInfo storage seatingInfo = concertSeatingInfos[_concertUuid];

        return (
            concert.uuid,
            concert.status,
            concert.manager,
            concert.posterCid,
            concert.concertStartAt,
            musicianInfo.pendingMusicianAddresses,
            musicianInfo.agreedMusicianAddresses,
            musicianInfo.deniedMusicianAddresses,
            favoriteVoteInfo.favoriteMusicianAddresses,
            favoriteVoteInfo.favoriteVotes,
            ticketPriceInfo.ticketPrice,
            ticketPriceInfo.venueEarningsPerTicket,
            ticketPriceInfo.musicianBaseEarningsPerTicket,
            ticketPriceInfo.favoriteBonus,
            ticketPriceInfo.refundedTokenAmount,
            ticketPriceInfo.transferAvailableAfter,
            ticketingInfo.tickets,
            ticketingInfo.numOfRestTickets,
            ticketingInfo.ticketingStartAt,
            ticketingInfo.isReserved,
            seatingInfo.isStanding,
            seatingInfo.seatSizes
        );
    }
}
