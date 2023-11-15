import { useState } from "react"

import {
  useFetchRecordsQuery
  // useUpdateRecordQuery
} from "../../redux/records/recordsApi"
import "./RecordsPage.scss"

export default function RecordsPage() {
  const { data, error, isLoading } = useFetchRecordsQuery()
  const [filterString, setFilterString] = useState("")

  // Just to remove errors (actually do something with this once it's setup)
  console.log(error, isLoading)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterString(e.target.value)
  }

  const filteredRecords = data?.filter((item) =>
    item.name.toLowerCase().includes(filterString.toLowerCase())
  )

  return (
    <div className="page records-page">
      <input
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
      </div>
    </div>
  )
}
