/**
 * Add Minters to the NFT COntract
 */


// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let RRNFTv2_2_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/RRNFTv2_2.json');
// Import .env for keys
require('dotenv').config({ path: '.env' });
// Get starting block for event catching and chain analytics
const starting_block = contract_address.Height
// Initialising JsonRPC provider (IOTEX TESTNET)
const provider = new ethers.providers.JsonRpcProvider('https://babel-api.testnet.iotex.io')
// Initialising Wallet
const wallet = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, provider)
// Initialise Contract Interface
const contract = new ethers.Contract(contract_address.RRNFTv2_2.address, RRNFTv2_2_Artifact.abi, provider)
const main = async () => {
    let balance = await contract.name()
    console.log(`Name: ${balance}\n`)
    let balance2 = await contract.symbol()
    console.log(`Symbol: ${balance2}\n`)

    // console.log(await contract.minters(contract_address.CrateMinter_v1.address))
    // console.log(await contract.minters(contract_address.TesseractMinter_v1.address))
    console.log(await contract._buri())
    // const contractWithWallet = contract.connect(wallet)
    // tx = await contractWithWallet.setBaseURI("##")
    // console.log(tx)    
}

main()