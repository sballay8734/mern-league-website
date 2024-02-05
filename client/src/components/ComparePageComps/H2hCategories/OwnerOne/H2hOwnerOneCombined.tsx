import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function H2hOwnerOneCombined() {
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
        {ownerOne && ownerTwo && ownerOne.h2h.combined[ownerTwo.ownerName] && (
          <>
            {ownerOne.h2h.combined[ownerTwo.ownerName].wins} -{" "}
            {ownerOne.h2h.combined[ownerTwo.ownerName].losses} -{" "}
            {ownerOne.h2h.combined[ownerTwo.ownerName].ties}
          </>
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne &&
            ownerTwo &&
            ownerOne.h2h.combined[ownerTwo.ownerName] && (
              <>
                {(
                  (ownerOne.h2h.combined[ownerTwo.ownerName].wins /
                    ownerOne.h2h.combined[ownerTwo.ownerName].gamesPlayed) *
                  100
                ).toFixed(1)}
                %
              </>
            )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerOne &&
            ownerTwo &&
            ownerOne.h2h.combined[ownerTwo.ownerName] && (
              <>
                {ownerOne.h2h.combined[ownerTwo.ownerName].winningPct >
                  ownerTwo.h2h.combined[ownerOne.ownerName].winningPct && (
                  <>
                    <span className="plus-minus green">
                      {(
                        ownerOne.h2h.combined[ownerTwo.ownerName].winningPct -
                        ownerTwo.h2h.combined[ownerOne.ownerName].winningPct
                      ).toFixed(1)}
                      %
                    </span>
                    <span className="arrow-icon green">
                      <FaCaretUp />
                    </span>
                  </>
                )}
              </>
            )}
        </div>
      </div>
      <div className="cell avgPts">
        <span className="stat-value">
          {ownerOne &&
            ownerTwo &&
            ownerOne.h2h.combined[ownerTwo.ownerName] && (
              <>
                {Number(
                  (
                    ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor /
                    ownerOne.h2h.combined[ownerTwo.ownerName].gamesPlayed
                  ).toFixed(2)
                )}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.combined[ownerTwo.ownerName].avgPF >
            ownerTwo.h2h.combined[ownerOne.ownerName].avgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.combined[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.combined[ownerTwo.ownerName].avgPF >
                        ownerTwo.h2h.combined[ownerOne.ownerName].avgPF &&
                        `${(
                          ownerOne.h2h.combined[ownerTwo.ownerName].avgPF -
                          ownerTwo.h2h.combined[ownerOne.ownerName].avgPF
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPtsVField">
        <span className="stat-value">
          {ownerOne && ownerOne.allTime.combined.avgPF}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.combined.avgPF > ownerTwo.allTime.combined.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.combined[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.allTime.combined.avgPF >
                        ownerTwo.allTime.combined.avgPF &&
                        `${(
                          ownerOne.allTime.combined.avgPF -
                          ownerTwo.allTime.combined.avgPF
                        ).toFixed(2)}`}
                    </>
                  )}
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
            ownerTwo &&
            ownerOne.h2h.combined[ownerTwo.ownerName] && (
              <>{ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek}</>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek >
            ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.combined[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek >
                        ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek &&
                        `${(
                          ownerOne.h2h.combined[ownerTwo.ownerName].bestWeek -
                          ownerTwo.h2h.combined[ownerOne.ownerName].bestWeek
                        ).toFixed(2)}`}
                    </>
                  )}
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
            ownerTwo &&
            ownerOne.h2h.combined[ownerTwo.ownerName] && (
              <>{ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek}</>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek >
            ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.combined[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek >
                        ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek &&
                        `${(
                          ownerOne.h2h.combined[ownerTwo.ownerName].worstWeek -
                          ownerTwo.h2h.combined[ownerOne.ownerName].worstWeek
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points">
        <span className="stat-value">
          {ownerOne &&
            ownerTwo &&
            ownerOne.h2h.combined[ownerTwo.ownerName] && (
              <>{ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor}</>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor >
            ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.combined[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.combined[ownerTwo.ownerName]
                        .totalPointsFor >
                        ownerTwo.h2h.combined[ownerOne.ownerName]
                          .totalPointsFor &&
                        `${(
                          ownerOne.h2h.combined[ownerTwo.ownerName]
                            .totalPointsFor -
                          ownerTwo.h2h.combined[ownerOne.ownerName]
                            .totalPointsFor
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell avgFinish">
        {ownerTwo && ownerOne && ownerOne.bonusStats.avgFinishPlace && (
          <span className="stat-value gold">
            {ownerOne.bonusStats.avgFinishPlace}
          </span>
        )}
      </div>
      <div className="cell temp">-</div>
      <div className="cell temp">-</div>
      <div className="cell temp">-</div>
    </div>
  )
}
