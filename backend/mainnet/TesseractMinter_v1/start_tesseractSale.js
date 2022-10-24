/**
 * Add Minters to the NFT COntract
 */


// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let TesseractMinter_v1_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/TesseractMinter_v1.json');
// Import .env for keys
require('dotenv').config({ path: '.env' });
// Get starting block for event catching and chain analytics
const starting_block = contract_address.TesseractMinter_v1.height
// Initialising JsonRPC provider (IOTEX TESTNET)
const provider = new ethers.providers.JsonRpcProvider('https://babel-api.mainnet.iotex.io')
// Initialising Wallet
// const wallet = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, provider)
// Initialise Contract Interface
const contract = new ethers.Contract(contract_address.TesseractMinter_v1.address, TesseractMinter_v1_Artifact.abi, provider)
const main = async () => {
    
    // const contractWithWallet = contract.connect(wallet)
    // console.log('\nStarting Sales\n')
    // let tx = await contractWithWallet.unpause()
    // console.log(tx)
    // let newCost = await contract.saleIsActive()
    // console.log(`\nsaleIsActive: ${newCost}\n`)
    // tx = await contract.TesseractCount["0xbf2b0598de1d6f00960327adb720780bea37ecf5"]
    console.log("FFF")
    tx = await contract.TesseractCount("0xbf2b0598de1d6f00960327adb720780bea37ecf5")
    // tx = await contract.TesseractCount("0xdEcbD561a4D39Ba087e39257cf13D6b83C0B4Ba5")
    
    console.log(tx.toNumber())
    // console.log(await contract.multisig_address())
    
}

main()