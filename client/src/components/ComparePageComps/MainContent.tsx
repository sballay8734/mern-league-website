import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"

import YearlyContent from "./YearlyContent"
import H2hContent from "./H2hContent"
import AllTimeContent from "./AllTimeContent"
import { StaticOwner } from "../../types/StaticOwner"

interface MainContentProps {
  data: StaticOwner[]
}
export default function MainContent({ data }: MainContentProps) {
  const activeTimeFrame = useSelector(
    (state: RootState) => state.compare.activeTimeFrame
  )

  console.log("Rendering Main Content Wrapper...")

  if (activeTimeFrame === "allTime") {
    return <AllTimeContent />
  }
  if (activeTimeFrame === "h2h") {
    return <H2hContent />
  }
  if (activeTimeFrame === "yearly") {
    return <YearlyContent data={data} />
  }
}
