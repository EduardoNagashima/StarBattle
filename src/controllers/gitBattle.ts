import { Request, Response } from "express";
import axios from "axios";

export async function gitBattle(req: Request, res: Response){
    const { firstUser, secondUser } : {firstUser: string, secondUser: string} = req.body;
    console.log(req.body)
    try{
        let firstUserInfos;
        await axios.get(`https://api.github.com/users/${firstUser}/repos`).then((response)=>{
            firstUserInfos = response;
        });

        return res.send(firstUserInfos);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }

}