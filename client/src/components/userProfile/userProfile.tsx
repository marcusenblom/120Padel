import axios from "axios";
import React, { useEffect, useState } from "react";
import DATABASE_URL from "../../db";
import { PlayedMatchModel, SerieModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";
import ProfileStat from "./profileStat/profileStat";
import ProfileStatGame from "./profileStatGame/profileStatGame";



export default function UserProfile(){

    const [user, setUser] = useState(new UserModel());
    const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);
  

    useEffect(() => {
        axios
            .get(`${DATABASE_URL}/`)
            // Hardcoded userId in backend
            .then(axiosObject => {
            let userData = axiosObject.data;

            setUser(userData);
            fetchPlayerSeries(userData.userId);
        });

    }, [user]);

    function fetchPlayerSeries(userId: Number){
        axios
        .get(`${DATABASE_URL}/userSeries/${userId}`)
        .then(axiosObject => {
            let serieData = axiosObject.data;
            setPlayerSeries(serieData);
        });
    }
  
    let matches: PlayedMatchModel[] = [];
    let wins: number = 0;
    let gamePlayed: number = 0;
    let gameWon: number = 0;
    let gameLost: number = 0;
    playerSeries.forEach(serie => {
        serie.playedMatches.forEach(match => {
            if ( (match.winners.players.find(player => player.userId === user.userId)) || (match.losers.players.find(player => player.userId === user.userId)) ) {
                matches.push(match);
            }
        });

        let player = serie.players.find(player => player.user.userId === user.userId);
        if (player) {
            wins += player.matchesWon;
            gamePlayed += (player.gameWon + player.gameLost);
            gameWon += player.gameWon;
            gameLost += player.gameLost;
        }
    });
    // Sort all players played matches as date
    matches.sort((a, b) => (a.date < b.date) ? 1 : -1);

    let winRatio = (wins / matches.length).toFixed(4).slice(0, 4);

  return(
    <div>
        <ProfileStat header="Spelade matcher" value={matches.length}/>
        <ProfileStat header="Vunna matcher" value={wins}/>
        <ProfileStat header="Matchsnitt" value={winRatio}/>
        <ProfileStat header="Spelade game" value={gamePlayed}/>
        <ProfileStatGame header="Game" gameWon={gameWon} gameLost={gameLost}/>
    </div>
  );
}