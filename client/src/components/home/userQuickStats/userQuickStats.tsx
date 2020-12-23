import React from "react";
import { PlayedMatchModel } from "../../../models/serieModel";
import UserModel from "../../../models/userModel";
import "../../../scss/_userQuickStats.scss";
import QuickStat from "./quickStat/quickStat";

interface IUserQuickStats{
  playerMatches: PlayedMatchModel[];
  userId: number;
}

export default function UserQuickStats(props: IUserQuickStats) {

  let totalWinRatio: number = getTotalWinRatio();
  let winRatioBeforeLastGames: number = getWinRatioBeforeLastGames(3);
  let change = (totalWinRatio + winRatioBeforeLastGames) / 2;

  console.log(change);
  

  function getTotalWinRatio(){
    let numberOfWins: number = 0;
    props.playerMatches.forEach(match => {
    match.winners.players.forEach(winner => {
      if (props.userId === winner.userId) {
        numberOfWins += 1;
      }
    })
    });

    let winRatioAsString = (numberOfWins / props.playerMatches.length).toFixed(2).slice(1, 4);
    let winLossRatio = Number(winRatioAsString) * 2
    return winLossRatio;
  }

  function getWinRatioBeforeLastGames(amountOfLastGames: number){
    let numberOfWins: number = 0;
    let matchesArray = props.playerMatches.slice(amountOfLastGames);
    matchesArray.forEach(match => {
      match.winners.players.forEach(winner => {
        if (props.userId === winner.userId) {
          numberOfWins += 1;
        }
      })
      });

    let winRatioAsString = (numberOfWins / props.playerMatches.length).toFixed(2).slice(1, 4);
    let winLossRatio = Number(winRatioAsString) * 2
    return winLossRatio;
  }

  return (
    <div id="quick-stats-container">

      <div className="quick-stats-header">
        <h2>Min statistik</h2>
        <span>Se alla</span>
      </div>

      <div className="quick-stats">
        <QuickStat header="Vinst-/förlustratio" mainStat={totalWinRatio} change={change}/>
        <QuickStat header="Placering" mainStat={7} change={-1}/>
      </div> 

    </div>
  );
}