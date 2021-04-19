import { providers } from "ethers";
import { createContext } from "react";

interface Web3ContextProps {
  web3Provider?: providers.Web3Provider;
}

const Web3Context = createContext<Web3ContextProps>({
  web3Provider: undefined,
});

export default Web3Context;
