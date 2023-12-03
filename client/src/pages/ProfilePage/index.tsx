import { useEffect, useRef, useState } from "react"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage"

import { FaCheck } from "react-icons/fa6"
import { IoMdCloseCircle } from "react-icons/io"
import { AiFillCheckCircle } from "react-icons/ai"
import { themeOptions } from "./themeData"
import "./ProfilePage.scss"
import { app } from "../../firebase"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { setUser } from "../../redux/user/userSlice"

interface formData {
  newPassword: string
  confirmPassword: string
  avatar: string
  preferredTheme: string
}

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.user)
  const [file, setFile] = useState<null | File>(null)
  const imgRef = useRef<HTMLInputElement | null>(null)
  const [filePct, setFilePct] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState<string | null>(null)
  const [formData, setFormData] = useState<formData>({
    newPassword: "",
    confirmPassword: "",
    avatar: user?.avatar || "",
    preferredTheme: user?.preferredTheme || "eagles"
  })
  const dispatch = useDispatch()
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false)
  const [activeTheme, setActiveTheme] = useState<string>(
    user?.preferredTheme || "eagles"
  )

  useEffect(() => {
    if (file) {
      if (isValidImageFile(file)) {
        handleFileUpload(file)
      } else {
        setFile(null)
        setFileUploadError("File must be smaller than 2MB")
      }
    }
  }, [file])

  function handleThemeSelect(theme: string) {
    setActiveTheme(theme)
    setFormData({
      ...formData,
      preferredTheme: theme
    })
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFileUploadError(null)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  function isMatching(pass1: string, pass2: string) {
    return pass1 === pass2
  }

  function isValidImageFile(file: File) {
    return file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024
  }

  function resetFormData() {
    setFormData({
      ...formData,
      newPassword: "",
      confirmPassword: ""
    })
  }

  function handleFileUpload(file: File) {
    setFilePct(0)
    setFileUploadError(null)
    setUpdateSuccess(false)

    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name

    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePct(Math.round(progress))
      },
      (error: Error) => {
        setFileUploadError("Error uploading file")
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL })
        })
      }
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setUpdateSuccess(false)
    setFileUploadError(null)
    setUpdateLoading(true)

    // if image is unchanged

    if (formData.avatar === user?.avatar && formData.newPassword.length === 0) {
      setFileUploadError("You need to make a change")
      setUpdateLoading(false)
      return
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setFileUploadError("Passwords must match")
      setUpdateLoading(false)
      return
    }

    if (formData.newPassword.length > 0 && formData.newPassword.length < 8) {
      setFileUploadError("Password must be at least 8 characters")
      setUpdateLoading(false)
      return
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = { avatar: formData.avatar }

      if (formData.newPassword.length > 0) {
        updateData.newPassword = formData.newPassword
        updateData.confirmPassword = formData.confirmPassword
      }

      const response = await fetch(
        `https://mern-league-website-server.onrender.com/api/profile/update/${user?._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updateData)
        }
      )
      const data = await response.json()

      if (data.success === false) {
        console.log("Error updating user")
        setUpdateLoading(false)
        return
      }

      console.log(data)
      dispatch(setUser(data))
      setUpdateSuccess(true)
      setUpdateLoading(false)
      setFileUploadError(null)
      setFilePct(0)
      resetFormData()
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }

  return (
    <div className="page">
      <form onSubmit={handleSubmit} className="update-profile-form">
        <h1>Profile</h1>
        <input
          onChange={(e) => setFile(e.target.files && e.target.files[0])}
          hidden
          ref={imgRef}
          accept="image/*"
          type="file"
          id="file"
        />
        <img
          onClick={() => imgRef.current && imgRef.current.click()}
          src={formData.avatar || user?.avatar}
          alt="profile"
        />
        <p className="upload-status">
          {fileUploadError ? (
            // moved this logic elsewhere
            ""
          ) : filePct > 0 && filePct < 100 ? (
            <span>{`Uploading... ${filePct}%`}</span>
          ) : filePct === 100 ? (
            <span className="success">
              Successfully uploaded!{" "}
              <span className="success-details">
                Click "Update" to make changes permanent
              </span>
            </span>
          ) : (
            ""
          )}
        </p>
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

        <div
          className={`password-checks ${
            formData.newPassword.length > 0 ? "show" : ""
          }`}
        >
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

        <div className="theme-select">
          <h3 className="theme-select-description">Choose Your Theme</h3>
          <div className="themes-wrapper">
            {themeOptions.map((item) => (
              <div
                onClick={() => handleThemeSelect(item.theme)}
                key={item.theme}
                className={`theme-img-wrapper ${
                  activeTheme === item.theme ? "active" : ""
                }`}
              >
                <img className={item.theme} src={item.logo} alt={item.theme} />
              </div>
            ))}
          </div>
        </div>
        <div
          className={`status-div ${
            fileUploadError || updateLoading || updateSuccess ? "show" : ""
          }`}
        >
          {updateLoading && <div className="spinner"></div>}
          {fileUploadError && <div className="error">{fileUploadError}</div>}
          {updateSuccess && (
            <div className="success">
              <AiFillCheckCircle /> <span>Profile update was successful!</span>
            </div>
          )}
        </div>
        <button
          disabled={updateLoading}
          type="submit"
          className="sign-in-button"
        >
          Update
        </button>
      </form>
    </div>
  )
}
