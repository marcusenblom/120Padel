import React, { useEffect, useState } from "react";
import Serie from "./serie/serie";
import "../../scss/_series.scss";
import UserModel from "../../models/userModel";
import { SerieModel } from "../../models/serieModel";
import axios from "axios";
import DATABASE_URL from "../../db";
import NoSerie from "./noSerie/noSerie";
import AllSeries from "./allSeries/allSeries";
import CreateSerieButton from "./createSerieButton/createSerieButton";
import PageHeader from "../pageHeader/pageHeader";


export default function Series(){

    const [serieIdToShow, setSerieIdToShow] = useState(0);
    const [user, setUser] = useState(new UserModel());
    const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);
    const [noSerie, setNoSerie] = useState(false);
    const [displayOtherSeries, setDisplayOtherSeries] = useState(true);
    const [favorite, setFavorite] = useState(0);
  
    // Fetch user data
    useEffect(() => {
        axios
        .get(`${DATABASE_URL}/`)
        .then(axiosObject => {
            let userData = axiosObject.data;
            setUser(userData);

            if (userData.series.length > 0) {
                let favorite = 0;
                userData.series.forEach((serie: any) => {
                if (serie.favoriteSerie === true) {
                    favorite = serie.serieId;
                }
                });
                
                if (favorite !== 0) {
                    setSerieIdToShow(favorite);
                    setFavorite(favorite);
                } else {
                    setSerieIdToShow(userData.series[0].serieId);
                }
                fetchPlayerSeries(userData.userId);
            } else {
                setNoSerie(true);
            }
        });

    }, []);

    // Fetch user series data
    function fetchPlayerSeries(userId: Number){
        axios
        .get(`${DATABASE_URL}/userSeries/${userId}`)
        .then(axiosObject => {
            let serieData = axiosObject.data;
            setPlayerSeries(serieData);
        });
    }

    let restOfSeries = playerSeries.filter(serie => serie.serieId !== serieIdToShow);

    return (
        <section id="series">
            <PageHeader header="Mina serier" settings={false}/>

            {noSerie ? <NoSerie header="Du är ännu inte kopplad till någon serie. Kom igång genom att skapa en ny serie här nedan"/> : <Serie serieId={serieIdToShow} userId={user.userId} updateSerie={fetchPlayerSeries} displayOtherSeries={setDisplayOtherSeries} isFavorite={serieIdToShow === favorite && favorite !== 0} updateParentFavorite={setFavorite}/>}

            {playerSeries.length > 1 && displayOtherSeries ? <AllSeries playerSeries={restOfSeries} updateSerie={setSerieIdToShow}/> : ""}

            {displayOtherSeries ? <CreateSerieButton /> : ""}
            
        </section>
    );

}