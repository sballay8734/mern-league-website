import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setOAuthError, setUser } from "../../redux/user/userSlice"

import { useLazyStandardSignupMutation } from "../../redux/auth/authApi"
import OAuth from "../../components/OAuth/OAuth"
import { AiFillCheckCircle } from "react-icons/ai"
import { FaCheck } from "react-icons/fa6"
import { IoMdCloseCircle } from "react-icons/io"
import "./Signup.scss"
import { RootState } from "../../redux/store"

interface FormData {
  email: string
  firstName: string
  lastInitial: string
  password: string
  confirmPassword: string
}

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state: RootState) => state.user)
  const [trigger, { isError, isLoading, isSuccess }] =
    useLazyStandardSignupMutation()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastInitial: "",
    password: "",
    confirmPassword: ""
  })
  const [standardError, setStandardError] = useState<string | null>(null)

  function isMatching(pass1: string, pass2: string) {
    return pass1 === pass2
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setOAuthError(null))
    setStandardError(null)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setStandardError("Passwords must match")
      return
    }

    try {
      const response = await trigger(formData)

      if ("data" in response) {
        dispatch(setUser(response.data))
        setTimeout(() => {
          navigate("/")
        }, 500)
      } else if ("error" in response) {
        const errorData = response.error as { data?: unknown }
        if (errorData.data && typeof errorData.data === "object") {
          const data = errorData.data as { message?: string }
          if (data.message) {
            setStandardError(data.message)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="page signup-page">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Register</h1>
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
          />
        </div>
        <div className="first-last">
          <div className="input-wrapper">
            <label htmlFor="firstName">First Name</label>
            <input
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Shawn"
              pattern="[A-Za-z]+"
              minLength={3}
              maxLength={12}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastInitial">Last Initial</label>
            <input
              value={formData.lastInitial}
              onChange={handleChange}
              type="text"
              name="lastInitial"
              id="lastInitial"
              placeholder="B"
              pattern="[A-Za-z]+"
              minLength={1}
              maxLength={1}
              required
            />
          </div>
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            minLength={8}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            name="password"
            id="confirmPassword"
            placeholder="••••••••"
            minLength={8}
            required
          />
        </div>
        <div className="password-checks">
          <p
            className={`length ${formData.password.length >= 8 ? "okay" : ""}`}
          >
            <span>
              {formData.password.length >= 8 ? (
                <FaCheck />
              ) : (
                <IoMdCloseCircle />
              )}
            </span>
            Password is at least 8 characters
          </p>
          <p
            className={`match ${
              isMatching(formData.password, formData.confirmPassword) &&
              formData.confirmPassword.length >= 1
                ? "okay"
                : ""
            }`}
          >
            <span>
              {isMatching(formData.password, formData.confirmPassword) &&
              formData.password.length >= 1 ? (
                <FaCheck />
              ) : (
                <IoMdCloseCircle />
              )}
            </span>
            Passwords match
          </p>
        </div>
        <button disabled={isLoading} type="submit" className="sign-in-button">
          Register
        </button>

        <div
          className={`status-message ${
            isLoading || error || isSuccess || (standardError && isError)
              ? "show"
              : ""
          }`}
        >
          {isLoading && <div className="spinner"></div>}
          {(isError || standardError) && (
            <div className="error">{standardError}</div>
          )}
          {/* {standardError && <div className="error">{standardError}</div>} */}
          {error && <div className="error">{error}</div>}
          {isSuccess && (
            <div className="success">
              <AiFillCheckCircle />
            </div>
          )}
        </div>
        <OAuth />
        <p className="description">
          Already registered?{" "}
          <span>
            <Link to="/signin">Sign in here</Link>
          </span>
        </p>
      </form>
    </div>
  )
}
