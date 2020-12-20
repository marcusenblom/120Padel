import React, { ChangeEvent, useState } from "react";
import "../../../../scss/_addMatch.scss";
import { PlayersModel } from "../../../../models/serieModel";
import axios from "axios";

interface IAddMatchProps{
  serieId: Number;
  players: PlayersModel[];
  updateParentWithPostData(data: any): void;
}

export default function AddMatch(props: IAddMatchProps) {
  const [teamOnePlayerOne, setTeamOnePlayerOne] = useState(0);
  const [teamOnePlayerTwo, setTeamOnePlayerTwo] = useState(0);
  const [teamTwoPlayerOne, setTeamTwoPlayerOne] = useState(0);
  const [teamTwoPlayerTwo, setTeamTwoPlayerTwo] = useState(0);
  const [teamOneGames, setTeamOneGames] = useState(0);
  const [teamTwoGames, setTeamTwoGames] = useState(0);

  function changeTeamOnePlayerOne(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamOnePlayerOne(player.user.userId);
      }
    });
    console.log(teamOnePlayerOne);
    
  }
  function changeTeamOnePlayerTwo(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamOnePlayerTwo(player.user.userId);
      }
    });
    console.log(teamOnePlayerTwo);
  }
  function changeTeamTwoPlayerOne(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamTwoPlayerOne(player.user.userId);
      }
    });
    console.log(teamTwoPlayerOne);
  }
  function changeTeamTwoPlayerTwo(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamTwoPlayerTwo(player.user.userId);
      }
    });
    console.log(teamTwoPlayerTwo);
  }

  function changeTeamOneGame(e: ChangeEvent<HTMLSelectElement>){
    let gameFromSelect = parseInt(e.currentTarget.value);
    setTeamOneGames(gameFromSelect);
    console.log(teamOneGames);
  }
  function changeTeamTwoGame(e: ChangeEvent<HTMLSelectElement>){
    let gameFromSelect = parseInt(e.currentTarget.value);
    setTeamTwoGames(gameFromSelect);
    console.log(teamTwoGames);
  }

  function getDataToSend(){
    if (teamOneGames > teamTwoGames) {
      let data = {
        serieId: props.serieId,
        winners: [teamOnePlayerOne, teamOnePlayerTwo],
        losers: [teamTwoPlayerOne, teamTwoPlayerTwo],
        winnersGame: teamOneGames,
        losersGame: teamTwoGames
      };
      return data;
    }
    if (teamOneGames < teamTwoGames) {
      let data = {
        serieId: props.serieId,
        winners: [teamTwoPlayerOne, teamTwoPlayerTwo],
        losers: [teamOnePlayerOne, teamOnePlayerTwo],
        winnersGame: teamTwoGames,
        losersGame: teamOneGames
      };
      return data;
    }
  }
  
  function sendNewMatchDataToParent(e: any){
    let data = getDataToSend();
    console.log("Data i child: " + data);
    
    props.updateParentWithPostData(data);
    
  }

  let listOfPlayers = props.players.map(player => {
    return <option key={player.user.userName} value={player.user.userName}>{player.user.userName}</option>
  });

  let listOfGameTeamOne = [];
  let listOfGameTeamTwo = [];
  for (let i = 0; i < 7; i++) {

    let valueOne = i+1;
    listOfGameTeamOne.push(<option key={i} value={valueOne}>{i+1}</option>);
    
    let valueTwo = i+1;
    listOfGameTeamTwo.push(<option key={i} value={valueTwo}>{i+1}</option>);
  }

  return (
      // <form onSubmit={sendNewMatchDataToParent} id="add-match">
      <div id="add-match">
        <div className="add-team add-team-one">
          <div className="player-select-container">
            <select name="teamOnePlayerOne" id="teamOnePlayerOne" className="player-select" onChange={changeTeamOnePlayerOne}>
              <option value="">Välj spelare</option>
              {listOfPlayers}
            </select>
            <select name="teamOnePlayerTwo" id="teamOnePlayerTwo" className="player-select" onChange={changeTeamOnePlayerTwo}>
              <option value="">Välj spelare</option>
              {listOfPlayers}
            </select>
          </div>
          <div className="game-select-container">
            <select name="teamOneGame" id="teamOneGame" className="game-select" onChange={changeTeamOneGame}>
              <option value="">Game</option>
              {listOfGameTeamOne}
            </select>
          </div>
        </div>

        <div className="add-team add-team-two">
          <div className="game-select-container">
            <select name="teamOnePlayerOne" id="teamOneGame" className="game-select" onChange={changeTeamTwoGame}>
              <option value="">Game</option>
              {listOfGameTeamTwo}
            </select>
          </div>
          <div className="player-select-container">
            <select name="teamTwoPlayerOne" id="teamTwoPlayerOne" className="player-select" onChange={changeTeamTwoPlayerOne}>
              <option value="">Välj spelare</option>
              {listOfPlayers}
            </select>
            <select name="teamTwoPlayerTwo" id="teamOnePlayerTwo" className="player-select" onChange={changeTeamTwoPlayerTwo}>
              <option value="">Välj spelare</option>
              {listOfPlayers}
            </select>
          </div>
        </div>

        <div className="submit-button-container">
          <button type="button" onClick={sendNewMatchDataToParent}>Lägg till match</button>
        </div>
        
      </div>
  );
}