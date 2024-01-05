import { Owner } from "../../../redux/owners/interfaces"
import { calcAllTimeStats, calcBonusStats } from "./staticDataFunction"
import {
  BaseRecord,
  HighestCombinedScore,
  Matchups,
  bestWorstWeek,
  streaks,
  BaseRecordMod
} from "../interfaces"

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
  const bestWeeks = calcBestWeeks(owners)
  const worstWeeks = calcWorstWeeks(owners)
  const longestWinningStreaks = calcLongestWinStreaks(owners)
  const longestLosingStreaks = calcLongestLossStreaks(owners)
  const biggestBlowouts = calcBiggestBlowouts(owners)
  const closestGames = calcClosestGames(owners)
  const highestCombinedScores = calcHighestCombinedScores(owners)
  const lowestCombinedScores = calcLowestCombinedScores(owners)

  const highLowWinPct = calcHighLowWinPcts(owners)
  const highLowAvgPF = calcHighLowPF(owners)
  const playoffRateAndApps = calcPlayoffRate(owners)

  const highestAvgFinishingPlace = finishingPlaceHelper(owners).top3
  const lowestAvgFinishingPlace = finishingPlaceHelper(owners).bottom3

  // const mostLuckyWins = 0 // wins when scoring in bottom 3rd (top 3) FETCH
  // const mostUnluckyLosses = 0 // losses when scoring in top 3rd (top 3) FETCH

  // const mostRSWinsSingleYear = 0 // (top 3) FETCH
  // const leastRSWinsSingleYear = 0 // (bottom 3) FETCH

  // const bestPlayoffWinPct = 0 // (top 3) - all-time obviously FETCH
  // const worstPlayoffWinPct = 0 // (bottom 3) all-time obviously FETCH

  return {
    bestWeeks,
    worstWeeks,
    longestWinningStreaks,
    longestLosingStreaks,
    biggestBlowouts,
    closestGames,
    highestCombinedScores,
    lowestCombinedScores,
    highLowWinPct,
    highLowAvgPF,
    playoffRateAndApps,
    highestAvgFinishingPlace,
    lowestAvgFinishingPlace
  }
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
function calcLongestWinStreaks(owners: Owner[]) {
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
  topStreaks.sort((a, b) => b.streak - a.streak)
  return topStreaks
}
function calcLongestLossStreaks(owners: Owner[]) {
  const lossStreaks: streaks[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)
    let worstStreak = 0
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
        // const win = matchUp.pointsFor > matchUp.pointsAgainst
        const loss = matchUp.pointsFor < matchUp.pointsAgainst

        if (loss) {
          worstStreak++
          testString += `RS-${year}-`
        } else {
          if (week === "weekOne") {
            lossStreaks.push({
              ownerName: currentOwner.ownerName,
              streak: worstStreak,
              year: year - 1,
              testString
            })
          } else {
            lossStreaks.push({
              ownerName: currentOwner.ownerName,
              streak: worstStreak,
              year: year,
              testString
            })
          }
          worstStreak = 0
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

        if (loss) {
          worstStreak++
          testString += `P-${year}-`
        } else if (win) {
          lossStreaks.push({
            ownerName: currentOwner.ownerName,
            streak: worstStreak,
            year: year,
            testString
          })
          testString = ""
          worstStreak = 0
        }
      }
    }
  }
  const topStreaks = lossStreaks.filter((streak) => streak.streak > 7)
  topStreaks.sort((a, b) => b.streak - a.streak)
  return topStreaks
}
function calcBiggestBlowouts(owners: Owner[]) {
  const matchups: Matchups[] = [
    {
      winner: "",
      opponent: "",
      differential: 0,
      year: 0,
      matchUp: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" }
    }
  ]

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)

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
        const difference = matchUp.pointsFor - matchUp.pointsAgainst

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            differential: Number(difference.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            }
          })
        } else {
          const minDifferential = Math.min(
            ...matchups.map((matchup) => matchup.differential)
          )
          if (difference > minDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.differential === minDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              differential: Number(difference.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              }
            })
          }
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
        const difference = matchUp.pointsFor - matchUp.pointsAgainst

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            differential: Number(difference.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Playoffs"
            }
          })
        } else {
          const minDifferential = Math.min(
            ...matchups.map((matchup) => matchup.differential)
          )
          if (difference > minDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.differential === minDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              differential: Number(difference.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Playoffs"
              }
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => b.differential - a.differential)
  return matchups
}
function calcClosestGames(owners: Owner[]) {
  const matchups: Matchups[] = [
    {
      winner: "",
      opponent: "",
      differential: 100,
      year: 0,
      matchUp: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" }
    }
  ]

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)

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
        const difference = matchUp.pointsFor - matchUp.pointsAgainst

        if (difference < 0.002) continue

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            differential: Number(difference.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            }
          })
        } else {
          const maxDifferential = Math.max(
            ...matchups.map((matchup) => matchup.differential)
          )
          if (difference < maxDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.differential === maxDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              differential: Number(difference.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              }
            })
          }
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
        const difference = matchUp.pointsFor - matchUp.pointsAgainst

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            differential: Number(difference.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Playoffs"
            }
          })
        } else {
          const maxDifferential = Math.max(
            ...matchups.map((matchup) => matchup.differential)
          )
          if (difference < maxDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.differential === maxDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              differential: Number(difference.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Playoffs"
              }
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => a.differential - b.differential)
  return matchups
}
function calcHighestCombinedScores(owners: Owner[]) {
  const matchups: HighestCombinedScore[] = [
    {
      winner: "",
      opponent: "",
      sum: 0,
      year: 0,
      matchUp: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" }
    }
  ]

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)

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
        const sum = matchUp.pointsFor + matchUp.pointsAgainst

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            sum: Number(sum.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            }
          })
        } else {
          const minSum = Math.min(...matchups.map((matchup) => matchup.sum))
          if (sum > minSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.sum === minSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              sum: Number(sum.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              }
            })
          }
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
        const sum = matchUp.pointsFor + matchUp.pointsAgainst

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            sum: Number(sum.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Playoffs"
            }
          })
        } else {
          const minSum = Math.min(...matchups.map((matchup) => matchup.sum))
          if (sum > minSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.sum === minSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              sum: Number(sum.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Playoffs"
              }
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => b.sum - a.sum)
  return matchups
}
function calcLowestCombinedScores(owners: Owner[]) {
  const matchups: HighestCombinedScore[] = [
    {
      winner: "",
      opponent: "",
      sum: 200,
      year: 0,
      matchUp: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" }
    }
  ]

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)

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
        const sum = matchUp.pointsFor + matchUp.pointsAgainst

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            sum: Number(sum.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            }
          })
        } else {
          const maxSum = Math.max(...matchups.map((matchup) => matchup.sum))
          if (sum < maxSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.sum === maxSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              sum: Number(sum.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              }
            })
          }
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
        const sum = matchUp.pointsFor + matchUp.pointsAgainst

        if (matchups.length < 5 && win) {
          matchups.push({
            winner: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            sum: Number(sum.toFixed(2)),
            year: year,
            matchUp: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Playoffs"
            }
          })
        } else {
          const maxSum = Math.max(...matchups.map((matchup) => matchup.sum))
          if (sum < maxSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.sum === maxSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              winner: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              sum: Number(sum.toFixed(2)),
              year: year,
              matchUp: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Playoffs"
              }
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => a.sum - b.sum)
  return matchups
}
function calcHighLowWinPcts(owners: Owner[]) {
  const winPcts: BaseRecord[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]

    const allTimeStats = calcAllTimeStats(currentOwner)
    const allTimeCombined = allTimeStats.combined

    if (winPcts.length < 12) {
      winPcts.push({
        ownerName: currentOwner.ownerName,
        statName: "Winning Percentage",
        statValue: allTimeCombined.winningPct
      })
    } else {
      const minWinPct = Math.min(...winPcts.map((value) => value.statValue))
      const currentWinPct = allTimeCombined.winningPct
      if (currentWinPct > minWinPct) {
        const indexToRemove = winPcts.findIndex(
          (value) => value.statValue === minWinPct
        )
        winPcts.splice(indexToRemove, 1)
        winPcts.push({
          ownerName: currentOwner.ownerName,
          statName: "Winning Percentage",
          statValue: allTimeCombined.winningPct
        })
      }
    }
  }
  winPcts.sort((a, b) => b.statValue - a.statValue)
  const top6 = winPcts.slice(0, 6)
  const bottom6 = winPcts.slice(-6).sort((a, b) => a.statValue - b.statValue)

  return { top6, bottom6 }
}
function calcHighLowPF(owners: Owner[]) {
  const avgPF: BaseRecord[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]

    const allTimeStats = calcAllTimeStats(currentOwner)
    const allTimeCombined = allTimeStats.combined

    if (avgPF.length < 12) {
      avgPF.push({
        ownerName: currentOwner.ownerName,
        statName: "Average Points For",
        statValue: allTimeCombined.avgPF
      })
    } else {
      const minWinPct = Math.min(...avgPF.map((value) => value.statValue))
      const currentWinPct = allTimeCombined.avgPF
      if (currentWinPct > minWinPct) {
        const indexToRemove = avgPF.findIndex(
          (value) => value.statValue === minWinPct
        )
        avgPF.splice(indexToRemove, 1)
        avgPF.push({
          ownerName: currentOwner.ownerName,
          statName: "Average Points For",
          statValue: allTimeCombined.avgPF
        })
      }
    }
  }
  avgPF.sort((a, b) => b.statValue - a.statValue)
  const top6 = avgPF.slice(0, 6)
  const bottom6 = avgPF.slice(-6).sort((a, b) => a.statValue - b.statValue)

  return { top6, bottom6 }
}
function calcPlayoffRate(owners: Owner[]) {
  const playoffRates: BaseRecordMod[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]
    const yearKeys = Object.keys(currentOwner)
    let yearsInLeague = 0
    let playoffApps = 0

    for (let i = 0; i < yearKeys.length; i++) {
      const year = Number(yearKeys[i])

      if (year.toString().slice(0, 2) !== "20") continue
      if (currentOwner[year].participated === false) continue

      if (currentOwner[year].playoffs["roundOne"].participated === true) {
        playoffApps++
      }
      yearsInLeague++
    }
    const playoffRate = Number(((playoffApps / yearsInLeague) * 100).toFixed(2))

    playoffRates.push({
      ownerName: currentOwner.ownerName,
      statName: "Playoff Rate",
      statValue: playoffRate,
      playoffApps
    })
  }
  playoffRates.sort((a, b) => b.statValue - a.statValue)
  const top6 = playoffRates.slice(0, 6)
  const bottom6 = playoffRates
    .slice(-6)
    .sort((a, b) => a.statValue - b.statValue)

  return { top6, bottom6 }
}
function finishingPlaceHelper(owners: Owner[]) {
  const finishingPlaces = []
  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]

    const tempVar = calcBonusStats(currentOwner, owners).avgFinishPlace

    finishingPlaces.push({
      ownerName: currentOwner.ownerName,
      statName: "Average Finishing Place",
      statValue: tempVar
    })
  }

  finishingPlaces.sort((a, b) => a.statValue - b.statValue)

  const top3 = finishingPlaces.slice(0, 3)
  const bottom3 = finishingPlaces
    .slice(-3)
    .sort((a, b) => b.statValue - a.statValue)

  return {
    top3,
    bottom3
  }
}

// TODO LIST *******************************************************************
// 1. Also calc best current win/loss streak
// 2. win/loss streak should show two years if it carried over
