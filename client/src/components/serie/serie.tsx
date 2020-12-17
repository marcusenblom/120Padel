import React, { useEffect, useState } from "react";
import '../../scss/_serie.scss';
import axios from "axios";
import { PlayersModel, MatchPlayersModel, PlayedMatchModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";
import Standings from "./standings/standings";
import PlayedMatches from "./playedMatches/playedMatches";


export default function Serie() {

  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([new PlayersModel(0,0,0,0,0,new UserModel(0, "", "", "",""))]);
  const [playedMatches, setPlayedMatches] = useState([new PlayedMatchModel(new MatchPlayersModel([new UserModel(0,"","","","")],0),new MatchPlayersModel([new UserModel(0,"","","","")],0),0,0)]);
  const [displaySection, setDisplaySection] = useState("serie");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/serie/${id}`)
      .then(axiosObject => {

        let serieData = axiosObject.data;

        setId(serieData.serieId);
        setName(serieData.name);
        setPlayers(serieData.players);
        setPlayedMatches(serieData.playedMatches);
    }); 
  }, [id]);

  function showSerie(){
    setDisplaySection("serie");
  };
  function showMatchesPlayed(){
    setDisplaySection("matchesPlayed");
  };

  function renderComponent(){
    if (displaySection === "serie") {
      return(
        <Standings players={players}/>
      );
    }
    if (displaySection === "matchesPlayed") {
      return(
        <PlayedMatches playedMatches={playedMatches}/>
      );
    }
  };

  return (
    <div id="serie">
      <section className="serie-header-section">
        <div className="serie-header-container">
          <h1 className="serie-header">{name}</h1>
        </div>
        <div className="serie-button-container">
          <button type="button" className="serie-button" onClick={showSerie}>Poängställning</button>
          <button type="button" className="serie-button" onClick={showMatchesPlayed}>Spelade matcher</button>
        </div>
      </section>
      
      <section id="rendered-component">
        {renderComponent()}
      </section>

    </div>
  );
}