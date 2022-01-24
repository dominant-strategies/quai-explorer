import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "../../components/Header";
import { routes } from "../../constants/routes";
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            {routes.map(route => <Route path={route.path} element={route.component} key={route.id} />)}
          </Routes>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
