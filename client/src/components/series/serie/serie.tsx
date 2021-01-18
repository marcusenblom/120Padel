import React, { useEffect, useState } from "react";
import '../../../scss/_serie.scss';
import axios from "axios";
import { PlayersModel, PlayedMatchModel } from "../../../models/serieModel";
import Standings from "./standings/standings";
import PlayedMatches from "./playedMatches/playedMatches";
import DATABASE_URL from "../../../db";
import SerieSettings from "./serieSettings/serieSettings";
import SerieNavigation from "./serieNavigation/serieNavigation";
import PopUp from "../../popup/popup";

interface ISerie{
  userId: number;
  serieId: number;
  isFavorite: boolean;
  updateSerie(userId: number): void;
  displayOtherSeries(bool: boolean): void;
  updateParentFavorite(serieId: number): void;
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
  const [favoritePopup, setFavoritePopup] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(props.isFavorite);

  // console.log(props.isFavorite);
  // console.log(isFavorite);
  

  useEffect(() => {
    setSerieNameChanged(false);
    fetchSerieData();
  }, [props.serieId, newPlayerAdded, matchRegistered, serieNameChanged]);  

  function fetchSerieData(){
    if (props.serieId !== 0) {
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
    props.displayOtherSeries(true);
  };
  function showMatchesPlayed(){
    setDisplaySection("matchesPlayed");
    props.displayOtherSeries(false);

  };
  function showSettings(){
    if (displaySection === "settings") {
      setDisplaySection("serie");
      props.displayOtherSeries(true);

    } else {
      setDisplaySection("settings");
      props.displayOtherSeries(false);

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

      props.updateSerie(props.userId);

      }).catch(function(err) {
      console.log(err);
    });
  };

  function toggleFavorite(){
    axios.post(`${DATABASE_URL}/favorite`, {
      serieId: props.serieId,
      userId: props.userId
    }).then(response => {
      console.log(response);

      if (props.isFavorite) {
        props.updateParentFavorite(0);
      } else {
        props.updateParentFavorite(props.serieId);
      }

    }).catch(function(err) {
      console.log(err);
    });

    setFavoritePopup(false);
  };

  function openFavoritePopup(){
    setFavoritePopup(true);
  }

  

  function favoriteStar(){
    let star = props.isFavorite ? (<div className="star" onClick={openFavoritePopup}><i className="fas fa-star filled-star"></i><i className="far fa-star empty-star"></i></div>) : (<div className="star" onClick={openFavoritePopup}><i className="far fa-star empty-star"></i></div>);

    return star;
  }

  let filledStarPopup = (<div className="popup-star"><i className="fas fa-star filled-star"></i><i className="far fa-star empty-star"></i></div>);
  
  let emptyStarPopup = (<div className="popup-star"><i className="far fa-star empty-star"></i></div>);



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
          {favoriteStar()}
          <span className="settings" onClick={showSettings}>
            {/* <img src={settingsLogo} alt="settings-logo"/> */}
            {/* <i className="fas fa-cogs"></i> */}
            <i className="fas fa-ellipsis-v"></i>
          </span>
        </div>
      </section>
      
      <section id="rendered-component">
        {renderComponent()}
      </section>

      {favoritePopup && props.isFavorite ? <PopUp icon={emptyStarPopup} header="Favoritserie" name={name} buttonOne="Ta bort" buttonTwo="Tillbaka" closeFunction={setFavoritePopup} function={toggleFavorite} isFavorite={props.isFavorite}/> : ""}
      {favoritePopup && !props.isFavorite ? <PopUp icon={filledStarPopup} header="Favoritserie" name={name} buttonOne="Fortsätt" buttonTwo="Avbryt" closeFunction={setFavoritePopup} function={toggleFavorite} isFavorite={props.isFavorite}/> : ""}
    </div>
  );
}