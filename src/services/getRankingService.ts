import * as selectFighterRepository from "../repositories/selectRepository.js";

function getRankingService(){
    const ranking = selectFighterRepository.selectByWins();
    return ranking;
}

export {
    getRankingService,
}