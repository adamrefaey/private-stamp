import { Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Flex, Text } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import Web3Context from "../contexts/Web3Context";
import { getConnectedAccountAddress } from "../utils/ethereum";

export interface AppHeaderProps {}

const AppHeader: React.FC<AppHeaderProps> = () => {
  const web3Provider = useContext(Web3Context);
  const [accountAddress, setAccountAddress] = useState<string>("");
  const { hasCopied, onCopy } = useClipboard(accountAddress);

  useEffect(() => {
    (async () => {
      if (web3Provider.web3Provider) {
        const address = await getConnectedAccountAddress(
          web3Provider.web3Provider
        );
        setAccountAddress(address);
      }
    })();
  });

  return (
    <Flex
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
      as="header"
    >
      <Button
        variant="solid"
        as="a"
        href="https://github.com/mustafarefaey/private-stamp"
        target="_blank"
        rel="noreferrer"
      >
        PrivateStamp
      </Button>
      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Text fontSize="md" lineHeight="short" ml={2} mb={2}>
          Your address:
        </Text>
        <Input
          value={accountAddress}
          ml={2}
          mb={2}
          isReadOnly
          placeholder="Welcome"
        />
        <Button onClick={onCopy} ml={2} mb={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
