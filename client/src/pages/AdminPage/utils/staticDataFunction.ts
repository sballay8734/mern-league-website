import {
  Owner,
  PlayoffData,
  RegSznData,
  YearDataObject,
  YearlyOwnerData,
  CombinedData,
  allTimeRegSznData,
  allTimePlayoffData,
  H2HType,
  PlayoffType,
  CombinedType
} from "../../../redux/owners/interfaces"
import { H2hCombined, H2hPlayoffs, H2hRegSzn } from "../../../types/StaticOwner"

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@ MAIN INITIALIZER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export async function staticDataInit(owners: Owner[]) {
  const ownerObjectsList = []
  // loop through owners HERE
  for (let i = 0; i < owners.length; i++) {
    const ownerObject = {
      ownerName: owners[i].ownerName,
      id: owners[i].id,
      yearly: {},
      allTime: {},
      h2h: {},
      bonusStats: {}
    }

    const currentOwner = owners[i]
    const yearsPresent = getYearsParticipated(currentOwner).yearsParticipated
    const yearsAbsent = getYearsParticipated(currentOwner).yearsNotParticipated
    const allYears = [...yearsPresent, ...yearsAbsent]

    // loop through years for each owner HERE (YEARLY)
    for (let i = 0; i < allYears.length; i++) {
      const year = allYears[i]
      if (yearsPresent.includes(year)) {
        const yearObject = calcYearlyStats(currentOwner, year, owners)
        // const allTimeObject = calcAllTimeStats(currentOwner)
        // const h2hObject = calcH2HStats(currentOwner)
        Object.assign(ownerObject.yearly, yearObject)
      } else {
        const tempObject = {
          [year]: {
            participated: false,
            regSznStats: null,
            playoffStats: null,
            combined: null
          } as YearDataObject
        }
        Object.assign(ownerObject.yearly, tempObject)
      }
    }

    // then do allTime Here
    const allTimeStats = calcAllTimeStats(currentOwner)
    Object.assign(ownerObject.allTime, allTimeStats)

    // then do head to head here
    const h2hStats = calcH2HStats(currentOwner)
    Object.assign(ownerObject.h2h, h2hStats)

    // do bonus stats here
    const bonusStats = calcBonusStats(currentOwner, owners)
    Object.assign(ownerObject.bonusStats, bonusStats)

    ownerObjectsList.push({ ...ownerObject })
  }

  console.log(ownerObjectsList)

  const res = await fetch("/api/update/static", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ownerObjectsList)
  })

  const data = await res.json()

  return data
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// MAIN FUNCTION YEARLY
function calcYearlyStats(
  owner: Owner,
  year: string,
  owners: Owner[]
): YearlyOwnerData {
  // // yearly regSzn stats **********************************
  const regSznStats = yearlyRegSznStats(owner, year)
  // // yearly playoff stats **********************************
  const playoffStats = yearlyPlayoffStats(owner, year)
  // // yearly combined **********************************
  const combinedStats = yearlyCombinedStats(regSznStats, playoffStats)
  // COMBINED GOES HERE
  const everyTeamEveryWeekStats = calcETEWYearly(owner, year, owners)

  return {
    [year as string]: {
      participated: true,
      regSznStats,
      playoffStats,
      combinedStats,
      everyTeamEveryWeekStats
    } as YearDataObject
  }
}
// MAIN FUNCTION ALL-TIME (ADD RETURN TYPE)
export function calcAllTimeStats(owner: Owner) {
  const allTimeRSData = allTimeRegSznStats(owner)

  const allTimePlayoffData = allTimePlayoffStats(owner)

  // Combined Data ***********************************
  const allTimeCombinedData = allTimeCombinedStats(
    allTimePlayoffData,
    allTimeRSData
  )

  return {
    regSzn: allTimeRSData,
    playoffs: allTimePlayoffData,
    combined: allTimeCombinedData
  }
}
// MAIN FUNCTION H2H (ADD RETURN TYPE)
function calcH2HStats(owner: Owner) {
  const regSzn: H2HType = {}
  const playoffs: PlayoffType = {}
  const combined: CombinedType = {}

  const ownerNames: string[] = [
    "Shawn Ballay",
    "Steve Smith",
    "Don Irons",
    "Steve Lloyd",
    "Dante Nocito",
    "Cody Zwier",
    "Jimmy Wagner",
    "Dan George",
    "Dom Nocito",
    "Dom Flipp",
    "Aaron Mackenzie",
    "Joe Kane"
  ]

  for (let i = 0; i < ownerNames.length; i++) {
    const currentCheck = ownerNames[i]

    // if owner === current check, skip
    if (currentCheck === owner.ownerName) continue

    // otherwise calculate all
    const regSznH2HStats = h2hRegSzn(owner, currentCheck)
    regSzn[currentCheck] = regSznH2HStats

    const playoffH2HStats = h2hPlayoffs(owner, currentCheck)
    playoffs[currentCheck] = playoffH2HStats

    const combinedH2HStats = h2hCombined(
      regSzn[currentCheck],
      playoffs[currentCheck]
    )
    combined[currentCheck] = combinedH2HStats
  }
  return {
    regSzn,
    playoffs,
    combined
  }
}
// MAIN FUNCTION BONUS STATS
export function calcBonusStats(owner: Owner, owners: Owner[]) {
  const finishes: number[] = []

  let totalETEWWins = 0
  let totalETEWLosses = 0
  let totalETEWTies = 0
  let championships = 0
  let skirts = 0

  // GOING TO HAVE TO CALCULATE THIS SOMEWHERE ELSE
  let KOTHWins = 0 

  let luckyWs = 0
  let unluckyLs = 0

  let mostWinsSingleYear = 0
  let mostLossesSingleYear = 0

  const yearKeys = Object.keys(owner)

  for (let i = 0; i < yearKeys.length; i++) {
    let RSwins = 0
    let RSLosses = 0

    let yearlyETEWWins = 0
    let yearlyETEWLosses = 0
    let yearlyETEWTies = 0

    const year = Number(yearKeys[i])

    if (year.toString().slice(0, 2) !== "20") continue
    if (owner[year].participated === false) continue

    finishes.push(owner[year].finished)

    if (owner[year].last === true) skirts++

    const regSznKeys = Object.keys(owner[year].regularSeason)

    // loop through Season Games
    for (let i = 0; i < regSznKeys.length; i++) {
      const week = regSznKeys[i]
      const matchup = owner[year].regularSeason[week]
      const win = matchup.pointsFor > matchup.pointsAgainst
      const loss = matchup.pointsFor < matchup.pointsAgainst
      const pointsFor = matchup.pointsFor

      // helper *********************************************
      const pointsArray = getAllPointsForThisWeekRS(year, week, owners)

      const top4 = pointsArray.slice(0, 4).map((item) => item.points)
      const bottom4 = pointsArray.slice(-4).map((item) => item.points)

      if (win && bottom4.includes(pointsFor)) {
        luckyWs++
        RSwins++
      } else if (loss && top4.includes(pointsFor)) {
        unluckyLs++
        RSLosses++
      } else if (win) {
        RSwins++
      } else if (loss) {
        RSLosses++
      }

      // cumulative record logic ********************************************
      for (let i = 0; i < pointsArray.length; i++) {
        const current = pointsArray[i]

        if (current.ownerName === owner.ownerName) continue

        if (pointsFor > current.points) yearlyETEWWins++
        if (pointsFor < current.points) yearlyETEWLosses++
        if (pointsFor === current.points) yearlyETEWTies++
      }
    }
    if (RSwins > mostWinsSingleYear) {
      mostWinsSingleYear = RSwins
    }

    if (RSLosses > mostLossesSingleYear) {
      mostLossesSingleYear = RSLosses
    }

    totalETEWLosses += yearlyETEWLosses
    totalETEWWins += yearlyETEWWins
    totalETEWTies += yearlyETEWTies

    // check if owner won finals
    const finals = owner[year].playoffs["finalRound"]
    if (finals.participated === true && finals.pointsFor! > finals.pointsAgainst!) {
      championships++
    }
    
  }

  const avgFinish =
    finishes.reduce((acc, num) => acc + num, 0) / finishes.length

  return {
    luckyWins: luckyWs,
    unluckyLosses: unluckyLs,
    mostWinsOneSeason: mostWinsSingleYear,
    mostLossesOneSeason: mostLossesSingleYear,
    avgFinishPlace: Number(avgFinish.toFixed(2)),
    championships: championships,
    skirts: skirts,
    everyTeamEveryWeek: {
      wins: totalETEWWins,
      ties: totalETEWTies,
      losses: totalETEWLosses,
      winPct: Number(
        (
          (totalETEWWins / (totalETEWWins + totalETEWTies + totalETEWLosses)) *
          100
        ).toFixed(2)
      )
    }
  }
}

