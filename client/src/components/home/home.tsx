import React, { useEffect, useState } from "react";
import '../../scss/_home.scss';
import axios from "axios";
import UserModel from "../../models/userModel";
import { PlayedMatchModel, SerieModel } from "../../models/serieModel";
import LastMatchesPlayed from "./lastMatchesPlayed/lastMatchesPlayed";
import UserQuickStats from "./userQuickStats/userQuickStats";


export default function Home() {

  const [user, setUser] = useState(new UserModel());
  const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/`)
      .then(axiosObject => {
        let userData = axiosObject.data;

        setUser(userData);
        
        fetchPlayerSeries(userData.userId);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchPlayerSeries(userId: Number){

    axios
    .get(`http://localhost:5000/userSeries/${userId}`)
    .then(axiosObject => {
      let serieData = axiosObject.data;
      setPlayerSeries(serieData);
    });
  }

  let playersMatches: PlayedMatchModel[] = [];

  playerSeries.forEach(serie => {
    serie.playedMatches.forEach(match => {
      if ( (match.winners.players.find(player => player.userId === user.userId)) || (match.losers.players.find(player => player.userId === user.userId) )) {
        playersMatches.push(match);
      }
    });
  });

  console.log("home comp: " + JSON.stringify(user));
  

  return (
    <div id="home">
      <LastMatchesPlayed player={user} playerSeries={playerSeries} playerMatches={playersMatches}/>
      <UserQuickStats userId={user.userId} playerMatches={playersMatches}/>

      <div className="home-page-button-container">

      </div>
    </div>
  );
}