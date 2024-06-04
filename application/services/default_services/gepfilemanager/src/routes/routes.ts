import { Request, Response, } from "express";
import { AttachmentController } from "../controller/attachmentController";
import { AttachmentFileController } from "../controller/attachmentFileController";

export class Routes {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    private attach: AttachmentController = new AttachmentController();
    private fileattach: AttachmentFileController = new AttachmentFileController();

    public routes(app): void {
        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        //attachemnt routes
        app.route('/addAttachment').post(this.attach.addAttachment);
        app.route('/getattachment').post(this.attach.getAttachment);
        app.route('/deleteAttachment').delete(this.attach.deleteAttachment);
        app.route('/downloadAttachment').get(this.attach.downloadAttachment);
        app.route('/uploads3').post(this.attach.uploadS3);
        // file upload crud
        app.route('/upload/:id').post(this.fileattach.fileUploadCreate);
        app.route('/files').get(this.fileattach.getAllFiles);
        app.route('/files/:id').put(this.fileattach.updateFiles);
        app.route('/files/:id').get(this.fileattach.getByIdFiles);
        app.route('/files/:id').delete(this.fileattach.deleteUserById);
    }

}