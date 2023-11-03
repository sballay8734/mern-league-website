import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import "./AdminModal.scss"

// Actually, you do NOT want this to persist. But you SHOULD remove the link in the header.
// It should only be reachable by typing /admin in the address bar

export default function AdminModal() {
  const { user } = useSelector((state: RootState) => state.user)

  const children = (
    <div className="modal-wrapper">
      <div className="modal-content">
        Sorry {user?.firstName}, this page is for tiny dick admins only
      </div>
      <div className="modal-background"></div>
    </div>
  )
  const portalRoot = document.getElementById("modal-container")!

  return createPortal(children, portalRoot)
}
