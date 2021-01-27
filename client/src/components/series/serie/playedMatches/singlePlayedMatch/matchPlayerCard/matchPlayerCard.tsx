import ronaldo from "../../../../../../images/ronaldo.svg";
import bale from "../../../../../../images/bale.svg";
import buffon from "../../../../../../images/buffon.svg";
import pepe from "../../../../../../images/pepe.svg";
import marcelo from "../../../../../../images/marcelo.svg";
import suarez from "../../../../../../images/suarez.svg";

interface IMatchPlayerCardProps{
    name: string;
    standing: any;
    profilePicture: string;
}

export default function MatchPlayerCard(props: IMatchPlayerCardProps) {

    // Hard coded profile pictures. This will be fixed once the user can log in and add a profile picture
    let dude = ronaldo;

    if (props.name === "Hasse") {
        dude = buffon;
    }
    if (props.name === "Jensa") {
        dude = pepe;
    }
    if (props.name === "Generalen") {
        dude = suarez;
    }
    if (props.name === "Burt") {
        dude = marcelo;
    }
    if (props.name === "Jerka") {
        dude = bale;
    }
    if (props.name === "Unde") {
        dude = ronaldo;
    }

    return(
        <div className="player">
            <div className="player-image"><img src={dude} alt=""/></div>
            <div className="player-info">{props.name}</div>
            <div className="standing">{props.standing}</div>
        </div> 
    ); 


}