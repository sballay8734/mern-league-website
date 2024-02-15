export interface IChallenge {
  challengerId: string;
  acceptorId: string;
  challengerName: string;
  acceptorName: string;
  challengerSelection: string;
  acceptorSelection: string;
  wagerAmount: number;
  gameId: string;
  propId: string;
  dateProposed: string;
  dateAccepted: string;
  type: string;
  league: string;
  gameStart: string;
  result: string;
  line: number;
  propTitle: string; // this is where you put player name or matchup
  homeData?: {
    homeTeam: string;
    homePayout: number;
    calcHomePayout: number;
  } | null;
  awayData?: {
    awayTeam: string;
    awayPayout: number;
    calcAwayPayout: number;
  } | null;
  overData?: {
    overPayout: number;
    calcOverPayout: number;
  } | null;
  underData?: {
    underPayout: number;
    calcUnderPayout: number;
  } | null;
  _id: string;

  voided: boolean;
}

export interface PropChallenge {
  challengerName: string;
  acceptorName: string;
  challengerSelection: string;
  acceptorSelection: string;
  wagerAmount: number;
  _id: string;

  voided: boolean;
}
