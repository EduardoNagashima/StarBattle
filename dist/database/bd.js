import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
var Pool = pg.Pool;
var connection;
try {
    connection = new Pool({
        connectionString: process.env.DATABASE_URL
    });
}
catch (error) {
    console.log(error);
}
export default connection;
