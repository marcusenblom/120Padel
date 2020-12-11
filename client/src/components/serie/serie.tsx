import React, { useEffect, useState } from "react";
import '../../scss/_serie.scss';
import axios from "axios";
import { PlayersModel, PlayedMatchesModel, SerieModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";
import Standings from "./standings/standings";
import MatchesPlayed from "./matchesPlayed/matchesPlayed";


export default function Serie() {

  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([new PlayersModel(0,0,0,0,0,new UserModel(0, "", "", "",""))]);
  const [playedMatches, setPlayedMatches] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/serie/${id}`)
      .then(axiosObject => {
        console.log(axiosObject.data);
        let serieData = axiosObject.data;

        setId(serieData.serieId);
        setName(serieData.name);
        setPlayers(serieData.players);
        setPlayedMatches(serieData.playedMatches);
    }); 
  }, [id]);

  return (
    <div id="serie">
      <section className="serie-header-section">
        <div className="serie-header-container">
          <h1 className="serie-header">{name}</h1>
        </div>
        <div className="serie-button-container">
          <button className="serie-button">Poängställning</button>
          <button className="serie-button">Spelade matcher</button>
        </div>
      </section>
      
      <section>
        <Standings players={players}/>

      </section>

    </div>
  );
}