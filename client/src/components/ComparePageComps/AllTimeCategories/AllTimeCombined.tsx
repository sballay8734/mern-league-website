import AllTimeOwnerOneCombined from "./OwnerOne/AllTimeOwnerOneCombined"
import AllTimeOwnerTwoCombined from "./OwnerTwo/AllTimeOwnerTwoCombined"

export default function AllTimeCombined() {
  return (
    <div className="h2h-content-wrapper disable-scrollbars">
      <div className="h2h-content h2h-content-wrapper">
        <AllTimeOwnerOneCombined />
        <div className="stat-names">
          <div className="main-cell cell stat stat-title">Stat</div>
          <div className="cell stat stat-one">Record</div>
          <div className="cell stat stat-one">Win %</div>
          <div className="cell stat stat-one special">ETEW Record</div>
          <div className="cell stat stat-one special">ETEW Win %</div>
          <div className="cell stat stat-one">Avg. PF</div>
          <div className="cell stat stat-one">Avg. PA</div>
          <div className="cell stat stat-one">Playoff Rate</div>
          <div className="cell stat stat-one">Best Week</div>
          <div className="cell stat stat-one">Worst Week</div>
          <div className="cell stat stat-one">Lucky Ws</div>
          <div className="cell stat stat-one">Unlucky Ls</div>
          <div className="cell stat stat-one">High W Szn</div>
          <div className="cell stat stat-one">High L Szn</div>
          <div className="cell stat stat-one">Total PF</div>
          <div className="cell stat stat-one">Total PA</div>
        </div>
        <AllTimeOwnerTwoCombined />
      </div>
    </div>
  )
}