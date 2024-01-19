import mongoose, { Schema, Document } from "mongoose"

interface IRecord extends Document {
  recordHolder: string,
  opponent: string | null,
  statValue: number,
  bonusStat: number | null
  year: number | null
  during: "Playoffs" | "Season" | null,

  matchup: {pointsFor: number, pointsAgainst: number, opponent: string, during: string} | null
  type: string
}

interface FullRecordObject {
  [recordName: string]: IRecord
}

const singleRecordData = new Schema({
  recordHolder: {type: String, required: true},
  opponent: {type: String},
  statValue: {type: Number, required: true},
  bonusStat: {type: Number},
  year: {type: Number},
  during: {type: String},
  matchup: {pointsFor: Number, pointsAgainst: Number, opponent: String, during: String}
})

const singleRecordSchema = new Schema({
  recordName: {type: Array, of: singleRecordData}
})

const fullRecordsSchema = new Schema({
  records: {type: Object, of: singleRecordSchema}
})

// const RecordsSchema = new Schema({
//   records: {type: Schema.Types.Mixed}
// });


const Records = mongoose.model("Record", fullRecordsSchema)

export default Records

/* 
   records: {
    recordOne: {
      recordHolder: {type: String, required: true},
      opponent: {type: String},
      statValue: {type: Number, required: true},
      bonusStat: {type: Number},
      year: {type: Number},
      during: {type: String},
      matchup: {pointsFor: Number, pointsAgainst: Number, opponent: String, during: String}
    },
    recordTwo: {
      recordHolder: {type: String, required: true},
      opponent: {type: String},
      statValue: {type: Number, required: true},
      bonusStat: {type: Number},
      year: {type: Number},
      during: {type: String},
      matchup: {pointsFor: Number, pointsAgainst: Number, opponent: String, during: String}
    },
   }
*/