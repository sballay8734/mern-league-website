import { useSelector } from "react-redux"
import { FaCaretUp } from "react-icons/fa"
import { RootState } from "../../../../redux/store"

export default function YearlyOwnerOnePlayoffs() {
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
            <div>{ownerOne?.yearly[activeYear].regSznStats.finishPlace}</div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne?.yearly[activeYear]?.playoffStats?.participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.finishPlace <
            ownerTwo?.yearly[activeYear].regSznStats.finishPlace && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerTwo?.yearly[activeYear].regSznStats.finishPlace -
                  ownerOne?.yearly[activeYear].regSznStats.finishPlace}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell record owner-one-record">
        {ownerOne &&
        (ownerOne?.yearly[activeYear]?.playoffStats?.participated === true) ===
          true ? (
          <>
            {ownerOne.yearly[activeYear].playoffStats.wins} -{" "}
            {ownerOne.yearly[activeYear].playoffStats.losses} -{" "}
            {ownerOne.yearly[activeYear].playoffStats.ties}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true ? (
            <div>
              {ownerOne?.yearly[activeYear].playoffStats.winningPct.toFixed(1)}%
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].playoffStats.winningPct >
            ownerTwo?.yearly[activeYear].playoffStats.winningPct && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].playoffStats.winningPct -
                  ownerTwo?.yearly[activeYear].playoffStats.winningPct
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
          {ownerOne &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true ? (
            <div>
              {ownerOne?.yearly[activeYear].playoffStats.avgPF.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].playoffStats.avgPF >
            ownerTwo?.yearly[activeYear].playoffStats.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].playoffStats.avgPF -
                  ownerTwo?.yearly[activeYear].playoffStats.avgPF
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
          {ownerOne &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true ? (
            <div>
              {ownerOne?.yearly[activeYear].playoffStats.avgPA.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].playoffStats.avgPA >
            ownerTwo?.yearly[activeYear].playoffStats.avgPA && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].playoffStats.avgPA -
                  ownerTwo?.yearly[activeYear].playoffStats.avgPA
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
          {ownerOne &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true ? (
            <div>
              {ownerOne?.yearly[activeYear].playoffStats.bestWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].playoffStats.bestWeek >
            ownerTwo?.yearly[activeYear].playoffStats.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].playoffStats.bestWeek -
                  ownerTwo?.yearly[activeYear].playoffStats.bestWeek
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
          {ownerOne &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true ? (
            <div>
              {ownerOne?.yearly[activeYear].playoffStats.worstWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].playoffStats.worstWeek >
            ownerTwo?.yearly[activeYear].playoffStats.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].playoffStats.worstWeek -
                  ownerTwo?.yearly[activeYear].playoffStats.worstWeek
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
          {ownerOne &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true ? (
            <div>
              {ownerOne?.yearly[activeYear].playoffStats.pointsFor.toFixed(1)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].playoffStats.pointsFor >
            ownerTwo?.yearly[activeYear].playoffStats.pointsFor && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].playoffStats.pointsFor -
                  ownerTwo?.yearly[activeYear].playoffStats.pointsFor
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
          {ownerOne &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true ? (
            <div>
              {ownerOne?.yearly[activeYear].playoffStats.pointsAgainst.toFixed(
                1
              )}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          (ownerOne?.yearly[activeYear]?.playoffStats?.participated ===
            true) ===
            true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].playoffStats.pointsAgainst >
            ownerTwo?.yearly[activeYear].playoffStats.pointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].playoffStats.pointsAgainst -
                  ownerTwo?.yearly[activeYear].playoffStats.pointsAgainst
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
