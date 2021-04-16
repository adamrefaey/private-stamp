import { ethers } from "ethers";

export async function connectToMetamask() {
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw Error("Metamask extension is missing");
  }
  let provider;
  try {
    await ethereum.enable();
    provider = new ethers.providers.Web3Provider(ethereum);
  } catch (err) {
    throw Error("Please accept Metamask connection to this app");
  }

  if ((await provider.getNetwork()).name !== "rinkeby") {
    throw Error(
      "Please make sure that Metamask is connected to Rinkeby network"
    );
  }
}
