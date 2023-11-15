/* 
THIS COMPONENT IS ALL SET UP, JUST NEED TO PASS computedOwners instead of Owners
*/
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import { setOwnerOne, setOwnerTwo } from "../../redux/owners/compareSlice"
import { useFetchOwnersQuery } from "../../redux/owners/ownersApi"
import "./ComparePage.scss"
import { useEffect } from "react"
import { RootState } from "../../redux/store"
import { FaAngleRight } from "react-icons/fa6"
import { FaAngleLeft } from "react-icons/fa6"

export default function ComparePage() {
  const dispatch = useDispatch()
  const { data, error, isLoading } = useFetchOwnersQuery()
  // below is just to remove error
  console.log(error, isLoading)

  const [ownerOneIndex, setOwnerOneIndex] = useState(0)
  const [ownerTwoIndex, setOwnerTwoIndex] = useState(1)

  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne)
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo)

  useEffect(() => {
    if (data) {
      dispatch(setOwnerOne(data[ownerOneIndex]))
      dispatch(setOwnerTwo(data[ownerTwoIndex]))
    }
  }, [data, dispatch, ownerOneIndex, ownerTwoIndex])

  const ownersLength = data?.length || 0

  function handleArrowRight(owner: "ownerOne" | "ownerTwo") {
    if (owner === "ownerOne") {
      if ((ownerOneIndex + 1) % ownersLength === ownerTwoIndex) {
        setOwnerOneIndex((prevIndex) => (prevIndex + 2) % ownersLength)
      } else {
        setOwnerOneIndex((prevIndex) => (prevIndex + 1) % ownersLength)
      }
    } else if (owner === "ownerTwo") {
      if ((ownerTwoIndex + 1) % ownersLength === ownerOneIndex) {
        setOwnerTwoIndex((prevIndex) => (prevIndex + 2) % ownersLength)
      } else {
        setOwnerTwoIndex((prevIndex) => (prevIndex + 1) % ownersLength)
      }
    }
  }

  // I THINK THIS IS WORKING. DO SOME TESTING
  function handleArrowLeft(owner: "ownerOne" | "ownerTwo") {
    if (owner === "ownerOne") {
      if (ownerTwoIndex === ownersLength - 1 && ownerOneIndex === 0) {
        setOwnerOneIndex(ownersLength - 2)
      } else if (ownerOneIndex - 1 === ownerTwoIndex) {
        setOwnerOneIndex((prevIndex) => prevIndex + ownersLength - 2)
      } else {
        setOwnerOneIndex((prevIndex) =>
          prevIndex === 0 ? ownersLength - 1 : prevIndex - 1
        )
      }
    } else if (owner === "ownerTwo") {
      if (ownerOneIndex === ownersLength - 1 && ownerTwoIndex === 0) {
        setOwnerTwoIndex(ownersLength - 2)
      } else if (ownerTwoIndex - 1 === ownerOneIndex) {
        setOwnerTwoIndex((prevIndex) => prevIndex + ownersLength - 2)
      } else {
        setOwnerTwoIndex((prevIndex) =>
          prevIndex === 0 ? ownersLength - 1 : prevIndex - 1
        )
      }
    }
  }

  return (
    <div className="page">
      <div className="owner owner-one">
        <button
          onClick={() => handleArrowLeft("ownerOne")}
          className="arrow-left"
        >
          <FaAngleLeft />
        </button>
        <div className="owner-name">{ownerOne?.ownerName}</div>
        <button
          onClick={() => handleArrowRight("ownerOne")}
          className="arrow-right"
        >
          <FaAngleRight />
        </button>
      </div>
      <div className="owner owner-two">
        <button
          onClick={() => handleArrowLeft("ownerTwo")}
          className="arrow-left"
        >
          <FaAngleLeft />
        </button>
        <div className="owner-name">{ownerTwo?.ownerName}</div>
        <button
          onClick={() => handleArrowRight("ownerTwo")}
          className="arrow-right"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}
