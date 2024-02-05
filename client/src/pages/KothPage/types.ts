export interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

export interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
  topScorer: number
  weekEliminated: number | string
  weeklyScores: WeeklyScores
}

export interface WeeklyScores {
  [week: string]: {
    points: number
    totalStrikes: number
    strike: boolean
    topScorer: boolean
  }
}

export interface Conversion {
  [week: string]: number
}

export const weekKeysConversion: Conversion = {
  weekOne: 1,
  weekTwo: 2,
  weekThree: 3,
  weekFour: 4,
  weekFive: 5,
  weekSix: 6,
  weekSeven: 7,
  weekEight: 8,
  weekNine: 9,
  weekTen: 10,
  weekEleven: 11,
  weekTwelve: 12,
  weekThirteen: 13,
  weekFourteen: 14
}
