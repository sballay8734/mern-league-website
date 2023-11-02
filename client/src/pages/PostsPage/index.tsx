import { useSelector } from "react-redux"

import AuthModal from "../../components/AuthModal"
import { RootState } from "../../redux/store"
import "./PostsPage.scss"

export default function PostsPage() {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <div className="page">{user === null ? <AuthModal /> : "PostsPage"}</div>
  )
}
