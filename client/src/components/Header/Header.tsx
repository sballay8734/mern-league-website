import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"

import { RootState } from "../../redux/store"
import { CgMenuLeft } from "react-icons/cg"
import { IoCloseOutline } from "react-icons/io5"
import "./Header.scss"

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user)
  const [navIsShown, setNavIsShown] = useState<boolean>(false)

  function handleNavToggle() {
    setNavIsShown(!navIsShown)
  }

  return (
    <>
      <div className="desktop-header-wrapper">
        <div className="header">
          <div className="nav-left">
            <Link to="/">Home</Link>
            {/* <Link to="/compare">Compare</Link>
            <Link to="/kingofthehill">KOTH</Link>
            <Link to="/records">Records</Link> */}
          </div>
          <div className="nav-right">
            {/* {user && (
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
            )} */}
            <Link to="/profile">
              {user ? (
                <img
                  className="profile-img"
                  // this will change to user profile img
                  src={user.avatar}
                  alt="Profile"
                />
              ) : (
                "Sign in"
              )}
            </Link>
          </div>
        </div>
        <div className="header-hover-effect"></div>
        <img className="hover-image" src="/hover.svg" alt="hover" />
      </div>
      <div className="mobile-header-wrapper">
        <div onClick={handleNavToggle} className="menu-icon">
          {!navIsShown ? <CgMenuLeft /> : <IoCloseOutline />}
        </div>
        <div className={`side-nav ${navIsShown ? "show" : ""}`}>
          <div onClick={() => setNavIsShown(false)} className="nav-top">
            <Link to="/">Home</Link>
            {/* <Link to="/compare">Compare</Link>
            <Link to="/kingofthehill">KOTH</Link>
            <Link to="/records">Records</Link> */}
          </div>
          <div className="mobile-nav-spacer">
            <img
              src={
                user?.preferredTheme === "eagles-kelly"
                  ? `${user?.preferredTheme}Logo.png`
                  : `/${user?.preferredTheme}Logo.svg`
              }
              alt=""
            />
          </div>
          <div onClick={() => setNavIsShown(false)} className="nav-bottom">
            {/* <Link to="/picks">
              <span>Picks</span>
              <img
                className="picks-img"
                src="./src/public/picks.png"
                alt="Picks"
              />
            </Link>
            <Link to="/suggestions">
              <span>Proposals</span>
              <img
                className="proposals-img"
                src="./src/public/proposals.png"
                alt="Proposals"
              />
            </Link> */}
            <Link to="/profile">
              {user ? (
                <>
                  <span>Profile</span>
                  <img
                    className="profile-img"
                    // this will change to user profile img
                    src={user.avatar}
                    alt="Profile"
                  />
                </>
              ) : (
                "Sign in"
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