// YEARLY **********************************************************************
// Called from calcYearlyStats
function yearlyRegSznStats(owner: Owner, year: string): RegSznData {
  const regSznKeys = Object.values(owner[Number(year)].regularSeason)
  // already got valid season, no need to check here

  let RSPointsFor = 0
  let RSPointsAgainst = 0

  let RSGames = 0
  let RSWins = 0
  let RSLosses = 0
  let RSTies = 0

  for (const game of regSznKeys) {
    RSPointsFor += game.pointsFor
    RSPointsAgainst += game.pointsAgainst

    if (game.pointsFor > game.pointsAgainst) {
      RSWins++
    } else if (game.pointsFor < game.pointsAgainst) {
      RSLosses++
    } else if (game.pointsFor === game.pointsAgainst) {
      RSTies++
    }

    RSGames++
  }

  return {
    RSGamesPlayed: RSGames,
    avgPA: Number((RSPointsAgainst / RSGames).toFixed(2)),
    avgPF: Number((RSPointsFor / RSGames).toFixed(2)),
    losses: RSLosses,
    pointsAgainst: RSPointsAgainst,
    pointsFor: RSPointsFor,
    ties: RSTies,
    wins: RSWins,
    winningPct: Number(((RSWins / RSGames) * 100).toFixed(2))
  }
}
// Called from calcYearlyStats
function yearlyPlayoffStats(owner: Owner, year: string): PlayoffData {
  const playoffKeys = Object.values(owner[Number(year)].playoffs)
  // already got valid season, no need to check here
  if (owner[Number(year)].playoffs["roundOne"].participated === false) {
    return {
      participated: false
    }
  }

  let POPointsFor = 0
  let POPointsAgainst = 0

  let POGames = 0
  let POWins = 0
  let POLosses = 0
  let RSTies = 0
  let POByes = 0

  for (const game of playoffKeys) {
    if (!game) continue
    if (game.participated === false) continue
    if (game.bye && game.bye === true) {
      POByes++
      continue
    }

    if (game.pointsFor !== null && game.pointsAgainst !== null) {
      POPointsFor += game.pointsFor
      POPointsAgainst += game.pointsAgainst

      if (game.pointsFor > game.pointsAgainst) {
        POWins++
      } else if (game.pointsFor < game.pointsAgainst) {
        POLosses++
      } else if (game.pointsFor === game.pointsAgainst) {
        RSTies++
      }

      POGames++
    }
  }

  return {
    participated: true,
    pointsFor: POPointsFor,
    pointsAgainst: POPointsAgainst,
    POGamesPlayed: POGames,
    wins: POWins,
    losses: POLosses,
    ties: RSTies,
    avgPF: Number((POPointsFor / POGames).toFixed(2)),
    avgPA: Number((POPointsAgainst / POGames).toFixed(2)),
    winningPct: Number(((POWins / POGames) * 100).toFixed(2)),
    POByes: POByes
  }
}
// Called from calcYearlyStats
function yearlyCombinedStats(
  regSznData: RegSznData,
  playoffData: PlayoffData
): CombinedData {
  if (
    playoffData &&
    playoffData.POGamesPlayed &&
    playoffData.participated === true
  ) {
    const combinedData = {
      pointsFor: regSznData.pointsFor + playoffData.pointsFor!,
      pointsAgainst: regSznData.pointsAgainst + playoffData.pointsAgainst!,
      gamesPlayed: regSznData.RSGamesPlayed + playoffData.POGamesPlayed,
      wins: regSznData.wins + playoffData.wins!,
      losses: regSznData.losses + playoffData.losses!,
      ties: regSznData.ties,
      avgPF: Number(
        (
          (regSznData.pointsFor + playoffData.pointsFor!) /
          (regSznData.RSGamesPlayed + playoffData.POGamesPlayed)
        ).toFixed(2)
      ),
      avgPA: Number(
        (
          (regSznData.pointsAgainst + playoffData.pointsAgainst!) /
          (regSznData.RSGamesPlayed + playoffData.POGamesPlayed)
        ).toFixed(2)
      ),
      winningPct: Number(
        (
          ((regSznData.wins + playoffData.wins!) /
            (regSznData.RSGamesPlayed + playoffData.POGamesPlayed!)) *
          100
        ).toFixed(2)
      )
    }
    return combinedData
  } else {
    const combinedData = {
      pointsFor: regSznData.pointsFor,
      pointsAgainst: regSznData.pointsAgainst,
      gamesPlayed: regSznData.RSGamesPlayed,
      wins: regSznData.wins,
      losses: regSznData.losses,
      ties: regSznData.ties,
      avgPF: Number(
        (regSznData.pointsFor / regSznData.RSGamesPlayed).toFixed(2)
      ),
      avgPA: Number(
        (regSznData.pointsAgainst / regSznData.RSGamesPlayed).toFixed(2)
      ),
      winningPct: Number(
        ((regSznData.wins / regSznData.RSGamesPlayed) * 100).toFixed(2)
      )
    }
    return combinedData
  }
}

