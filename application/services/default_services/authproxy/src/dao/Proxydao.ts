import mongoose = require('mongoose');
import * as fetch from 'node-fetch';
import { Signinschema } from '../model/Signin';
import * as Constants from '../config/constants';
import { CustomLogger } from '../config/Logger';


const signinmodel = mongoose.model('Signin', Signinschema);

export class Proxydao {
   
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
     public async userdao(userdetails, callback) {
         new CustomLogger().showLogger('info', 'Enter into Proxydao.ts: userdao');

         let role = userdetails.role;
         console.log("role------",role);
         let posturl = `${Constants.gcamUrl}/accesslevel`
         console.log('posturl',posturl);
         console.log('role----------->',role);
        await fetch(posturl, { method: 'POST', body: JSON.stringify({"role": role.toLowerCase()}),
        headers: { 'Content-Type': 'application/json'  }})
          .then(res => res.json())
             .then((response) => {
                 console.log("response",response);
                 new CustomLogger().showLogger('info', 'Exit from Proxydao.ts: userdao');
                 callback(response);
             }).catch(error => {
                 callback(error);
             })
            }
    }



