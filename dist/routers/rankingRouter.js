import { Router } from "express";
import { getRanking } from "../controllers/getRankingController.js";
var rankingRouter = Router();
rankingRouter.get("/ranking", getRanking);
export default rankingRouter;
