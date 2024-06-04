
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;




export const systemCredentialsExternalManagerSchema = new Schema({
   role: { type:String, default:null },
   credentials:[],
   userId: {type: String, default:null},
   created_date: { type: Date, default: Date.now },
   created_by: { type: String },
   last_modified_by: { type: String },
   last_modified_date: { type: Date, default: Date.now },
})

const systemCredentialsExternalManagerModel = mongoose.model('systemCredentialsExternalManager', systemCredentialsExternalManagerSchema, 'systemCredentialsExternalManager');
export default systemCredentialsExternalManagerModel;
