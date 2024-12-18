// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MelodyToken is ERC20, Ownable {
    constructor(uint256 initialSupply, address initialOwner) ERC20("MelodyToken", "MLDY") Ownable(initialOwner) {
        _mint(initialOwner, initialSupply);
        transferOwnership(initialOwner);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    // 소수점 자리를 0으로 설정
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}
