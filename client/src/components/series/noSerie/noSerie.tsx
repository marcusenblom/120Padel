
interface INoSerie{
    header: string;
}

export default function NoSerie(props: INoSerie){


    return(
        <div id="no-serie">
            <h4>{props.header}</h4>
        </div>
    );
}