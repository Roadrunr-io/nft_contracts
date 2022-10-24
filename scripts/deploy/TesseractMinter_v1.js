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


    contract_name = "TesseractMinter_v1";
    // Deploying RRNFT Contract
    const get_contract_object = await ethers.getContractFactory(contract_name);
    // const contract_object = await get_contract_object.deploy('0x7e55C3af89acC2efab7BC21fb90E24D27BEBD789', '0x7599cFa8dfE7242629FB9128764F5F6FEF1c4Ac0');
    const contract_object = await get_contract_object.deploy('0x0bdF8d3d253092F3617D696d0BE097a2Ec35E7C0', '0x26Ecf07D7A50357319263ebafa83Eeb638268572');
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