import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { PlayersModel, SerieModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";
import AddMatch from "../serie/playedMatches/addMatch/addMatch";

import DATABASE_URL from "../../../db";

export default function RegisterMatch() {

  const [user, setUser] = useState(new UserModel());
  const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);
  const [serieIdChosen, setSerieIdChosen] = useState(0);
  const [players, setPlayers] = useState([new PlayersModel()])
  const [newGameRegistered, setNewGameRegistered] = useState(false);

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

    axios.post(`${DATABASE_URL}/addMatch`, matchData).then(response => {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    });

    setNewGameRegistered(true);
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


  // serieId: Number;
  // players: PlayersModel[];
  // updateParentWithPostData(data: any): void;

  console.log(serieIdChosen);
  
  return (
    <div id="register-match-container">
        <div className="header-container">
            <h2>Välj vilken serie du vill registrera en match i</h2>
        </div>
        <div className="serie-select-container">
            <select name="serie" id="serie" className="serie-select" onChange={changeSerie}>
              {serieOptions}
            </select>
        </div>

        <AddMatch serieId={serieIdChosen} players={players} updateParentWithPostData={postMatchToSerie}/>
    </div>
  );
}