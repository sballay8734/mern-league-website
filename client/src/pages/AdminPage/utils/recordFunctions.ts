import { Owner } from "../../../redux/owners/interfaces"
import { bestWorstWeek, streaks } from "../interfaces"

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@ MAIN INITIALIZER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export function recordsDataInit(owners: Owner[]) {
  // lets NOT do yearly records (overly complex for no good reason)
  const allTimeRecords = calcAllTimeRecords(owners) // Call function

  return allTimeRecords
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// YEARLY **********************************************************************
// Called from recordsDataInit
function calcAllTimeRecords(owners: Owner[]) {
  const bestWeeks = calcBestWeeks(owners) // top 3
  const worstWeeks = calcWorstWeeks(owners) // bottom 3
  // const highestWinPct = calcHighestWinPct(owners) // top 3 FETCH
  // const lowestWinPct = calcLowestWinPct(owners) // bottom 3 FETCH
  // const highestAvgPF = 0 // top 3 FETCH
  // const lowestAvgPF = 0 // bottom 3 FETCH
  // const mostPlayoffApps = 0 // top 3 FETCH
  // const leastPlayoffApps = 0 // bottom 3 FETCH
  // const mostFinalsApps = 0 // top 3 FETCH
  // const highestAvgFinishingPlace = 0 // top 3 FETCH
  // const lowestAvgFinishingPlace = 0 // bottom 3 FETCH
  // const highestPlayoffRate = 0 // top 3 FETCH
  // const lowestPlayoffRate = 0 // bottom 3 FETCH
  // const mostLuckyWins = 0 // wins when scoring in bottom 3rd (top 3) FETCH
  // const mostUnluckyLosses = 0 // losses when scoring in top 3rd (top 3) FETCH
  // const bestRSRecordSingleYear = 0 // (top 3) FETCH
  // const worstRSRecordSingleYear = 0 // (bottom 3) FETCH
  // const bestPlayoffRecord = 0 // (top 3) - all-time obviously FETCH
  // const worstPlayoffRecord = 0 // (bottom 3) all-time obviously FETCH

  const longestWinningStreaks = calcLongestWinStreak(owners) // (top 3)
  // const longestLosingStreak = 0 // (top 3)
  // const biggestBlowout = 0 // Don't separate playoffs and regSzn for this (top 3)
  // const closestGame = 0 // (top 3)
  // const highestCombinedScore = 0 // (top 3)
  // const lowestCombinedScore = 0 // (bottom 3)

  return { bestWeeks, worstWeeks, longestWinningStreaks }
}

function calcBestWeeks(owners: Owner[]) {
  const bestWeekObjects: bestWorstWeek[] = []
  const bestWeeks: number[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)

    for (let j = 0; j < yearKeys.length; j++) {
      const year = Number(yearKeys[j])

      if (year.toString().slice(0, 2) !== "20") continue
      if (currentOwner[year].participated === false) continue

      const regSznKeys = Object.keys(currentOwner[year].regularSeason)
      const playoffKeys = Object.keys(currentOwner[year].playoffs)

      for (let k = 0; k < regSznKeys.length; k++) {
        const matchup = regSznKeys[k]
        const pointsFor = currentOwner[year].regularSeason[matchup].pointsFor

        if (pointsFor > Math.min(...bestWeeks) || bestWeeks.length < 5) {
          if (bestWeeks.length === 5) {
            const min = Math.min(...bestWeeks)
            const indexToRemove = bestWeeks.indexOf(min)

            const returnIndexToRemove = bestWeekObjects.findIndex(
              (week) => week.points === min
            )
            bestWeekObjects.splice(returnIndexToRemove, 1)

            bestWeeks.splice(indexToRemove, 1)
          }
          bestWeeks.push(pointsFor)
          bestWeekObjects.push({
            ownerName: currentOwner.ownerName,
            points: pointsFor,
            year: year,
            during: "Season"
          })
        }
      }
      for (let k = 0; k < playoffKeys.length; k++) {
        const matchup = playoffKeys[k]
        const participated = currentOwner[year].playoffs[matchup].participated
        const bye = currentOwner[year].playoffs[matchup].bye
        const pointsFor = currentOwner[year].playoffs[matchup].pointsFor

        if (participated === false || bye === true) continue

        if (pointsFor === null) continue

        if (pointsFor > Math.min(...bestWeeks) || bestWeeks.length < 5) {
          if (bestWeeks.length === 5) {
            const min = Math.min(...bestWeeks)
            const indexToRemove = bestWeeks.indexOf(min)

            const returnIndexToRemove = bestWeekObjects.findIndex(
              (week) => week.points === min
            )
            bestWeekObjects.splice(returnIndexToRemove, 1)

            bestWeeks.splice(indexToRemove, 1)
          }
          // will never be null
          bestWeeks.push(pointsFor)
          bestWeekObjects.push({
            ownerName: currentOwner.ownerName,
            points: pointsFor,
            year: year,
            during: "Playoffs"
          })
        }
      }
    }
  }
  bestWeekObjects.sort((a, b) => b.points - a.points)

  return bestWeekObjects
}
function calcWorstWeeks(owners: Owner[]) {
  const worstWeekObjects: bestWorstWeek[] = []
  const worstWeeks: number[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)

    for (let j = 0; j < yearKeys.length; j++) {
      const year = Number(yearKeys[j])

      if (year.toString().slice(0, 2) !== "20") continue
      if (currentOwner[year].participated === false) continue

      const regSznKeys = Object.keys(currentOwner[year].regularSeason)
      const playoffKeys = Object.keys(currentOwner[year].playoffs)

      for (let k = 0; k < regSznKeys.length; k++) {
        const matchup = regSznKeys[k]
        const pointsFor = currentOwner[year].regularSeason[matchup].pointsFor

        if (pointsFor < Math.max(...worstWeeks) || worstWeeks.length < 5) {
          if (worstWeeks.length === 5) {
            const max = Math.max(...worstWeeks)
            const indexToRemove = worstWeeks.indexOf(max)

            const returnIndexToRemove = worstWeekObjects.findIndex(
              (week) => week.points === max
            )
            worstWeekObjects.splice(returnIndexToRemove, 1)

            worstWeeks.splice(indexToRemove, 1)
          }
          worstWeeks.push(pointsFor)
          worstWeekObjects.push({
            ownerName: currentOwner.ownerName,
            points: pointsFor,
            year: year,
            during: "Season"
          })
        }
      }
      for (let k = 0; k < playoffKeys.length; k++) {
        const matchup = playoffKeys[k]
        const participated = currentOwner[year].playoffs[matchup].participated
        const bye = currentOwner[year].playoffs[matchup].bye
        const pointsFor = currentOwner[year].playoffs[matchup].pointsFor

        if (participated === false || bye === true) continue

        if (pointsFor === null) continue

        if (pointsFor < Math.max(...worstWeeks) || worstWeeks.length < 5) {
          if (worstWeeks.length === 5) {
            const max = Math.max(...worstWeeks)
            const indexToRemove = worstWeeks.indexOf(max)

            const returnIndexToRemove = worstWeekObjects.findIndex(
              (week) => week.points === max
            )
            worstWeekObjects.splice(returnIndexToRemove, 1)

            worstWeeks.splice(indexToRemove, 1)
          }
          // will never be null
          worstWeeks.push(pointsFor)
          worstWeekObjects.push({
            ownerName: currentOwner.ownerName,
            points: pointsFor,
            year: year,
            during: "Playoffs"
          })
        }
      }
    }
  }
  worstWeekObjects.sort((a, b) => a.points - b.points)

  return worstWeekObjects
}
function calcLongestWinStreak(owners: Owner[]) {
  const winStreaks: streaks[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)
    let bestStreak = 0
    let testString = ""

    for (let j = 0; j < yearKeys.length; j++) {
      const year = Number(yearKeys[j])

      if (year.toString().slice(0, 2) !== "20") continue
      if (currentOwner[year].participated === false) continue

      const regSznKeys = Object.keys(currentOwner[year].regularSeason)
      const playoffKeys = Object.keys(currentOwner[year].playoffs)

      // REGSZN
      for (let k = 0; k < regSznKeys.length; k++) {
        const week = regSznKeys[k]
        const matchUp = currentOwner[year].regularSeason[week]
        const win = matchUp.pointsFor > matchUp.pointsAgainst

        if (win) {
          bestStreak++
          testString += `RS-${year}-`
        } else {
          if (week === "weekOne") {
            winStreaks.push({
              ownerName: currentOwner.ownerName,
              streak: bestStreak,
              year: year - 1,
              testString
            })
          } else {
            winStreaks.push({
              ownerName: currentOwner.ownerName,
              streak: bestStreak,
              year: year,
              testString
            })
          }
          bestStreak = 0
          testString = ""
        }
      }
      // PLAYOFFS
      for (let l = 0; l < playoffKeys.length; l++) {
        const week = playoffKeys[l]
        const participated = currentOwner[year].playoffs[week].participated
        const bye = currentOwner[year].playoffs[week].bye
        const matchUp = currentOwner[year].playoffs[week]

        if (!participated || bye) continue
        if (matchUp.pointsFor === null || matchUp.pointsAgainst === null)
          continue

        const win = matchUp.pointsFor > matchUp.pointsAgainst
        const loss = matchUp.pointsFor < matchUp.pointsAgainst

        if (win) {
          bestStreak++
          testString += `P-${year}-`
        } else if (loss) {
          winStreaks.push({
            ownerName: currentOwner.ownerName,
            streak: bestStreak,
            year: year,
            testString
          })
          testString = ""
          bestStreak = 0
        }
      }
    }
  }
  const topStreaks = winStreaks.filter((streak) => streak.streak > 7)
  return topStreaks
}

// FETCH THESE (ONLY FETCH THE OWNERS ONCE!) ***********************************
// function calcHighestWinPct(owners: Owner[]) {
//   // fetch staticData, sort by all time winPct, grab the top 3
//   return null
// }
// function calcLowestWinPct(owners: Owner[]) {
//   // fetch staticData, sort by all time winPct, grab the bottom 3
//   return null
// }

// probably need about 10-15 functions for all those records
