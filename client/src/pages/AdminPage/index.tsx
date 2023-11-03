import "./AdminPage.scss"
import AdminModal from "../../components/AdminModal"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

export default function AdminPage() {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <div className="page">
      {!user?.isAdmin ? <AdminModal /> : <div>ADMIN PAGE</div>}
    </div>
  )
}
