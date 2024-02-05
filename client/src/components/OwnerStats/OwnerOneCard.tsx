import { StaticOwner } from "../../types/StaticOwner"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useFetchUserImagesQuery } from "../../redux/owners/ownersApi"
import { useDispatch } from "react-redux"
import { setOwnerOne, setOwnerTwo } from "../../redux/owners/compareSlice"

import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaCrown,
  FaTrophy
} from "react-icons/fa"
import { GiLargeDress } from "react-icons/gi"

interface OwnerOneCardProps {
  ownerOne: StaticOwner
  data: StaticOwner[]
}

interface User {
  email: string
  firstName: string
  lastInitial: string
  preferredTheme: string
  avatar: string
  fullName: string
}

export default function OwnerOneCard({ ownerOne, data }: OwnerOneCardProps) {
  const dispatch = useDispatch()
  const { data: userImages } = useFetchUserImagesQuery()
  const { ownerTwo } = useSelector((state: RootState) => state.compare)

  function handleOwnerSwitch(ownerSwitched: StaticOwner, direction: string) {
    if (data && ownerOne && ownerTwo) {
      const ownerOneIndex = data?.indexOf(ownerOne) // 0
      const ownerTwoIndex = data?.indexOf(ownerTwo) // 11
      // console.log(ownerOneIndex, ownerTwoIndex)

      const index = data?.indexOf(ownerSwitched) // 0
      let nextIndex = calcNextIndex(index, direction) // 11

      if (index === ownerOneIndex) {
        if (
          data[nextIndex].ownerName === ownerTwo.ownerName &&
          direction === "forward"
        ) {
          nextIndex = calcNextIndex(nextIndex, direction)
          dispatch(setOwnerOne(data[nextIndex]))
        } else if (
          data[nextIndex].ownerName === ownerTwo.ownerName &&
          direction === "back"
        ) {
          nextIndex = calcNextIndex(nextIndex, direction)
          dispatch(setOwnerOne(data[nextIndex]))
        } else {
          dispatch(setOwnerOne(data[nextIndex]))
        }
      }
      if (index === ownerTwoIndex) {
        if (
          data[nextIndex].ownerName === ownerOne.ownerName &&
          direction === "forward"
        ) {
          nextIndex = calcNextIndex(nextIndex, direction)
          dispatch(setOwnerTwo(data[nextIndex]))
        } else if (
          data[nextIndex].ownerName === ownerOne.ownerName &&
          direction === "back"
        ) {
          nextIndex = calcNextIndex(nextIndex, direction)
          dispatch(setOwnerTwo(data[nextIndex]))
        } else {
          dispatch(setOwnerTwo(data[nextIndex]))
        }
      }
    }
  }

  function calcNextIndex(index: number, direction: string) {
    if (index === 0 && direction === "back") {
      return 11
    } else if (index === 11 && direction === "forward") {
      return 0
    } else {
      if (direction === "forward") {
        return index + 1
      } else if (direction === "back") {
        return index - 1
      }
    }
    return 0
  }

  function grabAvatar(owner: StaticOwner) {
    const ownerName = owner.ownerName

    const ownerAvatar =
      userImages &&
      (userImages.find((item: User) => {
        return item.fullName === ownerName
      }) as User | null)

    if (ownerAvatar) {
      return ownerAvatar.avatar || "/profileImg.png"
    } else {
      return "/profileImg.png"
    }
  }

  return (
    <div className="owner-one-selector-wrapper selector-wrapper">
      <div className="selector-header">
        {ownerOne && (
          <button
            onClick={() => handleOwnerSwitch(ownerOne, "back")}
            className="arrow arrow-left"
          >
            <span>
              <FaAngleDoubleLeft />
            </span>
            Prev{" "}
          </button>
        )}
        <div className="spacer"></div>
        <h2 className="owner-one-name owner-name">
          {ownerOne?.ownerName &&
            (() => {
              const [firstName, lastName] = ownerOne.ownerName.split(" ")
              const lastInitial = lastName ? lastName.charAt(0) : ""
              return `${firstName} ${lastInitial}.`
            })()}
        </h2>
        <div className="spacer"></div>
        {ownerOne && (
          <button
            onClick={() => handleOwnerSwitch(ownerOne, "forward")}
            className="arrow arrow-right"
          >
            Next{" "}
            <span>
              <FaAngleDoubleRight />
            </span>
          </button>
        )}
      </div>
      <div className="selector-body">
        <img
          className="profileImg"
          src={ownerOne ? grabAvatar(ownerOne) : "/profileImg.png"}
          alt="profile"
        />
        <div className="main-stats-wrapper">
          <div className="main-stats main-stats-left">
            <h2 className="stat stat1">
              Championships:{" "}
              <span className="icons">
                {ownerOne && ownerOne?.bonusStats.championships! > 0
                  ? new Array(ownerOne?.bonusStats.championships)
                      .fill(null)
                      .map((_, index) => <FaTrophy key={index} />)
                  : "-"}
              </span>
            </h2>
            <h2 className="stat stat2">
              KOTH Wins:{" "}
              <span className="icons">
                {ownerOne && ownerOne?.bonusStats.kothWins! > 0
                  ? new Array(ownerOne?.bonusStats.kothWins)
                      .fill(null)
                      .map((_, index) => <FaCrown key={index} />)
                  : "-"}
              </span>
            </h2>
          </div>
          <div className="main-stats main-stats-right">
            <h2 className="stat stat3">
              Skirts:{" "}
              <span className="icons">
                {ownerOne && ownerOne?.bonusStats.skirts! > 0
                  ? new Array(ownerOne?.bonusStats.skirts)
                      .fill(null)
                      .map((_, index) => <GiLargeDress key={index} />)
                  : "-"}
              </span>
            </h2>
            <h2 className="stat stat4">
              Avg. Finish:{" "}
              <span className="icons">
                {ownerOne && ownerOne.bonusStats.avgFinishPlace}
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}