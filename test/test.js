const { expect } = require("chai");
const { ethers } = require("hardhat");

function bn(number) {
  return new ethers.BigNumber.from(number);
}

describe("Malleable", function () {
  it("Signer should be expectedSigner in all cases", async function () {
    const Malleable = await ethers.getContractFactory("Malleable");
    const malleable = await Malleable.deploy();
    await malleable.deployed();

    const accounts = await ethers.getSigners();
    let message = "eat at don's";
    let signature = await accounts[0].signMessage(message);

    let expectedSigner = accounts[0].address;

    let split = await ethers.utils.splitSignature(signature);

    await malleable.test(message, split.v, split.r, split.s, expectedSigner);

    // reflect signature start
    split.v = 28;
    let C = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141';
    let newS = await ethers.utils.hexlify(bn(C).sub(bn(split.s)));
    split.s = newS;
    // reflect signature end

    await malleable.test(message, split.v, split.r, split.s, expectedSigner);
   
  });
});
