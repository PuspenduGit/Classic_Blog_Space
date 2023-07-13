import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unque: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    createDate: {
        type: Date
    }
});

const post = mongoose.model('post', postSchema);

export default post;
