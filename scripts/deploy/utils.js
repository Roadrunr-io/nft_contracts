function updateMetadataFiles(contract_name, contract_object, height) {
  root_foldername = 'iotex_testnet_contract_metadata'
  console.log("\n\nSaving contract address and abi......\n\n");
    let addresses = require('C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/contract_address.json');
    const fs = require("fs");
    const contractsDir = 'C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/';
  
    addresses[contract_name] = {
          "address": contract_object.address,
          "height": height
    }
    
    fs.writeFileSync(
      'C:/Users/Aashay Doshi/Desktop/projects/react_tutorial/new_final/iotex_testnet_contract_metadata/contract_address.json',
      JSON.stringify(addresses, undefined, 2)
    );
    console.log("\n\nContract Address Saved\n\n");
  

    const contractArtifact = artifacts.readArtifactSync(contract_name);
    fs.writeFileSync(
      contractsDir + contract_name + ".json",
      JSON.stringify(contractArtifact, null, 2)
    );
    console.log("\n\nContraxct ABI saved\n\n");

  }


module.exports = { updateMetadataFiles };