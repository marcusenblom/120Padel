import React, { useEffect, useState } from "react";
import '../../scss/_footer.scss';
import axios from "axios";

export default function Serie() {

  const [id, setId] = useState(1);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState("");
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
    <div >
      <p>Name: {JSON.stringify(name)}</p>
      <p>Players: {JSON.stringify(players)}</p>
      <p>Played Matches: {JSON.stringify(playedMatches)}</p>
    </div>
  );
}