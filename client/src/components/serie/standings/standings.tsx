import React from "react";
import '../../../scss/_standings.scss';
import { PlayersModel } from "../../../models/serieModel";
import PlayerStanding from "./playerStanding/playerStanding";

interface IStandingProps{
  players: PlayersModel[];
}

export default function Standing(props: IStandingProps) {

  let listOfPlayers = props.players.map(function(player, i) {
    return (
      <PlayerStanding key={player.user.firstName} standing={i+1} userName={player.user.userName} gamesPlayed={player.gamesPlayed} gamesWon={player.gamesWon} setWon={player.setWon} setLost={player.setLost} points={player.points} hotStreak={true}/>
    );
  });

  return (
    <div id="standings">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Spelare</th>
            <th>M</th>
            <th>V</th>
            <th>+</th>
            <th>-</th>
            <th>P</th>
          </tr>
        </thead>
        <tbody>
          {listOfPlayers}
        </tbody>
      </table>
    </div>
  );
}