import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function H2hOwnerTwoCombined() {
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
        {ownerOne && ownerTwo && ownerTwo.h2h.combined[ownerOne.ownerName] && (
          <>
            {ownerTwo.h2h.combined[ownerOne.ownerName].wins} -{" "}
            {ownerTwo.h2h.combined[ownerOne.ownerName].losses} -{" "}
            {ownerTwo.h2h.combined[ownerOne.ownerName].ties}
          </>
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne &&
            ownerTwo &&
            ownerTwo.h2h.combined[ownerOne.ownerName] && (
              <>
                {(
                  (ownerTwo.h2h.combined[ownerOne.ownerName].wins /
                    ownerTwo.h2h.combined[ownerOne.ownerName].gamesPlayed) *
                  100
                ).toFixed(1)}
                %
              </>
            )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerTwo &&
            ownerOne &&
            ownerTwo.h2h.combined[ownerOne.ownerName] && (
              <>
                {ownerTwo.h2h.combined[ownerOne.ownerName].winningPct >
                  ownerOne.h2h.combined[ownerTwo.ownerName].winningPct && (
                  <>
                    <span className="arrow-icon green">
                      <FaCaretUp />
                    </span>
                    <span className="plus-minus green">
                      {(
                        ownerTwo.h2h.combined[ownerOne.ownerName].winningPct -
                        ownerOne.h2h.combined[ownerTwo.ownerName].winningPct
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
          {ownerTwo &&
            ownerOne &&
            ownerTwo.h2h.combined[ownerOne.ownerName] && (
              <>
                {Number(
                  (
                    ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor /
                    ownerTwo.h2h.combined[ownerOne.ownerName].gamesPlayed
                  ).toFixed(2)
                )}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.combined[ownerOne.ownerName].avgPF >
            ownerOne.h2h.combined[ownerTwo.ownerName].avgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.combined[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.combined[ownerOne.ownerName].avgPF >
                        ownerOne.h2h.combined[ownerTwo.ownerName].avgPF &&
                        `${(
                          ownerTwo.h2h.combined[ownerOne.ownerName].avgPF -
                          ownerOne.h2h.combined[ownerTwo.ownerName].avgPF
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPtsVField">
        <span className="stat-value">
          {ownerTwo && ownerTwo.allTime.combined.avgPF}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.allTime.combined.avgPF > ownerOne.allTime.combined.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.combined[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.allTime.combined.avgPF >
                        ownerOne.allTime.combined.avgPF &&
                        `${(
                          ownerTwo.allTime.combined.avgPF -
                          ownerOne.allTime.combined.avgPF
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell best-week">
        <span className="stat-value">
          {ownerTwo &&
            ownerOne &&
            ownerTwo.h2h.combined[ownerOne.ownerName] && (
              <>{ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek}</>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek >
            ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.combined[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek >
                        ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek &&
                        `${(
                          ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek -
                          ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell worst-week">
        <span className="stat-value">
          {ownerTwo &&
            ownerOne &&
            ownerTwo.h2h.combined[ownerOne.ownerName] && (
              <>{ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek}</>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek >
            ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.combined[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek >
                        ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek &&
                        `${(
                          ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek -
                          ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points">
        <span className="stat-value">
          {ownerTwo &&
            ownerOne &&
            ownerTwo.h2h.combined[ownerOne.ownerName] && (
              <>{ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor}</>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor >
            ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.combined[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.combined[ownerOne.ownerName]
                        .totalPointsFor >
                        ownerOne.h2h.combined[ownerTwo.ownerName]
                          .totalPointsFor &&
                        `${(
                          ownerTwo.h2h.combined[ownerOne.ownerName]
                            .totalPointsFor -
                          ownerOne.h2h.combined[ownerTwo.ownerName]
                            .totalPointsFor
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
