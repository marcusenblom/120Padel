import { ChangeEvent, useEffect, useState } from "react";
import "../../../../../scss/_addMatch.scss";
import { PlayersModel } from "../../../../../models/serieModel";
import moment from "moment";
import ball from "../../../../../images/ball.svg";

interface IAddMatchProps{
  serieId: Number;
  players: PlayersModel[] | undefined;
  updateParentWithPostData(data: any): void;
  matchRegistered: Boolean;
  creatingGame: Boolean;
}

export default function AddMatch(props: IAddMatchProps) {
  const [date, setDate] = useState(new Date());
  // const [teamOnePlayerOne, setTeamOnePlayerOne] = useState(0);
  // const [teamOnePlayerTwo, setTeamOnePlayerTwo] = useState(0);
  // const [teamTwoPlayerOne, setTeamTwoPlayerOne] = useState(0);
  // const [teamTwoPlayerTwo, setTeamTwoPlayerTwo] = useState(0);
  // const [teamOneGames, setTeamOneGames] = useState(99);
  // const [teamTwoGames, setTeamTwoGames] = useState(99);
  const [gameCreated, setGameCreated] = useState(false);
  const [gameRegistered, setGameRegistered] = useState(false);

  const [gameStats, setGameStats] = useState({
    teamOnePlayerOne: 0,
    teamOnePlayerTwo: 0,
    teamTwoPlayerOne: 0,
    teamTwoPlayerTwo: 0,
    teamOneGames: 99,
    teamTwoGames: 99
  });

  const [duplicatePlayerError, setDuplicatePlayerError] = useState(false);
  const [missingGameError, setMissingGameError] = useState(false);
  const [noWinnerError, setNoWinnerError] = useState(false);
  const [invalidGameError, setInvalidGameError] = useState(false);
  
  useEffect(() => {
    clearState();
  }, [gameCreated]);

  // useEffect(() => {
  //   if (props.matchRegistered) {
  //     setGameRegistered(true);
  //     setTimeout(() => {
  //       setGameRegistered(false);
  //     }, 5000);
  //   }
  // }, []);

  if (props.matchRegistered) {
    setGameRegistered(true);
    setTimeout(() => {
      setGameRegistered(false);
    }, 5000);
  }

  function clearState(){ 
    gameStats.teamOneGames = 99;
    gameStats.teamTwoGames = 99;

    setGameCreated(false);
  }
  
  function updateDate(e: ChangeEvent<HTMLInputElement>){
    let inputDate = e.currentTarget.value;
    setDate(new Date(inputDate));
  }
  let today = new Date().toISOString().split("T")[0];


  function handleChange(e: ChangeEvent<HTMLSelectElement>){
    setGameStats(gameStats => ({
      ...gameStats,
      [e.target.name]: e.target.value
    }));
  }

  console.log(gameStats);
  

  // function changeTeamOnePlayerOne(e: ChangeEvent<HTMLSelectElement>){
  //   setTeamOnePlayerOne(Number(e.currentTarget.value));
    
  // }

  // function changeTeamOnePlayerTwo(e: ChangeEvent<HTMLSelectElement>){
  //   setTeamOnePlayerTwo(Number(e.currentTarget.value));
  // }

  // function changeTeamTwoPlayerOne(e: ChangeEvent<HTMLSelectElement>){
  //   setTeamTwoPlayerOne(Number(e.currentTarget.value));
  // }

  // function changeTeamTwoPlayerTwo(e: ChangeEvent<HTMLSelectElement>){
  //   setTeamTwoPlayerTwo(Number(e.currentTarget.value));
  // }

  // function changeTeamOneGame(e: ChangeEvent<HTMLSelectElement>){
  //   let gameFromSelect = parseInt(e.currentTarget.value);
  //   setTeamOneGames(gameFromSelect);
  // }

  // function changeTeamTwoGame(e: ChangeEvent<HTMLSelectElement>){
  //   let gameFromSelect = parseInt(e.currentTarget.value);
  //   setTeamTwoGames(gameFromSelect);
  // }

  class DataToParentModel{
    date: Date;
    serieId: Number;
    winners: Number[];
    losers: Number[];
    winnersGame: Number;
    losersGame: Number;
    constructor(date: Date, serieId: Number, winners: Number[], losers: Number[], winnersGame: Number, losersGame: Number){
      this.date = date;
      this.serieId = serieId;
      this.winners = winners;
      this.losers = losers;
      this.winnersGame = winnersGame;
      this.losersGame = losersGame;
    }
  }

  function getDataToSend(){
    if (gameStats.teamOneGames > gameStats.teamTwoGames) {
      let data = new DataToParentModel(
        date, 
        props.serieId,
        [gameStats.teamOnePlayerOne, gameStats.teamOnePlayerTwo], 
        [gameStats.teamTwoPlayerOne, gameStats.teamTwoPlayerTwo], 
        gameStats.teamOneGames, 
        gameStats.teamTwoGames
      );
      return data;
    }
    if (gameStats.teamOneGames < gameStats.teamTwoGames) {
      let data = new DataToParentModel(
        date, 
        props.serieId, 
        [gameStats.teamTwoPlayerOne, gameStats.teamTwoPlayerTwo], 
        [gameStats.teamOnePlayerOne, gameStats.teamOnePlayerTwo], 
        gameStats.teamTwoGames, 
        gameStats.teamOneGames
      );
      return data;
    }
  }
  
  function sendNewMatchDataToParent(e: any){
    let data = getDataToSend();

    let winners = confirmIfWinnerExist(data);
    let defaultGames = confirmIfGameExists(data);
    let duplicatePlayers = confirmNoDuplicatePlayers(data);
    let validResult = confirmValidResult(data);

    if (winners && defaultGames && duplicatePlayers && validResult) {
      console.log("skapar match");
      props.updateParentWithPostData(data);
      setGameCreated(true);
    }
  };

  let listOfPlayers = props.players?.map(player => {
    return <option className="select-option" key={player.user.userName} value={player.user.userId}>{player.user.userName}</option>
  });

  let listOfGameTeamOne = [];
  let listOfGameTeamTwo = [];

  for (let i = 0; i < 8; i++) {
    let valueOne = i;
    listOfGameTeamOne.push(<option key={i} value={valueOne}>{i}</option>);
    
    let valueTwo = i;
    listOfGameTeamTwo.push(<option key={i} value={valueTwo}>{i}</option>);
  }

  // Error messages
  let noWinnerErrorMessage = "En match måste innehålla vinnare";
  let missingGameErrorMessage = "Du måste fylla i korrekt vunna game";
  let playerErrorMessage = "En spelare kan ej registrerars två gånger";
  let invalidGameErrorMEssage = "Ej tillåten vinstmarginal"

  function confirmNoDuplicatePlayers(data: DataToParentModel | undefined){
    let players = [gameStats.teamOnePlayerOne, gameStats.teamOnePlayerTwo, gameStats.teamTwoPlayerOne, gameStats.teamTwoPlayerTwo];
    let startLength = players.length;
    let newLength = new Set(players).size;
    if (startLength !== newLength) {
      setDuplicatePlayerError(true);
      return false;
    } else {
      setDuplicatePlayerError(false);
      return true;
    }
  };

  function confirmIfWinnerExist(data: DataToParentModel | undefined){
    if (data?.losersGame === data?.winnersGame) {
      setNoWinnerError(true);
      return false;
    } else {
      setNoWinnerError(false);
      return true;
    }
  };

  function confirmIfGameExists(data: DataToParentModel | undefined){
    if (data?.losersGame === 99 || data?.winnersGame === 99) {
      setMissingGameError(true);
      return false;
    } else {
      setMissingGameError(false);
      return true;
    }
  };

  function confirmValidResult(data: DataToParentModel | undefined){
    let twoGameDifferenceAtSevenGamesWon = ((data?.losersGame === 7 && data?.winnersGame >= 5) || (data?.winnersGame === 7 && data?.losersGame >= 5));
    console.log(twoGameDifferenceAtSevenGamesWon);
    
    
    let twoGameDifferenceAtSixGamesWon = ((data?.losersGame === 6 && data?.winnersGame < 5) || (data?.winnersGame === 6 &&  data?.losersGame < 5));
    console.log(twoGameDifferenceAtSixGamesWon);
    

    if (twoGameDifferenceAtSevenGamesWon || twoGameDifferenceAtSixGamesWon) {
      setInvalidGameError(false);
      return true;
    } else {
      setInvalidGameError(true);
      return false;
    }
  };

  let registeringGame = (
    <span className="registering">Registrerar match..</span>
  );
  let registeredGame = (
    <span className="registered">Match registrerad!</span>
  );


  return (
    <div id="add-match">
      <div className="add-date">
        <h3>Datum</h3>
        <div className="date-picker-container">
          <input className="date-picker" type="date" max={today} value={moment(date).format('YYYY-MM-DD')} onChange={updateDate}/>
          <i className="fas fa-chevron-down"></i>
          <i className="far fa-calendar"></i>
        </div>
      </div>
      <div className="add-teams">
        <div className="add-team">
          <h3>Lag 1</h3>
          <div className="player-select-container">
            <div className="select-wrapper">
              <select name="teamOnePlayerOne" id="teamOnePlayerOne" className="player-select" onChange={handleChange}>
                <option value="">Välj spelare</option>
                {listOfPlayers}
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div className="select-wrapper">
              <select name="teamOnePlayerTwo" id="teamOnePlayerTwo" className="player-select" onChange={handleChange}>
                <option value="">Välj spelare</option>
                {listOfPlayers}
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>

        <div className="add-team">
        <h3>Lag 2</h3>
          <div className="player-select-container">
            <div className="select-wrapper">
              <select name="teamTwoPlayerTwo" id="teamOnePlayerTwo" className="player-select" onChange={handleChange}>
                <option value="">Välj spelare</option>
                {listOfPlayers}
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
          <div className="player-select-container">
            <div className="select-wrapper">
              <select name="teamTwoPlayerOne" id="teamTwoPlayerOne" className="player-select" onChange={handleChange}>
                <option value="">Välj spelare</option>
                {listOfPlayers}
              </select>
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="player-error">
        <span>{duplicatePlayerError ? playerErrorMessage : ""}</span>
      </div>

      <div className="add-games">
        <div className="add-game">
          <h4>Vunna game</h4>
          <div className="game-select-container">
            <select name="teamOneGames" id="teamOneGame" className="game-select" onChange={handleChange} value={gameStats.teamOneGames.toString()}>
              <option value={99}>Game</option>
              {listOfGameTeamOne}
            </select>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>

        <div className="add-game">
          <h4>Vunna game</h4>
          <div className="game-select-container">
            <select name="teamTwoGames" id="teamTwoGame" className="game-select" onChange={handleChange} value={gameStats.teamTwoGames.toString()}>
              <option value={99}>Game</option>
              {listOfGameTeamTwo}
            </select>
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
      <div className="game-error">
        <span>{missingGameError ? missingGameErrorMessage : ""}</span>
        <span>{noWinnerError && !missingGameError? noWinnerErrorMessage : ""}</span>
        <span>{invalidGameError && !missingGameError && !noWinnerError ? invalidGameErrorMEssage : ""}</span>
      </div>

      <div className="submit-button-container">
        <button type="submit" onClick={sendNewMatchDataToParent}></button>
        <div className="content-container">
          <span>Registrera match</span>
          <img src={ball} alt="tennis-ball" className="ball"/>
        </div>
      </div>

      <div id="registering-game">
        {props.creatingGame && !props.matchRegistered? registeringGame : ""}
        {gameRegistered ? registeredGame : ""}
      </div>
    </div>
  );
}