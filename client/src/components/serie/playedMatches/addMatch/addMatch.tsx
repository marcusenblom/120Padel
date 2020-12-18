import React, { useState } from "react";
import "../../../../scss/_addMatch.scss";
import { PlayersModel } from "../../../../models/serieModel";
// import axios from "axios";

interface IAddMatchProps{
  players: PlayersModel[];
}

export default function AddMatch(props: IAddMatchProps) {

  const [players, setPlayers] = useState(props.players);

  let listOfPlayers = props.players.map(player => {
    return <option key={player.user.userName} value={player.user.userName}>{player.user.userName}</option>
  });

  let listOfSetTeamOne = [];
  for (let i = 0; i < 7; i++) {
    let value = `teamOneSet${i+1}`;
    listOfSetTeamOne.push(<option key={i} value={value}>{i+1}</option>);
  }
  let listOfSetTeamTwo = [];
  for (let i = 0; i < 7; i++) {
    let value = `teamTwoSet${i+1}`;
    listOfSetTeamTwo.push(<option key={i} value={value}>{i+1}</option>);
  }

  return (
    <div id="add-match">

      <div className="add-team add-team-one">
        <div className="player-select-container">
          <select name="teamOnePlayerOne" id="teamOnePlayerOne" className="player-select">
            <option value="">Välj spelare</option>
            {listOfPlayers}
          </select>
          <select name="teamOnePlayerTwo" id="teamOnePlayerTwo" className="player-select">
            <option value="">Välj spelare</option>
            {listOfPlayers}
          </select>
        </div>
        <div className="set-select-container">
          <select name="teamOnePlayerOne" id="teamOnePlayerOne" className="player-select">
            <option value="">Set</option>
            {listOfSetTeamOne}
          </select>
        </div>
      </div>

      <div className="add-team add-team-two">
        <div className="set-select-container">
          <select name="teamOnePlayerOne" id="teamOnePlayerOne" className="player-select">
            <option value="">Set</option>
            {listOfSetTeamTwo}
          </select>
        </div>
        <div className="player-select-container">
          <select name="teamTwoPlayerOne" id="teamTwiPlayerOne" className="player-select">
            <option value="">Välj spelare</option>
            {listOfPlayers}
          </select>
          <select name="teamTwoPlayerTwo" id="teamOnePlayerTwo" className="player-select">
            <option value="">Välj spelare</option>
            {listOfPlayers}
          </select>
        </div>
      </div>

    </div>
  );
}