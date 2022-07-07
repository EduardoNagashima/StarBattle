import { Request, Response } from "express";
import axios, { AxiosResponse, ResponseType } from "axios";
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
                const firstUserDB = await connection.query(`
                SELECT * FROM fighters 
                WHERE username = $1`
                ,[firstUser]);
                console.log(firstUserDB.rows);

                if (firstUserDB.rows === 0){
                    await connection.query(`
                    INSERT INTO fighters (username, wins, losses, draws) 
                    VALUES ($1, $2, $3, $4)
                    WHERE username = $5
                    `
                    ,[firstUser, 1, 0, 0, firstUser]);
                } else {
                    await connection.query(`
                    INSERT INTO fighters (username, wins, losses, draws) 
                    VALUES ($1, $2, $3, $4)
                    WHERE username = $5
                    `
                    ,[firstUser, 2, firstUserDB.rows.losses, firstUserDB.rows.draws, firstUser]);
                }
                res.sendStatus(200);
                return({
                    winner: firstUser,
                    loser: secondUser,
                    draw: false
                })
            } catch (error) {
                console.log(error);
                return res.sendStatus(500)
            }
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