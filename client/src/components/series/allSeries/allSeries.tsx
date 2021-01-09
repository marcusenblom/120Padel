import { SerieModel } from "../../../models/serieModel";


interface IAllSeries{
    playerSeries: SerieModel[];
}

export default function AllSeries(props: IAllSeries){

    let serieButtons = props.playerSeries.map(serie => {
        return (
        <div className="serie-button" key={serie.name}>
            <span>{serie.name}</span>
        </div>
        );
    });


    return (
        <div id="all-series">
            <div className="all-series-header">
                <h3>Dina övriga serier</h3>
            </div>
            {serieButtons}
        </div>
    );
}