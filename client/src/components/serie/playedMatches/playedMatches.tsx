import React from "react";
import '../../../scss/_playedMatches.scss';
import { PlayedMatchModel } from "../../../models/serieModel";
import SinglePlayedMatch from "./singlePlayedMatch/singlePlayedMatch";

interface IPlayedMatchesProps{
  playedMatches: PlayedMatchModel[];
}

export default function PlayedMatches(props: IPlayedMatchesProps) {

  let listOfMatches = props.playedMatches.map(match => {
    return (
    <SinglePlayedMatch winners={match.winners.players} losers={match.losers.players} winnersSet={match.winners.setWon} losersSet={match.losers.setWon}/>
    );
  });

  return (
    <div id="played-matches">
      {listOfMatches}
    </div>
  );
}