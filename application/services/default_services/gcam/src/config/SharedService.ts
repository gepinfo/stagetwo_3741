export class SharedService {

    //local
    // public static generatorBaseUrl = "http://localhost";
    // public static systementryBaseUrl = "http://localhost";


    //kubernetes
    // public static generatorBaseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";
    // public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";
    // public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
    // public static backendmanagerURL: String = SharedService.generatorBaseUrl + ":5009";


    public static generatorBaseUrl: string;
    public static systementryBaseUrl: string;
    public static apiGatewayURL: string;
    public static backendmanagerURL: string;


    constructor() {
        this.getURL();
    }


    public getURL() {
        if(process.env.localname){
            SharedService.systementryBaseUrl = process.env.localsystementryBaseUrl;
            SharedService.generatorBaseUrl = process.env.localgeneratorBaseUrl;
            SharedService.generatorBaseUrl = process.env.backendgenmanager;
            SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
            SharedService.backendmanagerURL = SharedService.generatorBaseUrl + ":5009";
        } else {
            SharedService.systementryBaseUrl = process.env.livesystementryBaseUrl;
            SharedService.generatorBaseUrl = process.env.livegeneratorBaseUrl;
            SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
            SharedService.backendmanagerURL = SharedService.generatorBaseUrl + ":5009";
        }

    }
}