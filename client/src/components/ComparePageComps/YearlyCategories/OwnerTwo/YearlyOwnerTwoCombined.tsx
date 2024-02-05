import { useSelector } from "react-redux"
import { FaCaretUp } from "react-icons/fa"
import { RootState } from "../../../../redux/store"

export default function YearlyOwnerTwoCombined() {
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
            <div>{ownerTwo?.yearly[activeYear].combinedStats.finishPlace}</div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          (ownerTwo.yearly[activeYear].participated === true) === true &&
          ownerTwo?.yearly[activeYear].combinedStats.finishPlace <
            ownerOne?.yearly[activeYear].combinedStats.finishPlace && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerOne?.yearly[activeYear].combinedStats.finishPlace -
                  ownerTwo?.yearly[activeYear].combinedStats.finishPlace}
              </span>
            </div>
          )}
      </div>
      <div className="cell record owner-one-record">
        {ownerTwo &&
        ownerOne &&
        ownerTwo.yearly[activeYear].participated === true ? (
          <>
            {ownerTwo.yearly[activeYear].combinedStats.wins} -{" "}
            {ownerTwo.yearly[activeYear].combinedStats.losses} -{" "}
            {ownerTwo.yearly[activeYear].combinedStats.ties}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].combinedStats.winningPct.toFixed(1)}
              %
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].combinedStats.winningPct >
            ownerOne?.yearly[activeYear].combinedStats.winningPct && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].combinedStats.winningPct -
                  ownerOne?.yearly[activeYear].combinedStats.winningPct
                ).toFixed(1)}
                %
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPf">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].combinedStats.avgPF.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].combinedStats.avgPF >
            ownerOne?.yearly[activeYear].combinedStats.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].combinedStats.avgPF -
                  ownerOne?.yearly[activeYear].combinedStats.avgPF
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPa">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].combinedStats.avgPA.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].combinedStats.avgPA >
            ownerOne?.yearly[activeYear].combinedStats.avgPA && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].combinedStats.avgPA -
                  ownerOne?.yearly[activeYear].combinedStats.avgPA
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell best-week">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].combinedStats.bestWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].combinedStats.bestWeek >
            ownerOne?.yearly[activeYear].combinedStats.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].combinedStats.bestWeek -
                  ownerOne?.yearly[activeYear].combinedStats.bestWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell worst-week">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].combinedStats.worstWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].combinedStats.worstWeek >
            ownerOne?.yearly[activeYear].combinedStats.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].combinedStats.worstWeek -
                  ownerOne?.yearly[activeYear].combinedStats.worstWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-for">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].combinedStats.pointsFor.toFixed(1)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].combinedStats.pointsFor >
            ownerOne?.yearly[activeYear].combinedStats.pointsFor && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].combinedStats.pointsFor -
                  ownerOne?.yearly[activeYear].combinedStats.pointsFor
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-against">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].combinedStats.pointsAgainst.toFixed(
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
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].combinedStats.pointsAgainst >
            ownerOne?.yearly[activeYear].combinedStats.pointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].combinedStats.pointsAgainst -
                  ownerOne?.yearly[activeYear].combinedStats.pointsAgainst
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
    </div>
  )
}
