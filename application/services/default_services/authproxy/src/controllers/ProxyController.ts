import { Request, Response } from 'express';
import { Proxyservice } from '../services/Proxyservice';
import { CustomLogger } from '../config/Logger'

let proxyservice = new Proxyservice;

export class Proxycontroller {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public usercontroller(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into ProxyController.ts: usercontroller');
        let userdetails = req.body;
        proxyservice.userservice(userdetails, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from ProxyController.ts: usercontroller');
        })
    }
}