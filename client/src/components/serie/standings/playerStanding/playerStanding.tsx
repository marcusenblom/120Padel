import React, { useEffect, useState } from "react";
import '../../../../scss/_playerStanding.scss';
import UserModel from "../../../../models/userModel";

interface ISingleStandingProps{
  userName: string;
  gamesPlayed: number;
  gamesWon: number;
  setWon: number;
  setLost: number;
  points: number;
}

export default function SingleStanding(props: ISingleStandingProps) {


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