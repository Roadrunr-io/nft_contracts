// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
  * V2.1 includes access control to grant minter roles to specific accounts
  * There will be a contract _admin with the power to grant or revoke the
  * minter role to accounts. _admin will also have minter role.
  * We are also not using ownables contract and will be defining our own
  * modifiers and whitelists.
  *
  * The use of storage mapping for token URIs makes
  * the system gas expensive, but also improves the flexibility for 
  * collaborations/ interoperability, i.e., OEMs/ other protocols can 
  * collaborate with Roadrunr, build the NFT metadata based on our format 
  * and have the URI addresses to their backend/ipfs.
  *
  * A more efficient method for the same is to have a common baseURI and
  * have the contract token URI route to the specific URI address.
  * Refer v2.2 for more gas efficient contract
  */
  
contract RRNFTv2_1 is ERC721, ERC721URIStorage, Pausable, ERC721Burnable {
    // Fired when tokens are deposited to this contract
    event ContractDeposit(address indexed sender, uint amount);
    // Fired when an address is granted minter role
    event MinterAdded(address indexed newMinter);
    // Fired when an address is revoked from minter role
    event MinterRemoved(address indexed formerMinter);
    // Base URI for NFTs
    string private _buri;
    // Declaring _admin and minters
    address private _admin;
    mapping(address=>bool) private minters;
    constructor(string memory buri) ERC721("RRNFTv2.1", "RRT2.1") {
        // Set base URI
        _buri = buri;
        // Set _admin
        _admin = msg.sender;
        // Grant _admin Minter Role
        minters[_admin] = true;
    }

    // Modifier for only _admin accsible functions
    modifier onlyAdmin() {
        require(msg.sender == _admin, "User Not admin");
        _;
    }
    // Modifier for onlhy miner accessible functions
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

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyMinter
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     *Setter function to change individual token URIs
     */
    
    function SetTokenURI(uint256 tokenId, string memory _tokenURI) 
        public 
        onlyMinter
    {
        _setTokenURI(tokenId, _tokenURI);
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
