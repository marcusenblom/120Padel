
interface IProfileStatGameProps{
    header: string;
    gameWon: number;
    gameLost: number;
}

export default function ProfileStatGame(props: IProfileStatGameProps){

    let diff = (props.gameWon - props.gameLost).toString();
    diff = (props.gameWon < props.gameLost ? "" : "+") + diff;

    return(
        <div>
            <span>{props.header}</span>: <span>{props.gameWon} - {props.gameLost} ( {diff} )</span>
        </div>
    );
}