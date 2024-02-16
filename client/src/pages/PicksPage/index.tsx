import Picks from "../../components/PicksPageComps/Picks";
import { useFetchPropsQuery } from "../../redux/props/propsApi";

import "./PicksPage.scss";

export default function PicksPage() {
  const { data: propData } = useFetchPropsQuery();

  return (
    <div className="page picks-page">
      <Picks propData={propData} />
    </div>
  );
}
