import "../../../scss/_profileImage.scss";
import ronaldo from "../../../images/ronaldo.svg";
import bale from "../../../images/bale.svg";
import buffon from "../../../images/buffon.svg";
import pepe from "../../../images/pepe.svg";
import marcelo from "../../../images/marcelo.svg";
import suarez from "../../../images/suarez.svg";

interface IProfileImageProps{
    name: string;
}

export default function ProfileImage(props: IProfileImageProps){


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
        <div className="user-profile-image">
            <img src={dude} alt="profile"/>
        </div>
    );
}