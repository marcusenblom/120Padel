import '../../../../scss/_playerStanding.scss';

interface IPlayerStandingProps{
  userName: string;
  matchesPlayed: number;
  matchesWon: number;
  gameWon: number;
  gameLost: number;
  points: number;
  hotStreak: boolean;
  standing: number;
}

export default function PlayerStanding(props: IPlayerStandingProps) {

  let fire;
  // Change the if statement to hotStreak === true
  if (props.userName === "Jensa" || props.userName === "Hasse" || props.userName === "Jerka") {
    fire = <i className="fab fa-hotjar"></i>;
  }

  let winsPerMatch;
  if (!(props.matchesPlayed === props.matchesWon)) {
    winsPerMatch = (props.matchesWon / props.matchesPlayed).toFixed(2).slice(2, 4);
  } else {
    winsPerMatch = "100";
  }
  

  return (
    <>
      <tr id="single-standing">
        <td className="standing">{props.standing}</td>
        <td className="hot-streak">{fire}</td>
        <td className="player">{props.userName}</td>
        <td className="games-played">{props.matchesPlayed}</td>
        <td className="games-won">{props.matchesWon}</td>
        <td className="game">{props.gameWon}</td>
        <td className="game">{props.gameLost}</td>
        <td className="points">{winsPerMatch}</td>
      </tr>
    </>
  );
}