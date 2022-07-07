import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import * as selectRepository from "../repositories/selectRepository.js";
import * as insertRepository from "../repositories/insertRepository.js";
import * as updateRepository from "../repositories/updateRepository.js";

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
            const firstUserDB = await selectRepository.selectByUsername(firstUser);
            console.log(firstUserDB);

            if (firstUserDB.length === 0){
                insertRepository.newInsert(firstUser, true);
            } else {
                const updatedWins: number = firstUserDB[0].wins + 1;
                updateRepository.updateFights(updatedWins, firstUser);
            }

            return res.status(200).send({
                winner: firstUser,
                loser: secondUser,
                draw: false
            });
          
        } else if (firstUserStars < secondUserStars){
            //2° ganhou
            return res.status(200).send({
                winner: secondUser,
                loser: firstUser,
                draw: false
            })
         
        } else {
            return res.status(200).send({
                winner: null,
                loser: null,
                draw: true
            })
        }

        return res.sendStatus(200);
    }catch(err){
        console.log(err)
        return res.sendStatus(500);
    }
}