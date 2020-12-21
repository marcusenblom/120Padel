import React, { useState } from "react";
import { PlayedMatchModel, SerieModel } from "../../../models/serieModel";
import UserModel from "../../../models/userModel";
import "../../../scss/_latestMatchesPlayed.scss";
import SinglePlayedMatch from "../../serie/playedMatches/singlePlayedMatch/singlePlayedMatch";

interface ILastMatchesPlayed{
  player: UserModel;
  playerSeries: SerieModel[];
}

export default function LastMatchesPlayed(props: ILastMatchesPlayed) {

  let playersMatches: PlayedMatchModel[] = [];

  props.playerSeries.forEach(serie => {
    serie.playedMatches.forEach(match => {
      if ( (match.winners.players.find(player => player.userId === props.player.userId)) || (match.losers.players.find(player => player.userId === props.player.userId) )) {
        playersMatches.push(match);
      }
    });
  });

  // Only show last 3 matches played
  if (playersMatches.length > 0) {
    playersMatches.sort((a, b) => (a.date < b.date) ? 1 : -1)

    if (playersMatches.length > 3) {
      playersMatches = playersMatches.slice(0, 3);
    }
  }

  console.log(playersMatches);
  

  let singlePlayedMatches = playersMatches.map(match => {
    return <SinglePlayedMatch key={match.matchId} match={match} showSerieName={true}/>
  });

  return (
    <div id="last-matches">
      <div className="last-matches-header">
        <h2>Senaste matcher</h2>
        <span>Se alla</span>
      </div>
      <div className="last-matches">
        {singlePlayedMatches}
      </div>

    </div>
  );
}