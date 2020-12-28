import React from "react";
import '../../scss/_navbar.scss';
import homeIcon from "../../images/home.svg";
import profileIcon from "../../images/profile.svg";
import seriesIcon from "../../images/series.svg";

export default function Navbar() {

  
  return (
    <div className="navbar">
      <div className="icon-container">
        <img src={seriesIcon} alt=""/>
      </div>
      <div className="icon-container">
        <img src={homeIcon} alt=""/>
      </div>
      <div className="icon-container">
        <img src={profileIcon} alt=""/>
      </div>
    </div>
  );
}