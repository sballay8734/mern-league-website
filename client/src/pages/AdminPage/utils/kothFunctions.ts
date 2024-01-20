import { Owner } from "../../../redux/owners/interfaces"

const years = ["2022", "2023"] // ADD 2023

interface StrikeKeys {
  [week: string]: number
}
interface EliminationKeys {
  [week: string]: number
}
// 35 strikes over 14 weeks
const strikeKeys: StrikeKeys = {
  weekOne: 4,
  weekTwo: 4,
  weekThree: 4,
  weekFour: 3,
  weekFive: 3,
  weekSix: 3,
  weekSeven: 3,
  weekEight: 2,
  weekNine: 2,
  weekTen: 2,
  weekEleven: 2,
  weekTwelve: 1,
  weekThirteen: 1,
  weekFourteen: 1
}
const eliminationKeys: EliminationKeys = {
  weekOne: 1,
  weekTwo: 2,
  weekThree: 3,
  weekFour: 4,
  weekFive: 5,
  weekSix: 6,
  weekSeven: 7,
  weekEight: 8,
  weekNine: 9,
  weekTen: 10,
  weekEleven: 11,
  weekTwelve: 12,
  weekThirteen: 13,
  weekFourteen: 14
}

interface OwnerObject {
  [ownerName: string]: OwnerObjectAttr
}

interface OwnerObjectAttr {
  totalPointsFor: number
  totalPointsAgainst: number
  strikes: number
  topScorer: number
  weekEliminated: number
  weeklyScores: WeeklyScores
}

interface WeeklyScores {
  [week: string]: {
    points: number,
    strike: boolean
  }
}

export interface FullObject {
  yearCompleted: boolean
  year: string
  standingsData: OwnerObject
}

export function KOTHInit(owners: Owner[]) {
  const objectArray = []
  let standingsObject: OwnerObject = {}
  let currentGlobalYear = ""
  let currentGlobalWeek = ""

  for (let i = 0; i < years.length; i++) {
    const currentYear = Number(years[i])
    currentGlobalYear = currentYear.toString()

    const weekKeys = Object.keys(strikeKeys)

    for (let j = 0; j < weekKeys.length; j++) {
      const currentWeek = weekKeys[j]
      const weeklyScores = []
      currentGlobalWeek = currentWeek
  
      // loop through owners and push to weeklyScores and update stadings object
      for (let k = 0; k < owners.length; k++) {
        const currentOwner = owners[k]
        const weeklyPointsFor = currentOwner[currentYear].regularSeason[currentWeek].pointsFor
        const weeklyPointsAgainst = currentOwner[currentYear].regularSeason[currentWeek].pointsAgainst

        // initialize owner
        if (!standingsObject[currentOwner.ownerName]) {
          standingsObject[currentOwner.ownerName] = {
            totalPointsFor: 0,
            totalPointsAgainst: 0,
            strikes: 0,
            topScorer: 0,
            weekEliminated: 100,
            weeklyScores: {}
          }
        }
        // initialize week
        standingsObject[currentOwner.ownerName].weeklyScores[currentWeek] = {
          points: 0,
          strike: false
        }

        weeklyScores.push({owner: currentOwner.ownerName, points: Number(weeklyPointsFor.toFixed(2))})

        // update weeklyPointsFor
        standingsObject[currentOwner.ownerName].weeklyScores[currentWeek].points = weeklyPointsFor
        standingsObject[currentOwner.ownerName].totalPointsFor += weeklyPointsFor
        standingsObject[currentOwner.ownerName].totalPointsAgainst += weeklyPointsAgainst
      }

      // sort weekly scores & update standings object
      const sortedScores = weeklyScores.sort((a, b) => a.points - b.points)

      // give strikes to lowest scores - skip owners that have 3 strikes
      let strikesGiven = 0
      for (let m = 0; m < sortedScores.length; m++) {
        let currentScore = sortedScores[m]

        // give point to top scorer
        if (standingsObject[currentScore.owner].weeklyScores[currentWeek].points === sortedScores[sortedScores.length - 1].points) {
          standingsObject[currentScore.owner].topScorer += 1
        }

        if (strikesGiven >= strikeKeys[currentWeek]) continue
        if (standingsObject[currentScore.owner].strikes === 3) continue

        if (standingsObject[currentScore.owner].strikes === 2) {
          standingsObject[currentScore.owner].weekEliminated = eliminationKeys[currentWeek]
        }
        standingsObject[currentScore.owner].strikes += 1
        standingsObject[currentScore.owner].weeklyScores[currentWeek].strike = true

        strikesGiven += 1
      }
      strikesGiven = 0
    }
    // format, sort, and send standings object
  const finalObject = formatStandingsObject(standingsObject, currentGlobalWeek, Object.keys(strikeKeys), currentGlobalYear)

  objectArray.push(finalObject)

  standingsObject = {}
}
// MAP OVER ARRAY AND RUN THIS FOR EACH ITEM
// REMOVE PREVIOUS KOTH FOR CURRENT YEAR AND REPLACE WITH final object
objectArray.forEach((obj) => {
  updateKOTHData(obj.year, obj)
})
return "SUCCESS"
}

// FUNCTION TO FORMAT OBJECT
function formatStandingsObject(obj: OwnerObject, week: string, weekList: string[], year: string) {
  const formattedObject: OwnerObject = {}
  for (const owner in obj) {
      formattedObject[owner] = {
        totalPointsFor: Number(obj[owner].totalPointsFor.toFixed(2)),
        totalPointsAgainst: Number(obj[owner].totalPointsAgainst.toFixed(2)),
        strikes: obj[owner].strikes,
        topScorer: obj[owner].topScorer,
        weekEliminated: obj[owner].weekEliminated,
        weeklyScores: {...obj[owner].weeklyScores}
      }
  }

  const isYearComplete = week === weekList[weekList.length - 1]

  return {
    yearCompleted: isYearComplete,
    year: year,
    standingsData: {...formattedObject}
  }
}

async function updateKOTHData(year: string, obj: FullObject) {
  try {
    const res = await fetch("/api/kings/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year: year,
        data: obj
      })
    })

    const data = await res.json()

    if (!data) {
      console.log("ERROR: NO DATA")
      return
    }

    return data

  } catch (error) {
    console.log(error)
  }
}