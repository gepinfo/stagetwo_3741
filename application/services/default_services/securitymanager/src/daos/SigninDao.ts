import mongoose = require('mongoose');
import { UserSchema } from '../models/User';
import { Roleschema } from '../models/Role';
import * as jwt from 'jsonwebtoken';
import * as asyncLoop from 'node-async-loop';
let jwtDecode = require('jwt-decode');
import { CustomLogger } from '../config/Logger';
const signinmodel = mongoose.model('User', UserSchema);
const rolemodel = mongoose.model('role', Roleschema);
export class SigninDao {

    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    private data:any
    private userrole: any;
    private rolevalue: any;
    private signuprole: any;
    private userDetails: any;
    private mailboolean: boolean;
    private Idtoken:any;
    
    public signindao(userData, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: signindao');
        rolemodel.find().then(async result => {
            asyncLoop(result, (roles, next) => {
                if (roles.role === 'User') {
                this.signuprole = roles._id;
                }
                next();
            }, (err) => {
                return err;
            })
            this.userDetails = {
                'firstname': userData.firstname,
                'lastname': userData.lastname,
                'password': userData.password,
                'email': userData.email,
                'username': userData.email,
                'role': this.signuprole,
                'Idtoken': '',
                'avatar':userData.avatar
                
            };
            signinmodel.find().then(data => {
                if (data.length !== 0) {
                    asyncLoop(data, (users, next) => {
                        if (users.email === this.userDetails.email) {
                            this.mailboolean = true;
                        } else {
                            this.mailboolean = false;
                        }
                        next();
                    }, (error) => {
                            return error;
                    });
                    if (this.mailboolean === true) {
                        let mailresponse = 'Email is already exists';
                        new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: signindao');
                        callback(mailresponse);
                    } else {
                        let logincreds = new signinmodel(this.userDetails);
                        logincreds.save().then((result) => {
                            new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: signindao');
                            callback(result);
                        }).catch((error) => {
                            callback(error);
                        })
                    }
                } else {
                    let logincreds = new signinmodel(this.userDetails);
                    logincreds.save().then((result) => {
                        new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: signindao');
                        callback(result);

                    }).catch((error) => {
                        callback(error);
                    })
                }
            });

        })

    }

    public logindao(logindetails, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: logindao');
        signinmodel.findOneAndUpdate({ email: logindetails.email, password: logindetails.password }, { $set: { loggedinDate: new Date(), current_ip_location: logindetails.current_ip_location } }).then((response:any) => {
            try {
                if (response === null) {
                    response = 'Incorrect Username or Password';
                    new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: logindao');
                    callback(response);
    
                } else {
                    new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: logindao');
                    callback(response);
    
                }
            } catch (error) {
                callback(error);
            }
        })
    }

    public logoutdao(userid, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: logoutdao');

        signinmodel.findByIdAndUpdate(userid, { $set: { loggedoutDate: new Date() } }).then((result) => {
            try {
                new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: logoutdao');
                callback(result);
            } catch (error) {
                callback(error)
            }

        })
    }

    public googledao(googledata, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: googledao');

        rolemodel.find().then((result) => {
            asyncLoop(result, (roles, next) => {
                if (roles.role === 'User') {
                    this.userrole = roles._id;
                    this.rolevalue = roles.role;
                }
                next();
            }, (err) => {
                if (err) {
                    return err;
                }
            })
            // @ts-ignore
            let token = jwtDecode(googledata.idtoken);
            const userobject = {
                'firstname': token.given_name,
                'lastname': token.family_name,
                'username': token.email,
                'email': token.email,
                'role': this.userrole,
                'signintype': 'google'
            };
            let googlelogin = new signinmodel(userobject);
            googlelogin.save().then((result) => {
                let payload = {
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    id: result._id,
                    role: this.rolevalue
                }
                let idtoken = jwt.sign(payload, 'geppettosecret', {
                    expiresIn: 86400
                });
                signinmodel.findByIdAndUpdate(result._id, { $set: { Idtoken: idtoken } }).then((response) => {
                    try {
                        response.Idtoken = idtoken;
                        new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: googledao');
                        callback(response);
                    } catch (error) {
                        callback(error)
                    }
                });
            });

        });

    }

