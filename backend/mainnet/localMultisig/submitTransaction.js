/**
 * Add Minters to the NFT COntract
 */


// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let localMultiSig_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/LocalMultiSig.json');
// Import .env for keys
require('dotenv').config({ path: '.env' });
// Get starting block for event catching and chain analytics
const starting_block = contract_address.TesseractMinter_v1.height
// Initialising JsonRPC provider (IOTEX TESTNET)
const provider = new ethers.providers.JsonRpcProvider('https://babel-api.mainnet.iotex.io')
// Initialising Wallet
// const wallet = new ethers.Wallet(process.env.IoPAY_PRIVATE_KEY, provider)

// Initialise Contract Interface
const contract = new ethers.Contract(contract_address.LocalMultiSig.address, localMultiSig_Artifact.abi, provider)
const main = async () => {
    
    const contractWithWallet = contract.connect(wallet)
    // console.log('MultiSig Signers: \n',await contract.owners(0),
    //                                 await contract.owners(1),
    //                                 await contract.owners(2),
    //                                 await contract.owners(3),
    //                                 await contract.owners(4)
    //                                 )
    // console.log("\nSubmitting Transaction to withdraw: ",wallet.address)
    
    // result = await contractWithWallet.submit(wallet.address, ethers.utils.parseEther("1080"))
    // console.log(result)
    result2 = await contractWithWallet.approve(0)
    console.log(result2)


}

main()