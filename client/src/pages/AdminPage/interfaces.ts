export interface bestWorstWeek {
  ownerName: string
  points: number
  year: number
  during: string
}

export interface streaks {
  ownerName: string
  streak: number
  year: number // needs to be string because it could carry over to next year
  testString: string
}
