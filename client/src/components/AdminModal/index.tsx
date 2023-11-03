import { useState } from "react"
import { createPortal } from "react-dom"
import "./AdminModal.scss"

// Actually, you do NOT want this to persist. But you SHOULD remove the link.
// It should only be reachable by typing /admin in the address bar

export default function AdminModal() {
  const [password, setPassword] = useState("")
  const [hideModal, setHideModal] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setHideModal(true)
    } else {
      console.log("Incorrect Password")
    }
  }

  const children = (
    <div className={`modal-wrapper ${hideModal ? "hide" : ""}`}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h1>You must have a tiny cock to view this page</h1>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            placeholder="password"
          />
          <button>Submit</button>
        </form>
      </div>
      <div className="modal-background"></div>
    </div>
  )
  const portalRoot = document.getElementById("modal-container")!

  return createPortal(children, portalRoot)
}
