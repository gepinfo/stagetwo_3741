


import { AttachmentFileService } from "../service/attachmentFileService";
import { Request, Response, } from "express";


let attachsrv: AttachmentFileService = new AttachmentFileService();

export class AttachmentFileController {
    constructor(){

    }

    public fileUploadCreate(req:Request, res:Response) {
        attachsrv.fileUploadCreate(req, (response) => {
            res.status(201);
            res.json(response);
        });
    }

    public getAllFiles(req:Request, res:Response) {
        // Read - Get all files
        attachsrv.getAllFiles(req, (result) => {
            res.status(201);
            res.json(result);
        });
    }

    public updateFiles(req:Request, res:Response) {
        attachsrv.updateFiles(req, (result) => {
            res.status(201);
            res.json(result);
        });
    }

    public getByIdFiles(req:Request, res:Response) {
        attachsrv.getByIdFiles(req, (result) => {
            res.status(201);
            res.json(result);
        });
    }

    public deleteUserById(req:Request, res:Response) {
        attachsrv.deleteUserById(req, (result) => {
            res.status(201);
            res.json(result);
        });
    }
}