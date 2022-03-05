async function main() {
  // We get the contract to deploy
  const PrivateStamp = await ethers.getContractFactory("PrivateStamp");
  const privateStamp = await PrivateStamp.deploy();
  await privateStamp.deployed();

  console.log("PrivateStamp deployed to:", privateStamp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
