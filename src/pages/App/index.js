import React, { useState } from "react";

import { ChakraProvider, Portal, useDisclosure, Box } from "@chakra-ui/react";
import PopOutMenu from "../../components/PopOutMenu/PopOutMenu";

import theme from "../../theme/theme";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import Dashboard from "../../components/Dashboard/Dashboard"

import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";

import NavBar from "../../components/NavBar/NavBar";

export default function App(props) {
  const { ...otherProps } = props;
  const mainPanel = React.createRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);

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