
import { AttachmentToFileSystem } from "../dao/attachmentToFileSystem";
import { Request, Response } from 'express'

let attachfile: AttachmentToFileSystem = new AttachmentToFileSystem();

export class AttachmentFileService {
    constructor(){

    }

    public fileUploadCreate(req:Request, callback) {
        attachfile.fileUploadCreate(req, (response) => {
            callback(response);
        });
    }

    public getAllFiles(req:Request, callback) {
        // Read - Get all files
        attachfile.getAllFiles(req, (result) => {
            callback(result);
        });
    }

    public updateFiles(req:Request, callback) {
        attachfile.updateFiles(req, (result) => {
            callback(result);
        });
    }

    public getByIdFiles(req:Request, callback) {
        attachfile.getByIdFiles(req, (result) => {
            callback(result);
        });
    }

    public deleteUserById(req:Request, callback) {
        attachfile.deleteUserById(req, (result) => {
            callback(result);
        });
    }
}