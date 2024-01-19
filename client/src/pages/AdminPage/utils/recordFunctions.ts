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
export async function recordsDataInit(owners: Owner[]) {
  // lets NOT do yearly records (overly complex for no good reason)
  const allTimeRecords = calcAllTimeRecords(owners) // Call function

  const res = await fetch("/api/records", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(allTimeRecords)
  })

  const data = await res.json()

  if (!data) {
    console.log("Data update NOT successful")
    return
  }

  return data
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

  const highWinPct = calcHighLowWinPcts(owners).top5
  const lowWinPct = calcHighLowWinPcts(owners).bottom5
  const highAvgPF = calcHighLowPF(owners).top5
  const lowAvgPF = calcHighLowPF(owners).bottom5
  const highPlayoffRateAndApps = calcPlayoffRate(owners).top5
  const lowPlayoffRateAndApps = calcPlayoffRate(owners).bottom5

  const highestAvgFinishingPlace = finishingPlaceHelper(owners).top5
  const lowestAvgFinishingPlace = finishingPlaceHelper(owners).bottom5

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
    lowWinPct,
    highWinPct,
    highAvgPF,
    lowAvgPF,
    highPlayoffRateAndApps,
    lowPlayoffRateAndApps,
    highestAvgFinishingPlace,
    lowestAvgFinishingPlace
  }
}

