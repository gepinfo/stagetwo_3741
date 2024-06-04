import { Request, Response } from 'express';
import { SystemCredentialsManagerService } from '../service/systemCredentialsManagerService';
import { CustomLogger } from '../config/Logger'
let systemCredentialsManager = new SystemCredentialsManagerService();

export class SystemCredentialsManagerController {

    private Controller:string;
    constructor() {
      this.Controller = "Controller" ;
    }

    public GpSearch(req: Request, res: Response) {
        systemCredentialsManager.GpSearch(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpSearch');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpSearch');
        })
    }
    public GpUpdate(req: Request, res: Response) {
        systemCredentialsManager.GpUpdate(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpUpdate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpUpdate');
        })
    }
    public GpGetAllValues(req: Request, res: Response) {
        systemCredentialsManager.GpGetAllValues(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpGetAllValues');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpGetAllValues');
        })
    }
    public GpGetVaultByName(req: Request, res: Response) {
        systemCredentialsManager.GpGetVaultByName(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpGetVaultByName');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpGetVaultByName');
        })
    }

    public GpVaultGetallPath(req: Request, res: Response) {
        systemCredentialsManager.GpVaultGetallPath(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpGetList');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpGetList');
        })
    }
    public GpDelete(req: Request, res: Response) {
        systemCredentialsManager.GpDelete(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpDelete');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpDelete');
        })
    }
    public GpCreate(req: Request, res: Response) {
        systemCredentialsManager.GpCreate(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpCreate');
        })
    }

    public GpExternalAll(req: Request, res: Response) {
        systemCredentialsManager.GpExternalAll(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpGetAllValues');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpGetAllValues');
        })
    }

    public GpExternaladd(req: Request, res: Response) {
        systemCredentialsManager.GpExternaladd(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpCreate');
        })
    }

    public GpExternalDelete(req: Request, res: Response) {
        systemCredentialsManager.GpExternalDelete(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpCreate');
        })
    }

    public GpExternalUpdate(req: Request, res: Response) {
        systemCredentialsManager.GpExternalUpdate(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into systemCredentialsManagerController.ts: GpCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from systemCredentialsManagerController.ts: GpCreate');
        })
    }



}