import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Routes } from './routes/Routes';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { WinstonLogger } from './config/WinstonLogger';
import { SCMService } from './apiservices/systemcredentialsmanager';
const PORT = 8025;

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public logger: WinstonLogger = new WinstonLogger();
    public DB_Url: string;
    public DB_Domain: any = process.env.MONGO_DOMAIN;

    constructor() { 
        this.DatabaseCredentials();
        this.logger.setupLogger();
        this.logger.configureWinston(this.app);
        this.initializeMiddlewares();
        this.routePrv.routes(this.app);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors({ credentials: true, origin: true }))
    }

    private DatabaseCredentials() {
        let SCMconfig = new SCMService();
        SCMconfig.SCMData( async result => {
            let db_auth = result.data.DB_AUTH_stagetwo_3741;
            let db_coll = result.data.DB_COLL_stagetwo_3741;
            this.DB_Url = db_auth+this.DB_Domain+db_coll;
            this.DBSetup();
        });
    }

    private DBSetup(): void {
        // mongoose.Promise = global.Promise;
        mongoose.connect(this.DB_Url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(res => { console.log('mongodb connected') })
            .catch(err => { console.log('mongo error in connection:', err) });
    }

}

new App().app.listen(PORT, () => {
    console.log('Express server listening on port  ' + PORT);
})


