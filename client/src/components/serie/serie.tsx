import React, { useEffect, useState } from "react";
import settingsLogo from "../../images/settings.svg";
import '../../scss/_serie.scss';
import axios from "axios";
import { PlayersModel, PlayedMatchModel } from "../../models/serieModel";
import Standings from "./standings/standings";
import PlayedMatches from "./playedMatches/playedMatches";

import DATABASE_URL from "../../db";
import AddPlayerToSerie from "./addPlayerToSerie/addPlayerToSerie";

export default function Serie() {

  const [serieId, setId] = useState(1);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([new PlayersModel()]);
  const [playedMatches, setPlayedMatches] = useState([new PlayedMatchModel()]);
  const [displaySection, setDisplaySection] = useState("serie");
  const [newGameRegistered, setNewGameRegistered] = useState(false);
  const [newPlayerAdded, setNewPlayerAdded] = useState(false);

  useEffect(() => {
    fetchSerieData()
  }, [newPlayerAdded, newGameRegistered]);

  function fetchSerieData(){
    axios
    .get(`${DATABASE_URL}/serie/${serieId}`)
    .then(axiosObject => {
      let serieData = axiosObject.data;

      setId(serieData.serieId);
      setName(serieData.name);
      setPlayers(serieData.players);
      setPlayedMatches(serieData.playedMatches); 
    }); 
  }

  function showSerie(){
    setDisplaySection("serie");
  };
  function showMatchesPlayed(){
    setDisplaySection("matchesPlayed");
  };

  function postMatchToSerie(matchData: {
    date: Date;
    serieId: Number;
    winners: Number[];
    losers: Number[];
    winnersGame: Number;
    losersGame: Number
  }
    ){

    axios.post(`${DATABASE_URL}/addMatch`, matchData).then(response => {
      console.log(response);
      setNewGameRegistered(true);
    }).catch(function(err) {
      console.log(err);
    });
  }

  function addPlayerToSerie(userId: number){

    let data = {
      userId: userId,
      serieId: serieId
    }
    axios.post(`${DATABASE_URL}/addPlayer`, data).then(response => {
      console.log(response);
      // fetchPlayers();
      setNewPlayerAdded(true);
    }).catch(function(err) {
      console.log(err);
    });
  };

  function renderComponent(){
    if (displaySection === "serie") {
      return(
          <Standings players={players}/>
          // <AddPlayerToSerie serieId={serieId} playersInThisSerie={players} sendPlayerToParent={addPlayerToSerie}/>
      );
    }
    if (displaySection === "matchesPlayed") {
      return(
        <PlayedMatches playedMatches={playedMatches} players={players} serieId={serieId} updateParentWithPostData={postMatchToSerie}/>
      );
    }
    if (displaySection === "settings") {
      return(
        <div></div>
      );
    }
  };

  return (
    <div id="serie">
      <section className="serie-header-section">
        <div className="serie-header-container">
          <h1 className="serie-header">{name}</h1>
          <span className="settings"><img src={settingsLogo} alt="settings-logo"/></span>
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