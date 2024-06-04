import * as express from 'express';
import { Request, Response } from 'express';
import * as Constant from '../config/Constant';
import { ApiAdapter }  from '../config/apiAdapter';
import Controller from '../interface/controller.interface';
import { CustomLogger } from '../config/Logger'

export class systemcredentialmanagerController implements Controller {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/scm', this.GpCreate);
this.router.get('/scm', this.GpGetAllValues);
this.router.delete('/scm/:vaultname', this.GpDelete);
this.router.get('/scm/list', this.GpVaultGetallPath);
this.router.put('/scm/update', this.GpUpdate);
this.router.get('/scm/search', this.GpSearch);
this.router.get('/scmbyname', this.GpGetVaultByName);
this.router.post('/scm/external', this.GpExternalAdd);
this.router.get('/scm/external', this.GpExternalAll);
this.router.delete('/scm/external/:id', this.GpExternalDelete);
this.router.put('/scm/external/update', this.GpExternalUpdate);
        //#@gepdelimeterone@#
        //#@ssofacebookapiroute@#
        //#@ssogithubapiroute@#
        //#@gepbankingapiroute@#
    }

public GpCreate(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpCreate');
        new ApiAdapter().post(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpCreate');
        }).catch(err => {
            res.send(err);
        });
    }
public GpGetAllValues(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpGetAllValues');
        new ApiAdapter().get(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpGetAllValues');
        }).catch(err => {
            res.send(err);
        });
    }
public GpDelete(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpDelete');
        new ApiAdapter().delete(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpDelete');
        }).catch(err => {
            res.send(err);
        });
    }
public GpVaultGetallPath(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpVaultGetallPath');
        new ApiAdapter().get(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpVaultGetallPath');
        }).catch(err => {
            res.send(err);
        });
    }
public GpUpdate(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpUpdate');
        new ApiAdapter().put(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpUpdate');
        }).catch(err => {
            res.send(err);
        });
    }
public GpSearch(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpSearch');
        new ApiAdapter().get(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpSearch');
        }).catch(err => {
            res.send(err);
        });
    }
public GpGetVaultByName(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpGetVaultByName');
        new ApiAdapter().get(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpGetVaultByName');
        }).catch(err => {
            res.send(err);
        });
    }
public GpExternalAdd(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpExternalAdd');
        new ApiAdapter().post(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpExternalAdd');
        }).catch(err => {
            res.send(err);
        });
    }
public GpExternalAll(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpExternalAll');
        new ApiAdapter().get(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpExternalAll');
        }).catch(err => {
            res.send(err);
        });
    }
public GpExternalDelete(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpExternalDelete');
        new ApiAdapter().delete(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` )
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpExternalDelete');
        }).catch(err => {
            res.send(err);
        });
    }
public GpExternalUpdate(req: Request, res: Response) {
            new CustomLogger().showLogger('info', 'Enter into systemcredentialmanagerController.ts: GpExternalUpdate');
        new ApiAdapter().put(Constant.SYSTEMCREDENTIALMANAGERURL + `${req.url}` , req.body)
        .then((res: any) => res.response.json()).then(result => {
            switch(req.baseUrl) { case '/mobile': res.send(result); break; case '/web': res.send(result); break; default: res.send(null); }
            new CustomLogger().showLogger('info', 'Exit from systemcredentialmanagerController.ts: GpExternalUpdate');
        }).catch(err => {
            res.send(err);
        });
    }

    //#@gepdelimeter@#

    //#@apifacebooklogin@#

    //#@apigithublogin@#

    //#@gepbankinglogin@#








}

