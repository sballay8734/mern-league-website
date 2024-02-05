import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function H2hOwnerTwoPlayoffs() {
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
        {ownerOne && ownerTwo && ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
          <>
            {ownerTwo.h2h.playoffs[ownerOne.ownerName].wins} -{" "}
            {ownerTwo.h2h.playoffs[ownerOne.ownerName].losses} -{" "}
            {ownerTwo.h2h.playoffs[ownerOne.ownerName].ties}
          </>
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne &&
            ownerTwo &&
            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
              <>
                {isNaN(
                  (ownerTwo.h2h.playoffs[ownerOne.ownerName].wins /
                    ownerTwo.h2h.playoffs[ownerOne.ownerName].POgamesPlayed) *
                    100
                )
                  ? "-"
                  : Number(
                      (
                        (ownerTwo.h2h.playoffs[ownerOne.ownerName].wins /
                          ownerTwo.h2h.playoffs[ownerOne.ownerName]
                            .POgamesPlayed) *
                        100
                      ).toFixed(2)
                    ) + "%"}
              </>
            )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerTwo &&
            ownerOne &&
            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
              <>
                {ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct >
                  ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct && (
                  <>
                    <span className="arrow-icon green">
                      <FaCaretUp />
                    </span>
                    <span className="plus-minus green">
                      {(
                        ownerTwo.h2h.playoffs[ownerOne.ownerName].winningPct -
                        ownerOne.h2h.playoffs[ownerTwo.ownerName].winningPct
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
            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
              <>
                {isNaN(
                  Number(
                    ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor /
                      ownerTwo.h2h.playoffs[ownerOne.ownerName].POgamesPlayed
                  )
                )
                  ? "-"
                  : Number(
                      ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor /
                        ownerTwo.h2h.playoffs[ownerOne.ownerName].POgamesPlayed
                    ).toFixed(2)}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF >
            ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF >
                        ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF &&
                        `${(
                          ownerTwo.h2h.playoffs[ownerOne.ownerName].avgPF -
                          ownerOne.h2h.playoffs[ownerTwo.ownerName].avgPF
                        ).toFixed(2)}`}
                    </>
                  )}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPtsVField">
        <span className="stat-value">
          {ownerTwo &&
            (ownerTwo.allTime.playoffs.POavgPF === 0
              ? "-"
              : ownerTwo.allTime.playoffs.POavgPF)}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.allTime.playoffs.POavgPF >
            ownerOne.allTime.playoffs.POavgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.allTime.playoffs.POavgPF >
                        ownerOne.allTime.playoffs.POavgPF &&
                        `${(
                          ownerTwo.allTime.playoffs.POavgPF -
                          ownerOne.allTime.playoffs.POavgPF
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
            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
              <>
                {ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek === 0
                  ? "-"
                  : ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek >
            ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek >
                        ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek &&
                        `${(
                          ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek -
                          ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek
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
            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
              <>
                {ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek === 0
                  ? "-"
                  : ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek >
            ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek >
                        ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek &&
                        `${(
                          ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek -
                          ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek
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
            ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
              <>
                {ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor === 0
                  ? "-"
                  : ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor}
              </>
            )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor >
            ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.playoffs[ownerOne.ownerName]
                        .totalPointsFor >
                        ownerOne.h2h.playoffs[ownerTwo.ownerName]
                          .totalPointsFor &&
                        `${(
                          ownerTwo.h2h.playoffs[ownerOne.ownerName]
                            .totalPointsFor -
                          ownerOne.h2h.playoffs[ownerTwo.ownerName]
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
