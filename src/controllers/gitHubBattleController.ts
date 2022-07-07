import { Request, Response } from "express";
import axios, { AxiosResponse } from "axios";
import connection from "../database/bd.js";

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
            try {
                const getFirstUser = await connection.query(`
                SELECT * FROM fighters 
                WHERE username = $1`
                ,[firstUser]);
                
                console.log(firstUser);

                if (!getFirstUser){
                    await connection.query(`
                    INSERT INTO fighters (username, wins, losses, draws) 
                    VALUES ($1, $2, $3, $4)`
                    ,[firstUser, 1, 0, 0]);
                } else {
                    await connection.query(`
                    INSERT INTO fighters (username, wins, losses, draws) 
                    VALUES ($1, $2, $3, $4)`
                    ,[firstUser, parseInt(getFirstUser.wins + 1), getFirstUser.losses, getFirstUser.draws]);
                }
                
            } catch (error) {
                console.log(error);
            }
        } else if (firstUserStars < secondUserStars){
            //2° ganhou
        } else {
            //empate
        }

        return res.sendStatus(200);
    }catch(err){
        console.log(err)
        return res.sendStatus(500);
    }
}