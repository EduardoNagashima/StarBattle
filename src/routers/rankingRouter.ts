import { Router } from "express";

import { getRanking } from "../controllers/getRankingController.js";

const rankingRouter = Router();

rankingRouter.get("/ranking", getRanking);

export default rankingRouter;