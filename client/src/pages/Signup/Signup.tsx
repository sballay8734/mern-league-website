import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/user/userSlice"

import { useLazyStandardSignupMutation } from "../../redux/auth/authApi"
import OAuth from "../../components/OAuth/OAuth"
import { AiFillCheckCircle } from "react-icons/ai"
import { FaCheck } from "react-icons/fa6"
import { IoMdCloseCircle } from "react-icons/io"
import "./Signup.scss"

interface FormData {
  email: string
  displayName: string
  password: string
  confirmPassword: string
}

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [trigger, { isError, isLoading, isSuccess }] =
    useLazyStandardSignupMutation()
  const [formData, setFormData] = useState<FormData>({
    email: "",
    displayName: "",
    password: "",
    confirmPassword: ""
  })
  const [error, setError] = useState<string | null>(null)

  function isMatching(pass1: string, pass2: string) {
    return pass1 === pass2
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

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
            setError(data.message)
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
        <div className="input-wrapper">
          <label htmlFor="displayName">Display Name</label>
          <input
            value={formData.displayName}
            onChange={handleChange}
            type="text"
            name="displayName"
            id="displayName"
            placeholder="BabyDickRick"
            minLength={3}
            maxLength={15}
            required
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
        {isLoading && <div className="spinner"></div>}
        {isError && <div className="error">{error}</div>}
        {isSuccess && (
          <div className="success">
            <AiFillCheckCircle />
          </div>
        )}
        <h3 className="or">Or</h3>
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
