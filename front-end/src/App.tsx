import React from "react";
import { ChakraProvider, theme, Flex, SimpleGrid } from "@chakra-ui/react";
import AppHeader from "./components/AppHeader";
import StampContainer from "./components/stamp";
import VerifyContainer from "./components/verify";
import MetamaskProvider from "./providers/MetamaskProvider";

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <MetamaskProvider>
        <Flex minH="100vh" flexDirection="column" px="10" py="5">
          <AppHeader />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing="5">
            <StampContainer />
            <VerifyContainer />
          </SimpleGrid>
        </Flex>
      </MetamaskProvider>
    </ChakraProvider>
  );
};
