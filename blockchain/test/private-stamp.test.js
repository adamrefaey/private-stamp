const { expect } = require("chai");

describe("PrivateStamp", function () {
  it("Should be depolyable", async function () {
    [owner] = await ethers.getSigners();
    const PrivateStamp = await ethers.getContractFactory("PrivateStamp");
    const privateStamp = await PrivateStamp.deploy();

    await privateStamp.deployed();
    expect(await privateStamp.owner()).to.equal(owner.address);
  });
});
