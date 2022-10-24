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


    contract_name = "CAR";
    // Deploying RRNFT Contract
    const get_contract_object = await ethers.getContractFactory(contract_name);
    const contract_object = await get_contract_object.deploy();
    await contract_object.deployed();
  
    console.log(contract_name + " address:", contract_object.address);

    //Block Number to start searches from
    const height = await ethers.provider.getBlockNumber();
  
    // We also save the contract's artifacts and address in the frontend directory
    utils.updateMetadataFiles(contract_name, contract_object, height);
  }
  
  
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });