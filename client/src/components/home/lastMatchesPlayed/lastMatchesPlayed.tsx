import React from "react";
import { PlayedMatchModel, PlayersModel, SerieModel } from "../../../models/serieModel";
import UserModel from "../../../models/userModel";
import "../../../scss/_lastMatchesPlayed.scss";
import SinglePlayedMatch from "../../series/serie/playedMatches/singlePlayedMatch/singlePlayedMatch";

interface ILastMatchesPlayed{
  player: UserModel;
  playerSeries: SerieModel[];
  playerMatches: PlayedMatchModel[];
  matchesExist: boolean;
}

export default function LastMatchesPlayed(props: ILastMatchesPlayed) {

  let noGamesMessage = "laddar matcher..";

  let playersMatches = props.playerMatches;

  // Sort on date and only show last 3 matches played
  if (playersMatches.length > 0) {
    playersMatches.sort((a, b) => (a.date < b.date) ? 1 : -1);

    if (playersMatches.length > 3) {
      playersMatches = playersMatches.slice(0, 3);
    }
  }

  if (!props.matchesExist) {
    noGamesMessage = "Du har ännu inga registrerade matcher. Klicka på knappen \"Registrera match\" för att komma igång";
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
    return <div className="single-played-match" key={match.matchId}><SinglePlayedMatch match={match} showSerieName={true} serieName={serieName} players={players}/></div>

  });

  return (
    <div id="last-matches-container">
      <div className="last-matches-header">
        <h3>Senaste matcher</h3>
        {/* <span>Se alla</span> */}
      </div>

      {playersMatches.length > 0 ?
      <div className="last-matches">
        {singlePlayedMatches}
      </div>
      :
      <div className="no-games">
        <p>{noGamesMessage}</p>
      </div>
      }

    </div>
  );
}