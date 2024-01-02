import {
  Owner,
  PlayoffData,
  RegSznData,
  YearDataObject,
  YearlyOwnerData,
  CombinedData
} from "../../../redux/owners/interfaces"

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@ MAIN INITIALIZER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// loop through owners, loop through years for each owner, calculate
export function staticDataInit(owners: Owner[]) {
  const ownerObjectsList = []
  // loop through owners HERE
  for (let i = 0; i < owners.length; i++) {
    const ownerObject = {
      ownerName: owners[i].ownerName,
      id: owners[i].id,
      yearly: {},
      allTime: {}
      // h2h: {}
    }

    const currentOwner = owners[i]
    const yearsPresent = getYearsParticipated(currentOwner).yearsParticipated
    const yearsAbsent = getYearsParticipated(currentOwner).yearsNotParticipated
    const allYears = [...yearsPresent, ...yearsAbsent]

    // loop through years for each owner HERE (YEARLY)
    for (let i = 0; i < allYears.length; i++) {
      const year = allYears[i]
      if (yearsPresent.includes(year)) {
        const yearObject = calcYearlyStats(currentOwner, year)
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
    // ownersObject
    ownerObjectsList.push({ ...ownerObject })
  }
  return ownerObjectsList
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// MAIN FUNCTION YEARLY
function calcYearlyStats(owner: Owner, year: string): YearlyOwnerData {
  // // yearly regSzn stats **********************************
  const regSznStats = yearlyRegSznStats(owner, year)
  // // yearly playoff stats **********************************
  const playoffStats = yearlyPlayoffStats(owner, year)
  // // yearly combined **********************************
  const combinedStats = yearlyCombinedStats(regSznStats, playoffStats)
  // COMBINED GOES HERE

  return {
    [year as string]: {
      participated: true,
      regSznStats,
      playoffStats,
      combinedStats
      // combined: "Combined"
    } as YearDataObject
  }
}
// MAIN FUNCTION ALL-TIME (ADD RETURN TYPE)
function calcAllTimeStats(owner: Owner) {
  // PO Data ****************************************
  const allTimePlayoffData = allTimePlayoffStats(owner) // call function

  // RS DATA *****************************************
  const allTimeRSData = allTimeRegSznStats(owner) // call function

  // Combined Data ***********************************
  const allTimeCombinedData = allTimeRegSznStats(owner) // call function

  return {
    regSzn: allTimeRSData,
    playoffs: allTimePlayoffData,
    combined: allTimeCombinedData
  }
}
// MAIN FUNCTION H2H (ADD RETURN TYPE)
function calcH2HStats(owner: Owner) {
  console.log("H2H")
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
      GamesPlayed: regSznData.RSGamesPlayed + playoffData.POGamesPlayed,
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
      GamesPlayed: regSznData.RSGamesPlayed,
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
    RSpointsAgainst: Number(RSpointsAgainst.toFixed(2)),
    RSpointsFor: Number(RSpointsFor.toFixed(2)),
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
    POGamesPlayed,
    RSavgPA: Number((POpointsAgainst / POGamesPlayed).toFixed(2)),
    RSavgPF: Number((POpointsFor / POGamesPlayed).toFixed(2)),
    POlosses,
    POpointsAgainst: Number(POpointsAgainst.toFixed(2)),
    POpointsFor: Number(POpointsFor.toFixed(2)),
    RSwinningPct: Number(((POwins / POGamesPlayed) * 100).toFixed(2)),
    POwins
  }
}
// Called from calcAllTimeStats
function allTimeCombinedStats(owner: Owner) {
  console.log("COMBINED ALL-TIME")
}

// Helper
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

// might have to change to this for staticData
/*
  owner: {
    yearly: {
      2014: {data},
      2015: {data},
      2016: {data},
    },
    allTime: {
      regSzn: {data},
      playoffs: {data},
      combined: {data}
    },
    h2h: {
      regSzn: {data},
      playoffs: {data},
      combined: {data}
    }

  }
*/
