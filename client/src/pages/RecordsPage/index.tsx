// import { useState } from "react"

// import {
//   useFetchRecordsQuery
//   // useUpdateRecordQuery
// } from "../../redux/records/recordsApi"
import { CiSearch } from "react-icons/ci"
import "./RecordsPage.scss"

export default function RecordsPage() {
  // const { data, error, isLoading } = useFetchRecordsQuery()
  // const [filterString, setFilterString] = useState("")

  // Just to remove errors (actually do something with this once it's setup)
  // console.log(error, isLoading)

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
  //   setFilterString(e.target.value)
  // }

  // const filteredRecords = data?.filter((item) =>
  //   item.name.toLowerCase().includes(filterString.toLowerCase())
  // )

  return (
    <div className="page records-page">
      <h1>Hall of Records</h1>
      <div className="records-header">
        <div className="searchWrapper">
          <input
            type="text"
            name="recordsSearch"
            id="recordsSearch"
            maxLength={25}
            placeholder="Search archives..."
          />
          <span className="searchIcon">
            <CiSearch />
          </span>
        </div>
        <div className="filterButtons">
          <button className="filterButton">Matchup</button>
          <button className="filterButton">Placement</button>
          <button className="filterButton">Record</button>
          <button className="filterButton">Points</button>
          <button className="filterButton">Playoffs</button>
          <button className="filterButton">RegSzn</button>
          <button className="filterButton">Streaks</button>
          <button className="filterButton">Koth</button>
          <button className="filterButton">Misc</button>
        </div>
      </div>
      <div className="records">
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
        <div className="record">
          <h1 className="recordName">Avg Points For</h1>
          <p className="recordDescription">
            Highest average points for over an entire season
          </p>
          <div className="ownerList">
            <h3>
              Shawn - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Aaron - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Donnie - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
            <h3>
              Steve - <span className="recordValue">127.1</span>
              {" - "}
              <span className="recordYear">2014</span>
            </h3>
          </div>
        </div>
      </div>
      {/* BELOW IS WORKING */}
      {/* <input
        onChange={handleChange}
        type="text"
        placeholder="Search records..."
        value={filterString}
      />
      <div className="records-wrapper">
        {filteredRecords?.map((record) => {
          return (
            <div key={record.name} className="record">
              <h1>{record.displayName}</h1>
              <h3>{record.description}</h3>
              <h1>{record.value}</h1>
              <h1>{record.holder}</h1>
              <h5>{record.year}</h5>
              <p>ID: {record._id}</p>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
