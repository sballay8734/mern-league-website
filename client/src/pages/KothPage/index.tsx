import {
  useFetchKingStandingsQuery,
  useFetchWeeklyResultsQuery
} from "../../redux/king/kingApi"
import "./KothPage.scss"

export default function KothPage() {
  const {
    data: standingsData,
    error: standingsError,
    isLoading: standingsLoading
  } = useFetchKingStandingsQuery()

  const {
    data: resultsData,
    error: resultsError,
    isLoading: resultsLoading
  } = useFetchWeeklyResultsQuery()

  // LOG IS WORKING
  console.log(standingsData, resultsData)

  // Just to remove errors
  console.log(standingsError, standingsLoading, resultsError, resultsLoading)

  return (
    <div className="page">
      {standingsData?.map((item) => {
        return <div key={item.year}>{item.year}</div>
      })}
    </div>
  )
}
