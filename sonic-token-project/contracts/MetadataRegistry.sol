// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract MetadataRegistry {
    // simple registry mapping token address => metadata URI (or JSON string)
    mapping(address => string) public metadata;
    address public admin;

    event MetadataSet(address indexed token, address indexed setter, string metadataURI);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor(address _admin) {
        admin = _admin;
    }

    function setMetadata(address token, string calldata metadataURI) external onlyAdmin {
        metadata[token] = metadataURI;
        emit MetadataSet(token, msg.sender, metadataURI);
    }

    function changeAdmin(address newAdmin) external onlyAdmin {
        admin = newAdmin;
    }
}
