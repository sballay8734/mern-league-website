import { useState } from "react"
import { createPortal } from "react-dom"
import "./AuthModal.scss"

interface FormData {
  email: string
  password: string
}

export default function AuthModal() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  })
  console.log(formData) // working

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      // try to log in
    } catch (error) {
      // catch error
    }
    console.log("submitted")
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const children = (
    <div className="modal-wrapper">
      <div className="modal-content">
        <h1>You must be logged in to access this page</h1>
        <form onSubmit={(e) => handleSubmit(e)} className="signin-form">
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Sign in</button>
        </form>
      </div>
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
