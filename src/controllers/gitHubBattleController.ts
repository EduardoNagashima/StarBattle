import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import { loseBattle, winBattle, drawBattle } from "../services/battleServices.js";

export async function gitBattle(req: Request, res: Response){
    let firstUserStars: number = 0;
    let secondUserStars: number = 0;
    const { firstUser, secondUser } : {firstUser: string, secondUser: string} = res.locals.users;
    try{
        const firstUserGitHub: AxiosResponse = await axios.get(`https://api.github.com/users/${firstUser}/repos`);
        const secondUserGitHub: AxiosResponse = await axios.get(`https://api.github.com/users/${secondUser}/repos`);

        firstUserGitHub.data.forEach(el => {
            firstUserStars += el.stargazers_count;
        });
        secondUserGitHub.data.forEach(el => {
            secondUserStars += el.stargazers_count;
        });

        if (firstUserStars > secondUserStars){

            winBattle(firstUser);
            loseBattle(secondUser);

            return res.status(200).send({
                winner: firstUser,
                loser: secondUser,
                draw: false
            });
          
        } else if (firstUserStars < secondUserStars){

            winBattle(secondUser);
            loseBattle(firstUser);

            return res.status(200).send({
                winner: secondUser,
                loser: firstUser,
                draw: false
            });
         
        } else {

            drawBattle(firstUser, secondUser);

            return res.status(200).send({
                winner: null,
                loser: null,
                draw: true
            });
        }

    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}