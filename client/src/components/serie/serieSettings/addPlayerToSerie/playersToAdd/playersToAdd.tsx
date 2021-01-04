import UserModel from "../../../../../models/userModel";
import SinglePlayerToAdd from "./singlePlayerToAdd/singlePlayerToAdd";
import "../../../../../scss/_playersToAdd.scss";


interface IPlayersToAdd{
    players: UserModel[];
    sendPlayerToParent(playerId: number): void;
}

export default function PlayersToAdd(props: IPlayersToAdd){

    function addPlayer(playerId: number){
        props.sendPlayerToParent(playerId);
    }

    
    let listOfPlayersDiv = props.players.map(player => {
        if (player.userName.length > 0) {
            return ( 
                <SinglePlayerToAdd key={player.userId} userId={player.userId} userName={player.userName} sendPlayerToParent={addPlayer}/>
            )
        }
    });

    if (listOfPlayersDiv.length > 0 && props.players[0].userName.length > 0) {
        return (
            <div className="players-to-add">{listOfPlayersDiv}</div>
        );
    } else {
        return (<></>);
    }
    
}