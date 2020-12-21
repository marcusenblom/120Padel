import UserModel from "./userModel";

export class PlayersModel{
    matchesPlayed: number;
    matchesWon: number;
    points: number;
    gameWon: number;
    gameLost: number;
    user: UserModel;

    constructor(){
        this.matchesPlayed = 0;
        this.matchesWon = 0;
        this.points = 0;
        this.gameWon = 0;
        this.gameLost = 0;
        this.user = new UserModel();
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
    winners: MatchPlayersModel;
    losers: MatchPlayersModel;
    serie: number;
    matchId: number;

    constructor(){
        this.winners = new MatchPlayersModel();
        this.losers = new MatchPlayersModel();
        this.serie = 0;
        this.matchId = 0;
    }
}

export class SerieModel{
    serieId: number;
    serieName: string;
    players: PlayersModel[];
    playedMatches: PlayedMatchModel[];

    constructor(){
        this.serieId = 0;
        this.serieName = "";
        this.players = [new PlayersModel()];
        this.playedMatches = [new PlayedMatchModel()];
    }
}