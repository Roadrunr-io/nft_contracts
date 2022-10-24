// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
  * V2.2 includes access control to grant minter roles to specific accounts
  * Here will be a contract _admin with the power to grant or revoke the
  * minter role to accounts. _admin will also have minter role.
  * We are also not using onables contract and will be defining our own
  * modifiers and whitelists.
  *
  * This is more gas and deployment efficient than both v1 and v2.1
  * as it does not use storage mapping for token URIs 
  * Instead token URIs are derived from the token ID itself
  * 
  */
  
contract RRNFTv2_2 is ERC721, Pausable, ERC721Burnable {
    // Fired when tokens are deposited to this contract
    event ContractDeposit(address indexed sender, uint amount);
    // Fired when an address is granted minter role
    event MinterAdded(address indexed newMinter);
    // Fired when an address is revoked from minter role
    event MinterRemoved(address indexed formerMinter);
    // Base URI for NFTs
    string public _buri;
    // Declaring _admin and minters
    address public _admin;
    mapping(address=>bool) public minters;
    constructor(string memory buri) ERC721("RRNFTv2.2", "RRT2.2") {
        // Set base URI
        _buri = buri;
        // Set _admin
        _admin = msg.sender;
        // Grant _admin Minter Role
        minters[_admin] = true;
    }

    // Modifier for only _admin accessible functions
    modifier onlyAdmin() {
        require(msg.sender == _admin, "User Not admin");
        _;
    }
    // Modifier for onlhy minter accessible functions
    modifier onlyMinter() {
        require(minters[msg.sender], "User Not Minter");
        _;
    }

    // Function to add new minters to minter role
    function addMinter (address newMinter) public onlyAdmin {
        // Check if address is not a minter
        require(!minters[newMinter], "Minter Role Already Granted");
        minters[newMinter] = true;
        emit MinterAdded(newMinter);
    }

    // Function to remove minters from 
    function removeMinter (address formerMinter) public onlyAdmin {
        // Check if address is a minter
        require(minters[formerMinter], "Address not Minter");
        minters[formerMinter] = false;
        emit MinterRemoved(formerMinter);
    }

    // Setter function to change baseURI
    function setBaseURI(string memory buri) public onlyAdmin {
        require(bytes(buri).length > 0, "wrong base uri");
        _buri = buri;
    }

    function _baseURI() internal view override returns (string memory) {
        return _buri;
    }

    // To pause all contract functions
    function pause() public onlyAdmin {
        _pause();
    }

    // To unpause all contract functions
    function unpause() public onlyAdmin {
        _unpause();
    }

    function safeMint(address to, uint256 tokenId)
        public
        onlyMinter
    {
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }


    function withdraw() public payable onlyAdmin {
    // Waithdraw function to transfer contract balance to the contract owner
    // Later transfer the tokens to the multisig
    (bool os, ) = payable(_admin).call{value: address(this).balance}("");
    require(os);
    }

    receive() external payable{
    // Payable fallback function to accept payments
        // Emit Deposit event
        emit ContractDeposit(msg.sender, msg.value);
    }
}
