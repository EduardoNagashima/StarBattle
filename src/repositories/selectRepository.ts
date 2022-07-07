import connection from "../database/bd.js";

async function selectByWins(){
    try{
         const {rows} = await connection.query(`SELECT * FROM fighters order by wins DESC, draws DESC`);
         return rows;
    }catch (err){
        console.log(err);
    }
}

async function selectByUsername(username: string){
    const {rows} = await connection.query(`
            SELECT * FROM fighters 
            WHERE username = $1`
            ,[username]);
    return rows;
}

export {
    selectByWins,
    selectByUsername,
}