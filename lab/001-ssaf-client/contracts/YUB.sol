// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract YUBToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("YUBToken", "YUB") {
        _mint(msg.sender, initialSupply);
    }
}