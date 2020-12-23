import React, { useEffect, useState } from "react";
import '../../scss/_home.scss';
import axios from "axios";
import UserModel from "../../models/userModel";
import { SerieModel } from "../../models/serieModel";
import LastMatchesPlayed from "./lastMatchesPlayed/lastMatchesPlayed";
import UserQuickStats from "./userQuickStats/userQuickStats";


export default function Home() {

  const [player, setPlayer] = useState(new UserModel());
  const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/`)
      .then(axiosObject => {
        let userData = axiosObject.data;

        setPlayer(userData);
        
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

  return (
    <div id="home">
      <LastMatchesPlayed player={player} playerSeries={playerSeries}/>
      <UserQuickStats />
    </div>
  );
}