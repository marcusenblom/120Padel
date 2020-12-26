import React from "react";
import { PlayedMatchModel, PlayersModel, SerieModel } from "../../../models/serieModel";
import UserModel from "../../../models/userModel";
import "../../../scss/_lastMatchesPlayed.scss";
import SinglePlayedMatch from "../../serie/playedMatches/singlePlayedMatch/singlePlayedMatch";

interface ILastMatchesPlayed{
  player: UserModel;
  playerSeries: SerieModel[];
  playerMatches: PlayedMatchModel[];
}

export default function LastMatchesPlayed(props: ILastMatchesPlayed) {

  let playersMatches = props.playerMatches;

  // Sort on date and only show last 3 matches played
  if (playersMatches.length > 0) {
    playersMatches.sort((a, b) => (a.date < b.date) ? 1 : -1);

    if (playersMatches.length > 3) {
      playersMatches = playersMatches.slice(0, 3);
    }
  }
  
  let singlePlayedMatches = playersMatches.map(match => {
    let serieName = "";
    let players: PlayersModel[] = [];

    props.playerSeries.forEach(serie => {
      if (serie.serieId === match.serie) {
        serieName = serie.name;

        players = serie.players;
      }
    });
    
    return <SinglePlayedMatch key={match.matchId} match={match} showSerieName={true} serieName={serieName} players={players}/>
  });

  return (
    <div id="last-matches-container">
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