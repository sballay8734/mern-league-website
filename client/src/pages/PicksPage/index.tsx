import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { RootState } from "../../redux/store"
import { GoTriangleDown } from "react-icons/go"
import "./PicksPage.scss"

export default function PicksPage() {
  const { user } = useSelector((state: RootState) => state.user)

  // ALL THREE SECTIONS NEED TO BE MOVED TO THEIR OWN COMPONENT (picksAT, picks-section, picks-by-season)

  return (
    <div className="page picks-page">
      {/* Move to own component */}
      <div className="picks-all-time">
        <h1 className="header">All-time Performance</h1>
        <table className="at-picks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Fraction</th>
              <th>Pct.</th>
            </tr>
          </thead>
          <tbody>
            <tr className="active-row">
              <td>Shawn B.</td>
              <td>218/478</td>
              <td className="percentage">43%</td>
            </tr>
            <tr>
              <td>Steve S.</td>
              <td>218/478</td>
              <td className="percentage">37%</td>
            </tr>
            <tr>
              <td>Don I.</td>
              <td>218/478</td>
              <td className="percentage">49%</td>
            </tr>
            <tr>
              <td>Cody Z.</td>
              <td>218/478</td>
              <td className="percentage">31%</td>
            </tr>
            <tr>
              <td>Shawn B.</td>
              <td>218/478</td>
              <td className="percentage">43%</td>
            </tr>
            <tr>
              <td>Steve S.</td>
              <td>218/478</td>
              <td className="percentage">37%</td>
            </tr>
            <tr>
              <td>Don I.</td>
              <td>218/478</td>
              <td className="percentage">49%</td>
            </tr>
            <tr>
              <td>Cody Z.</td>
              <td>218/478</td>
              <td className="percentage">31%</td>
            </tr>
            <tr>
              <td>Shawn B.</td>
              <td>218/478</td>
              <td className="percentage">43%</td>
            </tr>
            <tr>
              <td>Steve S.</td>
              <td>218/478</td>
              <td className="percentage">37%</td>
            </tr>
            <tr>
              <td>Don I.</td>
              <td>218/478</td>
              <td className="percentage">49%</td>
            </tr>
            <tr>
              <td>Cody Z.</td>
              <td>218/478</td>
              <td className="percentage">31%</td>
            </tr>
          </tbody>
        </table>
      </div>
      {user ? (
        // Move to own component
        <div className="picks-section">
          <div className="picks-header"></div>
          <div className="picks"></div>
        </div>
      ) : (
        <div className="picks-section-unauth">
          You must be logged in to make picks
          <Link to={"/signin"}>Sign in</Link>
        </div>
      )}
      {/* Move to own component */}
      <div className="picks-by-season">
        <h1 className="header">
          <div className="years">
            <span className="year">2023</span>
            <span className="word">Pick Rate</span>
            <span className="arrow">
              <GoTriangleDown />
            </span>
          </div>
        </h1>
        <table className="at-picks-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Fraction</th>
              <th>Pct.</th>
            </tr>
          </thead>
          <tbody>
            <tr className="active-row">
              <td>Shawn B.</td>
              <td>27/52</td>
              <td className="percentage">43%</td>
            </tr>
            <tr>
              <td>Steve S.</td>
              <td>27/52</td>
              <td className="percentage">37%</td>
            </tr>
            <tr>
              <td>Don I.</td>
              <td>27/52</td>
              <td className="percentage">49%</td>
            </tr>
            <tr>
              <td>Cody Z.</td>
              <td>27/52</td>
              <td className="percentage">31%</td>
            </tr>
            <tr>
              <td>Shawn B.</td>
              <td>27/52</td>
              <td className="percentage">43%</td>
            </tr>
            <tr>
              <td>Steve S.</td>
              <td>27/52</td>
              <td className="percentage">37%</td>
            </tr>
            <tr>
              <td>Don I.</td>
              <td>27/52</td>
              <td className="percentage">49%</td>
            </tr>
            <tr>
              <td>Cody Z.</td>
              <td>27/52</td>
              <td className="percentage">31%</td>
            </tr>
            <tr>
              <td>Shawn B.</td>
              <td>27/52</td>
              <td className="percentage">43%</td>
            </tr>
            <tr>
              <td>Steve S.</td>
              <td>27/52</td>
              <td className="percentage">37%</td>
            </tr>
            <tr>
              <td>Don I.</td>
              <td>27/52</td>
              <td className="percentage">49%</td>
            </tr>
            <tr>
              <td>Cody Z.</td>
              <td>27/52</td>
              <td className="percentage">31%</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* {user ? (
        <div>Picks page</div>
      ) : (
        <div>You must be logged in to view this page</div>
      )} */}
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
