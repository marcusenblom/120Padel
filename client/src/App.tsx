import React from 'react';
import './scss/main.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/header";
import Serie from "./components/serie/serie";
import Home from './components/home/home';
import RegisterMatch from './components/registerMatch/registerMatch';
import Navbar from './components/navbar/navbar';
import UserProfile from './components/userProfile/userProfile';

function App() {
  return (
    <div className="App">
      <Header/>
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
          <Route path="/profile">
            <UserProfile/>
          </Route>
        </Switch>
      </Router>
      <Navbar/>
    </div>
  );
}

export default App;
