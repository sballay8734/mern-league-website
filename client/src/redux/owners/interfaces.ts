export interface Owner {
  ownerName: string
  id: number
  [year: number]: YearObject
}

interface YearObject {
  participated: boolean
  wins: number
  losses: number
  ties: number
  last: boolean
  finished: number
  regularSeason: RegSznObject
  playoffs: PlayoffsObject
}

interface RegSznObject {
  [week: string]: RegSznWeekObject
}

interface PlayoffsObject {
  [round: string]: PlayoffWeekObject
}

interface RegSznWeekObject {
  pointsFor: number
  pointsAgainst: number
  opponent: string
}

interface PlayoffWeekObject {
  roundOne: RoundOneObject
  [round: string]: RoundObject
}

interface RoundOneObject extends RoundObject {
  bye?: boolean
}

interface RoundObject {
  participated: boolean
  pointsFor: number | null
  pointsAgainst: number | null
  opponent: string | null
}
