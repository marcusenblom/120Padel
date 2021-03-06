import React from 'react';
import './scss/main.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Series from "./components/series/series";
import Home from './components/home/home';
import RegisterMatch from './components/registerMatch/registerMatch';
import Navbar from './components/navbar/navbar';
import UserProfile from './components/userProfile/userProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/serie">
            <Series/>
          </Route>
          <Route path="/registerMatch">
            <RegisterMatch/>
          </Route>
          <Route path="/profile">
            <UserProfile/>
          </Route>
        </Switch>
        <Navbar/>
      </Router>
    </div>
  );
}

export default App;
