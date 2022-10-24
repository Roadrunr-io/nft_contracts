// import { updateMetadataFiles } from 'utils.js';
const utils = require("./utils");

async function main() {
    // This is just a convenience check
    if (network.name === "hardhat") {
      console.warn(
        "You are trying to deploy a contract to the Hardhat Network, which" +
          "gets automatically created and destroyed every time. Use the Hardhat" +
          " option '--network localhost'"
      );
    }
  
    // ethers is available in the global scope
    const [deployer] = await ethers.getSigners();
    console.log(
      "Deploying the contracts with the account:",
      await deployer.getAddress()
    );
  
    console.log("Account balance:", (await deployer.getBalance()).toString());


    contract_name = "RRNFTv2";
    // Deploying RRNFT Contract
    const RRNFT_contract = await ethers.getContractFactory(contract_name);
    const rrnft_contract = await RRNFT_contract.deploy("ipfs://QmYcoNrCDPaFm9LaeNFH8JqeofUhx6t2bAYNBSt8XV1WH7/");
    await rrnft_contract.deployed();
  
    console.log("RRNFTv2 address:", rrnft_contract.address);

    //Block Number to start searches from
    const height = await ethers.provider.getBlockNumber();
  
    // We also save the contract's artifacts and address in the frontend directory
    utils.updateMetadataFiles(contract_name, rrnft_contract, height);
  }
  
  
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });