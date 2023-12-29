import { Owner } from "../../../redux/owners/interfaces"
import { OwnerData } from "../../../redux/owners/interfaces"

// MAIN INITIALIZERS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export function staticDataInit(owners: Owner[]) {
  for (let i = 0; i < owners.length; i++) {
    const ownerObject: OwnerData = {
      ownerName: owners[i].ownerName,
      id: owners[i].id
    }
    const currentOwner = owners[i]
    const years = getYearsParticipated(currentOwner)

    // calculate yearly stats *************************************************
    for (let i = 0; i < years.length; i++) {
      // TS ERROR (Working but need to fix)
      // SHOULD RETURN 2017: {participated: false}
      ownerObject[Number(years[i])] = calcAndUpdateStats(currentOwner, years[i])
    }

    return ownerObject
  }
}

export function yearlyStaticDataInit(owner: Owner, year: number) {
  if (owner[year].participated === false) {
    console.log(`${owner.ownerName} did not participate in ${year}`)
    return
  }

  // otherwise, RUN ALL UPDATE FUNCTIONS
  console.log(`${owner.ownerName} ${year}`)
}

// MAIN INITIALIZERS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Helpers ********************************************************************
// function allTimeStats(owner: Owner) {
//   let totalYears = 0
//   let totalByeWeeks = 0

//   let regSznPoints = 0
//   let regSznGames = 0

//   let playoffPoints = 0
//   let playoffGames = 0

//   let totalTies = 0

//   let regSznWins = 0
//   let regSznLosses = 0
//   let playoffWins = 0
//   let playoffLosses = 0

//   const years = Object.keys(owner)
//   // Loop through YEARS
//   for (let i = 0; i < years.length; i++) {
//     if (years[i].slice(0, 2) !== "20") continue
//     const currentYear = Number(years[i])

//     if (owner[currentYear].participated === false) continue
//     totalYears++

//     const regularSeasonValues = Object.values(owner[currentYear].regularSeason)
//     const playoffValues = Object.values(owner[currentYear].playoffs)

//     // loop through REGSZN games
//     for (const weekObject of regularSeasonValues) {
//       if (!weekObject) continue

//       // wins/losses logic
//       if (Number(weekObject.pointsFor) > Number(weekObject.pointsAgainst)) {
//         regSznWins++
//       } else if (
//         Number(weekObject.pointsFor) < Number(weekObject.pointsAgainst)
//       ) {
//         regSznLosses++
//       } else if (
//         Number(weekObject.pointsFor) === Number(weekObject.pointsAgainst)
//       ) {
//         totalTies++
//       }

//       regSznPoints += Number(weekObject.pointsFor)
//       regSznGames++
//     }
//     // loop through PLAYOFF games
//     for (const roundObject of playoffValues) {
//       if (!roundObject) continue
//       if (roundObject.participated === false) continue
//       if (roundObject.bye && roundObject.bye === true) {
//         totalByeWeeks++
//         continue
//       }

//       // wins/losses logic
//       if (Number(roundObject.pointsFor) > Number(roundObject.pointsAgainst)) {
//         playoffWins++
//       } else if (
//         Number(roundObject.pointsFor) < Number(roundObject.pointsAgainst)
//       ) {
//         playoffLosses++
//       } else if (
//         Number(roundObject.pointsFor) === Number(roundObject.pointsAgainst)
//       ) {
//         totalTies++
//       }

//       playoffPoints += Number(roundObject.pointsFor)
//       playoffGames++
//     }
//   }

//   // Return items
//   const averageTotalPointsPerYear = Number(
//     ((regSznPoints + playoffPoints) / totalYears).toFixed(2)
//   )
//   const averagePlayoffPointsPerMatch = Number(
//     (playoffPoints / playoffGames).toFixed(2)
//   )
//   const averageRegSznPointsPerMatch = Number(
//     (regSznPoints / regSznGames).toFixed(2)
//   )
//   const allTimeAvgRegSznPointsPerYear = Number(
//     (regSznPoints / totalYears).toFixed(2)
//   )
//   const allTimeWinningPct = Number(
//     (((regSznWins + playoffWins) / (regSznGames + playoffGames)) * 100).toFixed(
//       2
//     )
//   )
//   const allTimeRegSznWinningPct = Number(
//     ((regSznWins / regSznGames) * 100).toFixed(2)
//   )
//   const allTimePlayoffWinningPct = Number(
//     ((playoffWins / playoffGames) * 100).toFixed(2)
//   )

