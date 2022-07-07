import { Router } from "express";
import { gitBattle } from "../controllers/gitHubBattleController.js";
var fightRouter = Router();
fightRouter.post("/battle", gitBattle);
export default fightRouter;
