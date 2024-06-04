interface Irole {

    role: string,
    created_at: Date
}

export interface IUser {
    firstname: string,
    lastname: string,
    username: string,
    userid:string,
    email: string,
    password: string,
    phonenumber: string,
    avatar: string,
    Idtoken: string,
    signintype: string,
    loggedinDate: Date,
    loggedoutDate: Date,
    role: Irole,
    org: string,
    org_country: string,
    org_sub1: string,
    org_sub2: string,
    org_sub3: string
 }