//   return {
//     ownerName: owner.ownerName,
//     //
//     allTimeTotalPointsFor: Number((regSznPoints + playoffPoints).toFixed(2)),
//     allTimePlayoffPointsFor: Number(playoffPoints.toFixed(2)),
//     allTimeRegSznPointsFor: Number(regSznPoints.toFixed(2)),
//     allTimeAvgTotalPointsForPerYear: averageTotalPointsPerYear,
//     allTimeAvgRegSznPointsForPerYear: allTimeAvgRegSznPointsPerYear,
//     allTimeAvgPlayoffPointsForPerGame: averagePlayoffPointsPerMatch,
//     allTimeAvgRegSznPointsForPerGame: averageRegSznPointsPerMatch,
//     //
//     yearsInLeague: totalYears,
//     allTimeTotalByeWeeks: totalByeWeeks,
//     allTimeTotalPlayoffGames: playoffGames,
//     allTimeTotalRegSznGames: regSznGames,
//     //
//     allTimeWins: regSznWins + playoffWins,
//     allTimeLosses: regSznLosses + playoffLosses,
//     allTimeTies: totalTies,
//     allTimeRegSznWins: regSznWins,
//     allTimeRegSznLosses: regSznLosses,
//     allTimePlayoffWins: playoffWins,
//     allTimePlayoffLosses: playoffLosses,
//     allTimeWinningPct: allTimeWinningPct,
//     allTimeRegSznWinningPct: allTimeRegSznWinningPct,
//     allTimePlayoffWinningPct: allTimePlayoffWinningPct
//     // allTimePlayoffAppearances
//     // allTimePlayoffParticipationRate
//     // allTimeAvgWinsPerSeason
//     // allTimeAvgLosesPerSeason
//     //
//     // allTimeTotalPointsAgainst
//     // allTimePlayoffPointsAgainst
//     // allTimeRegSznPointsAgainst
//     // allTimeAvgTotalPointsAgainstPerYear
//     // allTimeAvgRegSznPointsAgainstPerYear
//     // allTimeAvgPlayoffPointsAgainstPerGame
//     // allTimeAvgRegSznPointsAgainstPerGame
//     // allTimePointDifferential
//   }
// }

function getYearsParticipated(owner: Owner) {
  const yearsParticipated = []

  const yearKeys = Object.keys(owner)
  for (const year of yearKeys) {
    if (year.slice(0, 2) !== "20") continue
    if (owner[Number(year)].participated === false) continue

    yearsParticipated.push(year)
  }

  return yearsParticipated
}

function calcAndUpdateStats(owner: Owner, year: string) {
  // // yearly regSzn stats **********************************
  const regSznStats = yearlyRegSznStats(owner, year)
  // // yearly playoff stats **********************************
  const playoffStats = yearlyPlayoffStats(owner, year)
  // // yearly combined **********************************
  // COMBINED GOES HERE

  // console.log(owner.ownerName, {
  //   [year]: {
  //     regSznStats,
  //     playoffStats,
  //     combined: "Combined"
  //   }
  // })

  return {
    [year]: {
      regSznStats,
      playoffStats,
      combined: "Combined"
    }
  }
}

function yearlyRegSznStats(owner: Owner, year: string) {
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
    pointsFor: RSPointsFor,
    pointsAgainst: RSPointsAgainst,
    RSGamesPlayed: RSGames,
    wins: RSWins,
    losses: RSLosses,
    ties: RSTies,
    avgPF: Number((RSPointsFor / RSGames).toFixed(2)),
    avgPA: Number((RSPointsAgainst / RSGames).toFixed(2)),
    winningPct: Number(((RSWins / RSGames) * 100).toFixed(2))
  }
}

function yearlyPlayoffStats(owner: Owner, year: string) {
  const playoffKeys = Object.values(owner[Number(year)].playoffs)
  // already got valid season, no need to check here
  if (owner[Number(year)].playoffs["roundOne"].participated === false) {
    return {
      playoffs: {
        participated: false
      }
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

// function yearlyCombinedStats(owner: Owner, year: string) {
//   return
// }
