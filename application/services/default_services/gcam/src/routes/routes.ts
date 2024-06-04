import { GcamController } from '../controllers/Gcamcontroller';
export class Routes {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
     public gcam: GcamController = new GcamController();

    public routes(app): void {

        app.route('/accesslevel').post(this.gcam.getResourceAuthorizationsByRole);
        app.route('/gcamallscreens').get(this.gcam.getallscreens);
        app.route('/gcamgenerate').post(this.gcam.GCAMgenerate);
        app.route('/gcamdeletebyid/:id').delete(this.gcam.GCAMDelete);
        app.route('/gcambyid/:id').get(this.gcam.gcamGetNounById);
        app.route('/gcamupdate').put(this.gcam.gcamUpdate)
        
    }
}