import mongoose = require('mongoose');
import { Resourceschema } from './model/resource';
 import { resource_types } from './assets/resources';
 import { resourcetypes } from './assets/screen';
import { Screenschema } from './model/screen';

const resourcemodel = mongoose.model('Resource', Resourceschema);
const screenmodel = mongoose.model('screen', Screenschema);

export class SeedService {

    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }

    public create(): void {
        resource_types.forEach(something =>{
            console.log('enter into seed resurce name', something);
             resourcemodel.findOneAndUpdate({resource_name: something['resource_name']},
             something, {new: true}).then((data)=>{
                 console.log('recheck data create', data);
                     if (data === null){
                    let screenroute = new resourcemodel(something);
                    console.log('data a save', screenroute);
                    screenroute.save();
                 }
            })
         });
         this.post();
    }
    public post(): void {
        resourcetypes.forEach(something =>{
            console.log('enter into seed resurce name', something);
             screenmodel.findOneAndUpdate({resources: something['resources']},
              something, {new: true}).then((data)=>{
                      if (data === null){
                          console.log('recheck data post', data);
                    let screenroute = new screenmodel(something);
                    console.log('data a save', screenroute);
                    screenroute.save();
                  }
            })
         })
    }
   
 }

   
 

