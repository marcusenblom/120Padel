import React, { useEffect, useState } from "react";
import '../../scss/_home.scss';
import axios from "axios";
import UserModel from "../../models/userModel";
import { PlayedMatchModel, SerieModel } from "../../models/serieModel";
import LastMatchesPlayed from "./lastMatchesPlayed/lastMatchesPlayed";
import UserQuickStats from "./userQuickStats/userQuickStats";
import HomePageButton from "./homePageButton/homePageButton";


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
  }, []);

  function fetchPlayerSeries(userId: Number){

    axios
    .get(`http://localhost:5000/userSeries/${userId}`)
    .then(axiosObject => {
      let serieData = axiosObject.data;
      setPlayerSeries(serieData);
    });
  }

  let playerMatches: PlayedMatchModel[] = [];

  if (playerSeries.length > 0) {
    playerSeries.forEach(serie => {
      serie.playedMatches.forEach(match => {
        if ( (match.winners.players.find(player => player.userId === user.userId)) || (match.losers.players.find(player => player.userId === user.userId) )) {
          playerMatches.push(match);
        }
      });
    });
    // Sort all players played matches as date
    playerMatches.sort((a, b) => (a.date < b.date) ? 1 : -1);
  }


  return (
    <div id="home">
      <LastMatchesPlayed player={user} playerSeries={playerSeries} playerMatches={playerMatches}/>
      <UserQuickStats userId={user.userId} playerMatches={playerMatches} />
      <HomePageButton content="Registrera match" link="/serie"/>
    </div>
  );
}