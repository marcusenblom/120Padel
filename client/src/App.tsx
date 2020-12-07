import React from 'react';
import './scss/main.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/nav/nav";
import Footer from "./components/footer/footer";

function App() {
  return (
    <div className="App">
      <Nav />




      <Footer />
    </div>
  );
}

export default App;
