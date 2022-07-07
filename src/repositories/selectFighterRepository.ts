import connection from "../database/bd.js";

export async function selectByWins(){
    try{
        return await connection.query(`SELECT * FROM fighters order by wins ASC, draws ASC`);
    }catch (err){
        console.log(err);
        throw {
            error: 'deu ruim',
        }
    }
}