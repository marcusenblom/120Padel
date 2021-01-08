import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { PlayersModel, SerieModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";
import AddMatch from "../series/serie/playedMatches/addMatch/addMatch";

import DATABASE_URL from "../../db";

export default function RegisterMatch() {

  const [user, setUser] = useState(new UserModel());
  const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);
  const [serieIdChosen, setSerieIdChosen] = useState(0);
  const [players, setPlayers] = useState([new PlayersModel()])
  const [matchRegistered, setMatchRegistered] = useState(false);
  const [creatingGame, setCreatingGame] = useState(false);

  useEffect(() => {
    axios
      .get(`${DATABASE_URL}/`)
      .then(axiosObject => {
        let userData = axiosObject.data;

        setUser(userData);
        
        fetchPlayerSeries(userData.userId);
    });
  }, []);

  function fetchPlayerSeries(userId: Number){

    axios
    .get(`${DATABASE_URL}/userSeries/${userId}`)
    .then(axiosObject => {
      let serieData = axiosObject.data;
      setPlayerSeries(serieData);
      setSerieIdChosen(serieData[0].serieId);
      setPlayers(serieData[0].players);
    });
  }

  function postMatchToSerie(matchData: {
    date: Date;
    serieId: Number;
    winners: Number[];
    losers: Number[];
    winnersGame: Number;
    losersGame: Number}
    ){

    setCreatingGame(true);
    axios.post(`${DATABASE_URL}/addMatch`, matchData).then(response => {
      console.log(response);
      setCreatingGame(false);
      setMatchRegistered(true);
      setMatchRegistered(false);
    }).catch(function(err) {
      console.log(err);
      setCreatingGame(false);
    });
  }

  function changeSerie(e: ChangeEvent<HTMLSelectElement>){
    let serieFromSelect = Number(e.currentTarget.value);
    setSerieIdChosen(serieFromSelect);

    let playersToFind = playerSeries.find(serie => serie.serieId === serieFromSelect)?.players;
    if (playersToFind) {
      setPlayers(playersToFind);
    }

  }

  let serieOptions = playerSeries.map(serie => {
    return <option key={serie.serieId} value={serie.serieId}>{serie.name}</option>
  });
  
  return (
    <div id="register-match-container">
      <div className="header-container">
          <h2>Registrera match</h2>
      </div>
      <div className="serie-select-container">
        <h3>Serie</h3>
          <div className="serie-select">
            <select name="serie" id="serie" className="serie-select" onChange={changeSerie}>
              {serieOptions}
            </select>
            <i className="fas fa-chevron-down"></i>
          </div>
      </div>

      <AddMatch serieId={serieIdChosen} players={players} updateParentWithPostData={postMatchToSerie} matchRegistered={matchRegistered} creatingGame={creatingGame}/>
    </div>
  );
}