import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { connectToMetamask, getConnectedAccount } from "../utils/ethereum";
import Web3Context from "../contexts/Web3Context";
import { ethers, providers } from "ethers";
const contractAbi = require("../contract-abi/PrivateStamp.json");

const MetamaskProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const [web3Provider, setWeb3Provider] = useState<
    undefined | providers.Web3Provider
  >(undefined);
  const [contract, setContract] = useState<undefined | ethers.Contract>(
    undefined
  );

  useEffect(() => {
    (async () => {
      try {
        setWeb3Provider(await connectToMetamask());

        toast({
          position: "top-left",
          title: "Metamask connected successfully.",
          status: "success",
          duration: 2000,
          // isClosable: true,
        });
      } catch (err) {
        toast({
          position: "top-left",
          title: err.message,
          status: "error",
          duration: null,
          isClosable: true,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (web3Provider) {
      const contract = new ethers.Contract(
        "0x10FE0cC28e655c8118C818811d7C65BFB63D681a",
        contractAbi,
        getConnectedAccount(web3Provider)
      );
      setContract(contract);
    }
  }, [web3Provider]);

  return (
    <Web3Context.Provider
      value={{
        web3Provider,
        contract,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default MetamaskProvider;
