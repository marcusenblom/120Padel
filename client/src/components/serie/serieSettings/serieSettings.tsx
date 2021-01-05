import React from "react";
import { PlayersModel } from "../../../models/serieModel";
import AddPlayerToSerie from "./addPlayerToSerie/addPlayerToSerie";
import ChangeSerieName from "./changeSerieName/changeSerieName";

interface ISerieSettings{
    serieId: number;
    players: PlayersModel[];
    sendPlayerToParent(playerId: number): void;
    sendNewNameToParent(newName: string): void;
}

export default function SerieSettings(props: ISerieSettings){


    function addPlayer(playerId: number){
        props.sendPlayerToParent(playerId);
    };

    function changeName(newName: string){
        props.sendNewNameToParent(newName);
    };

    return(
        <div id="serieSettings">
            <ChangeSerieName sendNewNameToParent={changeName}/>
            <AddPlayerToSerie serieId={props.serieId} playersInThisSerie={props.players} sendPlayerToParent={addPlayer}/>

        </div>
    );
}