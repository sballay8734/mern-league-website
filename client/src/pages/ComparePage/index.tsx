import "./ComparePage.scss"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import {
  setOwnerOne,
  setOwnerTwo,
  setActiveTimeFrame
} from "../../redux/owners/compareSlice"
import { useDispatch } from "react-redux"

import { useFetchStaticDataQuery } from "../../redux/owners/ownersApi"
import { MdCompareArrows } from "react-icons/md"
import { StaticOwner } from "../../types/StaticOwner"
import { ImSpinner10 } from "react-icons/im"
import OwnerOneCard from "../../components/OwnerStats/OwnerOneCard"
import OwnerTwoCard from "../../components/OwnerStats/OwnerTwoCard"
import MainContent from "../../components/ComparePageComps/MainContent"

export default function ComparePage() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne)
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo)
  const activeTimeFrame = useSelector(
    (state: RootState) => state.compare.activeTimeFrame
  )

  const { data, isLoading } = useFetchStaticDataQuery()

  console.log("Rendering Compare Page...")

  useEffect(() => {
    if (data && user) {
      const tempOwner = data.find(
        (owner: StaticOwner) => user.firstName === owner.ownerName.split(" ")[0]
      )

      if (tempOwner) {
        dispatch(setOwnerOne(tempOwner))

        const tempOwnerIndex = data.indexOf(tempOwner)

        dispatch(setOwnerTwo(tempOwnerIndex !== 11 ? data[11] : data[10]))
      } else {
        dispatch(setOwnerOne(data[0]))
      }
    } else {
      if (data) {
        const randomIndex1 = Math.floor(Math.random() * data.length)
        let randomIndex2 = Math.floor(Math.random() * data.length)

        // Ensure the second random index is different from the first
        while (randomIndex2 === randomIndex1) {
          randomIndex2 = Math.floor(Math.random() * data.length)
        }

        // Set ownerOne
        dispatch(setOwnerOne(data[randomIndex1]))

        // Set ownerTwo
        dispatch(setOwnerTwo(data[randomIndex2]))
      }
    }
  }, [data, user])

  return (
    <div className="page compare-page">
      <div className="compare-page-top">
        <div className="compare-page-header">
          <h1>Compare Owners</h1>
          <div className="compare">
            <MdCompareArrows />
          </div>
        </div>
        <nav className="compare-nav">
          <ul>
            <li>
              <button
                className={`${activeTimeFrame === "allTime" ? "active" : ""}`}
                onClick={() => dispatch(setActiveTimeFrame("allTime"))}
              >
                All-Time
              </button>
            </li>
            <li className="spacer"></li>
            <li>
              <button
                className={`h2h-button ${
                  activeTimeFrame === "h2h" ? "active" : ""
                }`}
                onClick={() => dispatch(setActiveTimeFrame("h2h"))}
              >
                <img className="profileImg" src="/vsIcon.png" alt="" />
              </button>
            </li>
            <li className="spacer"></li>
            <li>
              <button
                className={`${activeTimeFrame === "yearly" ? "active" : ""}`}
                onClick={() => dispatch(setActiveTimeFrame("yearly"))}
              >
                Yearly
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="compare-page-bottom">
        {isLoading ? (
          <div className="skeleton">
            <span className="spinner">
              <ImSpinner10 />
            </span>
          </div>
        ) : (
          <>
            {ownerOne && data && (
              <OwnerOneCard ownerOne={ownerOne} data={data} />
            )}
            <div className="main-content-wrapper">
              {data && <MainContent data={data} />}
            </div>
            {ownerTwo && data && (
              <OwnerTwoCard ownerTwo={ownerTwo} data={data} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
