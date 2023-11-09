import { useState } from "react"
import { createPortal } from "react-dom"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store"
import {
  signInStart,
  signInSuccess,
  signInFailure
} from "../../redux/user/userSlice"
import "./AuthModal.scss"
import OAuth from "../OAuth/OAuth"

interface FormData {
  email: string
  password: string
}

export default function AuthModal() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: ""
  })
  const { error, loading } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const requestOptions: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }

      const res = await fetch("/api/auth/signin", requestOptions)
      const data = await res.json()

      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
    } catch (error) {
      if (error instanceof Error) {
        dispatch(signInFailure(error.message))
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const children = (
    <div className="auth-modal-wrapper">
      <div className="modal-content">
        <h1>You must be logged in to access this page</h1>
        <form
          id="auth-form"
          onSubmit={(e) => handleSubmit(e)}
          className="signin-form"
        >
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
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Sign in"}
          </button>
          <OAuth />
        </form>
        {error !== null ? <p className="error-message">{error}</p> : ""}
      </div>
      {/* THIS LINE BELOW IS CAUSING THE LAG */}
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
