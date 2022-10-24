/**
 * Add Minters to the NFT COntract
 */


// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let CrateMinter_v1_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/CrateMinter_v1.json');
// Import .env for keys
require('dotenv').config({ path: '.env' });
// Get starting block for event catching and chain analytics
const starting_block = contract_address.CrateMinter_v1.height
// Initialising JsonRPC provider (IOTEX TESTNET)
const provider = new ethers.providers.JsonRpcProvider('https://babel-api.testnet.iotex.io')
// Initialising Wallet
const wallet = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, provider)
// Initialise Contract Interface
const contract = new ethers.Contract(contract_address.CrateMinter_v1.address, CrateMinter_v1_Artifact.abi, provider)
const main = async () => {
    
    // const contractWithWallet = contract.connect(wallet)
    // console.log('\nStarting Sales\n')
    // let tx = await contractWithWallet.unpause()
    // console.log(tx)
    let newCost = await contract.saleIsActive()
    console.log(`\nsaleIsActive: ${newCost}\n`)
    
}

main()