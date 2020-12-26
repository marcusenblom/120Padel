import React from "react";
import { PlayedMatchModel } from "../../../models/serieModel";
import "../../../scss/_userQuickStats.scss";
import QuickStat from "./quickStat/quickStat";

interface IUserQuickStats{
  playerMatches: PlayedMatchModel[];
  userId: number;
}

export default function UserQuickStats(props: IUserQuickStats) {

  let lastGamesAmount = 3;
  let totalWinRatio: number = getTotalWinRatio();
  let winRatioBeforeLastGames: number = getWinRatioBeforeLastGames(lastGamesAmount);
  // let winChange = Number((totalWinRatio - winRatioBeforeLastGames).toFixed(2).slice(0, 5));
  let winChange = Number((totalWinRatio - winRatioBeforeLastGames).toFixed(2).slice(0, 5));
  console.log(totalWinRatio + " - " + winRatioBeforeLastGames);
  
  console.log("WinChange: " + winChange);
  

  let gamePlusMinus: number = getGamePlusMinus();
  let gamePlusMinusBeforeLastGames: number = (gamePlusMinus - getGamePlusMinusBeforeLastGames(lastGamesAmount));

  function getTotalWinRatio(){
    let numberOfWins: number = 0;
    props.playerMatches.forEach(match => {
    match.winners.players.forEach(winner => {
      if (props.userId === winner.userId) {
        numberOfWins += 1;
      }
    })
    });

    let winRatioAsString = (numberOfWins / props.playerMatches.length).toFixed(2).slice(0, 4);
    let winLossRatio = Number(winRatioAsString);
    return winLossRatio;
  };

  function getWinRatioBeforeLastGames(amountOfLastGames: number){
    let numberOfWins: number = 0;
    let numberOfGames: number = 0;
    let matchesArray = props.playerMatches.slice(amountOfLastGames);
    matchesArray.forEach(match => {
      numberOfGames += 1;
      match.winners.players.forEach(winner => {
        if (props.userId === winner.userId) {
          numberOfWins += 1;
        }
      })
    });
    
    let winRatio = numberOfWins / numberOfGames;

    let winRatioAsString = winRatio.toFixed(2).slice(1, 4);
    let winLossRatio = Number(winRatioAsString);
    return winLossRatio;
  };

  function getGamePlusMinus(){
    let totalGameWon: number = 0;
    let totalGameLost: number = 0;

    props.playerMatches.forEach(match => {
      match.winners.players.forEach(player => {
        if (player.userId === props.userId ) {
          totalGameWon += match.winners.gameWon;
          totalGameLost += match.losers.gameWon;
        }
      });
      match.losers.players.forEach(player => {
        if (player.userId === props.userId ) {
          totalGameWon += match.losers.gameWon;
          totalGameLost += match.winners.gameWon;
        }
      });
    })
    
    return totalGameWon - totalGameLost;
  };

  function getGamePlusMinusBeforeLastGames(amountOfLastGames: number){
    let totalGameWon: number = 0;
    let totalGameLost: number = 0;
    let matchesArray = props.playerMatches.slice(amountOfLastGames);

    matchesArray.forEach(match => {
      match.winners.players.forEach(player => {
        if (player.userId === props.userId ) {
          totalGameWon += match.winners.gameWon;
          totalGameLost += match.losers.gameWon;
        }
      });
      match.losers.players.forEach(player => {
        if (player.userId === props.userId ) {
          totalGameWon += match.losers.gameWon;
          totalGameLost += match.winners.gameWon;
        }
      });
    })
    
    return totalGameWon - totalGameLost;
  };



  return (
    <div id="quick-stats-container">

      <div className="quick-stats-header">
        <h2>Min statistik</h2>
        <span>Se alla</span>
      </div>

      <div className="quick-stats">
        <QuickStat header="Vinst/Match" mainStat={totalWinRatio} change={winChange}/>
        <QuickStat header="Game +/-" mainStat={gamePlusMinus} change={gamePlusMinusBeforeLastGames}/>
      </div> 

    </div>
  );
}