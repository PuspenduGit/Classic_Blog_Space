import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken =(request,response,next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return response.status(401).json({
        msg: "Token not found"
    });

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err){
            return response.status(403).json({
                msg: "Invalid Token"
            });
        }
        request.user = user;
        next();// will goto next middleware(api=createPost)
    })
}

