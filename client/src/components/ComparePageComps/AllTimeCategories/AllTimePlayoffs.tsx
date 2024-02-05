import AllTimeOwnerOnePlayoffs from "./OwnerOne/AllTimeOwnerOnePlayoffs"
import AllTimeOwnerTwoPlayoffs from "./OwnerTwo/AllTimeOwnerTwoPlayoffs"

export default function AllTimePlayoffs() {
  return (
    <div className="h2h-content-wrapper disable-scrollbars">
      <div className="h2h-content h2h-content-wrapper">
        {/* ALL TIME PLAYOFFS OWNER ONE */}
        <AllTimeOwnerOnePlayoffs />
        <div className="stat-names">
          <div className="main-cell cell stat stat-title">Stat</div>
          <div className="cell stat stat-one">Record</div>
          <div className="cell stat stat-one">Win %</div>
          <div className="cell stat stat-one">Avg. PF</div>
          <div className="cell stat stat-one">Avg. PA</div>
          <div className="cell stat stat-one">Best Week</div>
          <div className="cell stat stat-one">Worst Week</div>
          <div className="cell stat stat-one">Total PF</div>
          <div className="cell stat stat-one">Total PA</div>
        </div>
        {/* ALL TIME PLAYOFFS OWNER TWO */}
        <AllTimeOwnerTwoPlayoffs />
      </div>
    </div>
  )
}