// ALL-TIME ********************************************************************
// Called from calcAllTimeStats
function allTimeRegSznStats(owner: Owner) {
  let RSGamesPlayed = 0
  let RSlosses = 0
  let RSpointsAgainst = 0
  let RSpointsFor = 0
  let RSties = 0
  let RSwins = 0

  const yearKeys = Object.keys(owner)

  for (let i = 0; i < yearKeys.length; i++) {
    const year = Number(yearKeys[i])
    if (year.toString().slice(0, 2) !== "20") continue
    if (owner[year].participated === false) continue

    const regSznKeys = Object.keys(owner[year].regularSeason)

    for (let i = 0; i < regSznKeys.length; i++) {
      const week = regSznKeys[i]
      const pointsFor = owner[year].regularSeason[week].pointsFor
      const pointsAgainst = owner[year].regularSeason[week].pointsAgainst

      if (pointsFor > pointsAgainst) RSwins++
      if (pointsFor < pointsAgainst) RSlosses++
      if (pointsFor === pointsAgainst) RSties++

      RSGamesPlayed++
      RSpointsFor += pointsFor
      RSpointsAgainst += pointsAgainst
    }
  }

  return {
    RSGamesPlayed,
    RSavgPA: Number((RSpointsAgainst / RSGamesPlayed).toFixed(2)),
    RSavgPF: Number((RSpointsFor / RSGamesPlayed).toFixed(2)),
    RSlosses,
    RSPA: Number(RSpointsAgainst.toFixed(2)),
    RSPF: Number(RSpointsFor.toFixed(2)),
    RSties,
    RSwinningPct: Number(((RSwins / RSGamesPlayed) * 100).toFixed(2)),
    RSwins
  }
}
// Called from calcAllTimeStats
function allTimePlayoffStats(owner: Owner) {
  let POGamesPlayed = 0
  let POlosses = 0
  let POpointsAgainst = 0
  let POpointsFor = 0
  let POwins = 0

  const yearKeys = Object.keys(owner)

  for (let i = 0; i < yearKeys.length; i++) {
    const year = Number(yearKeys[i])
    if (year.toString().slice(0, 2) !== "20") continue
    if (owner[year].participated === false) continue

    const playoffKeys = Object.keys(owner[year].playoffs)

    for (let i = 0; i < playoffKeys.length; i++) {
      const week = playoffKeys[i]

      const participated = owner[year].playoffs[week].participated
      const bye = owner[year].playoffs[week].bye
      const pointsFor = owner[year].playoffs[week].pointsFor
      const pointsAgainst = owner[year].playoffs[week].pointsAgainst

      if (participated === false) continue
      if (bye === true) continue

      if (pointsFor && pointsAgainst) {
        if (pointsFor > pointsAgainst) POwins++
        if (pointsFor < pointsAgainst) POlosses++

        POGamesPlayed++
        POpointsAgainst += pointsAgainst
        POpointsFor += pointsFor
      }
    }
  }

  return {
    POGamesPlayed: POGamesPlayed || 0,
    POavgPA: Number((POpointsAgainst / POGamesPlayed).toFixed(2)) || 0,
    POavgPF: Number((POpointsFor / POGamesPlayed).toFixed(2)) || 0,
    POlosses: POlosses || 0,
    POpointsAgainst: Number(POpointsAgainst.toFixed(2)) || 0,
    POpointsFor: Number(POpointsFor.toFixed(2)) || 0,
    POwinningPct: Number(((POwins / POGamesPlayed) * 100).toFixed(2)) || 0,
    POwins: POwins || 0
  }
}
// Called from calcAllTimeStats
function allTimeCombinedStats(
  playoffData: allTimePlayoffData,
  regSznData: allTimeRegSznData
) {
  // if owner never made playoffs (DANTE)
  if (playoffData.POGamesPlayed === 0) {
    return {
      gamesPlayed: regSznData.RSGamesPlayed,
      avgPA: regSznData.RSavgPA,
      avgPF: regSznData.RSavgPF,
      losses: regSznData.RSlosses,
      pointsAgainst: regSznData.RSPA,
      pointsFor: regSznData.RSPF,
      ties: regSznData.RSties,
      winningPct: regSznData.RSwinningPct,
      wins: regSznData.RSwins
    }
    // if they have (EVERYONE ELSE)
  } else {
    return {
      gamesPlayed: regSznData.RSGamesPlayed + playoffData.POGamesPlayed,
      avgPA: Number(
        (
          (regSznData.RSPA + playoffData.POpointsAgainst) /
          (regSznData.RSGamesPlayed + playoffData.POGamesPlayed)
        ).toFixed(2)
      ),
      avgPF: Number(
        (
          (regSznData.RSPF + playoffData.POpointsFor) /
          (regSznData.RSGamesPlayed + playoffData.POGamesPlayed)
        ).toFixed(2)
      ),
      losses: regSznData.RSlosses + playoffData.POlosses,
      pointsAgainst: Number(
        (regSznData.RSPA + playoffData.POpointsAgainst).toFixed(2)
      ),
      pointsFor: Number((regSznData.RSPF + playoffData.POpointsFor).toFixed(2)),
      ties: regSznData.RSties,
      winningPct: Number(
        (
          ((regSznData.RSwins + playoffData.POwins) /
            (regSznData.RSGamesPlayed + playoffData.POGamesPlayed)) *
          100
        ).toFixed(2)
      ),
      wins: regSznData.RSwins + playoffData.POwins
    }
  }
}

