import { useSelector } from "react-redux"

import AdminModal from "../../components/AdminModal"
import { RootState } from "../../redux/store"
import { useFetchOwnersQuery } from "../../redux/owners/ownersApi"
import "./AdminPage.scss"

const baseUrl = "https://api.prop-odds.com"

export default function AdminPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data } = useFetchOwnersQuery()

  console.log(data)

  async function handleFetchProps() {
    console.log("Starting request...")
    const now = new Date()
    const query = new URLSearchParams({
      data: now.toISOString().split("T")[0],
      tz: "America/New_York",
      api_key: import.meta.env.VITE_PROP_ODDS_API_KEY
    })
    const res = await fetch(`${baseUrl}/beta/games/nfl/?${query}`, {
      method: "GET"
    })

    const data = await res.json()

    if (!data) {
      console.log("Something went wrong")
    }

    console.log(data)
  }

  return (
    <div className="page">
      {!user?.isAdmin ? (
        <AdminModal />
      ) : (
        <div className="admin-wrapper">
          <h1>AdminPage</h1>
          <div className="update-wrapper">
            <div className="update-group">
              <h1>Update Owners Static Data</h1>
              <button>Start Update</button>
            </div>
            <div className="update-group">
              <h1>Update Koth Standings</h1>
              <button>Start Update</button>
            </div>
            <div className="update-group">
              <h1>Update Pick Standings</h1>
              <button>Start Update</button>
            </div>
            <div className="update-group">
              <h1>Update Records</h1>
              <button>Start Update</button>
            </div>
            <div className="update-group">
              <h1>Fetch Props</h1>
              <button onClick={handleFetchProps}>Fetch</button>
            </div>
            <div className="update-group">
              <h1>Send Props To DB</h1>
              <button>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
