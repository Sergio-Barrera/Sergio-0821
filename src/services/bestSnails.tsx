import type {Snail, Racing, Bets, ResultBets, WinnersLossers} from "../types/typeGraph";

export function snailVictories(
    snails: Snail[],
    racings:Racing[],
): WinnersLossers[]{
    return snails.map(snail => ({
        name: snail.nameSnail,
        value: racings.filter(s => s.idWinner===snail.id).length
    }))
}

export function resultBest(
    racings: Racing[],
    bests: Bets[],
): ResultBets[]{
    return bests.map(best=>{
        const racing = racings.find(r => r.id === best.idRacing);
        const winner = racing?.idWinner === best.idSnail;
        const revenue = winner ? best.amount * best.share - best.amount : -best.amount;

        return {
            ...best,
            winner,
            revenue
        }
    })
}

export function winnerLoser(resultBest : ResultBets[]): WinnersLossers[]{
    const winners=resultBest.filter(w => w.winner);
    const losers=resultBest.filter(l => !l.winner);

    return [
        {
            name: "Ganadas",
            value: winners.length,
        },
        {
            name: "Perdidas",
            value: losers.length
        }
    ];
}