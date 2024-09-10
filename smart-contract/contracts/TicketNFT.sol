// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721, Ownable {
    enum TicketStatus {
        UNUSED, // 사용되지 않은 티켓
        USED, // 사용된 티켓
        REFUNDED // 환불된 티켓
    }

    struct Ticket {
        uint256 id;
        address owner;
        address concertAddress;
        TicketStatus status;
        address favoriteMusicianAddress;
        bool isStanding;
        uint256 seatRow;
        uint256 seatColumn;
    }

    uint256 private _tokenIdCounter;
    mapping(uint256 => TicketNFT.Ticket) public tickets;

    constructor(address initialOwner) ERC721("TicketNFT", "TICKET") Ownable(initialOwner) { }

    function mintTicket(address to, address _favoriteMusician, bool _isStanding, uint256 _seatRow, uint256 _seatColumn) public returns (uint256) {
        _tokenIdCounter++;
        
        uint256 newTicketId = _tokenIdCounter;
        _safeMint(to, newTicketId);

        tickets[newTicketId] = Ticket({
            id: newTicketId,
            owner: to,
            concertAddress: msg.sender,
            status: TicketStatus.UNUSED,
            favoriteMusicianAddress: _favoriteMusician,
            isStanding: _isStanding,
            seatRow: _seatRow,
            seatColumn: _seatColumn
        });

        return newTicketId;
    }

    function useTicket(uint256 _ticketId) public {
        Ticket storage ticket = tickets[_ticketId];
        ticket.status = TicketStatus.USED;
    }

    function refundTicket(uint256 _ticketId) public {
        Ticket storage ticket = tickets[_ticketId];
        ticket.status = TicketStatus.REFUNDED;
    }

    function getTicketWithId(uint256 _ticketId) public view returns (Ticket memory) {
        return tickets[_ticketId];
    }
}
