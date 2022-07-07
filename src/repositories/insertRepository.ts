import connection from "../database/bd.js";

async function newInsert(username: string, win: boolean) {
    try{
        if (win){
            await connection.query(`
                INSERT INTO fighters (username, wins, losses, draws) 
                VALUES ($1, $2, $3, $4)
                `
                ,[username, 1, 0, 0]);
        } else {
            await connection.query(`
            INSERT INTO fighters (username, wins, losses, draws) 
            VALUES ($1, $2, $3, $4)
            `
            ,[username, 0, 1, 0]);
        }
    }catch (err){
        console.log(err);
    }
}

export {
    newInsert,
}
