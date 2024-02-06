import "./KothPage.scss"
import KingMainTable from "../../components/KingPage/KingMainTable"

export default function KothPage() {
  console.log("Loading KOTH Page...")

  return (
    <div className="page koth-page">
      <KingMainTable />
    </div>
  )
}
