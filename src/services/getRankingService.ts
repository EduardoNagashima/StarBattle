import * as selectFighterRepository from "./../repositories/selectFighterRepository.js";

export default function getRankingService(){
    return selectFighterRepository.selectByWins();
}