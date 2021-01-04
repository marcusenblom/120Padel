
interface ISinglePlayerToAdd{
    userName: string;
    userId: number;
    sendPlayerToParent(data: any): void;
}

export default function SinglePlayerToAdd(props: ISinglePlayerToAdd){

    function addPlayer(){
        props.sendPlayerToParent(props.userId);
    };

    return (
        <div className="player">
            <span>{props.userName}</span> <button type="button" onClick={addPlayer}>Lägg till</button>
        </div>
    );
}