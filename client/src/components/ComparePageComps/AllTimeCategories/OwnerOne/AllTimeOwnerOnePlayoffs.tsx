import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function AllTimeOwnerOnePlayoffs() {
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne)
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo)

  return (
    <div className="owner-stats owner-one-stats">
      <div className="main-cell owner-name owner-one-name">
        {ownerOne?.ownerName &&
          (() => {
            const [firstName, lastName] = ownerOne.ownerName.split(" ")
            const lastInitial = lastName ? lastName.charAt(0) : ""
            return `${firstName} ${lastInitial}.`
          })()}
      </div>
      <div className="cell record owner-one-record">
        {ownerOne?.allTime.playoffs.POwins} -{" "}
        {ownerOne?.allTime.playoffs.POlosses}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne?.allTime.playoffs.POwinningPct.toFixed(1)}%
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne?.allTime.playoffs.POwinningPct >
            ownerTwo?.allTime.playoffs.POwinningPct && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.allTime.playoffs.POwinningPct -
                  ownerTwo?.allTime.playoffs.POwinningPct
                ).toFixed(1)}
                %
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPf">
        <span className="stat-value">
          {ownerOne?.allTime.playoffs.POavgPF.toFixed(2)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.playoffs.POavgPF >
            ownerTwo?.allTime.playoffs.POavgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.playoffs.POavgPF -
                  ownerTwo?.allTime.playoffs.POavgPF
                ).toFixed(2)}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPa">
        <span className="stat-value">
          {ownerOne?.allTime.playoffs.POavgPA.toFixed(2)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.playoffs.POavgPA >
            ownerTwo?.allTime.playoffs.POavgPA && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.playoffs.POavgPA -
                  ownerTwo?.allTime.playoffs.POavgPA
                ).toFixed(2)}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell best-week">
        <span className="stat-value">
          {ownerOne?.allTime.playoffs.bestWeek.toFixed(2)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.playoffs.bestWeek >
            ownerTwo?.allTime.playoffs.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.playoffs.bestWeek -
                  ownerTwo?.allTime.playoffs.bestWeek
                ).toFixed(2)}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell worst-week">
        <span className="stat-value">
          {ownerOne?.allTime.playoffs.worstWeek.toFixed(2)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.playoffs.worstWeek >
            ownerTwo?.allTime.playoffs.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.playoffs.worstWeek -
                  ownerTwo?.allTime.playoffs.worstWeek
                ).toFixed(2)}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-for">
        <span className="stat-value">
          {ownerOne?.allTime.playoffs.POpointsFor.toFixed(1)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.playoffs.POpointsFor >
            ownerTwo?.allTime.playoffs.POpointsFor && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.playoffs.POpointsFor -
                  ownerTwo?.allTime.playoffs.POpointsFor
                ).toFixed(1)}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-against">
        <span className="stat-value">
          {ownerOne?.allTime.playoffs.POpointsAgainst.toFixed(1)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.playoffs.POpointsAgainst >
            ownerTwo?.allTime.playoffs.POpointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.playoffs.POpointsAgainst -
                  ownerTwo?.allTime.playoffs.POpointsAgainst
                ).toFixed(1)}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
    </div>
  )
}
