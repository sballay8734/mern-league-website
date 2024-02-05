import H2hOwnerTwoRegSzn from "./OwnerTwo/H2hOwnerTwoRegSzn"
import H2hOwnerOneRegSzn from "./OwnerOne/H2hOwnerOneRegSzn"
import MiddleColumn from "../MiddleColumn"

export default function H2hRegSzn() {
  return (
    <div className="h2h-content-wrapper">
      <div className="h2h-content h2h-content-wrapper">
        {/* OWNER ONE */}
        <H2hOwnerOneRegSzn />
        {/* MIDDLE SECTION */}
        <div className="stat-names">
          <div className="main-cell cell stat stat-title">Stat</div>
          <MiddleColumn />
        </div>
        {/* OWNER TWO */}
        <H2hOwnerTwoRegSzn />
      </div>
    </div>
  )
}
