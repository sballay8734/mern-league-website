import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import "./PostsPage.scss"

export default function PostsPage() {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <div className="page">
      {user === null ? (
        <div>You must be logged in to view this page</div>
      ) : (
        "PostsPage"
      )}
    </div>
  )
}
