import React, { useEffect, useState } from "react";
import Serie from "./serie/serie";
import "../../scss/_series.scss";
import UserModel, { UserSeriesModel } from "../../models/userModel";
import { SerieModel } from "../../models/serieModel";
import axios from "axios";
import DATABASE_URL from "../../db";
import NoSerie from "./noSerie/noSerie";
import AllSeries from "./allSeries/allSeries";


export default function Series(){

    const [serieIdToShow, setSerieIdToShow] = useState(0);
    const [user, setUser] = useState(new UserModel());
    const [playerSeries, setPlayerSeries] = useState([new SerieModel()]);
    const [noSerie, setNoSerie] = useState(false);
  
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
                } else {
                    setSerieIdToShow(userData.series[0].serieId);
                }
                
                fetchPlayerSeries(userData.userId);
            } else {
                setNoSerie(true);
            }
        });

    }, []);

    console.log(user);
    console.log(playerSeries);

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
            <div className="serie-header">
                <h2>Mina serier</h2>
            </div>

            {noSerie ? <NoSerie header="Du är ännu inte kopplad till någon serie"/> : <Serie serieId={serieIdToShow}/>}

            {playerSeries.length > 1 ? <AllSeries playerSeries={restOfSeries}/> : ""}
            
        </section>
    );

}