// H2H *************************************************************************
// Called from calcH2HStats
function h2hRegSzn(owner: Owner, owner2: string): H2hRegSzn {
  const opponent = owner2
  let RSgamesPlayed = 0
  let wins = 0
  let losses = 0
  let ties = 0
  let totalPointsFor = 0
  let totalPointsAgainst = 0
  let bestWeek = 0
  let worstWeek = 1000

  const yearKeys = Object.keys(owner)

  for (let i = 0; i < yearKeys.length; i++) {
    const year = Number(yearKeys[i])
    if (year.toString().slice(0, 2) !== "20") continue
    if (owner[year].participated === false) continue

    // loop through matchups to find owner2
    const regSznKeys = Object.keys(owner[year].regularSeason)

    for (let i = 0; i < regSznKeys.length; i++) {
      const week = regSznKeys[i]
      const matchupOpponent = owner[year].regularSeason[week].opponent
      const pointsFor = owner[year].regularSeason[week].pointsFor
      const pointsAgainst = owner[year].regularSeason[week].pointsAgainst

      if (matchupOpponent !== opponent) continue

      if (pointsFor > pointsAgainst) wins++
      if (pointsFor < pointsAgainst) losses++
      if (pointsFor === pointsAgainst) ties++
      if (pointsFor > bestWeek) bestWeek = pointsFor
      if (pointsFor < worstWeek) worstWeek = pointsFor

      totalPointsFor += pointsFor
      totalPointsAgainst += pointsAgainst
      RSgamesPlayed++
    }
  }
  return {
    RSgamesPlayed,
    wins,
    losses,
    ties,
    totalPointsFor: Number(totalPointsFor.toFixed(2)),
    totalPointsAgainst: Number(totalPointsAgainst.toFixed(2)),
    avgPF: Number((totalPointsFor / RSgamesPlayed).toFixed(2)),
    winningPct: Number(((wins / (wins + losses + ties)) * 100).toFixed(2)),
    bestWeek: Number(bestWeek.toFixed(2)),
    worstWeek: Number(worstWeek.toFixed(2)),
  }
}
// Called from calcH2HStats
function h2hPlayoffs(owner: Owner, owner2: string): H2hPlayoffs {
  const opponent = owner2
  let POgamesPlayed = 0
  let wins = 0
  let losses = 0
  let ties = 0
  let totalPointsFor = 0
  let totalPointsAgainst = 0
  let bestWeek = 0
  let worstWeek = 1000

  const yearKeys = Object.keys(owner)

  for (let i = 0; i < yearKeys.length; i++) {
    const year = Number(yearKeys[i])
    if (year.toString().slice(0, 2) !== "20") continue
    if (owner[year].participated === false) continue

    // loop through matchups to find owner2
    const playoffKeys = Object.keys(owner[year].playoffs)

    for (let i = 0; i < playoffKeys.length; i++) {
      const week = playoffKeys[i]
      const participated = owner[year].playoffs[week].participated
      const bye = owner[year].playoffs[week].bye
      const matchupOpponent = owner[year].playoffs[week].opponent
      const pointsFor = owner[year].playoffs[week].pointsFor
      const pointsAgainst = owner[year].playoffs[week].pointsAgainst

      if (matchupOpponent !== opponent) continue
      if (bye === true || participated === false) continue

      if (pointsFor && pointsAgainst) {
        if (pointsFor > pointsAgainst) wins++
        if (pointsFor < pointsAgainst) losses++
        if (pointsFor === pointsAgainst) ties++
        if (pointsFor > bestWeek) bestWeek = pointsFor
        if (pointsFor < worstWeek) worstWeek = pointsFor

        totalPointsFor += pointsFor
        totalPointsAgainst += pointsAgainst
        POgamesPlayed++
      }
    }
  }
  return {
    POgamesPlayed,
    wins,
    losses,
    ties,
    totalPointsFor: Number(totalPointsFor.toFixed(2)),
    avgPF: Number((totalPointsFor / POgamesPlayed).toFixed(2)),
    totalPointsAgainst: Number(totalPointsAgainst.toFixed(2)),
    winningPct: Number(((wins / (wins + losses + ties)) * 100).toFixed(2)),
    bestWeek: Number(bestWeek.toFixed(2)),
    worstWeek: Number(worstWeek.toFixed(2))
  }
}
// Called from calcH2HStats
function h2hCombined(
  regSznData: H2hRegSzn,
  playoffData: H2hPlayoffs
): H2hCombined {
  if (playoffData.POgamesPlayed === 0) {
    return {
      gamesPlayed: regSznData.RSgamesPlayed,
      wins: regSznData.wins,
      losses: regSznData.losses,
      ties: regSznData.ties,
      avgPF: Number((regSznData.totalPointsFor / regSznData.RSgamesPlayed).toFixed(2)),
      totalPointsFor: Number(regSznData.totalPointsFor.toFixed(2)),
      totalPointsAgainst: Number(regSznData.totalPointsAgainst.toFixed(2)),
      winningPct: Number(regSznData.winningPct.toFixed(2)),
      bestWeek: regSznData.bestWeek,
      worstWeek: regSznData.worstWeek
    }
  } else {
    return {
      gamesPlayed: regSznData.RSgamesPlayed + playoffData.POgamesPlayed,
      wins: regSznData.wins + playoffData.wins,
      losses: regSznData.losses + playoffData.losses,
      ties: regSznData.ties + playoffData.ties,
      avgPF: Number(((regSznData.totalPointsFor + playoffData.totalPointsFor) / (regSznData.RSgamesPlayed + playoffData.POgamesPlayed)).toFixed(2)),
      totalPointsFor: Number(
        (regSznData.totalPointsFor + playoffData.totalPointsFor).toFixed(2)
      ),
      totalPointsAgainst: Number(
        (
          regSznData.totalPointsAgainst + playoffData.totalPointsAgainst
        ).toFixed(2)
      ),
      winningPct: Number(
        (
          ((regSznData.wins + playoffData.wins) /
            (regSznData.RSgamesPlayed + playoffData.POgamesPlayed)) *
          100
        ).toFixed(2)
      ),
      bestWeek: (regSznData.bestWeek > playoffData.bestWeek ? regSznData.bestWeek : playoffData.bestWeek),
      worstWeek: (regSznData.worstWeek < playoffData.worstWeek ? regSznData.worstWeek : playoffData.worstWeek),

    }
  }
}

