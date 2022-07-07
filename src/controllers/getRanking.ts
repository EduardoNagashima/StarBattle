import { Request, Response } from "express";
import getRankingService from "../services/getRankingService.js";

export function getRanking(req: Request, res: Response){
    const ranking = getRankingService();
    return res.send(ranking);
}