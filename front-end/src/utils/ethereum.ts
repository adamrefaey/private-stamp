import { ethers, providers } from "ethers";

export async function connectToMetamask(): Promise<providers.Web3Provider> {
  const ethereum = (window as any).ethereum;

  if (!ethereum) {
    throw Error("Metamask extension is missing");
  }

  try {
    await ethereum.enable();
    const provider = new ethers.providers.Web3Provider(ethereum);
    if ((await provider.getNetwork()).name !== "rinkeby") {
      throw Error(
        "Please make sure that Metamask is connected to Rinkeby network"
      );
    }

    return provider;
  } catch (err) {
    throw Error("Please accept Metamask connection to this app");
  }
}

export function getConnectedAccount(
  web3Provider: providers.Web3Provider
): providers.JsonRpcSigner {
  return web3Provider?.getSigner();
}

export async function getConnectedAccountAddress(
  web3Provider: providers.Web3Provider
): Promise<string> {
  return await web3Provider?.getSigner().getAddress();
}
