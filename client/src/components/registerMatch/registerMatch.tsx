import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { SerieModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";
import AddMatch from "../series/serie/playedMatches/addMatch/addMatch";

import DATABASE_URL from "../../db";
import PageHeader from "../pageHeader/pageHeader";

export default function RegisterMatch() {

  // const [user, setUser] = useState(new UserModel());
  const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);
  const [serieIdChosen, setSerieIdChosen] = useState(0);
  const [matchRegistered, setMatchRegistered] = useState(false);
  const [creatingGame, setCreatingGame] = useState(false);
  const [favoriteSerie, setFavoriteSerie] = useState(0);

  // Fetch logged in user data
  useEffect(() => {
    axios
      .get(`${DATABASE_URL}/`)
      .then(axiosObject => {
        let userData = axiosObject.data;
        // setUser(userData);
        let favoriteId = findFavoriteSerie(userData);
        setFavoriteSerie(favoriteId);
        setSerieIdChosen(favoriteId);
        fetchPlayerSeries(userData.userId);
      });
  }, []);

  // Find what serie is the favorite (must be done due to user and serie is different schemas in DB)
  function findFavoriteSerie(user: UserModel){
    let favorite = user.series.find((serie: any) => serie.favoriteSerie === true);
    if (favorite !== undefined) {
      return favorite.serieId;
    } 
    if (user.series.length > 0) {
      return user.series[0].serieId;
    }
    else {
      return 0;
    }
  }

  // Fetch users data
  function fetchPlayerSeries(userId: number){
    axios
    .get(`${DATABASE_URL}/userSeries/${userId}`)
    .then(axiosObject => {
      let serieData = axiosObject.data;
      setPlayerSeries(serieData);
    });
  }
  
  // Function which takes in data from child component and registers a match in the DB
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
    }).catch(function(err) {
      console.log(err);
      setCreatingGame(false);
    });
  }

  // Display different data when a new serie is selected by user
  function changeSerie(e: ChangeEvent<HTMLSelectElement>){
    let serieFromSelect = Number(e.currentTarget.value);
    setSerieIdChosen(serieFromSelect);
  }

  // Rearrange playerSeries so that favorite is first
  playerSeries.forEach(function(serie, i){
    if (serie.serieId === favoriteSerie) {
      playerSeries.splice(i, 1);
      playerSeries.unshift(serie);
    }
  });
  
  // Array containing series as select options
  let serieOptions = playerSeries.map(serie => {
    return <option key={serie.serieId} value={serie.serieId}>{serie.name}</option>
  });

  let players = playerSeries.find((serie: any) => serie.serieId === serieIdChosen)?.players;
  
  return (
    <div id="register-match-container">
      <PageHeader header="Registrera match" settings={false}/>
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