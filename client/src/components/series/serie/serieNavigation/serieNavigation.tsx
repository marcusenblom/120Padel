

interface ISerieNavigation{
    displaySection: string;
    showSerie(): void;
    showMatchesPlayed(): void;
    showSettings(): void;
}

 export default function SerieNavigation(props: ISerieNavigation){


    let navToShow;

    // Change navigation depending on parent props
    let serieButtonContainer = (
        <div className="serie-button-container">
            <div className="serie-button-container-inner">
                <button type="button"  className={ props.displaySection === "serie" ? "serie-button active" : "serie-button" } onClick={props.showSerie}>Poängställning</button>
                <button type="button" className={ props.displaySection === "matchesPlayed" ? "serie-button active" : "serie-button" } onClick={props.showMatchesPlayed}>Spelade matcher</button>
            </div>
        </div>
    );

    let backToSerie = (
        <div className="back-to-serie">
            <i className="fas fa-arrow-left"></i><span onClick={props.showSerie}>Till serie</span>
        </div>
    );

    if (props.displaySection === "serie" || props.displaySection === "matchesPlayed") {
        navToShow = serieButtonContainer;
    } else {
        navToShow = backToSerie;
    }

    return(
        <>
        {navToShow}
        </>
    );

 }