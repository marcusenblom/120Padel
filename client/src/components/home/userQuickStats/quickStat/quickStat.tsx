import React from "react";

interface IQuickStats{
    header: String;
    mainStat: Number;
    change: Number;
}

export default function QuickStat(props: IQuickStats) {

  return (
    <div id="quick-stat">
        <div className="stat">
            {props.header}
        </div>
        <div className="stat">
            {props.mainStat}
        </div>
        <div className="stat">
            {props.change}
        </div>
    </div>
  );
}