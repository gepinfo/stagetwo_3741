import { Request } from 'express';
import { AttachmentToS3Dao } from '../dao/attachmentToS3Dao';
import { AttachmentToDBDao } from '../dao/attachmentToDBDao';
import { CustomLogger } from '../config/Logger';
import * as Busboy from 'busboy';
const imageThumbnail = require('image-thumbnail');
import { uuid } from 'uuidv4';
import { AttachmentToFileSystem } from '../dao/attachmentToFileSystem';

let attachmentToS3Dao = new AttachmentToS3Dao();
let attachmentToDBDao = new AttachmentToDBDao();
let attachmentToFileSystem = new AttachmentToFileSystem();
export class AttachmentService {
    private callConstructor:string;
    constructor() { 
        this.callConstructor = "callConstructor";
    }
    
    public addAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: addAttachment');
        console.log("test--------------",req.body);
        let busboy = new Busboy({ headers: req.headers });
        const id = uuid();
        let fileKey;
        let fileName;
        busboy.on('file', async function (_fieldName, file, filename ) {
            console.log('inside busboy file',fileName,file);
            let resource = `${process.env.DB_RESOURCE}`;
            fileName=id+"_"+filename;
            //  file.on('data', async function (data) {
            //     console.log("data------------",data);
                if (resource === 'S3') {
                    console.log('inside busboy data');
                    fileKey = "task_attachments/" + fileName;
                    console.log("file key---", fileKey);
                    /**let s3URL = "https://projectmonk.s3.amazonaws.com/" + fileKey;*/
                    await attachmentToS3Dao.fileUploadToS3(fileKey);
                }
                 else if (resource === 'FS') {
                    let files:any = await attachmentToFileSystem.fileSaveToSystem(file,fileName);
                    callback(files);
                 }
                // attachmentToDBDao.addAttachment("", dataObject, fileName, async (response: any) => {
                //     console.log("",dataObject);
                //     let resObject = {
                //         resp: response,
                //         originalFileData: originalFileData
                //     }
                //     new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: addAttachment');
                //     callback(resObject);
                // });
            //  });
        });
        busboy.on('finish', function () {
            /**attachmentToDBDao.addAttachment("", data, fileName, (response) => {
                new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: addAttachment');
                callback(response);
            });*/
        })
        req.pipe(busboy);
    }

    public deleteAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: deleteAttachment')
        let fileKey = req.query.fileKey;
        let resource = `${process.env.DB_RESOURCE}`;
        console.log("Service fileKey is :", fileKey);
        if (resource === 'FS') {
        attachmentToFileSystem.deleteAttachment(req, (error) => {
            if(error==null){
                attachmentToDBDao.deleteAttachment(fileKey, (response) => {
                    new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: deleteAttachment')
                    callback(response);
                });
            }
        });
        }
        else if (resource === 'S3') {
        attachmentToS3Dao.deleteAttachment(fileKey);
        attachmentToDBDao.deleteAttachment(fileKey, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: deleteAttachment')
            callback(response);
        });
        }
    }
    public downloadAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: downloadAttachment')
        let fileKey = req.query.fileKey;
        console.log("Service fileKey is :", fileKey);
        attachmentToS3Dao.fileDownloadFromS3(fileKey, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: downloadAttachment')
            callback(response);
        });
    }

    public getAttachment(req: Request, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: getAttachment');
        console.log('req.body ', req.body);
        let fileIds = req.body;
        attachmentToDBDao.getAttachment(fileIds, (response) => {
            new CustomLogger().showLogger('info', 'Exit from attachmentService.ts: getAttachment');
            callback(response);
        });
    }
    public UploadS3(req, callback) {
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: uploads3services');
        let busboy = new Busboy({ headers: req.headers });
        let fileKey, s3URL, fileName, mimeType, enCoding;
        let size = 0;

        busboy.on('finish', async() => {
            let result = req.files.fileKey;
            let image = result.data;
            fileKey = "healthmonk/" + result.name;
            let temp = await attachmentToS3Dao.UploadS3(image, fileKey, result.mimeType, result.enCoding);
            if(req.query.thumbnail == 'true') {
                await this.thumbimage(temp, result.name, (thumbnail:any) => {
                    let jsonImage = {
                        image: temp,
                        thumbnail: thumbnail
                    }
                    callback(jsonImage);
                });
            } else {
                callback(temp);
            }
        })
        req.pipe(busboy);
    }
    public async thumbimage(imageuri, filename, callback){
        let imagelink = imageuri.data;
        new CustomLogger().showLogger('info', 'Enter into attachmentService.ts: imagethumbnailservices');
        let options = { width: 100, height: 100, responseType: 'base64', jpegOptions: { force:true, quality:100 } }

        try {
          await imageThumbnail({ uri: `${imagelink}`, options }).then(async (thumbimage) => {
            let fileKey = "thumbnailimages/"+filename; 
            let imageobj = await attachmentToS3Dao.UploadS3(thumbimage, fileKey, 'image/jpeg', null);
            callback(imageobj);
          })
        } catch (err) {
          console.error(err);
        }
    }
}
