import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    postId : {
        type : String,
        required : true
    },
    date :{
        type : Date,
        default : Date.now,
        required : true
    },
    comments : {
        type : String,
        required : true
    }
})

const comment = mongoose.model('comment',commentSchema);

export default comment;