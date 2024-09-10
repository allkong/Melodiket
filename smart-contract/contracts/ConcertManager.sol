// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./MelodyToken.sol"; // MelodyToken 컨트랙트 가져오기
import "./TicketNFT.sol";   // TicketNFT 컨트랙트 가져오기
import "hardhat/console.sol";

contract ConcertManager {
    uint256 private _concertIdCounter;

    MelodyToken public melodyToken;
    TicketNFT public ticketNFT;

    enum MusicianStatus { Pending, Agreed }

    struct Musician {
        address musicianAddress;
        uint256 earnings;
        MusicianStatus status;
        uint256 favoriteVotes; // 최애 뮤지션으로 받은 투표 수
    }

    struct Concert {
        uint256 id;
        address manager;
        uint256 ticketPrice;
        uint256 venueEarningsPerTicket;
        uint256 totalMusicianEarningsPerTicket;
        uint256 totalFavoriteBonus;
        uint256 totalTicketsSold;
        Musician[] musicians;
        bool isActive;
        bool allMusiciansAgreed;
        mapping(address => bool) hasAgreed;
        mapping(address => uint256) favoriteVotes; // 청중이 최애 뮤지션에게 투표한 수
    }

    mapping(uint256 => Concert) public concerts;

    event ConcertCreated(uint256 concertId, address manager);
    event MusicianAgreed(uint256 concertId, address musician);
    event TicketPurchased(uint256 concertId, address buyer, uint256 ticketId);
    event ConcertClosed(uint256 concertId);

    constructor(address _melodyTokenAddress, address _ticketNFTAddress) {
        melodyToken = MelodyToken(_melodyTokenAddress);
        ticketNFT = TicketNFT(_ticketNFTAddress);
    }

    modifier onlyConcertManager(uint256 _concertId) {
        require(concerts[_concertId].manager == msg.sender, "Only concert manager can call this function.");
        _;
    }

    function createConcert(
        uint256 _ticketPrice,
        uint256 _venueEarningsPerTicket,
        uint256 _totalMusicianEarningsPerTicket,
        address[] memory _musicians
    ) public {
        uint256 numOfMusicians = _musicians.length;
        uint256 totalMusicianEarnings = numOfMusicians * _totalMusicianEarningsPerTicket;

        require(_venueEarningsPerTicket + totalMusicianEarnings <= _ticketPrice, "Earnings exceed ticket price");

        _concertIdCounter++;
        uint256 concertId = _concertIdCounter;

        Concert storage newConcert = concerts[concertId];
        newConcert.id = concertId;
        newConcert.manager = msg.sender;
        newConcert.ticketPrice = _ticketPrice;
        newConcert.venueEarningsPerTicket = _venueEarningsPerTicket;
        newConcert.totalMusicianEarningsPerTicket = _totalMusicianEarningsPerTicket;
        newConcert.totalFavoriteBonus = _ticketPrice - (_venueEarningsPerTicket + totalMusicianEarnings);
        newConcert.isActive = true;
        newConcert.allMusiciansAgreed = false;

        for (uint256 i = 0; i < numOfMusicians; i++) {
            newConcert.musicians.push(Musician({
                musicianAddress: _musicians[i],
                earnings: 0,
                status: MusicianStatus.Pending,
                favoriteVotes: 0
            }));
        }

        emit ConcertCreated(concertId, msg.sender);
    }

    function agreeToConcert(uint256 _concertId) public {
        Concert storage concert = concerts[_concertId];
        require(concert.isActive, "Concert is not active.");
        require(!concert.hasAgreed[msg.sender], "Musician has already agreed.");
        
        bool musicianFound = false;
        for (uint256 i = 0; i < concert.musicians.length; i++) {
            if (concert.musicians[i].musicianAddress == msg.sender) {
                concert.musicians[i].status = MusicianStatus.Agreed;
                concert.hasAgreed[msg.sender] = true;
                musicianFound = true;
                break;
            }
        }

        require(musicianFound, "Musician not part of this concert.");

        emit MusicianAgreed(_concertId, msg.sender);

        bool allAgreed = true;
        for (uint256 i = 0; i < concert.musicians.length; i++) {
            if (concert.musicians[i].status != MusicianStatus.Agreed) {
                allAgreed = false;
                break;
            }
        }

        if (allAgreed) {
            concert.allMusiciansAgreed = true;
        }
    }

    function purchaseTicket(uint256 _concertId, address favoriteMusician) public {
        Concert storage concert = concerts[_concertId];
        require(concert.isActive, "Concert is not active.");
        require(concert.allMusiciansAgreed, "Not all musicians have agreed.");
        require(melodyToken.balanceOf(msg.sender) < concert.ticketPrice, "Insufficient Melody Token");

        uint256 ticketId = ticketNFT.mintTicket(msg.sender);
        melodyToken.transferFrom(msg.sender, address(this), concert.ticketPrice);

        concert.totalTicketsSold += 1;

        // 최애 뮤지션 투표
        concert.favoriteVotes[favoriteMusician]++;

        emit TicketPurchased(_concertId, msg.sender, ticketId);
    }

    function closeConcert(uint256 _concertId) public onlyConcertManager(_concertId) {
        Concert storage concert = concerts[_concertId];
        require(concert.isActive, "Concert is already closed.");
        
        concert.isActive = false;

        // 수익 분배: 공연장 관리자와 뮤지션에게
        uint256 totalManagerEarnings = concert.totalTicketsSold * concert.venueEarningsPerTicket;
        melodyToken.transfer(concert.manager, totalManagerEarnings);

        uint256 totalFavoriteVotes = 0;
        for (uint256 i = 0; i < concert.musicians.length; i++) {
            totalFavoriteVotes += concert.favoriteVotes[concert.musicians[i].musicianAddress];
        }

        for (uint256 i = 0; i < concert.musicians.length; i++) {
            uint256 baseEarnings = (concert.totalTicketsSold * concert.totalMusicianEarningsPerTicket) / concert.musicians.length;
            uint256 favoriteBonus = 0;
            
            if (totalFavoriteVotes > 0) {
                favoriteBonus = (concert.totalFavoriteBonus * concert.favoriteVotes[concert.musicians[i].musicianAddress]) / totalFavoriteVotes;
            }

            concert.musicians[i].earnings = baseEarnings + favoriteBonus;
        }
        
        for (uint256 i = 0; i < concert.musicians.length; i++) {
            uint256 amount = concert.musicians[i].earnings;
            // require(amount < 0, "No earnings to withdraw");
            concert.musicians[i].earnings = 0;
            melodyToken.transfer(msg.sender, amount);
        }

        emit ConcertClosed(_concertId);
    }
}
