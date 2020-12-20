import React, { ChangeEvent, useState } from "react";
import "../../../../scss/_addMatch.scss";
import { PlayersModel } from "../../../../models/serieModel";

interface IAddMatchProps{
  serieId: Number;
  players: PlayersModel[];
  updateParentWithPostData(data: any): void;
}

export default function AddMatch(props: IAddMatchProps) {
  const [date, setDate] = useState(new Date());
  const [teamOnePlayerOne, setTeamOnePlayerOne] = useState(0);
  const [teamOnePlayerTwo, setTeamOnePlayerTwo] = useState(0);
  const [teamTwoPlayerOne, setTeamTwoPlayerOne] = useState(0);
  const [teamTwoPlayerTwo, setTeamTwoPlayerTwo] = useState(0);
  const [teamOneGames, setTeamOneGames] = useState(0);
  const [teamTwoGames, setTeamTwoGames] = useState(0);

  function updateDate(e: ChangeEvent<HTMLInputElement>){
    let edate = e.currentTarget.value;
    setDate(new Date(edate));
    console.log(date);
  }

  function changeTeamOnePlayerOne(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamOnePlayerOne(player.user.userId);
      }
    });
  }

  function changeTeamOnePlayerTwo(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamOnePlayerTwo(player.user.userId);
      }
    });
  }

  function changeTeamTwoPlayerOne(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamTwoPlayerOne(player.user.userId);
      }
    });
  }

  function changeTeamTwoPlayerTwo(e: ChangeEvent<HTMLSelectElement>){
    let nameFromSelect = e.currentTarget.value;
    props.players.forEach(player => {
      if (player.user.userName === nameFromSelect) {
        setTeamTwoPlayerTwo(player.user.userId);
      }
    });
  }

  function changeTeamOneGame(e: ChangeEvent<HTMLSelectElement>){
    let gameFromSelect = parseInt(e.currentTarget.value);
    setTeamOneGames(gameFromSelect);
  }

  function changeTeamTwoGame(e: ChangeEvent<HTMLSelectElement>){
    let gameFromSelect = parseInt(e.currentTarget.value);
    setTeamTwoGames(gameFromSelect);
  }

  class DataToParentModel{
    date: Date;
    serieId: Number;
    winners: Number[];
    losers: Number[];
    winnersGame: Number;
    losersGame: Number;
    constructor(date: Date, serieId: Number, winners: Number[], losers: Number[], winnersGame: Number, losersGame: Number){
      this.date = date;
      this.serieId = serieId;
      this.winners = winners;
      this.losers = losers;
      this.winnersGame = winnersGame;
      this.losersGame = losersGame;
    }
  }

  function getDataToSend(){
    if (teamOneGames > teamTwoGames) {
      let data = new DataToParentModel(
        date, 
        props.serieId, 
        [teamOnePlayerOne, teamOnePlayerTwo], 
        [teamTwoPlayerOne, teamTwoPlayerTwo], 
        teamOneGames, 
        teamTwoGames
      );
      return data;
    }
    if (teamOneGames < teamTwoGames) {
      let data = new DataToParentModel(
        date, 
        props.serieId, 
        [teamTwoPlayerOne, teamTwoPlayerTwo], 
        [teamOnePlayerOne, teamOnePlayerTwo], 
        teamTwoGames, 
        teamOneGames
      );
      return data;
    }
  }
  
  function sendNewMatchDataToParent(e: any){
    let data = getDataToSend();
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
        <div className="add-date">
          <input type="date" onChange={updateDate}/>
        </div>
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