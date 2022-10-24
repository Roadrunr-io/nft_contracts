// Import ethers
const { ethers } = require("ethers");
// Import Contract Addresses
let contract_address = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/contract_address.json');
// Import Contract ABIs
let RRNFTv2_2_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/RRNFTv2_2.json');
let TesseractMinter_v1_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/TesseractMinter_v1.json');
let CrateMinter_v1_Artifact = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_mainnet_contract_metadata/CrateMinter_v1.json');
// Get starting block for event catching and chain analytics
const starting_block = contract_address.RRNFTv2_2.height
// Initialising JsonRPC provider (IOTEX TESTNET)
const provider = new ethers.providers.JsonRpcProvider('https://babel-api.mainnet.iotex.io')
// Initialise Contract Interface
const Tesseract_contract = new ethers.Contract(contract_address.TesseractMinter_v1.address, TesseractMinter_v1_Artifact.abi, provider)
const RRNFT_contract = new ethers.Contract(contract_address.RRNFTv2_2.address, RRNFTv2_2_Artifact.abi, provider)
const Provider_Method = async () => {
    console.log(starting_block)
    // var filter = ethers.filter({fromBlock:starting_block, toBlock:'latest', address: "0xD0Ec41bC7534f57A0E06d8d9709D761D9814148c"});
    // console.log(filter)
    RRNFT_contract.on("Transfer", (from, to, value, event) => {
        let info = {
            from: from,
            to: to,
            value: ethers.utils.formatUnits(value, 18),
            data: event,
        };
        console.log(JSON.stringify(info, null, 4));
    })
}

const Contract_Filter = async () => {
    let a = await RRNFT_contract.filters.Transfer(null)
    console.log(a)
}

const Query_Filter = async () => {
    let events = await RRNFT_contract.queryFilter("Transfer", starting_block)
    // const events = await RRNFT_contract.queryFilter("*", starting_block)
    console.log(events.length)
    console.log("Block Number", events[1].blockNumber)
    console.log("From Address", events[1].args.from, typeof events[1].args.from)
    console.log("To Address", events[1].args.to)
    console.log("Token ID", ethers.BigNumber.from(events[1].args.tokenId).toNumber())
    // console.log(await events[0].getBlock())

}

const Manual_Filter = async () => {
    
}

const getAddressTokens = async (address) => {
    let events = await RRNFT_contract.queryFilter("Transfer", starting_block)
    address_nfts = new Set()
    for(let i=0; i<events.length; i++) {
        from_address = events[i].args.from
        to_address = events[i].args.to
        // console.log(i,'',from_address,'', to_address,'',ethers.BigNumber.from(events[i].args.tokenId).toNumber())
        if(to_address==address){
            console.log(ethers.BigNumber.from(events[i].args.tokenId).toNumber())
        }
    }
}


const getAddressTokens2 = async (address) => {
    let events = await RRNFT_contract.queryFilter("Transfer", starting_block)
    address_nfts = new Set()
    for(let i=0; i<events.length; i++) {
        from_address = events[i].args.from
        to_address = events[i].args.to
        token_id = ethers.BigNumber.from(events[i].args.tokenId).toNumber()
        if(to_address == address){
            address_nfts.add(token_id)
        }
        if(from_address == address){
            address_nfts.delete(token_id)
        }

        
    }

    console.log(address_nfts)
}


// Provider_Method()
// Contract_Filter()
// Query_Filter()
address = "0xdEcbD561a4D39Ba087e39257cf13D6b83C0B4Ba5"
// address = "0xe26227a962215101956aa16068c4bb5916c3367e"
// address = "0xE26227a962215101956aa16068c4bb5916c3367e"
// address = "0x56e16ef12cb3576058e2ba5280a25be5f6c6b569"
getAddressTokens2(address)