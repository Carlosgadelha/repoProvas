import { NextFunction, Request, Response } from "express";
import {ObjectSchema} from "joi"

export function validateSchemaMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.message,
                field: error.details[0].path[0]
            });
        }
        next();
    }
}