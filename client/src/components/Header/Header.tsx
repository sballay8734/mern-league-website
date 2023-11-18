import "./Header.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user)
  // console.log(user.avatar)
  return (
    <div className="header-wrapper">
      <div className="header">
        {/* <Link to="/admin">Admin</Link> */}
        <div className="nav-left">
          <Link to="/">Home</Link>
          <Link to="/compare">Compare</Link>
          <Link to="/kingofthehill">KOTH</Link>
          <Link to="/records">Records</Link>
        </div>
        <div className="nav-right">
          {user && (
            <Link to="/picks">
              <img
                className="picks-img"
                src="./src/public/picks.png"
                alt="Picks"
              />
            </Link>
          )}
          {user && (
            <Link to="/suggestions">
              <img
                className="proposals-img"
                src="./src/public/proposals.png"
                alt="Proposals"
              />
            </Link>
          )}
          <Link to="/profile">
            {user ? (
              <img
                className="profile-img"
                // this will change to user profile img
                src="./src/public/profileImg.png"
                alt="Profile"
              />
            ) : (
              "Sign in"
            )}
          </Link>
        </div>
      </div>
      <div className="header-hover-effect"></div>
      <img className="hover-image" src="/src/public/hover.svg" alt="hover" />
    </div>
  )
}
