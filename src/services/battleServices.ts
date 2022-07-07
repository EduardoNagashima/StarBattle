import * as selectRepository from "../repositories/selectRepository.js";
import * as insertRepository from "../repositories/insertRepository.js";
import * as updateRepository from "../repositories/updateRepository.js";

async function winBattle(username: string){
    const userDB = await selectRepository.selectByUsername(username);
    if (userDB.length === 0){
        insertRepository.newInsert(username, true);
    } else {
        updateRepository.updateFights('wins', parseInt(userDB[0].wins + 1), username);
    }
}

async function loseBattle(username : string) {
    const userDB = await selectRepository.selectByUsername(username);
    if (userDB.length === 0 ){
        insertRepository.newInsert(username, false);
    } else {
        updateRepository.updateFights('losses', parseInt(userDB[0].loose + 1), username);
    }
}

async function drawBattle(username: string, secondUsername: string) {
    const userDB = await selectRepository.selectByUsername(username);
    if (userDB.length === 0 ){
        insertRepository.drawInsert(username);
    } else {
        updateRepository.updateFights('draws', parseInt(userDB[0].draw + 1), username);
    }

    const secondUserDB = await selectRepository.selectByUsername(secondUsername);
    if (secondUserDB.length === 0 ){
        insertRepository.drawInsert(secondUsername);
    } else {
        updateRepository.updateFights('draws', parseInt(secondUserDB[0].draw + 1), secondUsername);
    }
}

export {
    winBattle,
    loseBattle,
    drawBattle
}