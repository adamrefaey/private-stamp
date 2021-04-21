import { ethers, providers } from "ethers";
import { createContext } from "react";

interface Web3ContextProps {
  web3Provider?: providers.Web3Provider;
  contract?: ethers.Contract;
}

const Web3Context = createContext<Web3ContextProps>({
  web3Provider: undefined,
  contract: undefined,
});

export default Web3Context;
