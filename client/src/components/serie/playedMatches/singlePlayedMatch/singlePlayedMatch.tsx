import React from "react";
import { PlayedMatchModel } from "../../../../models/serieModel";
import UserModel from "../../../../models/userModel";
import '../../../../scss/_singlePlayedMatch.scss';
import MatchPlayerCard from "./matchPlayerCard/matchPlayerCard";

interface ISinglePlayedMatchProps{
  match: PlayedMatchModel;
  showSerieName: Boolean;
}

export default function SinglePlayedMatch(props: ISinglePlayedMatchProps) {

  let teamOnePlayers = props.match.winners.players.map(player => {
    return (
    <MatchPlayerCard key={player.userName} imageUrl={"bild"} reversed={false} name={player.userName}/>
    );
  });
  let teamTwoPlayers = props.match.losers.players.map(player => {
    return (
    <MatchPlayerCard key={player.userName} imageUrl={"bild"} reversed={true} name={player.userName}/>
    );
  });

  let date = new Date(props.match.date);
  let serieName = "";
  
  return (
    <div id="singlePlayedMatch">
      <div className="serie-name">{serieName}</div>
      <div className="date">{date.toDateString()}</div>
      <div className="team-one team">
        <div className="team-one-players team-players">
          {teamOnePlayers}
        </div>
        <div className="team-one-score team-score">
          {props.match.winners.gameWon}
        </div>
      </div>
      <div className="team-separator">-</div>
      <div className="team-two team">
        <div className="team-two-score team-score">
          {props.match.losers.gameWon}
        </div>
        <div className="team-two-players team-players">
          {teamTwoPlayers}
        </div>
      </div>
    </div>
  );
}