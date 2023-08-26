import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../model/user.js';
import Token from '../model/token.js';

dotenv.config();

export const signupuser = async (request,response) => {
    try{
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(user.password,salt);

        //similar to above two lines
        const hashedPassword = await bcrypt.hash(request.body.password,10);

        const user = { username: request.body.username, password: hashedPassword, name: request.body.name };

        const modifiedUser = new User(user);

        await modifiedUser.save();

        console.log(modifiedUser);

        return response.status(200).json({
            msg: "User signed up successfully"
        })
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            msg: "Something went wrong"
        });
    }
}

export const loginuser = async (request,response) => {
    
    let user = await User.findOne({ username: request.body.username });//returns whole user obejct
    console.log(user);
    if(!user){
        return response.status(404).json({
            msg: "User not found"
        });
    }

    try {
        let match = await bcrypt.compare(request.body.password,user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15m' });
            const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN_SECRET);

            const newToken = new Token({ token: refreshToken });
            await newToken.save();

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken ,name: user.name, username: user.username});

        } else {
            return response.status(400).json({
                msg: "Incorrect password"
            });
        }
    } catch (error) {
        return response.status(500).json({
            msg: "Something went wrong"
        });
    }

}