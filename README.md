# Roadrunr Web3
## Introduction
This repo Contains the following components:
* Smart Contracts in the contracts folder:
    * ERC20 Contract for fixed (CAR) and variable (SafeDriveToken) supply burnable tokens
    * ERC721 Contrats for Nonfungible Tokens:
    * Minters
    * LocalMultiSig
    * MultiSig

* Tests for Smart Contracts
* Deply Scripts to Deplyo the Contracts with Set Parameters and Store Contract Metadata to a Json file
* Backend to Modify Contract Roles for Accounts, Pause/ Unpause Contracts, Access Setter Functions, Submit, Approve and Process Multisig Proposals

## Quickstart
The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/Roadrunr-io/nft_contracts.git
cd nft_contracts.git
npm install
```

For Testing use the following commands
```sh
npx hardhat test
```

For Deploying Any Contract Use the Following Command
```sh
npx hardhat run scripts/deploy/<ContractName>.js --network <network>
```


## Deploy Order
Order         | Contract Deploy/ Action      | Arguments
:---: | :--- | :---
1  | LocalMultiSig Contract  | List of Owner Addresses (list of addresses)
--   |      --                   | Minimum required Approvals (uint)
2  | RRNFTv2_2               | Base URI
3  | CrateMinter_v1          | RRNFT2_2 Contract Address
--   |        --                 | LocalMultiSig Contract Address
4  | TesseractMinter_v1      | Base URI
5  | Grant TesseractMinter_v1 Minter Role via RRNFTv2_2 | TesseractMinter_v1 Address
6  | Grant CrateMinter_v1 Minter Role via RRNFTv2_2 | CrateMinter_v1 Address
7  | Unpause RRNFTv2_2 Contract | 
8  | Unpause TesseractMinter_v1 | 
9  | Unpause CrateMinter_v1 | 

This is the most gas efficient method. Though, deployment
in any order can be performed due to presence of setter functions for changing
these address parameters after deployment. 


<!-- 1) LocalMultiSig Contract
  Arguments: i) List of Owner Addresses (list of addresses)
             ii) Minimum required Approvals (uint)
2) RRNFTv2_2
  Arguments: i) Base URI
3) CrateMinter_v1 and TesseractMinter_v1
  Arguments: i) RRNFT2_2 Contract Address 
             ii) Multisig COntract Address

4) Grant CrateMinter_v1 and TesseractMinter_v1 Minter Roles via RRNFTv2_2
5) Unpause NFT Contract
6) Set Mint Costs: i) 1800 for Crate 
                   ii) 1200 for Tesseract
6 UnpauseCrateMinter_v1 and TesseractMinter_v1 -->

