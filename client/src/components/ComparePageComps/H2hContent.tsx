import { useSelector } from "react-redux"

import { RootState } from "../../redux/store"
import H2hCombined from "./H2hCategories/H2hCombined"
import H2hRegSzn from "./H2hCategories/H2hRegSzn"
import H2hPlayoffs from "./H2hCategories/H2hPlayoffs"
import H2hNav from "./H2hCategories/H2hNav"

export default function H2hContent() {
  const activeFilter = useSelector(
    (state: RootState) => state.compare.activeFilter
  )

  console.log("Rendering H2H Content...")

  return (
    <div className="compare-h2h">
      <H2hNav />
      {activeFilter === "combined" ? (
        <H2hCombined />
      ) : activeFilter === "regszn" ? (
        <H2hRegSzn />
      ) : activeFilter === "playoffs" ? (
        <H2hPlayoffs />
      ) : (
        <div>ERROR</div>
      )}
    </div>
  )
}
