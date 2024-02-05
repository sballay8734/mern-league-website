import YearlyOwnerOnePlayoffs from "./OwnerOne/YearlyOwnerOnePlayoffs"
import YearlyOwnerTwoPlayoffs from "./OwnerTwo/YearlyOwnerTwoPlayoffs"

export default function YearlyPlayoffs() {
  return (
    <div className="h2h-content-wrapper disable-scrollbars">
      <div className="h2h-content h2h-content-wrapper">
        <YearlyOwnerOnePlayoffs />
        <div className="stat-names">
          <div className="main-cell cell stat stat-title">Stat</div>
          <div className="cell stat stat-one">Finished</div>
          <div className="cell stat stat-one">Record</div>
          <div className="cell stat stat-one">Win %</div>
          <div className="cell stat stat-one">Avg. PF</div>
          <div className="cell stat stat-one">Avg. PA</div>
          <div className="cell stat stat-one">Best Week</div>
          <div className="cell stat stat-one">Worst Week</div>
          <div className="cell stat stat-one">Total PF</div>
          <div className="cell stat stat-one">Total PA</div>
        </div>
        <YearlyOwnerTwoPlayoffs />
      </div>
    </div>
  )
}
