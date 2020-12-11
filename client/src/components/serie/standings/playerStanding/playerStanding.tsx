import React from "react";
import '../../../../scss/_playerStanding.scss';

interface IPlayerStandingProps{
  userName: string;
  gamesPlayed: number;
  gamesWon: number;
  setWon: number;
  setLost: number;
  points: number;
}

export default function PlayerStanding(props: IPlayerStandingProps) {


  return (
    <>
      <tr id="single-standing">
        <td className="standing">1</td>
        <td className="hot-streak"></td>
        <td className="player">{props.userName}</td>
        <td className="games-played">{props.gamesPlayed}</td>
        <td className="games-won">{props.gamesWon}</td>
        <td className="set">{props.setWon}</td>
        <td className="set">{props.setLost}</td>
        <td className="points">{props.points}</td>
      </tr>
    </>
  );
}