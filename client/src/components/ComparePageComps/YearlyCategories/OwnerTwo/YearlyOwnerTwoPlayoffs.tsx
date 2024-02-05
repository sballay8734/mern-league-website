import { useSelector } from "react-redux"
import { FaCaretUp } from "react-icons/fa"
import { RootState } from "../../../../redux/store"

export default function YearlyOwnerTwoPlayoffs() {
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne)
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo)
  const activeYear = useSelector((state: RootState) => state.compare.activeYear)

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
      <div className="cell finished">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>{ownerTwo?.yearly[activeYear].regSznStats.finishPlace}</div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.finishPlace <
            ownerOne?.yearly[activeYear].regSznStats.finishPlace && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerOne?.yearly[activeYear].regSznStats.finishPlace -
                  ownerTwo?.yearly[activeYear].regSznStats.finishPlace}
              </span>
            </div>
          )}
      </div>
      <div className="cell record owner-one-record">
        {ownerTwo &&
        ownerOne &&
        ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
          <>
            {ownerTwo.yearly[activeYear].playoffStats.wins} -{" "}
            {ownerTwo.yearly[activeYear].playoffStats.losses} -{" "}
            {ownerTwo.yearly[activeYear].playoffStats.ties}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerTwo &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].playoffStats.winningPct.toFixed(1)}%
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].playoffStats.winningPct >
            ownerOne?.yearly[activeYear].playoffStats.winningPct && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].playoffStats.winningPct -
                  ownerOne?.yearly[activeYear].playoffStats.winningPct
                ).toFixed(1)}
                %
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPf">
        <span className="stat-value">
          {ownerTwo &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].playoffStats.avgPF.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].playoffStats.avgPF >
            ownerOne?.yearly[activeYear].playoffStats.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].playoffStats.avgPF -
                  ownerOne?.yearly[activeYear].playoffStats.avgPF
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPa">
        <span className="stat-value">
          {ownerTwo &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].playoffStats.avgPA.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].playoffStats.avgPA >
            ownerOne?.yearly[activeYear].playoffStats.avgPA && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].playoffStats.avgPA -
                  ownerOne?.yearly[activeYear].playoffStats.avgPA
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell best-week">
        <span className="stat-value">
          {ownerTwo &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].playoffStats.bestWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].playoffStats.bestWeek >
            ownerOne?.yearly[activeYear].playoffStats.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].playoffStats.bestWeek -
                  ownerOne?.yearly[activeYear].playoffStats.bestWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell worst-week">
        <span className="stat-value">
          {ownerTwo &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].playoffStats.worstWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].playoffStats.worstWeek >
            ownerOne?.yearly[activeYear].playoffStats.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].playoffStats.worstWeek -
                  ownerOne?.yearly[activeYear].playoffStats.worstWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-for">
        <span className="stat-value">
          {ownerTwo &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].playoffStats.pointsFor.toFixed(1)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].playoffStats.pointsFor >
            ownerOne?.yearly[activeYear].playoffStats.pointsFor && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].playoffStats.pointsFor -
                  ownerOne?.yearly[activeYear].playoffStats.pointsFor
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-against">
        <span className="stat-value">
          {ownerTwo &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].playoffStats.pointsAgainst.toFixed(
                1
              )}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].playoffStats.participated === true &&
          ownerTwo?.yearly[activeYear].playoffStats.pointsAgainst >
            ownerOne?.yearly[activeYear].playoffStats.pointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].playoffStats.pointsAgainst -
                  ownerOne?.yearly[activeYear].playoffStats.pointsAgainst
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
    </div>
  )
}
