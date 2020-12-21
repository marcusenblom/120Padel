import React, { useState } from "react";
import '../../../scss/_playedMatches.scss';
import { PlayedMatchModel } from "../../../models/serieModel";
import { PlayersModel } from "../../../models/serieModel";
import SinglePlayedMatch from "./singlePlayedMatch/singlePlayedMatch";
import AddMatch from "./addMatch/addMatch";

interface IPlayedMatchesProps{
  playedMatches: PlayedMatchModel[];
  players: PlayersModel[];
  serieId: Number;
  newGameRegistered: Boolean;
  updateParentWithPostData(data: any): void;
}

export default function PlayedMatches(props: IPlayedMatchesProps) {
  const [showAddMatch, setShowAddMatch] = useState(false);
  const [newGameRegistered, setNewGameRegistered] = useState(props.newGameRegistered);

  let listOfMatches = props.playedMatches.map(match => {
    return (
    <SinglePlayedMatch key={match.matchId} date={match.date} winners={match.winners.players} losers={match.losers.players} winnersGame={match.winners.gameWon} losersGame={match.losers.gameWon}/>
    );
  });

  let toggleButtonClass = "";
  if (showAddMatch) {
    toggleButtonClass = "fas fa-times-circle button-red";
  } else {
    toggleButtonClass = "fas fa-times-circle button-green";
  }

  function toggleAddMatch(){
    setShowAddMatch(!showAddMatch);
  }
  
  function registerMatch(postData: {
    serieId: Number;
    winners: Number[];
    losers: Number[];
    winnersGame: Number;
    losersGame: Number}){

    props.updateParentWithPostData(postData);
    setShowAddMatch(false);
  }

  let showAddMatchComponent;
  if (showAddMatch){
    showAddMatchComponent = <AddMatch serieId={props.serieId} updateParentWithPostData={registerMatch} players={props.players} newGameRegistered={props.newGameRegistered}/>
  } else {
    showAddMatchComponent = "";
  }

  return (
    <>
    <div id="add-match-container">
      <div className="register-match" onClick={toggleAddMatch}>
        <h3>Registrera match</h3>
        <i className={toggleButtonClass}></i>
      </div>
      {showAddMatchComponent}
    </div>
    <div id="played-matches">
      <h3>Spelade matcher</h3>
      {listOfMatches}
    </div>
    </>
  );
}