import {
  Owner,
  PlayoffData,
  RegSznData,
  YearDataObject,
  YearlyOwnerData
} from "../../../redux/owners/interfaces"

// MAIN INITIALIZER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// loop through owners, loop through years for each owner, calculate
export function staticDataInit(owners: Owner[]) {
  const ownerObjectsList = []
  // loop through owners HERE
  for (let i = 0; i < owners.length; i++) {
    const ownerObject = {
      ownerName: owners[i].ownerName,
      id: owners[i].id
    }
    const yearObjects: YearlyOwnerData = {}

    const currentOwner = owners[i]
    const yearsPresent = getYearsParticipated(currentOwner).yearsParticipated
    const yearsAbsent = getYearsParticipated(currentOwner).yearsNotParticipated
    const allYears = [...yearsPresent, ...yearsAbsent]

    // loop through years for each owner HERE
    for (let i = 0; i < allYears.length; i++) {
      const year = allYears[i]
      if (yearsPresent.includes(year)) {
        const yearObject = calcAndUpdateStats(currentOwner, year)
        Object.assign(yearObjects, yearObject)
      } else {
        const tempObject = {
          [year]: {
            participated: false,
            regSznStats: null,
            playoffStats: null,
            combined: null
          } as YearDataObject
        }
        Object.assign(yearObjects, tempObject)
      }
    }
    ownerObjectsList.push({ ...ownerObject, ...yearObjects })
  }
  return ownerObjectsList
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Calculate all stats for each owner passed to it
function calcAndUpdateStats(owner: Owner, year: string): YearlyOwnerData {
  // // yearly regSzn stats **********************************
  const regSznStats = yearlyRegSznStats(owner, year)
  // // yearly playoff stats **********************************
  const playoffStats = yearlyPlayoffStats(owner, year)
  // // yearly combined **********************************
  // COMBINED GOES HERE

  return {
    [year as string]: {
      participated: true,
      regSznStats,
      playoffStats
      // combined: "Combined"
    } as YearDataObject
  }
}

// Called from calcAndUpdateStats
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
// Called from calcAndUpdateStats
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

// function yearlyCombinedStats(owner: Owner, year: string) {
//   return
// }

// might have to change to
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
