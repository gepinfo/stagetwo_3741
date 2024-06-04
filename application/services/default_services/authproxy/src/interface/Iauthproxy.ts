export interface Iautproxy {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    role: string,
    expired: boolean,
    Idtoken: string,
    loggedinDate: Date,
    loggedoutDate: Date
}