    public getalluserdao(callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: getalluserdao');

        signinmodel.find().populate({
            path: 'role', model: rolemodel
        }).then(result => {
            new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: getalluserdao');
            callback(result);

        }).catch((error => {
            callback(error);
        }))
    }

    public getbyiduserdao(userId, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: getbyiduserdao');

        signinmodel.findById(userId).populate({
            path: 'role', model: rolemodel
        }).then(result => {
            new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: getbyiduserdao');
            callback(result);

        }).catch((error => {
            callback(error);
        }))
    }

    public getrolesdao(callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: getrolesdao');

        rolemodel.find().then(result => {
            new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: getrolesdao');
            callback(result);

        }).catch((error) => {
            callback(error);
        })
    }

    public saveroledao(roleData, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: saveroledao');

        let temp = new rolemodel(roleData);
        temp.save().then((result) => {
            new CustomLogger().showLogger('info', 'Exit from ticketDao.ts: saveroledao');
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }

    public deleteroledao(roleId, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: deleteroledao');

        rolemodel.findByIdAndRemove(roleId).then((result) => {
            new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: deleteroledao');
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }

    public async updateuserid(SigninData, callback){
    
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: updateuserid');
        
        signinmodel.findOneAndUpdate({ _id: SigninData._id }, SigninData, { new: true }).then((result)	=>	{
    
            new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: updateuserid');
    
            callback(result);
    }).catch((error)=>{
    callback(error);
    });}

    public async updateuserdao(updateuser, callback) {
        
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: updateuserdao');
        /**let payload = {
            username: updateuser.email,
            firstname: updateuser.firstname,
            lastname: updateuser.lastname,
            email: updateuser.email,
            role:updateuser.role,
            id: updateuser.id,
            image:updateuser.image,
          
             
        }*/
        await rolemodel.find().then(result => {
            asyncLoop(result, (roles, next) => {
               if (roles.role === updateuser.role) {
                   this.data = roles._id;
                }next();
            }, (err) => {
                if (err) {
                    return err;
                }
            })
       
        
        /**var idtoken = jwt.sign(payload, 'geppettosecret', {
            expiresIn: 86400
        });*/

        signinmodel.findByIdAndUpdate(updateuser.id, { $set: { username: updateuser.username, firstname: updateuser.firstname, lastname: updateuser.lastname, email: updateuser.email, role:this.data ,Idtoken:null} }).then((response) => {
            try {
                let updaterespone = {
                    username: updateuser.email,
                    firstname: updateuser.firstname,
                    lastname: updateuser.lastname,
                    email: updateuser.email,
                    id: updateuser.id,
                    role:this.data,
                    image:updateuser.image,
                    idtoken: this.Idtoken
                }
                new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: updateuserdao');
                callback(updaterespone);
            } catch (error) {
                callback(error);
            }
        });
        })
    }
    public deleteuserdao(userdetails, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: deleteuserdao');
        signinmodel.findByIdAndRemove(userdetails ).then(result => {
            new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: deleteuserdao');
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }
    public updateUserdao(updateuser, callback) {
        new CustomLogger().showLogger('info', 'Enter into SigninDao.ts: updateuserdao');
        signinmodel.findByIdAndUpdate(updateuser.id, { $set: { avatar: updateuser.avatar }},{multi:true}).then((response) => {
            try {
                new CustomLogger().showLogger('info', 'Exit from SigninDao.ts: updateuserdao');
                callback(response);
            } catch (error) {
                callback(error)
            }

        })
    }

    //#@facebookdao@#

    //#@githubdao@#

    
}