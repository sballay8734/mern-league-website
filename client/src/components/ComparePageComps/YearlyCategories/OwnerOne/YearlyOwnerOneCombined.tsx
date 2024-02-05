import { useSelector } from "react-redux"
import { FaCaretUp } from "react-icons/fa"
import { RootState } from "../../../../redux/store"

export default function YearlyOwnerOneCombined() {
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne)
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo)
  const activeYear = useSelector((state: RootState) => state.compare.activeYear)

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
      <div className="cell finished">
        <span className="stat-value">
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>{ownerOne?.yearly[activeYear].combinedStats.finishPlace}</div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.finishPlace <
            ownerTwo?.yearly[activeYear].combinedStats.finishPlace && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerTwo?.yearly[activeYear].combinedStats.finishPlace -
                  ownerOne?.yearly[activeYear].combinedStats.finishPlace}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell record owner-one-record">
        {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
          <>
            {ownerOne.yearly[activeYear].combinedStats.wins} -{" "}
            {ownerOne.yearly[activeYear].combinedStats.losses} -{" "}
            {ownerOne.yearly[activeYear].combinedStats.ties}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].combinedStats.winningPct.toFixed(1)}
              %
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.winningPct >
            ownerTwo?.yearly[activeYear].combinedStats.winningPct && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].combinedStats.winningPct -
                  ownerTwo?.yearly[activeYear].combinedStats.winningPct
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].combinedStats.avgPF.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.avgPF >
            ownerTwo?.yearly[activeYear].combinedStats.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].combinedStats.avgPF -
                  ownerTwo?.yearly[activeYear].combinedStats.avgPF
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].combinedStats.avgPA.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.avgPA >
            ownerTwo?.yearly[activeYear].combinedStats.avgPA && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].combinedStats.avgPA -
                  ownerTwo?.yearly[activeYear].combinedStats.avgPA
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].combinedStats.bestWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.bestWeek >
            ownerTwo?.yearly[activeYear].combinedStats.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].combinedStats.bestWeek -
                  ownerTwo?.yearly[activeYear].combinedStats.bestWeek
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].combinedStats.worstWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.worstWeek >
            ownerTwo?.yearly[activeYear].combinedStats.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].combinedStats.worstWeek -
                  ownerTwo?.yearly[activeYear].combinedStats.worstWeek
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].combinedStats.pointsFor.toFixed(1)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.pointsFor >
            ownerTwo?.yearly[activeYear].combinedStats.pointsFor && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].combinedStats.pointsFor -
                  ownerTwo?.yearly[activeYear].combinedStats.pointsFor
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].combinedStats.pointsAgainst.toFixed(
                1
              )}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].combinedStats.pointsAgainst >
            ownerTwo?.yearly[activeYear].combinedStats.pointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].combinedStats.pointsAgainst -
                  ownerTwo?.yearly[activeYear].combinedStats.pointsAgainst
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
