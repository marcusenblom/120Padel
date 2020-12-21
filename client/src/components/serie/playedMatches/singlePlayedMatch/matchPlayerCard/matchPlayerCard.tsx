import React from "react";
import profileImg from "../../../../../images/ronaldo.svg";

interface IMatchPlayerCardProps{
    imageUrl: string;
    name: string;
    standing: any;
}

export default function MatchPlayerCard(props: IMatchPlayerCardProps) {


    return(
        <div className="player">
            <div className="player-image"><img src={profileImg} alt=""/></div>
            <div className="player-info">{props.name}</div>
            <div className="standing">{props.standing}</div>
        </div> 
    ); 


}