import React, { useState } from "react";
import { ChakraProvider, Portal } from "@chakra-ui/react";

import theme from "../../theme/theme";
import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";
import NavBar from "../../components/NavBar/NavBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";



export default function App(props) {
  const mainPanelRef = React.createRef();
  return (

    <ChakraProvider theme={theme} resetCss={false}>
      <BrowserRouter>
        <MainPanel
          ref={mainPanelRef}
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
              <Routes>
                {routes.map(route => <Route path={route.path} element={route.component} key={route.id} />)}
              </Routes>
            </PanelContainer>
          </PanelContent>


        </MainPanel>
      </BrowserRouter>
    </ChakraProvider>

  );
}