
import * as mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const fileSchema = new Schema({
    userid: String,
    id: String,
    fileslist: [{
        fileName: String,
        location: String,
        fileType: String,
        db_status: { type: Boolean, default: false }
    }],
    llm_engine: { type: String, default: null},
    // project_id: { type: String, default: null},
    // url: { type: String, default: null}
});

const fileModel = mongoose.model('fileupload', fileSchema, 'fileupload');
export default fileModel;
