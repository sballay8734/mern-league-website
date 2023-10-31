import "./AuthModal.scss"
import { createPortal } from "react-dom"

export default function AuthModal() {
  const children = (
    <div className="modal-wrapper">
      <div className="modal-content">MODAL</div>
      <div className="modal-background"></div>
    </div>
  )
  const portalRoot = document.getElementById("modal-container")!

  return createPortal(children, portalRoot)
}

// browse as guest option
// in order to post on the suggestions page, you will need to login
// probably don't want to show this unless user is on suggestions page
// suggestions page should be locked until user logs in
// guests should NOT be able to see suggestions page
