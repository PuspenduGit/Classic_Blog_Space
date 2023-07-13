import mongoose from "mongoose"

const tokenSchenma = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
})

const token = mongoose.model('token', tokenSchenma);

export default token;
