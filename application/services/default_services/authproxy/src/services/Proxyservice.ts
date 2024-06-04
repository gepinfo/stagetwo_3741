import { Proxydao } from '../dao/Proxydao';
import { CustomLogger } from '../config/Logger';
import { Iautproxy } from '../interface/Iauthproxy';

let proxydao = new Proxydao;

export class Proxyservice {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public userservice(userdetails:Iautproxy, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into Proxyservice.ts: userservice');
        proxydao.userdao(userdetails, (response) => {
            new CustomLogger().showLogger('info', 'Exit from Proxyservice.ts: userservice');
            callback(response);
        })
    }
}
