import React, { useState } from "react";

import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import PopOutMenu from "../../components/PopOutMenu/PopOutMenu";

import theme from "../../theme/theme";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import Dashboard from "../../components/Dashboard/Dashboard"

import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";

export default function App(props) {
  const { ...rest } = props;
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

        <PanelContent>
          <PanelContainer>
            <Dashboard></Dashboard>
          </PanelContainer>
        </PanelContent>

        <Portal>
          <FloatingButton
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>

        <PopOutMenu
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />

      </MainPanel>
    </ChakraProvider>
  );
}