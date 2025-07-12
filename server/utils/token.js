import jwt from 'jsonwebtoken';
import { jwtConfig, isProduction } from '../config/env.js';

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
    })

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: isProduction(),
    })
}

export default generateToken;