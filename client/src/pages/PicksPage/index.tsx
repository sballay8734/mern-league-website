import { useEffect, useState } from "react"

import AllTimeRate from "../../components/PicksPageComps/AllTimeRate"
import SeasonalRate from "../../components/PicksPageComps/SeasonalRate"
import Picks from "../../components/PicksPageComps/Picks"

import "./PicksPage.scss"

export default function PicksPage() {
  const [viewportWidth, setViewportWidth] = useState<number | undefined>(
    window.innerWidth
  )

  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return (
    <div className="page picks-page">
      {viewportWidth && viewportWidth > 820 ? (
        <div className="desktop">
          <AllTimeRate />
          <Picks />
          <SeasonalRate />
        </div>
      ) : (
        <div className="mobile">
          <Picks />
        </div>
      )}
    </div>
  )
}

// import React, { useState, useEffect } from "react"

// const ResponsiveComponent = () => {
//   const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

//   useEffect(() => {
//     const handleResize = () => {
//       setViewportWidth(window.innerWidth)
//     }

//     // Attach the event listener
//     window.addEventListener("resize", handleResize)

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize)
//     }
//   }, [])

//   return (
//     <div>
//       {viewportWidth > 768 ? (
//         <LargeScreenComponent />
//       ) : (
//         <SmallScreenComponent />
//       )}
//     </div>
//   )
// }

// const LargeScreenComponent = () => {
//   return <p>This is rendered on large screens.</p>
// }

// const SmallScreenComponent = () => {
//   return <p>This is rendered on small screens.</p>
// }

// export default ResponsiveComponent
