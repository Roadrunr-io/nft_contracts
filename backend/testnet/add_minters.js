/**
 * Add Minters to the NFT COntract
 */


// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('/home/abd/Desktop/courses/blockchain_tutorial/multisig/iotex_testnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let RRNFTv2_2_Artifact = require('/home/abd/Desktop/courses/blockchain_tutorial/multisig/iotex_testnet_contract_metadata/RRNFTv2_2.json');
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
    const contractWithWallet = contract.connect(wallet)

    console.log('Adding Minter')
    let tx = await contractWithWallet.addMinter(contract_address.CrateMinter_v1.address)
    console.log(tx)


    // const contractWithWallet = contract.connect(wallet)

    // const tx = await contractWithWallet.mint(account1, 10000)
    // await tx.wait()

    // console.log(tx)

    // const newBalance = await contract.balanceOf(Account1)

    // console.log(`Balance of Account after Mint: ${newBalance}\n`)
}

main()