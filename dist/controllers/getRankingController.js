import getRankingService from "../services/getRankingService.js";
export function getRanking(req, res) {
    var ranking = getRankingService();
    return res.send(ranking);
}