// Helpers ---------------------------------------------------------------------
function getYearsParticipated(owner: Owner) {
  const yearsParticipated = []
  const yearsNotParticipated = []

  const yearKeys = Object.keys(owner)
  for (const year of yearKeys) {
    if (year.slice(0, 2) !== "20") continue
    if (owner[Number(year)].participated === false) {
      yearsNotParticipated.push(year)
      continue
    }

    yearsParticipated.push(year)
  }

  return { yearsParticipated, yearsNotParticipated }
}

type UnaccountedScores = {
  [year: number]: {
    [week: string]: number[]
  }
}

type WeeklyScore = {
  ownerName: string
  points: number
}

function getAllPointsForThisWeekRS(
  year: number,
  week: string,
  owners: Owner[]
) {
  // YEARS WITH 10 (2014, 2015, 2017)
  // When non-league member played non-league member
  const UNACCOUNTED_RS_SCORES: UnaccountedScores = {
    2014: {
      weekOne: [110, 97],
      weekSeven: [146, 83],
      weekNine: [121, 99],
      weekThirteen: [137, 122]
    },
    2015: {
      weekThree: [170, 84],
      weekTwelve: [141, 122]
    },
    2016: {
      weekTen: [105, 93]
    }
  }

  const ownerNames: string[] = [
    "Shawn Ballay",
    "Steve Smith",
    "Don Irons",
    "Steve Lloyd",
    "Dante Nocito",
    "Cody Zwier",
    "Jimmy Wagner",
    "Dan George",
    "Dom Nocito",
    "Dom Flipp",
    "Aaron Mackenzie",
    "Joe Kane"
  ]

  const weeklyScores: WeeklyScore[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]

    if (currentOwner[year].participated === false) continue
    const matchup = currentOwner[year].regularSeason[week]

    if (ownerNames.includes(matchup.opponent)) {
      weeklyScores.push({
        ownerName: currentOwner.ownerName,
        points: matchup.pointsFor
      })
    } else {
      weeklyScores.push({
        ownerName: currentOwner.ownerName,
        points: matchup.pointsFor
      })
      weeklyScores.push({
        ownerName: currentOwner.ownerName,
        points: matchup.pointsAgainst
      })
    }
  }

  const needToAddScores = UNACCOUNTED_RS_SCORES[Number(year)]?.[week]

  if (needToAddScores !== undefined) {
    for (const score of needToAddScores) {
      weeklyScores.push({ ownerName: "NIL", points: score })
    }
  }

  weeklyScores.sort((a, b) => b.points - a.points)

  return weeklyScores
}

