import React from "react";

interface IRegisterMatch{

}

export default function RegisterMatch(props: IRegisterMatch) {


    
  return (
    <div id="register-match-container">
        <div className="header-container">
            <h2>Välj vilken serie du vill registrera en match i</h2>
        </div>
        <div className="serie-button-container">
            <button type="button"></button>
            <button type="button"></button>
            <button type="button"></button>
        </div>
    </div>
  );
}