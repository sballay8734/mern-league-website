import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function AllTimeOwnerTwoPlayoffs() {
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne)
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo)

  return (
    <div className="owner-stats owner-two-stats">
      <div className="main-cell owner-name owner-two-name">
        {ownerTwo?.ownerName &&
          (() => {
            const [firstName, lastName] = ownerTwo.ownerName.split(" ")
            const lastInitial = lastName ? lastName.charAt(0) : ""
            return `${firstName} ${lastInitial}.`
          })()}
      </div>
      <div className="cell record owner-one-record">
        {ownerTwo?.allTime.playoffs.POwins} -{" "}
        {ownerTwo?.allTime.playoffs.POlosses}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerTwo?.allTime.playoffs.POwinningPct.toFixed(1)}%
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo?.allTime.playoffs.POwinningPct >
            ownerOne?.allTime.playoffs.POwinningPct && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.allTime.playoffs.POwinningPct -
                  ownerOne?.allTime.playoffs.POwinningPct
                ).toFixed(1)}
                %
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPf">
        <span className="stat-value">
          {ownerTwo?.allTime.playoffs.POavgPF.toFixed(2)}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo.allTime.playoffs.POavgPF >
            ownerOne?.allTime.playoffs.POavgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.playoffs.POavgPF -
                  ownerOne?.allTime.playoffs.POavgPF
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPa">
        <span className="stat-value">
          {ownerTwo?.allTime.playoffs.POavgPA.toFixed(2)}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo.allTime.playoffs.POavgPA >
            ownerOne?.allTime.playoffs.POavgPA && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.playoffs.POavgPA -
                  ownerOne?.allTime.playoffs.POavgPA
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell best-week">
        <span className="stat-value">
          {ownerTwo?.allTime.playoffs.bestWeek.toFixed(2)}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo.allTime.playoffs.bestWeek >
            ownerOne?.allTime.playoffs.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.playoffs.bestWeek -
                  ownerOne?.allTime.playoffs.bestWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell worst-week">
        <span className="stat-value">
          {ownerTwo?.allTime.playoffs.worstWeek.toFixed(2)}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo.allTime.playoffs.worstWeek >
            ownerOne?.allTime.playoffs.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.playoffs.worstWeek -
                  ownerOne?.allTime.playoffs.worstWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-for">
        <span className="stat-value">
          {ownerTwo?.allTime.playoffs.POpointsFor.toFixed(1)}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo.allTime.playoffs.POpointsFor >
            ownerOne?.allTime.playoffs.POpointsFor && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.playoffs.POpointsFor -
                  ownerOne?.allTime.playoffs.POpointsFor
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-against">
        <span className="stat-value">
          {ownerTwo?.allTime.playoffs.POpointsAgainst.toFixed(1)}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo.allTime.playoffs.POpointsAgainst >
            ownerOne?.allTime.playoffs.POpointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.playoffs.POpointsAgainst -
                  ownerOne?.allTime.playoffs.POpointsAgainst
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
    </div>
  )
}