function calcETEWYearly(owner: Owner, year: string, owners: Owner[]) {
  let yearlyETEWWins = 0
  let yearlyETEWLosses = 0
  let yearlyETEWTies = 0

  const currentYear = Number(year)

  const regSznKeys = Object.keys(owner[currentYear].regularSeason)

  // loop through Season Games
  for (let i = 0; i < regSznKeys.length; i++) {
    const week = regSznKeys[i]
    const matchup = owner[currentYear].regularSeason[week]
    const pointsFor = matchup.pointsFor

    // helper *********************************************
    const pointsArray = getAllPointsForThisWeekRS(currentYear, week, owners)

    // cumulative record logic ********************************************
    for (let i = 0; i < pointsArray.length; i++) {
      const current = pointsArray[i]

      if (current.ownerName === owner.ownerName) continue

      if (pointsFor > current.points) yearlyETEWWins++
      if (pointsFor < current.points) yearlyETEWLosses++
      if (pointsFor === current.points) yearlyETEWTies++
    }
  }

  return {
    ETEWWins: yearlyETEWWins,
    ETEWLosses: yearlyETEWLosses,
    ETEWTies: yearlyETEWTies,
    ETEWWinPct: Number(
      (
        (yearlyETEWWins /
          (yearlyETEWWins + yearlyETEWLosses + yearlyETEWTies)) *
        100
      ).toFixed(2)
    )
  }
}
