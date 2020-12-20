import React, { ChangeEvent, useState } from "react";
import "../../../../scss/_addMatch.scss";
import { PlayersModel } from "../../../../models/serieModel";
import axios from "axios";

interface IAddMatchProps{
  players: PlayersModel[];
  updateParentWithPostData(winners: any, losers: any, winnersSet: any, losersSet: any): void;
}

export class postDataModel{
  winners: Number[];
  losers: Number[];
  winnersSet: Number;
  losersSet: Number
  constructor(winners: Number[], losers: Number[], winnersSet: Number, losersSet: Number){
    this.winners = winners;
    this.losers = losers;
    this.winnersSet = winnersSet;
    this.losersSet = losersSet;
  }
}

export default function AddMatch(props: IAddMatchProps) {

  const [teamOnePlayerOne, setTeamOnePlayerOne] = useState(0);
  const [teamOnePlayerTwo, setTeamOnePlayerTwo] = useState(0);
  const [teamTwoPlayerOne, setTeamTwoPlayerOne] = useState(0);
  const [teamTwoPlayerTwo, setTeamTwoPlayerTwo] = useState(0);
  const [teamOneSets, setTeamOneSets] = useState(0);
  const [teamTwoSets, setTeamTwoSets] = useState(0);
  const [postData, setPostData] = useState(new postDataModel([0, 0], [0, 0], 0, 0));

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

  function changeTeamOneSet(e: ChangeEvent<HTMLSelectElement>){
    let setFromSelect = parseInt(e.currentTarget.value);
    setTeamOneSets(setFromSelect);
  }
  function changeTeamTwoSet(e: ChangeEvent<HTMLSelectElement>){
    let setFromSelect = parseInt(e.currentTarget.value);
    setTeamTwoSets(setFromSelect);
  }

  function updateStatesBeforePost(){
    if (teamOneSets > teamTwoSets) {
      let data = {
        winners: [teamOnePlayerOne, teamOnePlayerTwo],
        losers: [teamTwoPlayerOne, teamTwoPlayerTwo],
        winnersSet: teamOneSets,
        losersSet: teamTwoSets
      };
      console.log("data som ska in i postData: " + JSON.stringify(data));
      
      setPostData(data);
      console.log(JSON.stringify(postData));
      

    }
    if (teamOneSets < teamTwoSets) {
      let data = {
        winners: [teamTwoPlayerOne, teamTwoPlayerTwo],
        losers: [teamOnePlayerOne, teamOnePlayerTwo],
        winnersSet: teamTwoSets,
        losersSet: teamOneSets
      };
      setPostData(data);
    }
  }
  
  function registerMatch(e: any){
    e.preventDefault();
    updateStatesBeforePost();
    
    setTimeout(() => {
    if ((postData.winners[0] !== 0 && postData.winners[0] !== 0) && (postData.winnersSet !== 0 && postData.losersSet !== 0)) {
      console.log("axios.post: " + JSON.stringify(postData));
      
      axios.post('http://localhost:5000/addMatch', postData).then(response => {
        console.log(response);
      }).catch(function(err) {
        console.log(err);
      });
      
    } else {
      console.log("error, wrong state values");
    }
    }, 1000);
  }

  let listOfPlayers = props.players.map(player => {
    return <option key={player.user.userName} value={player.user.userName}>{player.user.userName}</option>
  });

  let listOfSetTeamOne = [];
  let listOfSetTeamTwo = [];

  for (let i = 0; i < 7; i++) {

    let valueOne = i+1;
    listOfSetTeamOne.push(<option key={i} value={valueOne}>{i+1}</option>);
    
    let valueTwo = i+1;
    listOfSetTeamTwo.push(<option key={i} value={valueTwo}>{i+1}</option>);
  }

  return (
      <form onSubmit={registerMatch} id="add-match">
      {/* <div id="add-match"> */}
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
          <div className="set-select-container">
            <select name="teamOneSet" id="teamOneSet" className="set-select" onChange={changeTeamOneSet}>
              <option value="">Set</option>
              {listOfSetTeamOne}
            </select>
          </div>
        </div>

        <div className="add-team add-team-two">
          <div className="set-select-container">
            <select name="teamOnePlayerOne" id="teamOneSet" className="set-select" onChange={changeTeamTwoSet}>
              <option value="">Set</option>
              {listOfSetTeamTwo}
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
          <button type="submit">Lägg till match</button>
        </div>
        
      </form>
  );
}