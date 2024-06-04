import * as fs from "fs";
import { CustomLogger } from "../config/Logger";
import * as path from "path";
import * as Busboy from 'busboy';
import * as mongoose from 'mongoose';
import fileModel from "../models/uploadfile";
import { Request, Response } from 'express';
import { SCMService } from "../apiservices/systemcredentialsmanager";
import { uuid } from 'uuidv4';
export class AttachmentToFileSystem {
    private callConstructor:string;
    private fileupload = fileModel;
    public scmservice = new SCMService();
    
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public  fileSaveToSystem(file, fileName) {
        let image_folder_location = "public/"
        let image_access_location = "static/"
        return new Promise((resolve, reject) => {
            new CustomLogger().showLogger("info", "Enter into attachmentToFileSystem.ts: fileSaveToSystem");
            console.log("File Save----------------->", 'public/'+fileName, typeof fileName);
            let saveTo =  path.join(image_folder_location + fileName);
            file.pipe(fs.createWriteStream(saveTo));
                resolve(image_access_location + fileName);
            new CustomLogger().showLogger('info', 'Exit from attachmentToFileSystem.ts: fileSaveToSystem');
        });

    }

    public async deleteAttachment(fileKey,callback) {
        new CustomLogger().showLogger("info", "Enter into attachmentToFileSystem.ts: deleteAttachment");
        fs.unlink(fileKey, function (err) {
            if (err)
            {
                callback(err);
            } 
            // if no error, file has been deleted successfully
            console.log('File deleted!');
        });
        new CustomLogger().showLogger('info', 'Exit from attachmentToFileSystem.ts: deleteAttachment');
    }

    public fileDownload(fileKey,res, callback) {
        new CustomLogger().showLogger("info", "Enter into attachmentToS3Dao.ts: fileDownloadFromS3");
        res.download(fileKey); // Set disposition and send it.

        new CustomLogger().showLogger("info", "Exit into attachmentToS3Dao.ts: fileDownloadFromS3");
    }

    public fileUploadCreate(req:Request, callback) {
        // Create - File upload
        const busboy = new Busboy({ headers: req.headers });
        let uniqueId = uuid();
        let userdata = req.params.id;
        let username = req.query.email
        let files: any = [];
        // Handle file upload
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const saveTo = path.resolve(__dirname, '../../../uploads/' + filename.split('.')[0] + `_${username}` + '.' + filename.split('.')[1]);
            console.log(saveTo);
            file.pipe(fs.createWriteStream(saveTo));

            // Save file details to MongoDB
            // const fileData = new File({
            //     fileName: filename,
            //     location: saveTo,
            // });
            files.push({
                fileName: filename.split('.')[0] + `_${username}` + '.' + filename.split('.')[1],
                location: saveTo,
                fileType: filename.split('.')[1]
            })
            // fileData.save().catch((error) => {
            //     console.error('Error saving file details:', error);
            // });
        });

        // Finish upload
        busboy.on('finish', () => {
            const fileData = new this.fileupload({
                userid: userdata,
                id: uniqueId,
                fileslist: files,
                llm_engine: req.query.llm_engine,
                // project_id: req.query.project_id,
                // url: req.query.url
            });
            fileData.save().then((result) => {
                // this.scmservice.credmanagercreate(result.id, { apikey: req.query.api_key }, (res) => {
                    callback({ ...result, status: 'File(s) uploaded successfully' });
                // })
            }) 
        });

        // Pipe the request stream to the busboy instance
        req.pipe(busboy);
    }

    public getAllFiles(req:Request, callback) {
        // Read - Get all files
        this.fileupload.find({}).then((files) => {
            callback(files);
        });
    }

    public updateFiles(req:Request, callback) {
        // Update - Update file details
        const fileId = req.params.id;
        // Update file details in the database based on the fileId
        // Return appropriate response
        this.fileupload.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }).then((result) => {
            callback(`File updated successfully`);
        });
    }

    public getByIdFiles(req:Request, callback) {

        //get by id data all
        const fileId = req.params.id;
        
        // Update file details in the database based on the fileId
        // Return appropriate response
        this.fileupload.find({ userid: fileId }).then( async (result) => {
            callback(result);
        });
    }

    public deleteUserById(req:Request, callback) {
        // Delete - Delete file and file details
            const fileId = req.params.id;
            this.fileupload.findByIdAndRemove(fileId).then(async (deletedFile:any) => {
                if (deletedFile) {
                    deletedFile.fileslist.forEach(async (path) => {
                        await fs.promises.unlink(path.location);
                    });
                    callback(`File with ID ${fileId} deleted successfully`);
                } else {
                    callback({status: "file doesn't exists"});
                }
            });
    }

}
