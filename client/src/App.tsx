import React from 'react';
import './scss/main.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer";
import Serie from "./components/serie/serie";
import Home from './components/home/home';
import RegisterMatch from './components/registerMatch/registerMatch';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/serie">
            <Serie/>
          </Route>
          <Route path="/registerMatch">
            <RegisterMatch/>
          </Route>
        </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
