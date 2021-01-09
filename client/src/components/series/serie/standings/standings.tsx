import React from "react";
import '../../../../scss/_standings.scss';
import { PlayersModel } from "../../../../models/serieModel";
import PlayerStanding from "./playerStanding/playerStanding";

interface IStandingProps{
  players: PlayersModel[];
}

export default function Standing(props: IStandingProps) {

  let listOfPlayers;
  let componentReady = false;

  if (props.players[0].user.userId !== 0) {
    componentReady = true;

    listOfPlayers = props.players?.map(function(player, i) {
      return (
        <PlayerStanding key={player.user.firstName} standing={i+1} userName={player.user.userName} matchesPlayed={player.matchesPlayed} matchesWon={player.matchesWon} gameWon={player.gameWon} gameLost={player.gameLost} points={player.points} hotStreak={true}/>
      );
    });
  }

  return (
    <div id="standings">{componentReady ?
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th></th>
          <th>Spelare</th>
          <th>SM</th>
          <th>VM</th>
          <th>VG</th>
          <th>FG</th>
          <th>V%</th>
        </tr>
      </thead>
      <tbody>
        {listOfPlayers}
      </tbody>
    </table> : ""}</div>
  );
}