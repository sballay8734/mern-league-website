import MiddleColumn from "../MiddleColumn"
import H2hOwnerOneCombined from "./OwnerOne/H2hOwnerOneCombined"
import H2hOwnerTwoCombined from "./OwnerTwo/H2hOwnerTwoCombined"

export default function H2hCombined() {
  return (
    <div className="h2h-content-wrapper h2h-column disable-scrollbars">
      <div className="h2h-content h2h-content-wrapper">
        {/* OWNER ONE */}
        <H2hOwnerOneCombined />
        {/* MIDDLE SECTION */}
        <div className="stat-names">
          <div className="main-cell cell stat stat-title">Stat</div>
          <MiddleColumn />
        </div>
        {/* OWNER TWO */}
        <H2hOwnerTwoCombined />
      </div>
    </div>
  )
}
