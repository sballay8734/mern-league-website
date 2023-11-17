import { useRef, useState } from "react"
import "./ProfilePage.scss"
import { FaCheck } from "react-icons/fa6"
import { IoMdCloseCircle } from "react-icons/io"

interface formData {
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<formData>({
    newPassword: "",
    confirmPassword: ""
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  function isMatching(pass1: string, pass2: string) {
    return pass1 === pass2
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  const imgRef = useRef<HTMLInputElement | null>(null)
  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="update-profile-form">
        <h1>Profile</h1>
        <input hidden ref={imgRef} accept="image/*" type="file" id="file" />
        <img
          onClick={() => imgRef.current && imgRef.current.click()}
          src="/src/public/profileImg.png"
          alt="profile"
        />
        <p className="description">Click image to change profile picture</p>
        <div className="input-wrapper">
          <label htmlFor="newPassword">New Password</label>
          <input
            minLength={8}
            maxLength={20}
            onChange={handleChange}
            value={formData.newPassword}
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="••••••••"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            minLength={8}
            maxLength={20}
            onChange={handleChange}
            value={formData.confirmPassword}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="••••••••"
          />
        </div>
        <div className="password-checks">
          <p
            className={`length ${
              formData.newPassword.length >= 8 ? "okay" : ""
            }`}
          >
            <span>
              {formData.newPassword.length >= 8 ? (
                <FaCheck />
              ) : (
                <IoMdCloseCircle />
              )}
            </span>
            Password is at least 8 characters
          </p>
          <p
            className={`match ${
              isMatching(formData.newPassword, formData.confirmPassword) &&
              formData.newPassword.length >= 1
                ? "okay"
                : ""
            }`}
          >
            <span>
              {isMatching(formData.newPassword, formData.confirmPassword) &&
              formData.newPassword.length >= 1 ? (
                <FaCheck />
              ) : (
                <IoMdCloseCircle />
              )}
            </span>
            Passwords match
          </p>
        </div>
        <button type="submit" className="sign-in-button">
          Update
        </button>
      </form>
    </div>
  )
}
