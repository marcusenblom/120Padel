import '../../../../../scss/_playerStanding.scss';
import ronaldo from "../../../../../images/ronaldo.svg";
import bale from "../../../../../images/bale.svg"
import buffon from "../../../../../images/buffon.svg";
import pepe from "../../../../../images/pepe.svg";
import marcelo from "../../../../../images/marcelo.svg";
import suarez from "../../../../../images/suarez.svg";

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

  let dude = ronaldo;

  if (props.userName === "Hasse") {
      dude = buffon;
  }
  if (props.userName === "Jensa") {
      dude = pepe;
  }
  if (props.userName === "Generalen") {
      dude = suarez;
  }
  if (props.userName === "Burt") {
      dude = marcelo;
  }
  if (props.userName === "Jerka") {
      dude = bale;
  }
  if (props.userName === "Unde") {
      dude = ronaldo;
  }
  


  let winsPerMatch;
  if (!(props.matchesPlayed === props.matchesWon)) {
    winsPerMatch = (props.matchesWon / props.matchesPlayed).toFixed(2).slice(2, 4);
  } else {
    if (props.matchesPlayed === 0) {
      winsPerMatch = "0";
    } else {
      winsPerMatch = "100";
    }
  }
  

  return (
    <>
      <tr id="single-standing">
        <td className="standing">{props.standing}</td>
        <td className="profile-image"><img src={dude} alt=""/></td>
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