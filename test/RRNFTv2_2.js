const { expect } = require("chai");

describe("RRNFTv2 contract", function () {
    // Mocha has four functions that let you hook into the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.
  
    // They're very useful to setup the environment for tests, and to clean it
    // up after they run.
  
    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.
  
    let rrnft;
    let owner;
    let addr1;
    let addr2;
    let addrs;
  
    // `beforeEach` will run before each test, re-deploying the contract every
    // time. It receives a callback, which can be async.
    beforeEach(async function () {
      // Get the ContractFactory and Signers here.
      nft_contract = await ethers.getContractFactory("RRNFTv2_2");
      [owner, addr1, addr2, addr3,...addrs] = await ethers.getSigners();
  
      // To deploy our contract, we just have to call Token.deploy() and await
      // for it to be deployed(), which happens once its transaction has been
      // mined.
      rrnft = await nft_contract.deploy("https://gateway.pinata.cloud/ipfs/QmVFVhHDHzYmU4YC4tG3xXQfMPxB7xCArxKotPFRcc5Fte/");
      // Grant addr1 minter role
      tx = await rrnft.addMinter(addr1.address);
    });


    describe("Deployment", function () {
        it("Admin Should Mint Tokens", async function(){
            await rrnft.safeMint(addr1.address, 0)
            num_tokens = await rrnft.balanceOf(addr1.address)
            expect(num_tokens).to.equal(1);
        });
        it("Minter Should Mint Tokens", async function(){
            await rrnft.connect(addr1).safeMint(addr1.address, 0)
            num_tokens = await rrnft.balanceOf(addr1.address)
            expect(num_tokens).to.equal(1);
        });

        it("Should not Mint if Not Owner", async function(){
            errorMsg = "User Not Minter"

            await expect(
                rrnft.connect(addr2).safeMint(addr1.address, 0)
              ).to.be.revertedWith(errorMsg);
        });

        it("Should Burn Tokens", async function() {
            
            //old_num_tokens = await rrnft.balanceOf(addr1.address)
            result = await rrnft.safeMint(addr1.address, 0)
            num_tokens = await rrnft.balanceOf(addr1.address)
            result = await rrnft.connect(addr1).burn(0)
            new_num_tokens = await rrnft.balanceOf(addr1.address)
            expect(new_num_tokens).to.equal(num_tokens-1);
        });

        it("Should Fail if not owner of token", async function() {
            errorMsg = "ERC721Burnable: caller is not owner nor approved";
            result = await rrnft.safeMint(addr1.address, 0)
            await expect(
                rrnft.connect(addr2).burn(0)
              ).to.be.revertedWith(errorMsg);
        });
    });

    describe("Transactions", function() {
        it("Should transfer Token between accounts", async function(){
            await rrnft.safeMint(addr1.address, 0)
            tokenOwner = await rrnft.ownerOf(0)
            //console.log(`Old Token Owner: ${tokenOwner}$`)
            result = await rrnft.connect(addr1).transferFrom(addr1.address, addr2.address, 0)
            tokenOwner = await rrnft.ownerOf(0)
            //console.log(`New Token Owner: ${tokenOwner}$`)
            expect(tokenOwner).to.equal(addr2.address);

        });

        it("Should fail if sender doesn’t own Token", async function() {
            errorMsg = "ERC721: transfer caller is not owner nor approved";
            await rrnft.safeMint(addr1.address, 0)
            rrnft.connect(addr1).transferFrom(addr1.address, addr2.address, 0)
            await expect(
                rrnft.connect(addr1).transferFrom(addr2.address, addr1.address, 0)
              ).to.be.revertedWith(errorMsg);
        });
        
    });



    describe("URI", function() {
        it("Return Token URIs", async function(){
            token_URI = "https://gateway.pinata.cloud/ipfs/QmVFVhHDHzYmU4YC4tG3xXQfMPxB7xCArxKotPFRcc5Fte/0"
            await rrnft.safeMint(addr1.address, 0)
            received_URI = await rrnft.tokenURI(0)
            expect(token_URI).to.equal(received_URI);
            
        });

        it("Should fail if token does not exist", async function() {
            errorMsg = "ERC721Metadata: URI query for nonexistent token";
            //await rrnft.safeMint(addr1.address)
            await expect(
                rrnft.tokenURI(1)
              ).to.be.revertedWith(errorMsg);
            
        });

        it("Should fail if token is deleted", async function() {
            errorMsg = "ERC721Metadata: URI query for nonexistent token";
            await rrnft.safeMint(addr1.address, 0)
            await rrnft.connect(addr1).burn(0)
            await expect(
                rrnft.tokenURI(0)
              ).to.be.revertedWith(errorMsg);
        });
        
    });

    describe("Admin Rights", async function() {
        it("Admin can Add Minters", async function() {
            // console.log(await rrnft.minters(addr2.address))
            // await rrnft.addMinter(addr2.address);
            // console.log(await rrnft.minters(addr2.address))
            // console.log(await rrnft.minters(addr1.address))
            // await rrnft.removeMinter(addr1.address);
            // console.log(await rrnft.minters(addr1.address))
        })
        it("Only Admin can Remove Minters", async function() {
            errorMsg = "User Not admin"

            await expect(
                rrnft.connect(addr1).addMinter(addr2.address)
              ).to.be.revertedWith(errorMsg);
        })
     
        it("Only Admin can set base URI", async function() {
            // const token_URI = "ipfs://QmVFVhHDHzYmU4YC4tG3xXQfMPxB7xCArxKotPFRcc5Fte/"
            // await rrnft.safeMint(addr1.address, 0, "1.json")
            // console.log(await rrnft.tokenURI(0))
            // await rrnft.setBaseURI(token_URI)
            // console.log(await rrnft.tokenURI(0))
            errorMsg = "User Not admin"

            await expect(
                rrnft.connect(addr1).setBaseURI("banana")
              ).to.be.revertedWith(errorMsg);

        })
        it("Only Admin can pause transactions", async function() {
            errorMsg = "Pausable: paused"
            await rrnft.safeMint(addr1.address, 0)
            await rrnft.pause()
            await expect(
                rrnft.connect(addr1).transferFrom(addr1.address, addr2.address, 0)
              ).to.be.revertedWith(errorMsg);
            await expect(
                rrnft.safeMint(addr1.address, 2)
              ).to.be.revertedWith(errorMsg);
        })
        it("Only Admin can unpause transactions", async function() {
            errorMsg = "User Not admin"

            await expect(
                rrnft.connect(addr1).pause()
              ).to.be.revertedWith(errorMsg);
        })

    })



});