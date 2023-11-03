import "./Header.scss"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className="header-wrapper">
      <div className="header">
        <Link to="/admin">Admin</Link>
        <Link to="/">Home</Link>
        <Link to="/compare">Compare</Link>
        <Link to="/kingofthehill">KOTH</Link>
        <Link to="/picks">Picks</Link>
        <Link to="/suggestions">Suggestions</Link>
        <Link to="/records">Records</Link>
      </div>
      <div className="header-hover-effect"></div>
    </div>
  )
}
