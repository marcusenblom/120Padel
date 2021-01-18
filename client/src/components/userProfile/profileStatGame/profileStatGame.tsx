
interface IProfileStatGameProps{
    header: string;
    gameWon: number;
    gameLost: number;
}

export default function ProfileStatGame(props: IProfileStatGameProps){

    // let diff = (props.gameWon - props.gameLost).toString();
    // diff = (props.gameWon < props.gameLost ? "" : "+") + diff;

    return(
        <div className="user-profile-stat">
            <span className="user-profile-stat-value">{props.gameWon} - {props.gameLost}</span>
            <span className="user-profile-stat-header">{props.header}</span>
        </div>
    );
}