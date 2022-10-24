// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
// Defining the contract interface wih the required function signatures
// As of now only transfer function in required
interface ERC721Interface{
    function safeMint(address to, uint256 tokenId) external ;
    
}


contract CrateMinter_v1 {
    
    // Cost of Minting one NFT
    uint256 public mintCost = 1800 * (10**18); //1000 IoTX/Eth
    // Max NFT mints a single user/account is allowed
    uint public maxUserMints = 200;
    // Total NFT to ever be minted
    uint256 public totalMints = 10000;
    // Defining current token count
    uint public current_token_count = 0;
    address public owner;
    // For pausing contract minting
    bool public saleIsActive = false;
    // Declaring contract object
    ERC721Interface nftContract;
    // Declaring local multuisig address to transfer funds into
    address payable public multisig_address;
    // Number based on which nfts will be alotted
    // uint public indexStart;
    mapping(address => uint256) public CrateCount;

    constructor(address nft_contract_address, address local_multisig_adddress){
        nftContract = ERC721Interface(nft_contract_address);
        owner = msg.sender;
        multisig_address = payable(local_multisig_adddress);
        // indexNumber = block.number;
    }

    modifier onlyOwner(){
        require(msg.sender==owner, "Not Owner");
        _;
    }

    modifier pausable(){
        require(saleIsActive, "Sale is Not Active");
        _;
    }

    function pause() public onlyOwner {
        saleIsActive = false;
    }

    function unpause() public onlyOwner {
        saleIsActive = true;
    }

    function setMintCost(uint newCostinIoTEX) public onlyOwner{
        mintCost = newCostinIoTEX * (10**18);
    }
    
    function setMaxUserMints(uint newMax) public onlyOwner{
        maxUserMints = newMax;
    }
    
    function setTotalMints(uint newTotal) public onlyOwner{
        totalMints = newTotal;
    }

    function setMultisigAddress(address new_multisig_address) public onlyOwner
    {
        multisig_address = payable(new_multisig_address);
    }

    function setNFTCOntractAddress(address new_NFTcontract_address) public onlyOwner
    {
        nftContract = ERC721Interface(new_NFTcontract_address);
    }

    /**
    * Mints some NFTs
    */
    function mintCrate(uint numberOfTokens) public payable pausable {
        // require(saleIsActive, "Sale must be active to mint Crate");
        require(numberOfTokens <= maxUserMints, "Can only mint 20 tokens at a time");
        require(CrateCount[msg.sender] + numberOfTokens <= 20, "Exceeds User Crate Limit");
        require(current_token_count + numberOfTokens <= totalMints, "Purchase would exceed max supply of Apes");
        require(mintCost*numberOfTokens <= msg.value, "Ether value sent is not correct");
        
        for(uint i = 0; i < numberOfTokens; i++) {
            uint mintIndex = current_token_count;
            if (current_token_count < totalMints) {
                nftContract.safeMint(msg.sender, mintIndex);
                current_token_count = current_token_count + 1;
                CrateCount[msg.sender] = CrateCount[msg.sender] + 1;
            }
        }

    }

    function withdraw() public payable onlyOwner {
    // Waithdraw function to transfer contract balance to multisig wallet
    (bool os, ) = payable(multisig_address).call{value: address(this).balance}("");
    require(os);
    }


}