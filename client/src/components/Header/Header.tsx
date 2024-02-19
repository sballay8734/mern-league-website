import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { RootState } from "../../redux/store";
import { CgMenuLeft } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { LuCrown } from "react-icons/lu";
import { MdCompareArrows } from "react-icons/md";
import { FaAward } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import NotificationCounter from "../NotificationCounter/NotificationCounter";

import "./Header.scss";

export default function Header() {
  const { user } = useSelector((state: RootState) => state.user);
  const [navIsShown, setNavIsShown] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleNavToggle() {
    setNavIsShown(!navIsShown);
  }

  function handleAdminNav() {
    if (!user) return;
    if (user.isAdmin === false) return;

    handleNavToggle();
    navigate("/admin");
  }

  return (
    <>
      <div className="mobile-header-wrapper">
        <div onClick={handleNavToggle} className="menu-icon">
          {!navIsShown ? <CgMenuLeft /> : <IoCloseOutline />}
        </div>
        <div className={`side-nav ${navIsShown ? "show" : ""}`}>
          <div onClick={() => setNavIsShown(false)} className="nav-top">
            <Link to="/">
              <span>Home</span>
              <FaHome />
            </Link>
            <Link to="/compare">
              <span>Compare</span>
              <MdCompareArrows />
            </Link>
            <Link to="/records">
              <span>Records</span>
              <FaAward />
            </Link>
          </div>
          <div className="mobile-nav-spacer" onClick={handleAdminNav}>
            {user ? (
              <img
                className={`${
                  user.preferredTheme === "eagles-kelly" ? "kelly" : ""
                }`}
                src={
                  user?.preferredTheme === "eagles-kelly"
                    ? `${user?.preferredTheme}Logo.png`
                    : `/${user?.preferredTheme}Logo.svg`
                }
                alt=""
              />
            ) : (
              <img src={"/defaultLogo.png"} alt="" />
            )}
          </div>
          <div onClick={() => setNavIsShown(false)} className="nav-bottom">
            <Link to="/kingofthehill">
              <span>KOTH</span>
              <LuCrown />
            </Link>
            <Link to="/picks">
              <span>Picks</span>
              <img className="picks-img" src="/picks.png" alt="Picks" />
            </Link>
            <Link to="/suggestions" className="relative">
              <span>Proposals</span>
              <img
                className="proposals-img"
                src="/proposals.png"
                alt="Proposals"
              />
              {user && <NotificationCounter />}
            </Link>
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
  );
}
