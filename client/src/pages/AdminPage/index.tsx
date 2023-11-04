import { useSelector } from "react-redux"

import AdminModal from "../../components/AdminModal"
import { RootState } from "../../redux/store"
import { useFetchOwnersQuery } from "../../redux/owners/ownersApi"
import "./AdminPage.scss"

export default function AdminPage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { data, error, isLoading } = useFetchOwnersQuery()

  console.log(data, error, isLoading)

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
          </div>
        </div>
      )}
    </div>
  )
}