/* 
  recordHolder: "John Smith",
  opponent: "Steve Smith" | null,
  statValue: 1984,
  bonusStat: 2309 | null
  year: 2021 | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: 99, pointsAgainst: 23, opponent: "bla", during: "Season"} | null
*/

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
              (week) => week.statValue === min
            )
            bestWeekObjects.splice(returnIndexToRemove, 1)

            bestWeeks.splice(indexToRemove, 1)
          }
          bestWeeks.push(pointsFor)
          bestWeekObjects.push({
            recordHolder: currentOwner.ownerName,
            opponent: null,
            statValue: Number(pointsFor.toFixed(2)),
            bonusStat: null,
            year: year,
            during: "Season",
            matchup: null,
            type: " Points"
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
              (week) => week.statValue === min
            )
            bestWeekObjects.splice(returnIndexToRemove, 1)

            bestWeeks.splice(indexToRemove, 1)
          }
          // will never be null
          bestWeeks.push(pointsFor)
          bestWeekObjects.push({
            recordHolder: currentOwner.ownerName,
            opponent: null,
            statValue: Number(pointsFor.toFixed(2)),
            bonusStat: null,
            year: year,
            during: "Playoffs",
            matchup: null,
            type: " Points"
          })
        }
      }
    }
  }
  bestWeekObjects.sort((a, b) => b.statValue - a.statValue)

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
              (week) => week.statValue === max
            )
            worstWeekObjects.splice(returnIndexToRemove, 1)

            worstWeeks.splice(indexToRemove, 1)
          }
          worstWeeks.push(pointsFor)
          worstWeekObjects.push({
            recordHolder: currentOwner.ownerName,
            opponent: null,
            statValue: Number(pointsFor.toFixed(2)),
            bonusStat: null,
            year: year,
            during: "Season",
            matchup: null,
            type: " Points"
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
              (week) => week.statValue === max
            )
            worstWeekObjects.splice(returnIndexToRemove, 1)

            worstWeeks.splice(indexToRemove, 1)
          }
          // will never be null
          worstWeeks.push(pointsFor)
          worstWeekObjects.push({
            recordHolder: currentOwner.ownerName,
            opponent: null,
            statValue: Number(pointsFor.toFixed(2)),
            bonusStat: null,
            year: year,
            during: "Playoffs",
            matchup: null,
            type: " Points"
          })
        }
      }
    }
  }
  worstWeekObjects.sort((a, b) => a.statValue - b.statValue)

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
              recordHolder: currentOwner.ownerName,
              opponent: null,
              statValue: bestStreak,
              bonusStat: null,
              year: year - 1,
              during: null,
              matchup: null,
              type: " Games"
            })
          } else {
            winStreaks.push({
              recordHolder: currentOwner.ownerName,
              opponent: null,
              statValue: bestStreak,
              bonusStat: null,
              year: year,
              during: null,
              matchup: null,
              type: " Games"
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
            recordHolder: currentOwner.ownerName,
            opponent: null,
            statValue: bestStreak,
            bonusStat: null,
            year: year,
            during: null,
            matchup: null,
            type: " Games"
          })
          testString = ""
          bestStreak = 0
        }
      }
    }
  }
  const topStreaks = winStreaks.filter((streak) => streak.statValue > 6)
  topStreaks.sort((a, b) => b.statValue - a.statValue)

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
              recordHolder: currentOwner.ownerName,
              opponent: null,
              statValue: worstStreak,
              bonusStat: null,
              year: year - 1,
              during: null,
              matchup: null,
              type: " Games"
            })
          } else {
            lossStreaks.push({
              recordHolder: currentOwner.ownerName,
              opponent: null,
              statValue: worstStreak,
              bonusStat: null,
              year: year,
              during: null,
              matchup: null,
              type: " Games"
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
            recordHolder: currentOwner.ownerName,
            opponent: null,
            statValue: worstStreak,
            bonusStat: null,
            year: year,
            during: null,
            matchup: null,
            type: " Games"
          })
          testString = ""
          worstStreak = 0
        }
      }
    }
  }
  const topStreaks = lossStreaks.filter((streak) => streak.statValue > 6)
  topStreaks.sort((a, b) => b.statValue - a.statValue)
  return topStreaks
}
function calcBiggestBlowouts(owners: Owner[]) {
  const matchups: Matchups[] = [
    {
      recordHolder: "",
      opponent: "",
      statValue: 0,
      bonusStat: null,
      year: 0,
      during: null,
      matchup: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" },
      type: " Points"
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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(difference.toFixed(2)),
            bonusStat: null,
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            },
            during: null,
            type: " Points"
          })
        } else {
          const minDifferential = Math.min(
            ...matchups.map((matchup) => matchup.statValue)
          )
          if (difference > minDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === minDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(difference.toFixed(2)),
              bonusStat: null,
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              },
              during: null,
              type: " Points"
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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(difference.toFixed(2)),
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent!,
              during: "Playoffs"
            },
            during: null,
            bonusStat: null,
            type: " Points"
          })
        } else {
          const minDifferential = Math.min(
            ...matchups.map((matchup) => matchup.statValue)
          )
          if (difference > minDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === minDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(difference.toFixed(2)),
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent!,
                during: "Playoffs"
              },
              bonusStat: null,
              during: null,
              type: " Points"
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => b.statValue - a.statValue)
  return matchups
}
function calcClosestGames(owners: Owner[]) {
  const matchups: Matchups[] = [
    {
      recordHolder: "",
      opponent: "",
      statValue: 100,
      bonusStat: null,
      during: null,
      year: 0,
      matchup: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" },
      type: " Points"

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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(difference.toFixed(2)),
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            },
            during: null,
            bonusStat: null,
            type: " Points"
          })
        } else {
          const maxDifferential = Math.max(
            ...matchups.map((matchup) => matchup.statValue)
          )
          if (difference < maxDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === maxDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(difference.toFixed(2)),
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              },
              during: null,
              bonusStat: null,
              type: " Points"
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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(difference.toFixed(2)),
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent!,
              during: "Playoffs"
            },
            during: null,
            bonusStat: null,
            type: " Points"
          })
        } else {
          const maxDifferential = Math.max(
            ...matchups.map((matchup) => matchup.statValue)
          )
          if (difference < maxDifferential && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === maxDifferential
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(difference.toFixed(2)),
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent!,
                during: "Playoffs"
              },
              during: null,
              bonusStat: null,
              type: " Points"
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => a.statValue - b.statValue)
  return matchups
}
function calcHighestCombinedScores(owners: Owner[]) {
  const matchups: HighestCombinedScore[] = [
    {
      recordHolder: "",
      opponent: "",
      statValue: 0,
      bonusStat: null,
      during: null,
      year: 0,
      matchup: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" },
      type: " Points"
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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(sum.toFixed(2)),
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            },
            during: null,
            bonusStat: null,
            type: " Points"
          })
        } else {
          const minSum = Math.min(...matchups.map((matchup) => matchup.statValue))
          if (sum > minSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === minSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(sum.toFixed(2)),
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              },
              during: null,
              bonusStat: null,
              type: " Points"
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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(sum.toFixed(2)),
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent!,
              during: "Playoffs"
            },
            during: null,
            bonusStat: null,
            type: " Points"
          })
        } else {
          const minSum = Math.min(...matchups.map((matchup) => matchup.statValue))
          if (sum > minSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === minSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(sum.toFixed(2)),
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent!,
                during: "Playoffs"
              },
              during: null,
              bonusStat: null,
              type: " Points"
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => b.statValue - a.statValue)
  return matchups
}
function calcLowestCombinedScores(owners: Owner[]) {
  const matchups: HighestCombinedScore[] = [
    {
      recordHolder: "",
      opponent: "",
      statValue: 200,
      year: 0,
      matchup: { pointsFor: 0, pointsAgainst: 0, opponent: "", during: "" },
      during: null,
      bonusStat: null,
      type: " Points"
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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(sum.toFixed(2)),
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent,
              during: "Season"
            },
            during: null,
            bonusStat: null,
            type: " Points"
          })
        } else {
          const maxSum = Math.max(...matchups.map((matchup) => matchup.statValue))
          if (sum < maxSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === maxSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(sum.toFixed(2)),
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent,
                during: "Season"
              },
              during: null,
              bonusStat: null,
              type: " Points"
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
            recordHolder: currentOwner.ownerName,
            opponent: matchUp.opponent!,
            statValue: Number(sum.toFixed(2)),
            year: year,
            matchup: {
              pointsFor: matchUp.pointsFor,
              pointsAgainst: matchUp.pointsAgainst,
              opponent: matchUp.opponent!,
              during: "Playoffs"
            },
            during: null,
            bonusStat: null,
            type: " Points"
          })
        } else {
          const maxSum = Math.max(...matchups.map((matchup) => matchup.statValue))
          if (sum < maxSum && win) {
            const indexToRemove = matchups.findIndex(
              (matchup) => matchup.statValue === maxSum
            )
            matchups.splice(indexToRemove, 1)

            matchups.push({
              recordHolder: currentOwner.ownerName,
              opponent: matchUp.opponent!,
              statValue: Number(sum.toFixed(2)),
              year: year,
              matchup: {
                pointsFor: matchUp.pointsFor,
                pointsAgainst: matchUp.pointsAgainst,
                opponent: matchUp.opponent!,
                during: "Playoffs"
              },
              during: null,
              bonusStat: null,
              type: " Points"
            })
          }
        }
      }
    }
  }

  matchups.sort((a, b) => a.statValue - b.statValue)
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
        recordHolder: currentOwner.ownerName,
        statValue: Number(allTimeCombined.winningPct.toFixed(1)),
        opponent: null,
        bonusStat: null,
        year: null,
        during: null,
        matchup: null,
        type: "%"
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
          recordHolder: currentOwner.ownerName,
          statValue: Number(allTimeCombined.winningPct.toFixed(1)),
          opponent: null,
          bonusStat: null,
          year: null,
          during: null,
          matchup: null,
          type: "%"
        })
      }
    }
  }
  winPcts.sort((a, b) => b.statValue - a.statValue)
  const top5 = winPcts.slice(0, 5)
  const bottom5 = winPcts.slice(-5).sort((a, b) => a.statValue - b.statValue)

  return { top5, bottom5 }
}
function calcHighLowPF(owners: Owner[]) {
  const avgPF: BaseRecord[] = []

  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]

    const allTimeStats = calcAllTimeStats(currentOwner)
    const allTimeCombined = allTimeStats.combined

    if (avgPF.length < 12) {
      avgPF.push({
        recordHolder: currentOwner.ownerName,
        statValue: Number(allTimeCombined.avgPF.toFixed(2)),
        opponent: null,
        bonusStat: null,
        year: null,
        during: null,
        matchup: null,
        type: " Points"
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
          recordHolder: currentOwner.ownerName,
          statValue: Number(allTimeCombined.avgPF.toFixed(2)),
          opponent: null,
          bonusStat: null,
          year: null,
          during: null,
          matchup: null,
          type: " Points"
        })
      }
    }
  }
  avgPF.sort((a, b) => b.statValue - a.statValue)
  const top5 = avgPF.slice(0, 5)
  const bottom5 = avgPF.slice(-5).sort((a, b) => a.statValue - b.statValue)

  return { top5, bottom5 }
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
      recordHolder: currentOwner.ownerName,
      statValue: Number(playoffRate.toFixed(1)),
      bonusStat: playoffApps,
      opponent: null,
      year: null,
      during: null,
      matchup: null,
      type: "%"
    })
  }
  playoffRates.sort((a, b) => b.statValue - a.statValue)
  const top5 = playoffRates.slice(0, 5)
  const bottom5 = playoffRates
    .slice(-5)
    .sort((a, b) => a.statValue - b.statValue)

  return { top5, bottom5 }
}
function finishingPlaceHelper(owners: Owner[]) {
  const finishingPlaces = []
  for (let i = 0; i < owners.length; i++) {
    const currentOwner = owners[i]

    const tempVar = calcBonusStats(currentOwner, owners).avgFinishPlace

    finishingPlaces.push({
      recordHolder: currentOwner.ownerName,
      statValue: tempVar,
      bonusStat: null,
      opponent: null,
      year: null,
      during: null,
      matchup: null
    })
  }

  finishingPlaces.sort((a, b) => a.statValue - b.statValue)

  const top5 = finishingPlaces.slice(0, 5)
  const bottom5 = finishingPlaces
    .slice(-5)
    .sort((a, b) => b.statValue - a.statValue)

  return {
    top5,
    bottom5
  }
}

// TODO LIST *******************************************************************
// 1. Also calc best current win/loss streak
// 2. win/loss streak should show two years if it carried over
