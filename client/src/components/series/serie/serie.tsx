import React, { useEffect, useState } from "react";
import settingsLogo from "../../../images/settings.svg";
import '../../../scss/_serie.scss';
import axios from "axios";
import { PlayersModel, PlayedMatchModel } from "../../../models/serieModel";
import Standings from "./standings/standings";
import PlayedMatches from "./playedMatches/playedMatches";
import DATABASE_URL from "../../../db";
import SerieSettings from "./serieSettings/serieSettings";
import SerieNavigation from "./serieNavigation/serieNavigation";

interface ISerie{
  serieId: number;
}

export default function Serie(props: ISerie) {

  // const [serieId, setId] = useState(props.serieId);
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([new PlayersModel()]);
  const [playedMatches, setPlayedMatches] = useState([new PlayedMatchModel()]);
  const [displaySection, setDisplaySection] = useState("serie");
  const [matchRegistered, setMatchRegistered] = useState(false);
  const [creatingGame, setCreatingGame] = useState(false);
  const [newPlayerAdded, setNewPlayerAdded] = useState(false);
  const [serieNameChanged, setSerieNameChanged] = useState(false);

  useEffect(() => {
    setSerieNameChanged(false);
    fetchSerieData()
  }, [props.serieId, newPlayerAdded, matchRegistered, serieNameChanged]);

  console.log("id från series: " + props.serieId);
  

  function fetchSerieData(){
    if (props.serieId > 0) {
      axios
      .get(`${DATABASE_URL}/serie/${props.serieId}`)
      .then(axiosObject => {
        let serieData = axiosObject.data;

        // setId(serieData.serieId);
        setName(serieData.name);
        setPlayers(serieData.players);
        setPlayedMatches(serieData.playedMatches); 
      }); 
    }
  }

  function showSerie(){
    setDisplaySection("serie");
  };
  function showMatchesPlayed(){
    setDisplaySection("matchesPlayed");
  };
  function showSettings(){
    if (displaySection === "settings") {
      setDisplaySection("serie");
    } else {
      setDisplaySection("settings");
    }
    
  };

  function postMatchToSerie(matchData: {
    date: Date;
    serieId: Number;
    winners: Number[];
    losers: Number[];
    winnersGame: Number;
    losersGame: Number
  }
    ){
    setCreatingGame(true);
    axios.post(`${DATABASE_URL}/addMatch`, matchData).then(response => {
      setCreatingGame(false); 
      console.log(response);
      setMatchRegistered(true);
    }).catch(function(err) {
      setCreatingGame(false);
      console.log(err);
    });
  }

  function addPlayerToSerie(userId: number){

    let data = {
      userId: userId,
      serieId: props.serieId
    }
    axios.post(`${DATABASE_URL}/addPlayer`, data).then(response => {
      console.log(response);
      // fetchPlayers();
      setNewPlayerAdded(true);
    }).catch(function(err) {
      console.log(err);
    });
  };

  function changeSerieName(newName: string){
    let data = {
      serieId: props.serieId,
      newName: newName
    }
    axios.post(`${DATABASE_URL}/serieName`, data).then(response => {
      console.log(response);
      setSerieNameChanged(true);
      
      }).catch(function(err) {
      console.log(err);
    });
  };

  function renderComponent(){
    if (displaySection === "serie") {
      return(
        <>
          <SerieNavigation showMatchesPlayed={showMatchesPlayed} showSerie={showSerie} showSettings={showSettings} displaySection={displaySection}/>
          <Standings players={players}/>
        </>        
      );
    }
    if (displaySection === "matchesPlayed") {
      return(
        <>
          <SerieNavigation showMatchesPlayed={showMatchesPlayed} showSerie={showSerie} showSettings={showSettings} displaySection={displaySection}/>
          <PlayedMatches playedMatches={playedMatches} players={players} serieId={props.serieId} updateParentWithPostData={postMatchToSerie} creatingGame={creatingGame} matchRegistered={matchRegistered}/>
        </>
      );
    }
    if (displaySection === "settings") {
      return(
        <>
          <SerieNavigation showMatchesPlayed={showMatchesPlayed} showSerie={showSerie} showSettings={showSettings} displaySection={displaySection}/>
          <SerieSettings serieId={props.serieId} players={players} sendNewNameToParent={changeSerieName} sendPlayerToParent={addPlayerToSerie}/>
        </>
      );
    }
  };

  return (
    <div id="serie">
      <section className="serie-name-section">
        <div className="serie-name-container">
          <h1 className="serie-name">{name}</h1>
          <span className="settings" onClick={showSettings}><img src={settingsLogo} alt="settings-logo"/></span>
        </div>
      </section>
      
      <section id="rendered-component">
        {renderComponent()}
      </section>

    </div>
  );
}