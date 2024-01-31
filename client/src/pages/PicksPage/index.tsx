import { useEffect, useState } from "react"

import AllTimeRate from "../../components/PicksPageComps/AllTimeRate"
import SeasonalRate from "../../components/PicksPageComps/SeasonalRate"
import Picks from "../../components/PicksPageComps/Picks"
import { useFetchPropsQuery } from "../../redux/props/propsApi"

import "./PicksPage.scss"

export default function PicksPage() {
  const [viewportWidth, setViewportWidth] = useState<number | undefined>(
    window.innerWidth
  )
  const { data: propData, refetch } = useFetchPropsQuery()

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [propData])

  return (
    <>
      {propData && (
        <div className="page picks-page">
          {viewportWidth && viewportWidth > 820 ? (
            <div className="desktop">
              <AllTimeRate />
              <Picks propData={propData} />
              <SeasonalRate />
            </div>
          ) : (
            <div className="mobile">
              <Picks propData={propData} />
            </div>
          )}
        </div>
      )}
    </>
  )
}
