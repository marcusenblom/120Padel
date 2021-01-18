import '../../scss/_navbar.scss';
import homeIcon from "../../images/home.svg";
import profileIcon from "../../images/profile.svg";
import seriesIcon from "../../images/series.svg";

import { NavLink } from "react-router-dom"

export default function Navbar() {


  
  return (
    <div className="navbar">

      <NavLink exact activeClassName="active" to="/serie">
        <div className="icon-container">
          <img src={seriesIcon} alt=""/>
          <i className="fas fa-circle"></i>
        </div>
      </NavLink>
      
      <NavLink exact activeClassName="active" to="/">
        <div className="icon-container">
          <img src={homeIcon} alt=""/>
          <i className="fas fa-circle"></i>
        </div>
      </NavLink>

      <NavLink exact activeClassName="active" to="/profile">
        <div className="icon-container">
          <img src={profileIcon} alt=""/>
          <i className="fas fa-circle"></i>
        </div>
      </NavLink>
      
    </div>
  );
}