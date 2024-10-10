// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PhotoCardNFT is ERC721, Ownable {
    struct PhotoCard {
        uint256 id;
        string uuid;
        string ticketUuid;
        address owner;
        string imageCid;
    }

    uint private _tokenIdCounter;
    mapping(uint256 => PhotoCard) public photoCards;
    mapping(string => uint256) public photoCardIdByUuid;

    constructor(address initialOwner) ERC721("PhotoCardNFT", "MELODIKET_PHOTOCARD") Ownable(initialOwner) { }

    function mintPhotoCard(string calldata uuid, string calldata _ticketUuid, address to, string calldata imageCid) public returns (uint256) {
        _tokenIdCounter++;
        
        uint256 newPhotoCardId = _tokenIdCounter;
        _safeMint(to, newPhotoCardId);

        PhotoCard storage photoCard = photoCards[newPhotoCardId];
        photoCardIdByUuid[uuid] = newPhotoCardId;

        photoCard.id = newPhotoCardId;
        photoCard.uuid = uuid;
        photoCard.ticketUuid = _ticketUuid;
        photoCard.owner = to;
        photoCard.imageCid = imageCid;

        return newPhotoCardId;
    }

    function getPhotoCardInfoArrayWithUuid(string calldata _uuid) public view returns (uint256, string memory, string memory, address, string memory) {
        uint256 photoCardId = photoCardIdByUuid[_uuid];
        PhotoCard memory photoCard = photoCards[photoCardId];
        return (photoCard.id, photoCard.uuid, photoCard.ticketUuid, photoCard.owner, photoCard.imageCid);
    }
}