import mongoose = require('mongoose');
import { UserSchema } from '../models/User';
import { Roleschema } from '../models/Role';
import * as jwt from 'jsonwebtoken';
import { CustomLogger } from '../config/Logger'

const signinmodel = mongoose.model('User', UserSchema);
const rolemodel = mongoose.model('role', Roleschema)

export class ConsentDao {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public consentdao(consentdata, callback) {
        new CustomLogger().showLogger('info', 'Enter into ConsentDao.ts : consentdao');

        if (consentdata.scope === 'openid' && consentdata.submit === 'Allow access') {
            signinmodel.findById(consentdata.id).populate({
                path: 'role', model: rolemodel
            }).then((result) => {
                let payload = {
                    username: result.username,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    id: result._id,
                    role: result.role['role']
                }
                let token = jwt.sign(payload, 'geppettosecret', {
                    expiresIn: 86400
                });
                signinmodel.findByIdAndUpdate(consentdata.id, { $set: { Idtoken: token } }).then((response) => {
                    try {
                        response.Idtoken = token;
                        new CustomLogger().showLogger('info', 'Exit from ConsentDao.ts : consentdao');
                        callback(response);
                    } catch (error) {
                        callback(error);
                    }
                });
            })
        }
    }

}