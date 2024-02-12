export interface ZChallenge {
  challengerId: string;
  acceptorId: string;
  challengerName: string;
  acceptorName: string;
  challengerSelection: string; // "over" | "under" | "away" | "home"
  acceptorSelection: string; // "over" | "under" | "away" | "home"
  wagerAmount: number;
  gameId: string;
  propId: string;
  dateProposed: string;
  dateAccepted: string;
  type: string;
  _id: string;

  voided: boolean;
}
