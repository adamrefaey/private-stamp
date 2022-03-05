import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import useAccountAddress from "../../hooks/useAccountAddress";
import useContract from "../../hooks/useContract";
import { encryptFile } from "../../utils/encryption";
export interface StampContainerProps {}

const StampContainer: React.FC<StampContainerProps> = () => {
  const contract = useContract();
  const accountAddress = useAccountAddress();
  const toast = useToast();
  const [stampLog, setStampLog] = useState<any[]>([]);
  const fileInput = useRef(null);
  type formPayload = {
    file: { files: File[] };
    password: { value: string };
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!contract) {
      return;
    }

    setStampLog((prevStampLog) => [<Text>Encrypting file...</Text>]);

    const target = e.target as EventTarget & formPayload;

    let encryptionResult: {
      file: Blob;
      hash: string;
    };

    try {
      encryptionResult = await encryptFile(
        target.file.files[0],
        target.password.value
      );
    } catch (err) {
      toast({
        position: "top-left",
        title: "File encryption failed!",
        status: "error",
        duration: null,
        isClosable: true,
      });

      return;
    }

    setStampLog((prevStampLog) => [
      ...prevStampLog,
      <Text>File encrypted successfully!</Text>,
      <Text>File Hash: {encryptionResult.hash}</Text>,
      <Button as="a" href={URL.createObjectURL(encryptionResult.file)}>
        Download encrypted file
      </Button>,
    ]);

    contract.storeHash(encryptionResult.hash);
  };

  useEffect(() => {
    if (contract) {
      (async (contract, accountAddress) => {
        contract.on("LogAdditionEvent", (...args) => {
          if (args && args[0] === accountAddress) {
            toast({
              position: "top-left",
              title:
                "Your file was successfully stamped and added to block " +
                args[3].blockNumber,
              status: "success",
              duration: null,
              isClosable: true,
            });
          }
        });
      })(contract, accountAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, accountAddress]);

  return (
    <Flex flexDirection="column">
      <Heading as="h2">Encrypt and Stamp</Heading>
      <form onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel htmlFor="stamp-upload-input">File</FormLabel>
          <Input
            ref={fileInput}
            type="file"
            name="file"
            id="stamp-upload-input"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="stamp-password-input">Password</FormLabel>
          <Input type="password" name="password" id="stamp-password-input" />
        </FormControl>
        <Button type="submit" variant="solid">
          Stamp
        </Button>
      </form>
      {stampLog && (
        <VStack>
          {stampLog.map((entry, index) => (
            <Box key={index}>{entry}</Box>
          ))}
        </VStack>
      )}
    </Flex>
  );
};

export default StampContainer;
