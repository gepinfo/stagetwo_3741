import { Proxycontroller } from '../controllers/ProxyController';

export class Routes {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public proxycontroller: Proxycontroller = new Proxycontroller();

    public routes(app): void {

        app.route('/proxy').post(this.proxycontroller.usercontroller);
        
    }
}