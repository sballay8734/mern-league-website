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
  result: string;
  _id: string;
  // Still need playerName?, homeTeam, awayTeam, line, payout(MAYBE?)

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
