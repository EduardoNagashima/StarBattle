import express,{json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import fightRouter from "./routers/fightRouter.js";
import rankingRouter from "./routers/rankingRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(fightRouter);
app.use(rankingRouter);

app.listen(+process.env.PORT || 5000);
