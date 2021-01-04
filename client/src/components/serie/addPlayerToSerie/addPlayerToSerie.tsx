import react, { useEffect, useState } from "react";
import { PlayersModel } from "../../../models/serieModel";
import UserModel from "../../../models/userModel";
import PlayerSearchBar from "./playerSearchBar/playerSearchBar";

import DATABASE_URL from "../../../db";
import axios from "axios";
import PlayersToAdd from "./playersToAdd/playersToAdd";


interface IAddPlayerToSerie{
    serieId: number;
    playersInThisSerie: PlayersModel[];
}

export default function AddPlayerToSerie(props: IAddPlayerToSerie){

    const [input, setInput] = useState("");
    const [allUsers, setAllUsers] = useState([new UserModel()]);
    const [filteredUsers, setFilteredUsers] = useState([new UserModel()]);
    let playersInSerieIds = props.playersInThisSerie.map(player => {
        return player.user.userId;
    });

    useEffect(() => {
        axios
          .get(`${DATABASE_URL}/allUsers`)
          .then(axiosObject => {
            if (axiosObject.data) {
                setAllUsers(axiosObject.data);
            }
        });
      }, []);

    function updateInput(input: string){
        const filtered = allUsers.filter(user => {
         return user.userName.toLowerCase().includes(input.toLowerCase()) && !playersInSerieIds.includes(user.userId);
        })
        if (input.length > 0) {
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([new UserModel()]);
        }
        setInput(input);
    }
    
    return (
        <div id="add-player-to-serie">
            <PlayerSearchBar placeholder="Search player" value={input} updateParentState={updateInput} />
            <PlayersToAdd players={filteredUsers}/>
        </div>
    );
}