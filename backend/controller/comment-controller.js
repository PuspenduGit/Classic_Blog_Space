
import Comment from '../model/comment.js';

export const createComment = async (req, res) => {
    try {
        const comment  = await new Comment(req.body);
        comment.save();

        res.status(200).json({msg: "Comment Created Successfully"});
    } catch (error) {
        res.status(500).json({msg: "Error Occured while creating comment"},error);
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({postId : req.params.id});
        if(!comments) res.status(404).json({msg: "No Comments Found"});
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({msg: "Error Occured while fetching comment"},error);
    }
}

export const deleteComment = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "Comment Deleted Successfully"});
    } catch (error) {
        res.status(500).json({msg: "Error Occured while deleting comment"},error);
    }
}