import { Router } from "express";

import {gitBattle} from "./../controllers/gitBattle.js";

const fightRouter = Router();

fightRouter.post("/battle", gitBattle);

export default fightRouter;