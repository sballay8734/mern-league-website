import { Owner } from "../../../redux/owners/interfaces"

// MAIN INITIALIZERS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export function allTimeStaticDataInit(owners: Owner[]) {
  for (let i = 0; i < owners.length; i++) {
    console.log(allTimePointsFor(owners[i]))
  }
}

export function yearlyStaticDataInit(owners: Owner[]) {
  for (let i = 0; i < owners.length; i++) {
    const years = Object.keys(owners[i])
    for (let i = 0; i < years.length; i++) {
      if (years[i].slice(0, 2) !== "20") continue

      // otherwise, RUN ALL UPDATE FUNCTIONS
      console.log(years[i])
    }
  }
}

// Helpers ********************************************************************
function allTimePointsFor(owner: Owner) {
  let totalYears = 0
  let totalByeWeeks = 0

  let regSznPoints = 0
  let regSznGames = 0

  let playoffPoints = 0
  let playoffGames = 0

  let totalTies = 0

  let regSznWins = 0
  let regSznLosses = 0
  let playoffWins = 0
  let playoffLosses = 0

  const years = Object.keys(owner)
  // Loop through YEARS
  for (let i = 0; i < years.length; i++) {
    if (years[i].slice(0, 2) !== "20") continue
    const currentYear = Number(years[i])

    if (owner[currentYear].participated === false) continue
    totalYears++

    const regularSeasonValues = Object.values(owner[currentYear].regularSeason)
    const playoffValues = Object.values(owner[currentYear].playoffs)

    // loop through REGSZN games
    for (const weekObject of regularSeasonValues) {
      if (!weekObject) continue

      // wins/losses logic
      if (Number(weekObject.pointsFor) > Number(weekObject.pointsAgainst)) {
        regSznWins++
      } else if (
        Number(weekObject.pointsFor) < Number(weekObject.pointsAgainst)
      ) {
        regSznLosses++
      } else if (
        Number(weekObject.pointsFor) === Number(weekObject.pointsAgainst)
      ) {
        totalTies++
      }

      regSznPoints += Number(weekObject.pointsFor)
      regSznGames++
    }
    // loop through PLAYOFF games
    for (const roundObject of playoffValues) {
      if (!roundObject) continue
      if (roundObject.participated === false) continue
      if (roundObject.bye && roundObject.bye === true) {
        totalByeWeeks++
        continue
      }

      // wins/losses logic
      if (Number(roundObject.pointsFor) > Number(roundObject.pointsAgainst)) {
        playoffWins++
      } else if (
        Number(roundObject.pointsFor) < Number(roundObject.pointsAgainst)
      ) {
        playoffLosses++
      } else if (
        Number(roundObject.pointsFor) === Number(roundObject.pointsAgainst)
      ) {
        totalTies++
      }

      playoffPoints += Number(roundObject.pointsFor)
      playoffGames++
    }
  }

  // Return items
  const averageTotalPointsPerYear = Number(
    ((regSznPoints + playoffPoints) / totalYears).toFixed(2)
  )
  const averagePlayoffPointsPerMatch = Number(
    (playoffPoints / playoffGames).toFixed(2)
  )
  const averageRegSznPointsPerMatch = Number(
    (regSznPoints / regSznGames).toFixed(2)
  )
  const allTimeAvgRegSznPointsPerYear = Number(
    (regSznPoints / totalYears).toFixed(2)
  )
  const allTimeWinningPct = Number(
    (((regSznWins + playoffWins) / (regSznGames + playoffGames)) * 100).toFixed(
      2
    )
  )
  const allTimeRegSznWinningPct = Number(
    ((regSznWins / regSznGames) * 100).toFixed(2)
  )
  const allTimePlayoffWinningPct = Number(
    ((playoffWins / playoffGames) * 100).toFixed(2)
  )

  return {
    ownerName: owner.ownerName,
    //
    allTimeTotalPointsFor: Number((regSznPoints + playoffPoints).toFixed(2)),
    allTimePlayoffPointsFor: Number(playoffPoints.toFixed(2)),
    allTimeRegSznPointsFor: Number(regSznPoints.toFixed(2)),
    allTimeAvgTotalPointsForPerYear: averageTotalPointsPerYear,
    allTimeAvgRegSznPointsForPerYear: allTimeAvgRegSznPointsPerYear,
    allTimeAvgPlayoffPointsForPerGame: averagePlayoffPointsPerMatch,
    allTimeAvgRegSznPointsForPerGame: averageRegSznPointsPerMatch,
    //
    yearsInLeague: totalYears,
    allTimeTotalByeWeeks: totalByeWeeks,
    allTimeTotalPlayoffGames: playoffGames,
    allTimeTotalRegSznGames: regSznGames,
    //
    allTimeWins: regSznWins + playoffWins,
    allTimeLosses: regSznLosses + playoffLosses,
    allTimeTies: totalTies,
    allTimeRegSznWins: regSznWins,
    allTimeRegSznLosses: regSznLosses,
    allTimePlayoffWins: playoffWins,
    allTimePlayoffLosses: playoffLosses,
    allTimeWinningPct: allTimeWinningPct,
    allTimeRegSznWinningPct: allTimeRegSznWinningPct,
    allTimePlayoffWinningPct: allTimePlayoffWinningPct
    // allTimePlayoffAppearances
    // allTimePlayoffParticipationRate
    // allTimeAvgWinsPerSeason
    // allTimeAvgLosesPerSeason
    //
    // allTimeTotalPointsAgainst
    // allTimePlayoffPointsAgainst
    // allTimeRegSznPointsAgainst
    // allTimeAvgTotalPointsAgainstPerYear
    // allTimeAvgRegSznPointsAgainstPerYear
    // allTimeAvgPlayoffPointsAgainstPerGame
    // allTimeAvgRegSznPointsAgainstPerGame
    // allTimePointDifferential
  }
}
