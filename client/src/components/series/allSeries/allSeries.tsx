import { SerieModel } from "../../../models/serieModel";


interface IAllSeries{
    playerSeries: SerieModel[];
    updateSerie(id: number): void;
}

export default function AllSeries(props: IAllSeries){

    function updateSerieId(id: number | undefined){
        if (id) {
            props.updateSerie(id);
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    let serieButtons = props.playerSeries.map(serie => {
        return (
        <div className="serie-button" key={serie.name} onClick={() => updateSerieId(serie.serieId)}>
            <span>{serie.name}</span>
            <i className="fas fa-chevron-right"></i>
        </div>
        );
    });


    return (
        <div id="all-series">
            <div className="all-series-header">
                <h3>Dina övriga serier</h3>
            </div>

            {serieButtons}

            <div className="create-new-serie">
                <button type="button"></button>
                <div className="content-container">
                    <span>Skapa ny serie</span>
                    <i className="fas fa-bars"></i>
                    {/* <i className="fas fa-stream"></i> */}
                </div>
            </div>
        </div>
    );
}