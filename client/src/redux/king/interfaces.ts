interface StandingObject {
  ownerName: string
  strikes: number
  totalPF: number
}

export interface IKothStanding {
  year: number
  standings: StandingObject[]
}

interface ResultObject {
  ownerName: string
  points: number
}

export interface IWeeklyResult {
  year: number
  week: number
  results: ResultObject[]
}
