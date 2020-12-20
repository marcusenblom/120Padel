import React from "react";
import '../../../../scss/_playerStanding.scss';

interface IPlayerStandingProps{
  userName: string;
  gamesPlayed: number;
  gamesWon: number;
  setWon: number;
  setLost: number;
  points: number;
  hotStreak: boolean;
  standing: number;
}

export default function PlayerStanding(props: IPlayerStandingProps) {

  let fire;
  // Change the if statement to hotStreak === true
  if (props.userName === "Jensa" || props.userName === "Hasse" || props.userName === "Jerka") {
    fire = <i className="fab fa-hotjar"></i>;
  }

  let winsPerGame = (props.gamesWon / props.gamesPlayed).toFixed(2);
  winsPerGame = winsPerGame.slice(1, 4);

  return (
    <>
      <tr id="single-standing">
        <td className="standing">{props.standing}</td>
        <td className="hot-streak">{fire}</td>
        <td className="player">{props.userName}</td>
        <td className="games-played">{props.gamesPlayed}</td>
        <td className="games-won">{props.gamesWon}</td>
        <td className="set">{props.setWon}</td>
        <td className="set">{props.setLost}</td>
        <td className="points">{winsPerGame}</td>
      </tr>
    </>
  );
}