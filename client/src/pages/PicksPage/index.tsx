import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import "./PicksPage.scss"

export default function PicksPage() {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <div className="page">
      {user ? (
        <div>Picks page</div>
      ) : (
        <div>You must be logged in to view this page</div>
      )}
    </div>
  )
}
