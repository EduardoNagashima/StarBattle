import { Request, Response } from "express";
import { getRankingService } from "../services/getRankingService.js";

export async function getRanking(req: Request, res: Response){
    const ranking = await getRankingService();
    return res.send(ranking);
}