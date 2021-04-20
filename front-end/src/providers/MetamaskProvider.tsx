import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { connectToMetamask } from "../utils/ethereum";
import Web3Context from "../contexts/Web3Context";
import { providers } from "ethers";

const MetamaskProvider: React.FC = ({ children }) => {
  const toast = useToast();
  const [web3Provider, setWeb3Provider] = useState<
    undefined | providers.Web3Provider
  >(undefined);

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

  return (
    <Web3Context.Provider
      value={{
        web3Provider,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default MetamaskProvider;
