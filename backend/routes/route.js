import express from "express";
import { signupuser ,loginuser} from "../controller/user_controller.js";
import { uploadImage,getImage } from "../controller/image_controller.js";
import { createPost , getAllPosts , getPost, updatePost, deletePost} from "../controller/post_controller.js";
import { authenticateToken } from "../controller/jwt_controller.js";
import { createComment ,getAllComments ,deleteComment} from "../controller/comment_controller.js";
import upload from '../utils/upload.js'


const router = express.Router();


router.post('/signup',signupuser);
router.post('/login',loginuser);

router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage)

router.post('/create', authenticateToken, createPost);
router.get('/posts', authenticateToken,getAllPosts);
router.get('/post/:id', authenticateToken,getPost)
router.put('/update/:id', authenticateToken,updatePost);
router.delete('/delete/:id', authenticateToken,deletePost);

router.post('/comment/new', authenticateToken,createComment);
router.get('/comments/:id', authenticateToken,getAllComments);
router.delete('/comment/delete/:id', authenticateToken,deleteComment);

export default router;