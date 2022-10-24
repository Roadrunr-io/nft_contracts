// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let TesseractMinter_v1_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/TesseractMinter_v1.json');
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
    addresses = ['0xC7b9086f020c78A2D2D1397b36155f3559149aFa', '0x26Ecf07D7A50357319263ebafa83Eeb638268572']
    const contractWithWallet = contract.connect(wallet)
    // let OldCost = ethers.utils.formatEther(await contract.mintCost())
    // console.log(`MintCost: ${OldCost}\n`)
    console.log(await contract.multisig_address(), addresses[1])
    // console.log(await contract.nftContract())
    // tx1 = await contractWithWallet.setMultisigAddress(addresses[1])
    // console.log(tx1)


}

main()