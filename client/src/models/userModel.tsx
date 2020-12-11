class UserModel{
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;

    constructor(userId: number, firstName: string, lastName: string, userName: string, password: string){
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
}

export default UserModel;