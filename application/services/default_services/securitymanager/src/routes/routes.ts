import { Response } from "express";
import { Signincontroller } from '../controllers/Signincontrollers';
import { Consentcontroller } from '../controllers/Consentcontrollers';
const passport = require('passport');
//#@facebookimport@#
//#@githubimport@#

export class Routes {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public signincontroller: Signincontroller = new Signincontroller()
    // public realmsignincontroller: RealmSignincontroller = new RealmSignincontroller()
    public consentcontroller: Consentcontroller = new Consentcontroller()


    public routes(app): void {

        app.route('/signup').post(this.signincontroller.signup);
        app.route('/login').post(this.signincontroller.login);
        app.route('/consent').put(this.consentcontroller.consent);
        app.route('/logout').post(this.signincontroller.logout);
        app.route('/googlesignin').post(this.signincontroller.googlecontroller);
        app.route('/getallusers').get(this.signincontroller.getallusers);
        app.route('/getuser/:id').get(this.signincontroller.getuserbyid);
        app.route('/getallroles').get(this.signincontroller.getallroles);
        app.route('/saveroles').post(this.signincontroller.saveroles);
        app.route('/deleteroles/:id').delete(this.signincontroller.deleteroles);
        app.route('/updateuser').put(this.signincontroller.updateuser);
        app.route('/updateuserid').put(this.signincontroller.updateuserid);
        app.route('/updateuserimg').put(this.signincontroller.updateUser);
        app.route('/deleteUser/:id').delete(this.signincontroller.deleteuser);

        //#@facebookroute@# 

        //#@githubroute@#
    }
}