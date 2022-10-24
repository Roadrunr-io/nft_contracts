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
// require('dotenv').config({ path: '.env' });
// Get starting block for event catching and chain analytics
// const starting_block = contract_address.CrateMinter_v1.height
// Initialising JsonRPC provider (IOTEX TESTNET)
const provider = new ethers.providers.JsonRpcProvider('https://babel-api.testnet.iotex.io')
// const provider = new ethers.providers.JsonRpcProvider('https://babel-api.mainnet.iotex.io')
// Initialising Wallet
// const wallet = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, provider)
// const wallet = new ethers.Wallet(process.env.IoPAY_PRIVATE_KEY, provider)
// Initialise Contract Interface
const contract = new ethers.Contract(contract_address.CrateMinter_v1.address, CrateMinter_v1_Artifact.abi, provider)
const main = async () => {
    
    // const contractWithWallet = contract.connect(wallet)
    let OldCost = ethers.utils.formatEther(await contract.mintCost())
    console.log(`MintCost: ${OldCost}\n`)
    // console.log('\nChainging Minting Cost to 1800 IOTEX\n')
    // let tx = await contractWithWallet.setMintCost(2)
    // console.log(tx)
    // let newCost = ethers.utils.formatEther(await contract.mintCost())
    // console.log(`\nMintCost: ${newCost}\n`)
    // console.log('Starting Mint')
    // let tx2 = await contractWithWallet.unpause()
    // console.log(tx2)


}

main()