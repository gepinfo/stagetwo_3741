import { Request, Response } from 'express';
import { AttachmentService } from '../service/attachmentService';
import { CustomLogger } from '../config/Logger'

let attachmentService = new AttachmentService;
export class AttachmentController {

    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public addAttachment(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into attachmentController.ts: createAttachment');
        attachmentService.addAttachment(req, (response) => {
            res.status(201);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from attachmentController.ts: createAttachment');
        })
    }

    public getAttachment(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into attachmentController.ts: createAttachment');
        attachmentService.getAttachment(req, (response) => {
            res.status(201);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from attachmentController.ts: createAttachment');
        })
    }

    public deleteAttachment(req: Request, res: Response) {
        attachmentService.deleteAttachment(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into attachmentController.ts: deleteAttachment');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from attachmentController.ts: deleteAttachment');
        })
    }

    public downloadAttachment(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into attachmentController.ts: downloadAttachment');

        attachmentService.downloadAttachment(req, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from attachmentController.ts: downloadAttachment');

        })
    }
    public uploadS3(req: Request, res: Response) {
        new CustomLogger().showLogger('info', 'Enter into attachmentController.ts: uploadS3');
        attachmentService.UploadS3(req, (response) => {
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from attachmentController.ts: uploadS3');
        })
    }
}