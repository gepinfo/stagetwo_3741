import mongoose = require('mongoose');
import { Roleschema } from './models/Role';
import { roletypes } from './assets/role';
import { UserSchema } from './models/User';
import { CustomLogger } from './config/Logger';

const roletypemodel = mongoose.model('Role', Roleschema);
const signinmodel = mongoose.model('User', UserSchema);


export class SeedService {

    constructor() { }

    public create(): void {
        roletypes.forEach(roles => {
            roletypemodel.findOneAndUpdate({ role: roles['role'] },
                roles, { new: true }).then((data) => {
                    if (data === null) {
                        let roletype = new roletypemodel(roles);
                        roletype.save();
                    }
                });
        });
        this.autoUsersAdd();
    }

    private async autoUsersAdd(){
        (await roletypemodel.find({
                $or: [
                    {
                        "role": {
                            "$in": ["Admin", "_id"]
                        }
                    },
                    {
                        "role": {
                            "$in": ["User", "_id"]
                        }
                    }
                ]
            })).forEach((i) => {
            let temp = {
                "firstname": "gep",
                "lastname": "user",
                "username": "gepUser",
                "password": "gepUser@123",
                "email": "gepUser@gmail.com",
                "role": i._id,
                "avatar" : null,
                "Idtoken": "",
                "org": '@ibm.com"',
                "org_country": 'US',
                "org_sub1": 'GTS',
                "org_sub2": 'AVP',
                "org_sub3": 'EMEA',
                "loggedinDate": Date.now(),
                "loggedoutDate": Date.now()
            }
            if (i.role === "Admin") {
                temp.firstname = "gep";
                temp.lastname = "admin";
                temp.username = "gepAdmin";
                temp.password = "gepAdmin@123";
                temp.email = "gepAdmin@gmail.com";
                temp.role = i._id;
                temp.avatar = null;
                temp.Idtoken = "";
                temp.org = "@10decoders.in";
                temp.org_country = "Ind";
                temp.org_sub1 = "ABC";
                temp.org_sub2 = "DEF";
                temp.org_sub3 = "GHI";
                temp.loggedinDate = Date.now();
                temp.loggedoutDate = Date.now();
            }
            signinmodel.findOne({ email: temp.email }).then(data => {
                if(data === null){
                    new signinmodel(temp).save().then((result:any) => {
                        new CustomLogger().showLogger('info', `Added the details ${result.username}`);
                    });
                }
            })
        }); 
    }
}