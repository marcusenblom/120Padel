import axios from "axios";
import { useEffect, useState } from "react";
import DATABASE_URL from "../../db";
import { PlayedMatchModel, SerieModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";

export default function UserProfile(){

  const [user, setUser] = useState(new UserModel());
  const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);
  const [playerMatches, setPlayerMatches] = useState([new PlayedMatchModel()]);
  const [playerWins, setPlayerWins] = useState(0);
  const [playerWinRatio, setPlayerWinRatio] = useState(0);
  const [playerGamePlayed, setPlayerGamePlayed] = useState(0);
  const [playerGameWon, setPlayerGameWon] = useState(0);
  

  useEffect(() => {
    axios
      .get(`${DATABASE_URL}/`)
      // Hardcoded userId
      .then(axiosObject => {
        let userData = axiosObject.data;

        setUser(userData);
        fetchPlayerSeries(userData.userId);
    });
  }, []);

  function fetchPlayerSeries(userId: Number){
    axios
    .get(`${DATABASE_URL}/userSeries/${userId}`)
    .then(axiosObject => {
        let serieData = axiosObject.data;
        setPlayerSeries(serieData);
    });
  }

  useEffect(() => {
    let playerMatches: PlayedMatchModel[] = [];

    playerSeries.forEach(serie => {
        serie.playedMatches.forEach(match => {
        if ( (match.winners.players.find(player => player.userId === user.userId)) || (match.losers.players.find(player => player.userId === user.userId) )) {
            playerMatches.push(match);
        }
        });
    });
    
    // Sort all players played matches as date
    playerMatches.sort((a, b) => (a.date < b.date) ? 1 : -1);

    setPlayerMatches(playerMatches);
  }, [playerSeries]);

  useEffect(() => {
    calculateMatchStats();
  }, [playerSeries]);

  function calculateMatchStats(){
    let winRatio = 0;
    let wins = 0;
    let gamePlayed = 0;
    let gameWon = 0;

    playerSeries.forEach(serie => {
        let player = serie.players.find(player => player.user.userId === user.userId);
        if (player) {
            wins += player.matchesWon;
            gamePlayed += (player.gameWon + player.gameLost);
            gameWon += player.gameWon;
            winRatio += player.matchesWon / player.matchesPlayed;
        }
    });
    let winRatioAsString = winRatio.toFixed(2).slice(0, 4);
    
    setPlayerWinRatio(Number(winRatioAsString) / 2);
    setPlayerGamePlayed(gamePlayed);
    setPlayerGameWon(gameWon);
    setPlayerWins(wins);
  }
  

  return(
    <div>
        <p>Spelade matcher: {playerMatches.length}</p>
        <p>Vunna matcher: {playerWins}</p>
        <p>Matchsnitt: {playerWinRatio}</p>
        <p>Spelade Game: {playerGamePlayed}</p>
        <p>Game: {playerGameWon} - {playerGamePlayed - playerGameWon} ( + {playerGameWon - (playerGamePlayed - playerGameWon)} )</p>
    </div>
  );
}