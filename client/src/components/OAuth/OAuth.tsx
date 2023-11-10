import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { app } from "../../firebase"
import { AiFillGoogleSquare } from "react-icons/ai"
import "./OAuth.scss"
import { signInFailure, signInSuccess } from "../../redux/user/userSlice"
import { useDispatch } from "react-redux"

export default function OAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      console.log(result)

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          displayName: result.user.displayName,
          email: result.user.email
        })
      })

      const data = await res.json()

      console.log("data", data)
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate("/")
    } catch (error) {
      console.log("Could not sign in with google", error)
    }
  }

  return (
    <button onClick={handleGoogleClick} className="google-button" type="button">
      Sign in with Google{" "}
      <span>
        <AiFillGoogleSquare />
      </span>
    </button>
  )
}
