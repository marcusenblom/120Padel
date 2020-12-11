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
        <PlayedMatches playedMatches={playedMatches}/>

      </section>

    </div>
  );
}