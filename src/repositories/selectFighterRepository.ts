import connection from "../database/bd.js";

export async function selectByWins(){
    try{
         const {rows} = await connection.query(`SELECT * FROM fighters order by wins ASC, draws ASC`);
         return rows;
    }catch (err){
        console.log(err);
    }
}