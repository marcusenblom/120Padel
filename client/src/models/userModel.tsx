
export class UserSeriesModel{
    serieId: number;
    favoriteSerie: Boolean;

    constructor(){
        this.serieId = 0;
        this.favoriteSerie = false;
    }
}

class UserModel{
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    profilePicture: string;
    password: string;
    series: UserSeriesModel[];

    constructor(){
        this.userId = 0;
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.profilePicture = "";
        this.password = "";
        this.series = [new UserSeriesModel()];
        // this.userId = userId;
        // this.firstName = firstName;
        // this.lastName = lastName;
        // this.userName = userName;
        // this.password = password;
        // this.series = series;
    }
}

export default UserModel;