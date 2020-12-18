import React, { useState } from "react";
import '../../../scss/_playedMatches.scss';
import { PlayedMatchModel } from "../../../models/serieModel";
import { PlayersModel } from "../../../models/serieModel";
import SinglePlayedMatch from "./singlePlayedMatch/singlePlayedMatch";
import AddMatch from "./addMatch/addMatch";

interface IPlayedMatchesProps{
  playedMatches: PlayedMatchModel[];
  players: PlayersModel[];
}

export default function PlayedMatches(props: IPlayedMatchesProps) {
  const [showAddMatch, setShowAddMatch] = useState(false);

  let listOfMatches = props.playedMatches.map(match => {
    return (
    <SinglePlayedMatch key={match.matchId} winners={match.winners.players} losers={match.losers.players} winnersSet={match.winners.setWon} losersSet={match.losers.setWon}/>
    );
  });

  function toggleAddMatch(){
    setShowAddMatch(!showAddMatch);
  }

  let showAddMatchComponent;
  if (showAddMatch){
    showAddMatchComponent = <AddMatch players={props.players}/>
  } else {
    showAddMatchComponent = "";
  }

  return (
    <>
    <div id="add-match-container">
      <div className="register-match">
        <h3>Registrera match</h3>
        <button type="button" onClick={toggleAddMatch}>+</button>
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