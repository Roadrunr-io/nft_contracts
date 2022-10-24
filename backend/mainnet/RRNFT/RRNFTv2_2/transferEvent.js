/**
 * Add Minters to the NFT COntract
 */


// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/final_final/iotex_testnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let LocalMultiSig_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/final_final/iotex_testnet_contract_metadata/LocalMultiSig.json');
let RRNFTv2_2_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/final_final/iotex_testnet_contract_metadata/RRNFTv2_2.json');
let CrateMinter_v1_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/final_final/iotex_testnet_contract_metadata/CrateMinter_v1.json');
// Import .env for keys
require('dotenv').config({ path: '.env' });
// Get starting block for event catching and chain analytics
const starting_block = contract_address.CrateMinter_v1.height
// Initialising JsonRPC provider (IOTEX TESTNET)
const provider = new ethers.providers.JsonRpcProvider('https://babel-api.testnet.iotex.io')
// Initialising Wallet
const wallet = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, provider)
// Initialise Contract Interface
const localMultiSig = new ethers.Contract(contract_address.LocalMultiSig.address, LocalMultiSig_Artifact.abi, provider)
const RRNFTv2_2 = new ethers.Contract(contract_address.RRNFTv2_2.address, RRNFTv2_2_Artifact.abi, provider)
const CrateMinter_v1 = new ethers.Contract(contract_address.CrateMinter_v1.address, CrateMinter_v1_Artifact.abi, provider)
const main = async () => {
    // tx = await RRNFTv2_2.filters.Transfer(null, await localMultiSig.owners(0))
    tx = await RRNFTv2_2.filters.Transfer()
    // tx = await CrateMinter_v1.filters.Transfer()
    // tx = await RRNFTv2_2.queryFilter('Transfer')
    // tx = await CrateMinter_v1.queryFilter('Transfer')
    console.log(tx)
    // console.log('\n Account1 Balance: ', (await RRNFTv2_2.balanceOf(await localMultiSig.owners(0))).toNumber())
    // for (let index = 0; index < 8; index++) {
    //     console.log('\nOwner of NFT #',index,'is',await RRNFTv2_2.ownerOf(index));
        
    // }
}

main()