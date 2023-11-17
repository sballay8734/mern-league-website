import "./Header.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user)
  return (
    <div className="header-wrapper">
      <div className="header">
        {/* <Link to="/admin">Admin</Link> */}
        <Link to="/">Home</Link>
        <Link to="/compare">Compare</Link>
        <Link to="/kingofthehill">KOTH</Link>
        <Link to="/picks">Picks</Link>
        <Link to="/suggestions">Suggestions</Link>
        <Link to="/records">Records</Link>
        <Link to="/profile">{user ? <div>Profile</div> : "Sign in"}</Link>
      </div>
      <div className="header-hover-effect"></div>
      <img className="hover-image" src="/src/public/hover.svg" alt="hover" />
    </div>
  )
}
