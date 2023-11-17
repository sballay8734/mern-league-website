import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { app } from "../../firebase"
import { AiFillGoogleSquare } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/user/userSlice"
import "./OAuth.scss"

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
        console.log("Fail")
        return
      }
      console.log(data)
      dispatch(setUser(data))
      navigate("/")
    } catch (error) {
      console.log("Could not sign in with google", error)
    }
  }

  return (
    <button onClick={handleGoogleClick} type="button" className="google-button">
      Sign in with Google{" "}
      <span>
        <AiFillGoogleSquare className="logo" />
      </span>
    </button>
  )
}
