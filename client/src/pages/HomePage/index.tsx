import "./HomePage.scss"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useFetchUserImagesQuery } from "../../redux/owners/ownersApi"
import { useEffect } from "react"

export default function HomePage() {
  const { user } = useSelector((state: RootState) => state.user)
  const { refetch, data, isError, isLoading } = useFetchUserImagesQuery()

  console.log(isError, isLoading)

  console.log(data)

  useEffect(() => {
    refetch()
  }, [user])

  return (
    <div className="page hero__image">
      {/* <div className="overlay"></div> */}
      <div className="established">EST. 2014</div>
      <div className="title-circle-wrapper">
        <div className="title-text-wrapper">
          <h1 className="hero__text absolute">
            Welcome to the Legendary League of Ex-Athletes
          </h1>
        </div>
        <div className="circle__center animate-rotate">
          {data &&
            data.map((account, index) => (
              <div
                key={account.email}
                className={`icon__wrapper icon__wrapper-${index}`}
              >
                <div className={`relative icon__${index} icon`}>
                  <img src={account.avatar} alt="profile"></img>
                  <span className="icon__name">
                    {account.firstName} {account.lastInitial}.
                  </span>
                </div>
                <div className="icon__pole"></div>
              </div>
            ))}
          {/* <div className="icon__wrapper icon__wrapper-two">
            <div className="relative icon__two icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-three">
            <div className="relative icon__three icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-four">
            <div className="relative icon__four icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-five">
            <div className="relative icon__five icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-six">
            <div className="relative icon__six icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-seven">
            <div className="relative icon__seven icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-eight">
            <div className="relative icon__eight icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-nine">
            <div className="relative icon__nine icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-ten">
            <div className="relative icon__ten icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-eleven">
            <div className="relative icon__eleven icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div>
          <div className="icon__wrapper icon__wrapper-twelve">
            <div className="relative icon__twelve icon">
              <img src={logo} alt="profile"></img>
            </div>
            <div className="icon__pole"></div>
          </div> */}
        </div>
      </div>
      {user !== null ? (
        <div className="greeting">
          <span className="welcome">Welcome</span>{" "}
          <span className="name">{user.firstName}!</span>{" "}
          {/* <span className="insult">Ya bitchhhhh</span> */}
        </div>
      ) : (
        <div className="auth-buttons">
          <Link className="signin" to="/signin">
            Sign In
          </Link>
          <Link className="signup" to="/signup">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}
