interface IQuickStats{
    header: String;
    mainStat: Number;
    change: Number;
    game: Boolean;
}

export default function QuickStat(props: IQuickStats) {

    let change = (props.change).toString().slice(0, 5);
    let main = props.mainStat.toString().slice(0, 4);
    if (props.game) {
        main = (props.mainStat > 0 ? "+":"") + main;
    }

    let icon: any;
    let arrowUp = (<i className="fas fa-arrow-up"></i>);
    let arrowDown = (<i className="fas fa-arrow-down"></i>);
    // let arrowRight = (<i className="fas fa-arrow-right"></i>);
    // let noChange = (<span><i className="fas fa-arrow-left"></i><i className="fas fa-arrow-right"></i></span>);
    
    if (props.change === 0) {
        icon = "+/- 0";
        change = "";
    } else {
        icon = (props.change < 0 ? arrowDown:arrowUp);
    }

    // If props.mainstat is NaN (player has 0 games played)
    if (!Number(props.mainStat)) {
        main = "0";
    }
    if (!Number(props.change)) {
        change = "0";
        if (props.game) {
            icon = "+/-"
        } else {
            icon = "";
        }
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