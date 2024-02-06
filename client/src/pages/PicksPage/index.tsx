import Picks from "../../components/PicksPageComps/Picks"
import { useFetchPropsQuery } from "../../redux/props/propsApi"

import "./PicksPage.scss"

export default function PicksPage() {
  const { data: propData } = useFetchPropsQuery()

  console.log("Rendering Picks Page...")

  // console.log(propData)

  return (
    <>
      {propData && (
        <div className="page picks-page">
          {/* <div className="mobile"> */}
          <Picks propData={propData} />
          {/* </div> */}
        </div>
      )}
    </>
  )
}
