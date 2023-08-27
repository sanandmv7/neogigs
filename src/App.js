import React from "react";
import HomePage from "./Pages/HomePage";
import { Web3Provider } from "./Contexts/Web3Context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ClientPage from "./Pages/ClientPage";
import FreelancerPage from "./Pages/FreelancerPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

function App() {
  return (
    <>
        <Web3Provider>
          <Router>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/client">
              <ClientPage />
            </Route>
            <Route path="/freelancer">
              <FreelancerPage />
            </Route>
          </Router>
        </Web3Provider>
    </>
  );
}

export default App;
