import "../../../scss/_createSerieButton.scss";

interface ICreateSerieButton{

}

export default function CreateSerieButton(props: ICreateSerieButton){

    return(
        <div className="create-new-serie">
            <button type="button"></button>
            <div className="content-container">
                <span>Skapa ny serie</span>
                <i className="fas fa-bars"></i>
                {/* <i className="fas fa-stream"></i> */}
            </div>
        </div>
    );
}