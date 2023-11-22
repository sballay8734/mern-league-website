import { useEffect, useRef, useState } from "react"
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from "firebase/storage"

import { FaCheck } from "react-icons/fa6"
import { IoMdCloseCircle } from "react-icons/io"
import "./ProfilePage.scss"
import { app } from "../../firebase"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { setUser } from "../../redux/user/userSlice"

interface formData {
  newPassword: string
  confirmPassword: string
  avatar: string
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
    avatar: user?.avatar || ""
  })
  const [filePermanent, setFilePermanent] = useState<boolean>(false)
  const dispatch = useDispatch()

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  function handleFileUpload(file: File) {
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

    try {
      const response = await fetch(`/api/profile/update/${user?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()

      if (data.success === false) {
        console.log("Error updating user")
        return
      }

      console.log(data)
      dispatch(setUser(data))
      setFilePermanent(true)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }
  console.log(filePermanent)
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
          {fileUploadError || filePermanent ? (
            <span className="error">{fileUploadError}</span>
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
        <div className="theme-select">
          <h3 className="theme-select-description">Choose Your Theme</h3>
          <div className="themes-wrapper">
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
            <img src="/src/public/profileImg.png" alt="" />
          </div>
        </div>
        <button type="submit" className="sign-in-button">
          Update
        </button>
      </form>
    </div>
  )
}
