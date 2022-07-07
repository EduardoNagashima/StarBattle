import * as selectFighterRepository from "./../repositories/selectFighterRepository.js";

function getRankingService(){
    const ranking = selectFighterRepository.selectByWins();
    return ranking;
}

export {
    getRankingService,
}