import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function H2hOwnerOnePlayoffs() {
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
        {ownerOne && ownerTwo && ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
          <>
            {ownerOne.h2h.playoffs[ownerTwo.ownerName].wins} -{" "}
            {ownerOne.h2h.playoffs[ownerTwo.ownerName].losses} -{" "}
            {ownerOne.h2h.playoffs[ownerTwo.ownerName].ties}
          </>
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne &&
            ownerTwo &&
            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
              <>
                {isNaN(
                  (ownerOne.h2h.playoffs[ownerTwo.ownerName].wins /
                    ownerOne.h2h.playoffs[ownerTwo.ownerName].POgamesPlayed) *
                    100
                )
                  ? "-"
                  : (
                      (ownerOne.h2h.playoffs[ownerTwo.ownerName].wins /
                        ownerOne.h2h.playoffs[ownerTwo.ownerName]
                          .POgamesPlayed) *
                      100
                    ).toFixed(1) + "%"}
              </>
            )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerOne &&
            ownerTwo &&
            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
              <>
                {ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct >
                  ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct && (
                  <>
                    <span className="plus-minus green">
                      {Number(
                        (
                          ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct -
                          ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct
                        ).toFixed(1)
                      )}
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
            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
              <>
                {isNaN(
                  Number(
                    ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor /
                      ownerOne.h2h.playoffs[ownerTwo.ownerName].POgamesPlayed
                  )
                )
                  ? "-"
                  : Number(
                      (
                        ownerOne.h2h.playoffs[ownerTwo.ownerName]
                          .totalPointsFor /
                        ownerOne.h2h.playoffs[ownerTwo.ownerName].POgamesPlayed
                      ).toFixed(2)
                    )}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF >
            ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF >
                        ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF &&
                        `${(
                          ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF -
                          ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF
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
          {ownerOne &&
            (ownerOne.allTime.playoffs.POavgPF === 0
              ? "-"
              : ownerOne.allTime.playoffs.POavgPF)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.allTime.playoffs.POavgPF >
            ownerTwo.allTime.playoffs.POavgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.allTime.playoffs.POavgPF >
                        ownerTwo.allTime.playoffs.POavgPF &&
                        `${(
                          ownerOne.allTime.playoffs.POavgPF -
                          ownerTwo.allTime.playoffs.POavgPF
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
            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
              <>
                {ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek === 0
                  ? "-"
                  : ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek >
            ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek >
                        ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek &&
                        `${(
                          ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek -
                          ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek
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
            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
              <>
                {ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek === 0
                  ? "-"
                  : ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek >
            ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek >
                        ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek &&
                        `${(
                          ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek -
                          ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek
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
            ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
              <>
                {ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor === 0
                  ? "-"
                  : ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor >
            ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.playoffs[ownerTwo.ownerName]
                        .totalPointsFor >
                        ownerTwo.h2h.playoffs[ownerOne.ownerName]
                          .totalPointsFor &&
                        `${(
                          ownerOne.h2h.playoffs[ownerTwo.ownerName]
                            .totalPointsFor -
                          ownerTwo.h2h.playoffs[ownerOne.ownerName]
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
