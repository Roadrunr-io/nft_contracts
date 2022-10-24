// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('../frontend/src/contracts/contract-address.json');
// Import Contract ABIs
let CAR_Artifact = require('../frontend/src/contracts/CAR.json');
let SDT_Artifact = require('../frontend/src/contracts/SafeDriveToken.json');
let RRNFT_Artifact = require('../frontend/src/contracts/RRNFT.json');
// Import .env for keys
require('dotenv').config({ path: '.env' });
// Get starting block for event catching and chain analytics
const starting_block = contract_address.Height
// Initialising JsonRPC provider (Alchemy)
const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_RINKEBY)
// Infura JsonRPC provider
// const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/924086ee3ed2424e8b96d497bc7bf294');
// Initialising Wallet
const wallet = new ethers.Wallet(process.env.ACCOUNT1_PRIVATE_KEY, provider)
// Initialise Contract Interface
const contract = new ethers.Contract(contract_address.CAR, CAR_Artifact.abi, provider)
const Account1 = '0xdEcbD561a4D39Ba087e39257cf13D6b83C0B4Ba5'
const KovanAccount = '0x3330E9857B73A4914F4B85878CFAF0A339A8cfff'
const main = async () => {
    const balance = await contract.balanceOf(Account1)

    console.log(`Balance of Account1: ${balance}\n`)

    // const contractWithWallet = contract.connect(wallet)

    // const tx = await contractWithWallet.mint(account1, 10000)
    // await tx.wait()

    // console.log(tx)

    // const newBalance = await contract.balanceOf(Account1)

    // console.log(`Balance of Account after Mint: ${newBalance}\n`)
}

main()