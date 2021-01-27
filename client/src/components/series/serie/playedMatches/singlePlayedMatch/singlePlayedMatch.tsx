import React from "react";
import { PlayedMatchModel, PlayersModel } from "../../../../../models/serieModel";
import '../../../../../scss/_singlePlayedMatch.scss';
import MatchPlayerCard from "./matchPlayerCard/matchPlayerCard";

interface ISinglePlayedMatchProps{
  match: PlayedMatchModel;
  showSerieName: Boolean;
  serieName: String;
  players: PlayersModel[];
}

export default function SinglePlayedMatch(props: ISinglePlayedMatchProps) {
  
  // Find players standings and display as two teams
  let teamOnePlayers = props.match.winners.players.map(user => {

    let playerStanding = props.players.find(player => player.user.userId === user.userId)?.standing;

    return (
    <MatchPlayerCard key={user.userName} profilePicture={user.profilePicture} name={user.userName} standing={playerStanding}/>
    );
  });

  let teamTwoPlayers = props.match.losers.players.map(user => {

    let playerStanding = props.players.find(player => player.user.userId === user.userId)?.standing;

    return (
    <MatchPlayerCard key={user.userName} profilePicture={user.profilePicture} name={user.userName} standing={playerStanding}/>
    );
  });

  // Date when match was played
  let date = new Date(props.match.date);
  let serieName = props.serieName;
  
  return (
    <div id="singlePlayedMatch">
      <div className="serie-name">{serieName}</div>
      <div className="date">{date.toDateString()}</div>

      <div className="result">
        <div className="team-result">
          <span>{props.match.winners.gameWon}</span>
        </div>
        <div className="result-separator">
          <span>-</span>
        </div>
        <div className="team-result">
          <span>{props.match.losers.gameWon}</span>
        </div>
      </div>

      <div className="teams">
        <div className="team-one team">
          <div className="team-one-players team-players">
            {teamOnePlayers}
          </div>
        </div>
        <div className="team-two team">
          <div className="team-two-players team-players">
            {teamTwoPlayers}
          </div>
        </div>
      </div>
      
    </div>
  );
}