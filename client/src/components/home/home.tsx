import React, { useEffect, useState } from "react";
import '../../scss/_home.scss';
import axios from "axios";
import UserModel from "../../models/userModel";
import { SerieModel } from "../../models/serieModel";


export default function Home() {

  const [player, setPlayer] = useState(new UserModel());
  const [favoriteSerie, setFavoriteSerie] = useState(new SerieModel());

  useEffect(() => {
    axios
      .get(`http://localhost:5000/`)
      .then(axiosObject => {
        let userData = axiosObject.data;

        setPlayer(userData);
        console.log("UserData: " + userData.series[0].serieId);
      
        let favoriteSerieId: Number = userData.series[0].serieId;
        userData.series.forEach((serie: { serieId: Number; favoriteSerie: Boolean; }) => {
          if (serie.favoriteSerie) {
            favoriteSerieId = serie.serieId;
          }
        });
        

        console.log("favoriteSerieId: "+ favoriteSerieId);
        
        fetchFavoriteSerie(favoriteSerieId);
    });
  }, []);

  function fetchFavoriteSerie(serieId: Number){
    console.log("fetching serie: " + serieId);
    
    axios
    .get(`http://localhost:5000/serie/${serieId}`)
    .then(axiosObject => {
      let userData = axiosObject.data;
      setFavoriteSerie(userData);
      console.log(favoriteSerie);
    });
  }


  return (
    <div id="home">
      <span>{JSON.stringify(player)}</span>
      <p>{JSON.stringify(favoriteSerie)}</p>
    </div>
  );
}