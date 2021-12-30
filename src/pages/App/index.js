import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "../../components/Header";
import { routes } from "../../constants/routes";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {routes.map(route => <Route path={route.path} element={route.component} key={route.id} />)}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
