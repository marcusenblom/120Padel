import React from "react";

interface IProfileStatWinRatio{
    header: string;
    value: any;
}

export default function ProfileStatWinRatio(props: IProfileStatWinRatio){
    
    return(
        <div className="user-profile-stat-win-ratio-percentage">
            <div className={"c100 p" + props.value.match(/[^.]*$/g)[0] + " size main-color"}>
                <span>{props.value}</span>
                <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                </div>
            </div>
        </div>
    );
}