// const { expect } = require("chai");
// const { Contract } = require("ethers");
// const { ethers } = require("ethers");
// const { ethers } = require("hardhat");

describe("MINTERv1 contract", function () {

  
    let rrnft;
    let owner;
    let addr1;
    let addr2;
    let addrs;
  
    beforeEach(async function () {
        //   Get accounts
        [owner, addr1, addr2, addr3,...addrs] = await ethers.getSigners();
        //   Deploy NFT Contract
        nft_contract = await ethers.getContractFactory("RRNFTv2_2");
        rrnft = await nft_contract.deploy("https://gateway.pinata.cloud/ipfs/Qme9Dt2kvAHj5kgEJ2bqcyTefTwcteYa6CTi2QGSpoAEpr/");
        // Deploy Multisig
        multisig_contract = await ethers.getContractFactory("LocalMultiSig");
        multisig_owners = [owner.address, addr1.address, addr2.address];
        //Defining minimum number of approvals for multisig (2/3)
        approvals = 2;
        multisig = await multisig_contract.deploy(multisig_owners, approvals)
        // Deploy MINTERv1  
        minter_contract = await ethers.getContractFactory("CrateMinter_v1");
        myMinter = await minter_contract.deploy(rrnft.address,multisig.address);
        // Grant MINTERv1 minter role in NFT contract
        tx = await rrnft.addMinter(myMinter.address)
        await myMinter.setMintCost(1)
        await myMinter.setMaxUserMints(3);
        await myMinter.setTotalMints(7);
        await myMinter.unpause();
    });


    describe("Minting", function () {
        it("Should Mint Tokens", async function(){
            await myMinter.connect(addr1).mintCrate(1,{value: ethers.utils.parseEther("2")});
            await myMinter.connect(addr2).mintCrate(2,{value: ethers.utils.parseEther("2")});
            await myMinter.connect(addr3).mintCrate(1,{value: ethers.utils.parseEther("2")});
            console.log(await rrnft.balanceOf(addr1.address))
            console.log(await rrnft.balanceOf(addr2.address))
            console.log(await rrnft.balanceOf(addr3.address))
            console.log(await rrnft.ownerOf(0), addr1.address)
            console.log(await rrnft.ownerOf(1), addr2.address)
            console.log(await rrnft.ownerOf(2), addr2.address)
            console.log(await rrnft.ownerOf(3), addr3.address)
        });
        it("Should Fail if Not Enough Money", async function(){
            await myMinter.connect(addr1).mintCrate(1,{value: ethers.utils.parseEther("2")});
            await myMinter.connect(addr2).mintCrate(2,{value: ethers.utils.parseEther("2")});
            await myMinter.connect(addr3).mintCrate(1,{value: ethers.utils.parseEther("2")});

            await myMinter.withdraw()
            // console.log(await addr1.getBalance())
            // console.log(await minter_contract.getBalance())
            result = await multisig.submit(addr3.address, ethers.utils.parseEther("3.5"))
            old_balance = await addr3.getBalance()
            approv = await multisig.approve(0)
            approv = await multisig.connect(addr1).approve(0)
            tx = await multisig.execute(0)
            new_balance = await addr3.getBalance()
            console.log(ethers.utils.formatEther(old_balance), ethers.utils.formatEther(new_balance))
        });

        it("Should Fail if mint exceeds account limit", async function(){

        });
        it("Should Fail if mint exceeds total limit", async function(){

        });


    });

    describe("Crate Count", function () {
        it("Can read crate coount per address", async function(){
            await myMinter.mintCrate(3,{value: ethers.utils.parseEther("3")})
            console.log(await myMinter.CrateCount(owner.address))
            await myMinter.connect(addr2).mintCrate(2,{value: ethers.utils.parseEther("3")})
            console.log((await myMinter.CrateCount(addr2.address)).toNumber()) 
        });
    });

    describe("Admin Rights", function () {
        it("Only admin can pause and unpause transactions", async function(){
            
        });
        it("Only admin can access setter functions", async function(){
            

        });


    });

});