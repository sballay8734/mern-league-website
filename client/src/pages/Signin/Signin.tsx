import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { AiFillCheckCircle } from "react-icons/ai"

import { setOAuthError, setUser } from "../../redux/user/userSlice"
import { useLazyStandardSignInMutation } from "../../redux/auth/authApi"
import OAuth from "../../components/OAuth/OAuth"
import "./Signin.scss"
import { RootState } from "../../redux/store"

// NEED TO USE useLazyQuery

interface formData {
  email: string
  password: string
}

export default function Signin() {
  const [standardError, setStandardError] = useState<string | null>(null)
  const { error } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: ""
  })

  const [trigger, { isError, isLoading, isSuccess }] =
    useLazyStandardSignInMutation()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setOAuthError(null))
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStandardError(null)
    const response = await trigger(formData)

    if ("data" in response) {
      dispatch(setUser(response.data))
      localStorage.setItem("initialTheme", response.data.preferredTheme)
      setTimeout(() => {
        navigate("/")
      }, 300) // 1000 milliseconds = 1 second (adjust as needed)
    } else if ("error" in response) {
      const errorData = response.error as { data?: unknown }
      if (errorData.data && typeof errorData.data === "object") {
        const data = errorData.data as { message?: string }
        if (data.message) {
          setStandardError(data.message)
        }
      }
    }
  }

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h1>Sign In</h1>
        <p className="description">
          Only necessary in order to submit picks and rule proposals
        </p>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            placeholder="fleshlightlover@gmail.com"
            required
            autoComplete="off"
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
            placeholder="•••••••"
            required
            autoComplete="off"
          />
        </div>
        <button disabled={isLoading} type="submit" className="sign-in-button">
          Sign In
        </button>
        <div
          className={`status-message ${
            isLoading || isError || error || isSuccess ? "show" : ""
          }`}
        >
          {isLoading && <div className="spinner"></div>}
          {isError && <div className="error">{standardError}</div>}
          {error && <div className="error">{error}</div>}
          {isSuccess && (
            <div className="success">
              <AiFillCheckCircle />
            </div>
          )}
        </div>
        {/* <h3>Or</h3> */}
        <OAuth />
        <p className="description">
          Your bitch-ass didn't register yet?{" "}
          <span>
            <Link to="/signup">Register here</Link>
          </span>
        </p>
      </form>
    </div>
  )
}
