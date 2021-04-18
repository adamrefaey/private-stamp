import React, { useEffect } from "react";
import {
  ChakraProvider,
  theme,
  useToast,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { connectToMetamask } from "./utils/ethereum";
import AppHeader from "./components/AppHeader";
import StampContainer from "./components/stamp";
import VerifyContainer from "./components/verify";

export const App: React.FC = () => {
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        await connectToMetamask();
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
  }, [toast]);

  return (
    <ChakraProvider theme={theme}>
      <Flex minH="100vh" flexDirection="column" px="10" py="5">
        <AppHeader />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5">
          <StampContainer />
          <VerifyContainer />
        </SimpleGrid>
      </Flex>
    </ChakraProvider>
  );
};
