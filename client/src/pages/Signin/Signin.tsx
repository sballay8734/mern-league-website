import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { AiFillGoogleSquare, AiFillCheckCircle } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/user/userSlice"
import "./Signin.scss"
import { useLazyStandardSignInMutation } from "../../redux/auth/authApi"

// NEED TO USE useLazyQuery

interface formData {
  email: string
  password: string
}

export default function Signin() {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState<formData>({
    email: "",
    password: ""
  })

  const [trigger, { isError, isLoading, isSuccess }] =
    useLazyStandardSignInMutation()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const response = await trigger(formData)

    if ("data" in response) {
      dispatch(setUser(response.data))
      setTimeout(() => {
        navigate("/")
      }, 500) // 1000 milliseconds = 1 second (adjust as needed)
    } else if ("error" in response) {
      const errorData = response.error as { data?: unknown }
      if (errorData.data && typeof errorData.data === "object") {
        const data = errorData.data as { message?: string }
        if (data.message) {
          setError(data.message)
        }
      }
    }
  }

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h1>Sign in to the LLoEA</h1>
        <p className="description">
          Only necessary in order to submit picks and suggestions
        </p>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button disabled={isLoading} type="submit" className="sign-in-button">
          Sign in
        </button>
        {isLoading && <div className="spinner"></div>}
        {isError && <div className="error">{error}</div>}
        {isSuccess && (
          <div className="success">
            <AiFillCheckCircle />
          </div>
        )}
        <h3>Or</h3>
        <button type="button" className="google-button">
          Sign in with Google{" "}
          <span>
            <AiFillGoogleSquare className="logo" />
          </span>
        </button>
        <p className="description">
          Your bitch-ass didn't register yet?{" "}
          <span>
            <Link to="/signup">Sign up here</Link>
          </span>
        </p>
      </form>
    </div>
  )
}
