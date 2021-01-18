import "../../scss/_popup.scss";

interface IPopUp{
    icon: any;
    header: string;
    text: string;
    buttonOne: string;
    buttonTwo: string;
    isFavorite: boolean;
    function(): void;
    closeFunction(bool: boolean): void;
}

export default function PopUp(props: IPopUp){

    function close(){
        props.closeFunction(false);
    }


    return (
        <div id="popup-mask">
            <div className="popup-container">
                <div className="icon-container">
                    {props.icon}
                </div>
                <div className="popup-header">
                    <h4>{props.header}</h4>
                </div>
                <div className="popup-text">
                    <span>{props.text}</span>
                </div>
                <div className="popup-buttons">
                    <button type="button" className={props.isFavorite ? "red-button ok-button" : "green-button ok-button"} onClick={props.function}>
                        {props.buttonOne}
                    </button>
                    <button type="button" className="back-button" onClick={close}>
                        {props.buttonTwo}
                    </button>
                </div>
            </div>
        </div>
    );
}