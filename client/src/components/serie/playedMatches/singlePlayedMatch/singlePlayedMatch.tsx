import React from "react";
import UserModel from "../../../../models/userModel";
import '../../../../scss/_singlePlayedMatch.scss';
import MatchPlayerCard from "./matchPlayerCard/matchPlayerCard";

interface ISinglePlayedMatchProps{
  winners: UserModel[];
  losers: UserModel[];
  winnersSet: number;
  losersSet: number;
}

export default function SinglePlayedMatch(props: ISinglePlayedMatchProps) {

  let teamOnePlayers = props.winners.map(player => {
    return (
    <MatchPlayerCard imageUrl={"bild"} reversed={false} name={player.userName}/>
    );
  });
  let teamTwoPlayers = props.losers.map(player => {
    return (
    <MatchPlayerCard imageUrl={"bild"} reversed={true} name={player.userName}/>
    );
  });

  return (
    <div id="singlePlayedMatch">
      <div className="team-one team">
        <div className="team-one-players team-players">
          {teamOnePlayers}
        </div>
        <div className="team-one-score team-score">
          {props.winnersSet}
        </div>
      </div>
      <div className="team-separator">-</div>
      <div className="team-two team">
        <div className="team-two-score team-score">
          {props.losersSet}
        </div>
        <div className="team-two-players team-players">
          {teamTwoPlayers}
        </div>
      </div>
    </div>
  );
}