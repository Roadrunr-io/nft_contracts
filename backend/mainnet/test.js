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
    // console.log('MultiSig Signers: ',await localMultiSig.owners(0),
    //                                 await localMultiSig.owners(1),
    //                                 await localMultiSig.owners(2)
    //                                 )
    
    // console.log('\n Admin: ', await RRNFTv2_2._admin())
    // console.log('\n Base URI: ', await RRNFTv2_2._buri())
    // console.log('\n Minter 0: ', await RRNFTv2_2.minters(await RRNFTv2_2._admin()))
    // console.log('\n Minter 1: ', await RRNFTv2_2.minters(contract_address.CrateMinter_v1.address))
    console.log('\n Account1 Balance: ', (await RRNFTv2_2.balanceOf(await localMultiSig.owners(0))).toNumber())
    console.log('\n Account2 Balance: ', ( await RRNFTv2_2.balanceOf(await localMultiSig.owners(1))).toNumber())
    console.log('\n Account2 Balance: ', ( await RRNFTv2_2.balanceOf(await localMultiSig.owners(2))).toNumber())
    for (let index = 0; index < 8; index++) {
        console.log('\nOwner of NFT #',index,'is',await RRNFTv2_2.ownerOf(index));
        
    }
    
    // const contractWithWallet = contract.connect(wallet)
    // let OldCost = ethers.utils.formatEther(await contract.mintCost())
    // console.log(`MintCost: ${OldCost}\n`)
    // console.log('\nChainging Minting Cost to 2 IOTEX\n')
    // let tx = await contractWithWallet.setMintCost(2)
    // console.log(tx)
    // let newCost = ethers.utils.formatEther(await contract.mintCost())
    // console.log(`\nMintCost: ${newCost}\n`)
    // console.log('Starting Mint')
    // let tx = await contractWithWallet.unpause()
    // console.log(tx)


}

main()