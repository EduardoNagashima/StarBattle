import { NextFunction, Request, Response } from "express";
import { battleSchema } from "../schema/battleSchema.js";

export function validateBattleSchema(req: Request, res: Response, next: NextFunction){
    const {error} = battleSchema.validate(req.body);
    if (error){
        return res.send("objeto enviado da forma errada!").status(401);
    }
    const {firstUser, secondUser} = req.body;
    const users = {firstUser, secondUser}
    res.locals.users = users;
    next();
}