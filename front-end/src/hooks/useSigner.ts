import { providers } from "ethers";
import { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import { getConnectedAccount } from "../utils/ethereum";

export default function useSigner(): providers.JsonRpcSigner | undefined {
  const web3Provider = useContext(Web3Context);
  const [signer, setSigner] = useState<providers.JsonRpcSigner | undefined>(
    undefined
  );

  useEffect(() => {
    if (web3Provider.web3Provider) {
      const address = getConnectedAccount(web3Provider.web3Provider);
      setSigner(address);
    }
  }, [web3Provider.web3Provider]);

  return signer;
}
