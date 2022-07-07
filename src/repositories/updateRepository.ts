import connection from "../database/bd.js";

async function updateFights(type :string, value : number, username: string){
    if (type === 'draws'){
        await connection.query(`
        UPDATE fighters
        SET draws = $1
        WHERE username = $2;
        `
        ,[value, username]);
    } else if (type === 'wins'){
        await connection.query(`
        UPDATE fighters
        SET wins = $1
        WHERE username = $2;
        `
        ,[value, username]);
    } else if (type === 'losses'){
        await connection.query(`
        UPDATE fighters
        SET losses = $1
        WHERE username = $2;
        `
        ,[value, username]);
    } else {
        throw {
            error: 'Type is not defined'
        }
    }
}

export {
    updateFights,
}