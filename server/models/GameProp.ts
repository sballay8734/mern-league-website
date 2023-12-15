/*
// Prop collection (Over/Under && Spread)
{
  propId(_id): 293fFkdaf9823kjafsd9uf,
  propType: "OU" OR "S",
  ouType: "points", "passingTds", "rushingTds", null, etc...
  teamOne: "eagles" OR null (if type is OU),
  teamTwo: "cowboys" OR null (if type is OU),
  line: 3.5,
  getting: "eagles" (bet wins if eagles lose by 3 or less),
  giving: "cowboys" (bet wins if cowboys win by 4),
  dateCreated: 12/31/2023,
  
}


// Picks collection
{
  "_id": "pick98765",
  "gameId": "game12345",
  "userId": "userABC",
  "selectedTeam": "team1", // The team the user picked to win
  "wasCorrect": false, // This can be updated later when the game result is known
  "year": 2023,
  "week": 5
}

*/
