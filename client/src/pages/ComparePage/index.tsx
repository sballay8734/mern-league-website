import "./ComparePage.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setOwnerOne, setOwnerTwo } from "../../redux/owners/compareSlice";
import { useDispatch } from "react-redux";

import { useFetchStaticDataQuery } from "../../redux/owners/ownersApi";
import { MdCompareArrows } from "react-icons/md";
import { StaticOwner } from "../../types/StaticOwner";
import { ImSpinner10 } from "react-icons/im";
import OwnerOneCard from "../../components/OwnerStats/OwnerOneCard";
import OwnerTwoCard from "../../components/OwnerStats/OwnerTwoCard";
import MainContent from "../../components/ComparePageComps/MainContent";
import ComparePageTopNav from "../../components/ComparePageComps/ComparePageTopNav";

export default function ComparePage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne);
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo);

  const { data, isLoading } = useFetchStaticDataQuery();

  console.log("Rendering Compare Page...");

  useEffect(() => {
    if (data && user) {
      const tempOwner = data.find(
        (owner: StaticOwner) =>
          user.firstName === owner.ownerName.split(" ")[0],
      );

      if (tempOwner) {
        dispatch(setOwnerOne(tempOwner));

        const tempOwnerIndex = data.indexOf(tempOwner);

        dispatch(setOwnerTwo(tempOwnerIndex !== 11 ? data[11] : data[10]));
      } else {
        dispatch(setOwnerOne(data[0]));
        dispatch(setOwnerTwo(data[1]));
      }
    } else {
      if (data) {
        const randomIndex1 = Math.floor(Math.random() * data.length);
        let randomIndex2 = Math.floor(Math.random() * data.length);

        // Ensure the second random index is different from the first
        while (randomIndex2 === randomIndex1) {
          randomIndex2 = Math.floor(Math.random() * data.length);
        }

        // Set ownerOne
        dispatch(setOwnerOne(data[randomIndex1]));

        // Set ownerTwo
        dispatch(setOwnerTwo(data[randomIndex2]));
      }
    }
  }, [data, user]);

  return (
    <div className="page compare-page">
      <div className="compare-page-top">
        <div className="compare-page-header">
          <h1>Compare Owners</h1>
          <div className="compare">
            <MdCompareArrows />
          </div>
        </div>
        <ComparePageTopNav />
      </div>
      <div className="compare-page-bottom">
        {isLoading ? (
          <div className="skeleton">
            <span className="spinner">
              <ImSpinner10 />
            </span>
          </div>
        ) : (
          <>
            {ownerOne && data && (
              <OwnerOneCard ownerOne={ownerOne} data={data} />
            )}
            <div className="main-content-wrapper">
              {data && <MainContent data={data} />}
            </div>
            {ownerTwo && data && (
              <OwnerTwoCard ownerTwo={ownerTwo} data={data} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
