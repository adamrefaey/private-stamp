import { providers } from "ethers";

export async function connectToMetamask(): Promise<providers.Web3Provider> {
  const ethereum = (window as any).ethereum;

  if (!ethereum) {
    throw Error("Metamask extension is missing");
  }

  let metamaskProvider: providers.Web3Provider;
  let network: providers.Network;

  try {
    await ethereum.enable();
    metamaskProvider = new providers.Web3Provider(ethereum);
    network = await metamaskProvider.getNetwork();
  } catch (err) {
    throw Error("Please accept Metamask connection to this app");
  }

  if (network.name !== "rinkeby") {
    throw Error(
      "Please make sure that Metamask is connected to Rinkeby network"
    );
  }

  return metamaskProvider;
}

export function getConnectedAccount(
  web3Provider: providers.Web3Provider
): providers.JsonRpcSigner | undefined {
  return web3Provider ? web3Provider.getSigner() : undefined;
}

export async function getConnectedAccountAddress(
  web3Provider: providers.Web3Provider
): Promise<string> {
  const signer = getConnectedAccount(web3Provider);
  return signer ? await signer.getAddress() : new Promise(() => "");
}
