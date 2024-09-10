// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    mapping(address => bool) public concertManagers; // 여러 ConcertManager의 주소를 저장

    constructor(address initialOwner) ERC721("TicketNFT", "TICKET") Ownable(initialOwner) {}

    // ConcertManager만 티켓을 발행할 수 있도록 설정
    modifier onlyConcertManager(address manager) {
        require(concertManagers[manager], "Only authorized ConcertManager can mint tickets");
        _;
    }

    // ConcertManager가 티켓을 발행할 수 있게 변경
    function mintTicket(address to) public returns (uint256) {
        _tokenIdCounter++;
        uint256 newItemId = _tokenIdCounter;
        _mint(to, newItemId);
        return newItemId;
    }

    // ConcertManager를 추가하는 함수
    function addConcertManager(address _concertManager) public onlyOwner {
        concertManagers[_concertManager] = true;
    }

    // ConcertManager를 제거하는 함수
    function removeConcertManager(address _concertManager) public onlyOwner {
        concertManagers[_concertManager] = false;
    }
}
