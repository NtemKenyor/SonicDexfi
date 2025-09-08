// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract MyToken is ERC20PresetMinterPauser {
    string public metadataUri;

    constructor(string memory name_, string memory symbol_) 
        ERC20PresetMinterPauser(name_, symbol_) {}

    function setMetadata(string memory uri) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not admin");
        metadataUri = uri;
    }
}
