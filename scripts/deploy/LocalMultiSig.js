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


    contract_name = "LocalMultiSig";
    // [Aashay, Shubham, Vedant, Atul, Aashay2]
    const accounts = ["0x0819a12556ad7ab5841068ecf8c988a9e2caf80e",
                      "0x2C9fC2D5c8814cE9aD374599A43B7581315f2F14",
                      "0x0a030416b404de725dff37e8d586465cc6d88c4b",
                      "0x95c9c8f8d1f09c543d5f36b916610d5e2601aedd",
                      "0x3330E9857B73A4914F4B85878CFAF0A339A8cfff"];
    // Deploying Contract
    const get_contract_object = await ethers.getContractFactory(contract_name);
    const contract_object = await get_contract_object.deploy(accounts, 3);
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