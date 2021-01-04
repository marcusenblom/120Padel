import React from "react";
import { PlayersModel } from "../../../models/serieModel";
import AddPlayerToSerie from "./addPlayerToSerie/addPlayerToSerie";

interface ISerieSettings{
    serieId: number;
    players: PlayersModel[];
    sendPlayerToParent(playerId: number): void;
}

export default function SerieSettings(props: ISerieSettings){





    function addPlayer(playerId: number){
        props.sendPlayerToParent(playerId);
    }

    return(
        <div id="serieSettings">
            <AddPlayerToSerie serieId={props.serieId} playersInThisSerie={props.players} sendPlayerToParent={addPlayer}/>
        </div>
    );
}