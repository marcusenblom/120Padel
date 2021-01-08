
interface IPlayerSearchBar{
    placeholder: string;
    value: string;
    updateParentState(evalue: string): void;
}

export default function PlayerSearchBar(props: IPlayerSearchBar){

    return (
        <div className="player-search">
            <input key="random1" value={props.value} placeholder={props.placeholder} onChange={(e) => props.updateParentState(e.target.value)} />
        </div>
    );
}