import React from "react";

interface IQuickStats{
    header: String;
    mainStat: Number;
    change: Number;
}

export default function QuickStat(props: IQuickStats) {

    let change = props.change.toFixed(2).slice(0, 5);
    change = (props.change<=0?"":"+") + change;

    let icon: any;
    let arrowUp = (<i className="fas fa-arrow-up"></i>);
    let arrowDown = (<i className="fas fa-arrow-down"></i>)
    icon = (props.change<=0?arrowDown:arrowUp);
    
  return (
    <div id="quick-stat">
        <div className="stat">
            <span>{props.header}</span>
        </div>
        <div className="stat">
            <span>{props.mainStat}</span>
        </div>
        <div className="stat">
            <span>{icon}{change}</span>
        </div>
    </div>
  );
}