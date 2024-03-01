import Picks from "../../components/PicksPageComps/Picks";
import { useFetchPropsQuery } from "../../redux/props/propsApi";

import "./PicksPage.scss";

export default function PicksPage() {
  const { data: propData } = useFetchPropsQuery();

  // if user is guest, fetch the guest props, NOT the main props
  // handle unselected prop count
  // guest props need an infinite expiration
  // IF USER IS NOT GUEST, DON'T SHOW GUEST PROPS

  // then gotta deal with challenges

  return (
    <div className="page picks-page">
      <Picks propData={propData} />
    </div>
  );
}
