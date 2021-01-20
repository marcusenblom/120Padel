import React from "react";
import { Link } from "react-router-dom";
import ball from "../../../images/ball.svg";

interface IHomePageButton{
    content: string;
    link: string;
}

export default function HomePageButton(props: IHomePageButton) {

    
  return (
    <div id="home-button-container">
      <Link to={props.link}>
        <button type="button"></button>
      </Link>
      <div className="content-container">
        <span>Registrera match</span>
        <img src={ball} alt="tennis-ball" className="ball"/>
      </div>
    </div>
  );
}