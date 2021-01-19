import axios from "axios";
import React, { useEffect, useState } from "react";
import DATABASE_URL from "../../db";
import { PlayedMatchModel, SerieModel } from "../../models/serieModel";
import UserModel from "../../models/userModel";
import PageHeader from "../pageHeader/pageHeader";
import ProfileImage from "./profileImage/profileImage";
import ProfileStat from "./profileStat/profileStat";
import ProfileStatGame from "./profileStatGame/profileStatGame";
import ProfileStatWinRatio from "./profileStatWinRatio/profileStatWinRatio";



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

            userData.series.forEach((serie: any) => {
                fetchSerie(serie.serieId);
            });
        });

    }, []);

    function fetchSerie(serieId: number){
        axios
        .get(`${DATABASE_URL}/serie/${serieId}`)
        .then(axiosObject => {
            let serieData = axiosObject.data;
            
            setPlayerSeries(playerSeries => [...playerSeries, serieData]);
            
        });
    }
  
    let matches: PlayedMatchModel[] = [];
    let wins: number = 0;
    let gamePlayed: number = 0;
    let gameWon: number = 0;
    let gameLost: number = 0;
    playerSeries.forEach(serie => {
        if (serie.serieId !== 0) {
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
        }
    });
    // Sort all players played matches as date
    matches.sort((a, b) => (a.date < b.date) ? 1 : -1);

    let winRatio = (wins / matches.length).toFixed(4).slice(0, 4);    
    
  return(
    <div id="profile">
        <PageHeader header="Spelarprofil" settings={true}/>
        <div className="profile-stat">
            <ProfileImage name={user.userName}/>
            <ProfileStatWinRatio header="Matchsnitt" value={winRatio}/>
        </div>
        <div className="profile-stat-headers">
            <span className="profile-stat-header">
                {user.userName}
            </span>
            <span className="profile-stat-header">
                Matchsnitt
            </span>
        </div>
        
        <div id="user-profile-stats">
            <ProfileStat header="Spelade matcher" value={matches.length} icon="ball"/>
            <ProfileStat header="Vunna matcher" value={wins} icon="trophy"/>
            <ProfileStat header="Spelade game" value={gamePlayed} icon="hej"/>
            <ProfileStatGame header="Game" gameWon={gameWon} gameLost={gameLost}/>
        </div>
    </div>
  );
}