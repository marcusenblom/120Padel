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
        <td className="standing"><span>{props.standing}</span></td>
        <td className="profile-image"><span><img src={dude} alt=""/></span></td>
        <td className="player"><span>{props.userName}</span></td>
        <td className="games-played"><span>{props.matchesPlayed}</span></td>
        <td className="games-won"><span>{props.matchesWon}</span></td>
        <td className="game"><span>{props.gameWon}</span></td>
        <td className="game"><span>{props.gameLost}</span></td>
        <td className="points"><span>{winsPerMatch}</span></td>
      </tr>
    </>
  );
}