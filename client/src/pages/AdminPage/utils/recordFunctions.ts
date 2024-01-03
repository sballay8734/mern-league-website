import { Owner } from "../../../redux/owners/interfaces"

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@ MAIN INITIALIZER @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export function recordsDataInit(owners: Owner[]) {
  // lets NOT do yearly records (overly complex for no good reason)
  for (let i = 0; i < owners.length; i++) {
    let allTimeRecords = 0 // Call function
  }
}
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// YEARLY **********************************************************************
// Called from recordsDataInit
function allTimeRecords(owners) {
  let bestWeek = 0 // top 3
  let worstWeek = 0 // bottom 3
  let highestWinPct = 0 // top 3
  let lowestWinPct = 0 // bottom 3
  let highestAvgPF = 0 // top 3
  let lowestAvgPF = 0 // bottom 3
  let mostPlayoffApps = 0 // top 3
  let leastPlayoffApps = 0 // bottom 3
  let mostFinalsApps = 0 // top 3
  let highestAvgFinishingPlace = 0 // top 3
  let lowestAvgFinishingPlace = 0 // bottom 3
  let highestPlayoffRate = 0 // top 3
  let lowestPlayoffRate = 0 // bottom 3
  let mostLuckyWins = 0 // wins when scoring in bottom 3rd (top 3)
  let mostUnluckyLosses = 0 // losses when scoring in top 3rd (top 3)
  let longestWinningStreak = 0 // (top 3)
  let longestLosingStreak = 0 // (top 3)
  let biggestBlowout = 0 // Don't separate playoffs and regSzn for this (top 3)
  let closestGame = 0 // (top 3)
  let highestCombinedScore = 0 // (top 3)
  let lowestCombinedScore = 0 // (bottom 3)
  let bestRSRecordSingleYear = 0 // (top 3)
  let worstRSRecordSingleYear = 0 // (bottom 3)
  let bestPlayoffRecord = 0 // (top 3) - all-time obviously
  let worstPlayoffRecord = 0 // (bottom 3) all-time obviously
}

// probably need about 10-15 functions for all those records
