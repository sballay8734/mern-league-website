import { Owner } from "../../../redux/owners/interfaces"

const years = ["2022"] // ADD 2023

interface StrikeKeys {
  [week: string]: number
}
// 35 strikes over 14 weeks
const strikeKeys: StrikeKeys = {
  weekOne: 4,
  weekTwo: 4,
  weekThree: 3,
  weekFour: 3,
  weekFive: 3,
  weekSix: 3,
  weekSeven: 3,
  weekEight: 3,
  weekNine: 2,
  weekTen: 2,
  weekEleven: 2,
  weekTwelve: 1,
  weekThirteen: 1,
  weekFourteen: 1
}

interface matchup {
  [team: string]: number
}

interface matchupKeys {
  [week: string]: matchup[]
}

interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
}

export function KOTHInit(owners: Owner[]) {
  // loop through the years

  // grab each weeks matchups

  // fetch current standings (This is so you can see who is already eliminated and skip them in the calculations)

  // grab lowest scorers of owners still in, and give strikes based on week

  // update object in DB

  for (let i = 0; i < years.length; i++) {
    let currentYear = Number(years[i])
    const matchups: matchupKeys = {}

    const matchupKeys = Object.keys(owners[0][currentYear].regularSeason)

    for (let k = 0; k < matchupKeys.length; k++) {
      let currentWeek = matchupKeys[k]
      let usedOwners: string[] = []

      for (let j = 0; j < owners.length; j++) {
        let currentOwner = owners[j]

        let currentMatchup = currentOwner[currentYear].regularSeason[currentWeek]

        if (usedOwners.includes(currentMatchup.opponent) || usedOwners.includes(currentOwner.ownerName)) {
          continue
        }

        if (!matchups[currentWeek]) matchups[currentWeek] = []

        let objectToPush = {
          [currentOwner.ownerName]: currentMatchup.pointsFor,
          [currentMatchup.opponent]: currentMatchup.pointsAgainst
        }

        usedOwners.push(currentOwner.ownerName)
        usedOwners.push(currentMatchup.opponent)

        matchups[currentWeek].push(objectToPush)
      }
    }

    calculateStandings(matchupKeys, matchups)
  }
}

function calculateStandings(matchupKeys: string[], matchupsByWeek: matchupKeys) {
  const ownerStrikeList = []
  let standings = []
  let bigOwnersObject: OwnerObject = {}

  for (let i = 0; i < matchupKeys.length; i++) {
    let currentWeek = matchupKeys[i]
    let allMatchups = matchupsByWeek[currentWeek]

    let scores = []
    let scoreObjects = []

    for (let j = 0; j < allMatchups.length; j++) {
      let currentMatchup: matchup = allMatchups[j]
      let matchupOwners = Object.keys(currentMatchup)
      let ownerOne = matchupOwners[0]
      let ownerTwo = matchupOwners[1]

      for (let owner of matchupOwners) {
        if (!bigOwnersObject[ownerOne]) {
          bigOwnersObject[ownerOne] = {
            totalPointsFor: 0,
            totalPointsAgainst: 0,
            strikes: 0
          }
        }

        if (!bigOwnersObject[ownerTwo]) {
          bigOwnersObject[ownerTwo] = {
            totalPointsFor: 0,
            totalPointsAgainst: 0,
            strikes: 0
          }
        }

        scores.push(currentMatchup[owner])
        scoreObjects.push({[owner]: currentMatchup[owner]})

        bigOwnersObject[ownerOne].totalPointsFor += currentMatchup[ownerOne]
        bigOwnersObject[ownerOne].totalPointsAgainst += currentMatchup[ownerTwo]

        bigOwnersObject[ownerTwo].totalPointsFor += currentMatchup[ownerTwo]
        bigOwnersObject[ownerTwo].totalPointsAgainst += currentMatchup[ownerOne]
      }
        
    }

    let testSort = scoreObjects.sort((a, b) => a[Object.keys(a)[0]] - b[Object.keys(b)[0]])

    let filteredOwners = testSort.filter((owner) => {
      return bigOwnersObject[Object.keys(owner)[0]].strikes !== 3
    })

    const ownersToStrike = filteredOwners.slice(0, strikeKeys[currentWeek])

    for (let owner of ownersToStrike) {
      bigOwnersObject[Object.keys(owner)[0]].strikes += 1
    }
  }

  console.log(bigOwnersObject)
}

/* 

{
  yearCompleted: true,
  year: "2020",
  standings: {
    one: { ownerName: "Shawn Ballay", totalPoints: 2874, strikes: 0},
    two: { ownerName: "Steve Smith", totalPoints: 2674, strikes: 1}
  }
}

{
  weekOne: [array of objects],
  weekTwo: [array of objects],
  weekThree: [array of objects],
  etc...
}

[
  {"Shawn Ballay": 134},
  {"Dan George": 124}
]

*/