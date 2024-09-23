// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721, Ownable {
    struct Ticket {
        uint256 id;
        address owner;
        uint256 concertId;
        string status;
        address favoriteMusicianAddress;
        bool isStanding;
        uint256 seatRow;
        uint256 seatColumn;
    }

    uint256 private _tokenIdCounter;
    mapping(uint256 => TicketNFT.Ticket) public tickets;

    constructor(address initialOwner) ERC721("TicketNFT", "TICKET") Ownable(initialOwner) { }

    function mintTicket(address to, uint256 _concertId, address _favoriteMusician, bool _isStanding, uint256 _seatRow, uint256 _seatColumn) public returns (uint256) {
        _tokenIdCounter++;
        
        uint256 newTicketId = _tokenIdCounter;
        _safeMint(to, newTicketId);

        Ticket storage ticket = tickets[newTicketId];
        ticket.id = newTicketId;
        ticket.owner = to;
        ticket.concertId = _concertId;
        ticket.status = "UNUSED";
        ticket.favoriteMusicianAddress = _favoriteMusician;
        ticket.isStanding = _isStanding;
        ticket.seatRow = _seatRow;
        ticket.seatColumn = _seatColumn;

        return newTicketId;
    }

    function useTicket(uint256 _ticketId) public {
        Ticket storage ticket = tickets[_ticketId];
        ticket.status = "USED";
    }

    function refundTicket(uint256 _ticketId) public {
        Ticket storage ticket = tickets[_ticketId];
        ticket.status = "REFUNDED";
    }

    function getTicketWithId(uint256 _ticketId) public view returns (Ticket memory) {
        return tickets[_ticketId];
    }

    function getTicketInfoArrayWithId(uint256 _ticketId) public view returns (
        uint256 id,
        address owner,
        uint256 concertId,
        string memory status,
        address favoriteMusicianAddress,
        bool isStanding,
        uint256 seatRow,
        uint256 seatColumn
    ) {
        Ticket storage ticket = tickets[_ticketId];
        return (
            ticket.id,
            ticket.owner,
            ticket.concertId,
            ticket.status,
            ticket.favoriteMusicianAddress,
            ticket.isStanding,
            ticket.seatRow,
            ticket.seatColumn
        );
    }
}
