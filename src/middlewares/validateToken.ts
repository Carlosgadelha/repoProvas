import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export function validateToken(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim(); 
    const key = process.env.TOKEN_KEY;

    jwt.verify(token, key, (err, result) => { 
        if(err) return res.status(401).send({ err: err });
        if(result) {
            res.locals.userId = result;
            next();
        }
    });

}