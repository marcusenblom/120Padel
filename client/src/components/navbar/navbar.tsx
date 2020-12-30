import '../../scss/_navbar.scss';
import homeIcon from "../../images/home.svg";
import profileIcon from "../../images/profile.svg";
import seriesIcon from "../../images/series.svg";

export default function Navbar() {

  
  return (
    <div className="navbar">
      <div className="icon-container">
          <a href="/serie"><img src={seriesIcon} alt=""/></a>
      </div>
      <div className="icon-container">
        <a href="/"><img src={homeIcon} alt=""/></a>
      </div>
      <div className="icon-container">
        <a href="/profile"><img src={profileIcon} alt=""/></a>
      </div>
    </div>
  );
}