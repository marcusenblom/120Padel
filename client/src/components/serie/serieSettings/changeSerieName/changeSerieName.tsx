import { ChangeEvent, useState } from "react";
import "../../../../scss/_changeSerieName.scss";

interface IChangeSerieName{
    sendNewNameToParent(newName: string): void;
}

export default function ChangeSerieName(props: IChangeSerieName){

    const [input, setInput] = useState("");


    function updateInput(e: ChangeEvent<HTMLInputElement>){
        let input: string = e.target.value;
        setInput(input);
    };

    function sendName(){
        props.sendNewNameToParent(input);
        setInput("");
    };
    
    return (
        <div id="change-name-container">
            <div className="change-name-header">
                <h3>Byt namn på serie</h3>
            </div>
            <div className="change-name-input-container">
                <input type="text" placeholder="Skriv in nytt namn" value={input} onChange={updateInput}/>
                <button type="button" onClick={sendName}>Ändra</button>
            </div>
            
        </div>
    );
}