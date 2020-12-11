import React from "react";

interface IMatchPlayerCardProps{
    imageUrl: string;
    name: string;
    reversed: boolean;
}

export default function MatchPlayerCard(props: IMatchPlayerCardProps) {

    if (!props.reversed) {
       return(
            <div className="player">
                <div className="player-image"><img src={props.imageUrl} alt=""/></div>
                <div className="player-info">{props.name}</div>
            </div> 
       ); 
    } else {
        return(
            <div className="player">
                <div className="player-info">{props.name}</div>
                <div className="player-image"><img src={props.imageUrl} alt=""/></div>
            </div> 
        );
    }

}