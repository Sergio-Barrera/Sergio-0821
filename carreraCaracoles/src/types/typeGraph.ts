export interface Snail {
    id: number,
    nameSnail: string,
}

export interface Racing{
    id: number,
    time: string,
    idWinner: number,
}

export interface Bets{
    idRacing: number,
    idSnail: number,
    amount: number,
    share: number
}

export interface ResultBets{
    winner: boolean,
    revenue: number,
}

export interface WinnersLossers {
  name: string;
  value: number;
}