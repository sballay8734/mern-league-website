interface MiddleColumnMap {
  [key: string]: string[]
  h2h: string[]
  allTime: string[]
  yearly: string[]
}

export const middleColumnMap: MiddleColumnMap = {
  h2h: [
    "Record",
    "Win %",
    "Avg. Pts",
    "Avg. Pts v Field",
    "Best Week",
    "Worst Week",
    "Total Points",
    "Avg. Finish",
    "*YOUR IDEA HERE",
    "YOUR IDEA HERE*",
    "*YOUR IDEA HERE*"
  ],
  allTime: [
    "Record",
    "Win %",
    "ETEW Record",
    "ETEW Win %",
    "Avg. PF",
    "Avg. PA",
    "Playoff Rate",
    "Best Week",
    "Worst Week",
    "Lucky Ws",
    "Unlucky Ls",
    "High W Szn",
    "High L Szn",
    "Total PF",
    "Total PA"
  ],
  yearly: []
}
