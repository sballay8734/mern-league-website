interface User {
  _id: string;
  email: string;
  firstName: string;
  lastInitial: string;
  avatar: string;
  preferredTheme: string;
  isAdmin: boolean;
  isCommissioner: boolean;
  fullName: string;
}

export interface UpdateProp {
  prop: PropToDbInterface;
  action: string;
}

export interface PickCardProps {
  item: PropToDbInterface;
  user: User;
  // triggerRefetch: boolean
  // setTriggerRefetch: (item: boolean) => void
}

export interface PropToDbInterface {
  type: string;
  league: string;
  subType?: string;
  player?: string;
  gameId: string;
  expiration: string;
  uniqueId: string;
  week: number;
  year: number;
  line: number;
  _id: string;

  overData?: { overLine: number; overPayout: number; calcOverPayout: number };
  underData?: {
    underLine: number;
    underPayout: number;
    calcUnderPayout: number;
  };
  overSelections?: string[];
  underSelections?: string[];

  homeTeam?: string;
  awayTeam?: string;

  homeData?: {
    homeTeam: string;
    homeLine: number;
    homePayout: number;
    calcHomePayout: number;
  };
  awayData?: {
    awayTeam: string;
    awayLine: number;
    awayPayout: number;
    calcAwayPayout: number;
  };
  homeLineSelections?: string[];
  awayLineSelections?: string[];

  awayScoreResult?: number;
  homeScoreResult?: number;

  result?: number;

  voided: boolean;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastInitial: string;
  avatar: string;
  preferredTheme: string;
  isAdmin: boolean;
  isCommissioner: boolean;
  fullName: string;
}

export interface PropChallenge {
  challengerName: string;
  acceptorName: string;
  challengerSelection: string; // "over" | "under" | "away" | "home"
  acceptorSelection: string; // "over" | "under" | "away" | "home"
  wagerAmount: number;
  _id: string;

  voided: boolean;
}

export interface ChallengeAcceptProps {
  challenge: PropChallenge;
  item: PropToDbInterface;
  user: User;
  // triggerRefetch: boolean
  // setTriggerRefetch: (item: boolean) => void
}
