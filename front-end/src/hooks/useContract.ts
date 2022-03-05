import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";

export default function useContract(): ethers.Contract | undefined {
  const web3Provider = useContext(Web3Context);
  const [contract, setContract] = useState<ethers.Contract | undefined>(
    undefined
  );

  useEffect(() => {
    if (web3Provider.contract) {
      setContract(web3Provider.contract);
    }
  }, [web3Provider.contract]);

  return contract;
}
