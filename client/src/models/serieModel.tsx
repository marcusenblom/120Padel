import UserModel from "./userModel";

export class PlayersModel{
    matchesPlayed: number;
    matchesWon: number;
    points: number;
    gameWon: number;
    gameLost: number;
    user: UserModel;
    standing: number;

    constructor(){
        this.matchesPlayed = 0;
        this.matchesWon = 0;
        this.points = 0;
        this.gameWon = 0;
        this.gameLost = 0;
        this.user = new UserModel();
        this.standing = 0;
    }
}

export class MatchPlayersModel{
    players: UserModel[];
    gameWon: number;

    constructor(){
        this.players = [new UserModel()];
        this.gameWon = 0;
    }
}

export class PlayedMatchModel{
    date: Date;
    winners: MatchPlayersModel;
    losers: MatchPlayersModel;
    serie: number;
    matchId: number;

    constructor(){
        this.date = new Date();
        this.winners = new MatchPlayersModel();
        this.losers = new MatchPlayersModel();
        this.serie = 0;
        this.matchId = 0;
    }
}

export class SerieModel{
    serieId: number;
    name: string;
    players: PlayersModel[];
    playedMatches: PlayedMatchModel[];

    constructor(){
        this.serieId = 0;
        this.name = "";
        this.players = [new PlayersModel()];
        this.playedMatches = [new PlayedMatchModel()];
    }
}