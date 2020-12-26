import React from "react";

interface IQuickStats{
    header: String;
    mainStat: Number;
    change: Number;
}

export default function QuickStat(props: IQuickStats) {

    let change = (props.change).toString().slice(1, 5);
    // change = (props.change<=0?"":"+") + change;

    let icon: any;
    let arrowUp = (<i className="fas fa-arrow-up"></i>);
    let arrowDown = (<i className="fas fa-arrow-down"></i>);
    let arrowRight = (<i className="fas fa-arrow-right"></i>);
    icon = (props.change <= 0 ? arrowDown:arrowUp);
    // Fixa denna så att right läggs till vid = 0
    
  return (
    <div id="quick-stat">
        <div className="stat">
            <span className="stat-greyed">{props.header}</span>
        </div>
        <div className="stat">
            <span className="stat-main">{props.mainStat}</span>
        </div>
        <div className="stat">
            <span className="stat-greyed stat-change">{icon}{change}</span>
        </div>
    </div>
  );
}