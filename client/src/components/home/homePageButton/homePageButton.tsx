import React from "react";
import { Link } from "react-router-dom";

interface IHomePageButton{
    content: string;
    link: string;
}

export default function HomePageButton(props: IHomePageButton) {

    
  return (
    <div id="home-button-container">
        <Link to={props.link}>
          <button type="button" className="home-button">{props.content}</button>
        </Link>
    </div>
  );
}