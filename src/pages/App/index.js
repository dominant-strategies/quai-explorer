import React from "react";
import { ChakraProvider, Portal } from "@chakra-ui/react";

import theme from "../../theme/theme";
import Dashboard from "../../components/Dashboard/Dashboard"

import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";

import NavBar from "../../components/NavBar/NavBar";

export default function App(props) {
  const mainPanel = React.createRef();

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 50px)",
        }}
      >
        <Portal>
          <NavBar></NavBar>
        </Portal>

        <PanelContent>
          <PanelContainer>
            <Dashboard></Dashboard>
          </PanelContainer>
        </PanelContent>

      </MainPanel>
    </ChakraProvider>
  );
}