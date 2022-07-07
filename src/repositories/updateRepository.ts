import connection from "../database/bd.js";

async function updateFights(wins, username){
    await connection.query(`
    UPDATE fighters SET wins = $1
    WHERE username = $2
    `
    ,[wins, username]);
}

export {
    updateFights,
}