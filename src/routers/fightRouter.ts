import { Router } from "express";

import {gitBattle} from "../controllers/gitHubBattleController.js";
import { validateBattleSchema } from "../middlewares/validateSchema.js";

const fightRouter = Router();

fightRouter.post("/battle", validateBattleSchema, gitBattle);

export default fightRouter;