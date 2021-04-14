require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// const ALCHEMY_URL = "";
// const RINKEBY_PRIVATE_KEY = "";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // networks: {
  //   rinkeby: {
  //     url: ALCHEMY_URL,
  //     accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
  //   },
  // },
  solidity: "0.7.6",
};
