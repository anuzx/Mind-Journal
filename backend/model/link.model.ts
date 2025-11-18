import mongoose , {Schema} from "mongoose";

const linkSchema = new Schema({
    hash: {
        type: String,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})