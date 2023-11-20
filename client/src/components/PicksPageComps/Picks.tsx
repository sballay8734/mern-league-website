import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { RootState } from "../../redux/store"

export default function Picks() {
  const { user } = useSelector((state: RootState) => state.user)

  return (
    <>
      {user ? (
        // Move to own component
        <div className="picks-section">
          <div className="picks-header"></div>
          <div className="picks"></div>
        </div>
      ) : (
        <div className="picks-section-unauth">
          You must be signed in to make picks
          <Link to={"/signin"}>Sign in</Link>
        </div>
      )}
    </>
  )
}
