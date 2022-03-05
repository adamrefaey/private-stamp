import { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import { getConnectedAccountAddress } from "../utils/ethereum";

export default function useAccountAddress() {
  const web3Provider = useContext(Web3Context);
  const [accountAddress, setAccountAddress] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (web3Provider.web3Provider) {
        const address = await getConnectedAccountAddress(
          web3Provider.web3Provider
        );
        setAccountAddress(address);
      }
    })();
  }, [web3Provider.web3Provider]);

  return accountAddress;
}
