import React from "react";
import { PlayedMatchModel } from "../../../models/serieModel";
import "../../../scss/_userQuickStats.scss";
import QuickStat from "./quickStat/quickStat";

interface IUserQuickStats{
  playerMatches: PlayedMatchModel[];
  userId: number;
}

export default function UserQuickStats(props: IUserQuickStats) {

  // Variable which decides how many matches should be displayed on the start page
  let lastGamesAmount = 3;
  let totalWinRatio: number = getTotalWinRatio();
  let winRatioBeforeLastGames: number = getWinRatioBeforeLastGames(lastGamesAmount);
  // let winChange = Number((totalWinRatio - winRatioBeforeLastGames).toFixed(2).slice(0, 5));
  let winChange = Number((totalWinRatio - winRatioBeforeLastGames).toFixed(2).slice(0, 5));

  // Calculate +/- statistics for all matches
  let gamePlusMinus: number = getGamePlusMinus();
  let gamePlusMinusBeforeLastGames: number = (gamePlusMinus - getGamePlusMinusBeforeLastGames(lastGamesAmount));

  // Calculate winratio of player
  function getTotalWinRatio(){
    let numberOfWins: number = 0;
    props.playerMatches.forEach(match => {
    match.winners.players.forEach(winner => {
      if (props.userId === winner.userId) {
        numberOfWins += 1;
      }
    })
    });

    let winRatioAsString = (numberOfWins / props.playerMatches.length);
    let winLossRatio = Number(winRatioAsString);
    return winLossRatio;
  };

  // Calculate winratio for all matches played before last ones (to be able to compare statistics)
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

    let winRatioAsString = winRatio.toFixed(4).slice(1, 10);
    let winLossRatio = Number(winRatioAsString);
    return winLossRatio;
  };

  // Calculate players +/- 
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

  // Calculate players +/- without last played matches (to be able to compare statistics)
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
        <h3>Min senaste statistik</h3>
        {/* <span>Se alla</span> */}
      </div>

      <div className="quick-stats">
        <QuickStat header="Matchsnitt" mainStat={totalWinRatio} change={winChange} game={false}/>
        <QuickStat header="Game +/-" mainStat={gamePlusMinus} change={gamePlusMinusBeforeLastGames} game={true}/>
      </div> 

    </div>
  );
}