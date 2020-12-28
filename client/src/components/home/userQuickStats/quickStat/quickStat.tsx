import React from "react";

interface IQuickStats{
    header: String;
    mainStat: Number;
    change: Number;
    game: Boolean;
}

export default function QuickStat(props: IQuickStats) {

    let change = (props.change).toString().slice(0, 5);
    let main = props.mainStat.toString();
    main = (!props.game && props.mainStat > 0?"":"+") + main;

    let icon: any;
    let arrowUp = (<i className="fas fa-arrow-up"></i>);
    let arrowDown = (<i className="fas fa-arrow-down"></i>);
    let arrowRight = (<i className="fas fa-arrow-right"></i>);
    
    if (props.change === 0) {
        icon = arrowRight;
    } else {
        icon = (props.change < 0 ? arrowDown:arrowUp);
    }
    
  return (
    <div id="quick-stat">
        <div className="stat">
            <span className="stat-greyed">{props.header}</span>
        </div>
        <div className="stat">
            <span className="stat-main">{main}</span>
        </div>
        <div className="stat">
            <span className="stat-greyed stat-change">{icon}{change}</span>
        </div>
    </div>
  );
}