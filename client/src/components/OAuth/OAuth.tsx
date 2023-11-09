import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from "../../firebase"
import { AiFillGoogleSquare } from "react-icons/ai"
import "./OAuth.scss"

export default function OAuth() {
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

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

      const data = res.json()
      console.log(data)
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
