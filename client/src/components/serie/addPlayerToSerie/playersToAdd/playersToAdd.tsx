import UserModel from "../../../../models/userModel";


interface IPlayersToAdd{
    players: UserModel[];
}

export default function PlayersToAdd(props: IPlayersToAdd){

    
    let listOfPlayersDiv = props.players.map(player => {
        
        if (player.userName.length > 0) {
            return ( 
                <div key={player.userId}>
                    <span>{player.userName}</span> <button type="button">Lägg till</button>
                </div> 
            )
        }
    });

    return (
        <div className="players-to-add">
            {listOfPlayersDiv}
        </div>
    );
}