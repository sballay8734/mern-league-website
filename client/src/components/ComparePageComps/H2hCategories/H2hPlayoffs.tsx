import MiddleColumn from "../MiddleColumn"
import H2hOwnerOnePlayoffs from "./OwnerOne/H2hOwnerOnePlayoffs"
import H2hOwnerTwoPlayoffs from "./OwnerTwo/H2hOwnerTwoPlayoffs"

export default function H2hPlayoffs() {
  return (
    <div className="h2h-content-wrapper">
      <div className="h2h-content h2h-content-wrapper">
        {/* OWNER ONE */}
        <H2hOwnerOnePlayoffs />
        {/* MIDDLE SECTION */}
        <div className="stat-names">
          <div className="main-cell cell stat stat-title">Stat</div>
          <MiddleColumn />
        </div>
        {/* OWNER TWO */}
        <H2hOwnerTwoPlayoffs />
      </div>
    </div>
  )
}
