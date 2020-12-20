import UserModel from "./userModel";

export class PlayersModel{
    matchesPlayed: number;
    matchesWon: number;
    points: number;
    gameWon: number;
    gameLost: number;
    user: UserModel;

    constructor(matchesPlayed: number, matchesWon: number, points: number, gameWon: number, gameLost: number, user: UserModel){
        this.matchesPlayed = matchesPlayed;
        this.matchesWon = matchesWon;
        this.points = points;
        this.gameWon = gameWon;
        this.gameLost = gameLost;
        this.user = user;
    }
}

export class MatchPlayersModel{
    players: UserModel[];
    gameWon: number;

    constructor(players: UserModel[], gameWon: number){
        this.players = players;
        this.gameWon = gameWon;
    }
}

export class PlayedMatchModel{
    winners: MatchPlayersModel;
    losers: MatchPlayersModel;
    serie: number;
    matchId: number;

    constructor(winners: MatchPlayersModel, losers: MatchPlayersModel, serie: number, matchId: number){
        this.winners = winners;
        this.losers = losers;
        this.serie = serie;
        this.matchId = matchId;
    }
}

export class SerieModel{
    serieId: number;
    serieName: string;
    players: PlayersModel[];
    playedMatches: PlayedMatchModel[];

    constructor(serieId: number, serieName: string, players: PlayersModel[], playedMatches: PlayedMatchModel[]){
        this.serieId = serieId;
        this.serieName = serieName;
        this.players = players;
        this.playedMatches = playedMatches;
    }
}