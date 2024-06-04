import { Request } from 'express';
import { SystemCredentialsManagerDBDao } from '../dao/systemCredentialsManagerDBDao';
import { SystemCredentialsManagerVaultDao } from '../dao/systemCredentialsManagerVaultDao';
import { CustomLogger } from '../config/Logger'
let systemCredentialsManagerVault = new SystemCredentialsManagerVaultDao();
let systemCredentialsManagerDB = new SystemCredentialsManagerDBDao();
import { IsystemcredentialExt } from '../interface/Isystemcredential';


export class SystemCredentialsManagerService {

    private ServiceFile;
    constructor() { 
        this.ServiceFile = 'ServicesFile';
    }
    public GpSearch(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpSearch')
        const systemCredentialsManagerId = req.query.connector_name;
        systemCredentialsManagerVault.GpVaultGet(systemCredentialsManagerId, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpDelete')
        callback(response);
        });
    }

    public GpUpdate(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpUpdate');
        const systemCredentialsManagerId = req.query.connector_name;
        const systemCredentialsManagerData = req.body;
        systemCredentialsManagerVault.GpVaultUpdate(systemCredentialsManagerId, systemCredentialsManagerData, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpUpdate')
        callback(response);
        });
    }

    public GpGetAllValues(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpGetAllValues')
        systemCredentialsManagerVault.GpVaultGetAll((response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpGetAllValues')
        callback(response);
        });
    }
    public GpGetVaultByName(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpGetVaultByName');
        let connectorName = req.query.connector_name;
        systemCredentialsManagerVault.GpVaultGetByConnectorName(connectorName, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpGetVaultByName');
        callback(response);
        });
    }
    
    public GpVaultGetallPath(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpGetList');
        systemCredentialsManagerVault.GpVaultGetallPath((response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpGetList');
        callback(response);
        });
    }
    public GpDelete(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpDelete')
        const systemCredentialsManagerId = req.params.vaultname;
        systemCredentialsManagerVault.GpVaultDelete(systemCredentialsManagerId, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpDelete')
        callback(response);
        });

    }
    public GpCreate(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpCreate')
        const systemCredentialsManagerData: any = req.body;
        const connectorName = req.query.connector_name;
        systemCredentialsManagerVault.GpVaultCreate(connectorName, systemCredentialsManagerData, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpCreate')
        callback(response);
        });
    }

    public GpExternalAll(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpGetAllValues')
        systemCredentialsManagerDB.GpExternalVaultAll((response:Array<IsystemcredentialExt>) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpDelete')
        callback(response);
        });

    }

    public GpExternaladd(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpCreate')
        const systemCredentialsManagerData: IsystemcredentialExt = req.body;
        systemCredentialsManagerDB.GpExternalVaultadd(systemCredentialsManagerData, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpCreate')
        callback(response);
        });
    }

    public GpExternalDelete(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpDelete')
        const systemCredentialsManagerId = req.params.id;
        systemCredentialsManagerDB.GpExternalVaultDelete(systemCredentialsManagerId, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpDelete')
        callback(response);
        });

    }

    public GpExternalUpdate(req: Request, callback:CallableFunction) {
        new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerService.ts: GpUpdate');
        const systemCredentialsManagerData:IsystemcredentialExt = req.body;
        systemCredentialsManagerDB.GpExternalVaultUpdate( systemCredentialsManagerData, (response) => {
        new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerService.ts: GpUpdate')
        callback(response);
        });
    }

}

