import ball from "../../../images/ball-green.svg";

interface IUserProfileStatProps{
    header: string;
    value: any;
    icon: string;
}

export default function UserProfileStat(props: IUserProfileStatProps){

    let icon;

    if (props.icon === "ball") {
        icon = <img src={ball} alt="ball"></img>;
    }
    if (props.icon === "trophy") {
        icon = <i className="fas fa-trophy"></i>
    }

    return(
        <div className="user-profile-stat">
            <span className="user-profile-stat-value">{props.value}{icon}</span>
            <span className="user-profile-stat-header">{props.header}</span>
        </div>
    );
}