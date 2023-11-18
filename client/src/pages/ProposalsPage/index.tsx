import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import "./ProposalsPage.scss"

export default function ProposalsPage() {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <div className="page proposals-page">
      {user === null ? (
        <div>You must be logged in to view this page</div>
      ) : (
        "ProposalsPage"
      )}
    </div>
  )
}
