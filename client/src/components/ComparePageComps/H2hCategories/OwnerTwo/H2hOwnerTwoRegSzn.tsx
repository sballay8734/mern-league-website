import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function H2hOwnerTwoRegSzn() {
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
      <div className="cell record owner-two-record">
        {ownerOne && ownerTwo && ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
          <>
            {ownerTwo.h2h.regSzn[ownerOne.ownerName].wins} -{" "}
            {ownerTwo.h2h.regSzn[ownerOne.ownerName].losses} -{" "}
            {ownerTwo.h2h.regSzn[ownerOne.ownerName].ties}
          </>
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne && ownerTwo && ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
            <>
              {(
                (ownerTwo.h2h.regSzn[ownerOne.ownerName].wins /
                  ownerTwo.h2h.regSzn[ownerOne.ownerName].RSgamesPlayed) *
                100
              ).toFixed(1)}
              %
            </>
          )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerTwo && ownerOne && ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
            <>
              {ownerTwo.h2h.regSzn[ownerOne.ownerName].winningPct >
                ownerOne.h2h.regSzn[ownerTwo.ownerName].winningPct && (
                <>
                  <span className="arrow-icon green">
                    <FaCaretUp />
                  </span>
                  <span className="plus-minus green">
                    {(
                      ownerTwo.h2h.regSzn[ownerOne.ownerName].winningPct -
                      ownerOne.h2h.regSzn[ownerTwo.ownerName].winningPct
                    ).toFixed(2)}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="cell avgPts">
        <span className="stat-value">
          {ownerTwo && ownerOne && ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
            <>
              {Number(
                (
                  ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor /
                  ownerTwo.h2h.regSzn[ownerOne.ownerName].RSgamesPlayed
                ).toFixed(2)
              )}
            </>
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF >
            ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF >
                        ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF &&
                        `${(
                          ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF -
                          ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPtsVField">
        <span className="stat-value">
          {ownerTwo && ownerTwo.allTime.regSzn.RSavgPF}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.allTime.regSzn.RSavgPF > ownerOne.allTime.regSzn.RSavgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.allTime.regSzn.RSavgPF >
                        ownerOne.allTime.regSzn.RSavgPF &&
                        `${(
                          ownerTwo.allTime.regSzn.RSavgPF -
                          ownerOne.allTime.regSzn.RSavgPF
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell best-week">
        <span className="stat-value">
          {ownerTwo && ownerOne && ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
            <>{ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek}</>
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek >
            ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek >
                        ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek &&
                        `${(
                          ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek -
                          ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell worst-week">
        <span className="stat-value">
          {ownerTwo && ownerOne && ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
            <>{ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek}</>
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek >
            ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek >
                        ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek &&
                        `${(
                          ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek -
                          ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points">
        <span className="stat-value">
          {ownerTwo && ownerOne && ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
            <>{ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor}</>
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor >
            ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor >
                        ownerOne.h2h.regSzn[ownerTwo.ownerName]
                          .totalPointsFor &&
                        `${(
                          ownerTwo.h2h.regSzn[ownerOne.ownerName]
                            .totalPointsFor -
                          ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgFinish">
        {ownerOne && ownerTwo && ownerTwo.bonusStats.avgFinishPlace && (
          <span className="stat-value gold">
            {ownerTwo.bonusStats.avgFinishPlace}
          </span>
        )}
      </div>
      <div className="cell temp">-</div>
      <div className="cell temp">-</div>
      <div className="cell temp">-</div>
    </div>
  )
}
