import React from "react";
import UserModel from "../../../models/userModel";
import "../../../scss/_userQuickStats.scss";
import QuickStat from "./quickStat/quickStat";

interface IUserQuickStats{

}

export default function UserQuickStats(props: IUserQuickStats) {

  return (
    <div id="quick-stats-container">

      <div className="quick-stats-header">
        <h2>Min statistik</h2>
        <span>Se alla</span>
      </div>

      <div className="quick-stats">
        <QuickStat header="Matchsnitt" mainStat={0.89} change={0.08}/>
        <QuickStat header="Placering" mainStat={7} change={-1}/>
      </div> 

    </div>
  );
}