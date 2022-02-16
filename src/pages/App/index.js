import React, { useState } from "react";
import { ChakraProvider, Portal } from "@chakra-ui/react";

import theme from "../../theme/theme";
import MainPanel from "../../components/Layout/MainPanel";
import PanelContainer from "../../components/Layout/PanelContainer";
import PanelContent from "../../components/Layout/PanelContent";
import NavBar from "../../components/NavBar/NavBar";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "../../constants/routes";

import AppContext from "../../components/AppContext/AppContext";



export default function App(props) {

  // GLOBAL STATE

  const [blocksCountIsLoading, setBlocksCountisLoading] = useState(false);
  const toggleBlocksCountIsLoading = () => {
    setBlocksCountisLoading(!blocksCountIsLoading);
  };

  const [transactionCountIsLoading, setTransactionCountIsLoading] = useState(false);
  const toggleTransactionCountIsLoading = () => {
    setTransactionCountIsLoading(!transactionCountIsLoading);
  };



  const globalState = {
    blocksCountIsLoading: blocksCountIsLoading,
    setBlocksCountisLoading, 
    toggleBlocksCountIsLoading,
    transactionCountIsLoading: transactionCountIsLoading,
    setTransactionCountIsLoading,
    toggleTransactionCountIsLoading
  }

  return (
    <AppContext.Provider value={globalState}>
      <ChakraProvider theme={theme} resetCss={false}>
        <BrowserRouter>
          <MainPanel
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
    </AppContext.Provider>
  );
}