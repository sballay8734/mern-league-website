import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { RootState } from "../../redux/store"
import { setActiveFilter } from "../../redux/owners/compareSlice"
import { FaCaretUp } from "react-icons/fa"

export default function H2hContent() {
  const dispatch = useDispatch()
  const { ownerOne, ownerTwo, activeFilter } = useSelector(
    (state: RootState) => state.compare
  )

  return (
    <div className="compare-h2h">
      <nav className="h2h-nav">
        <ul>
          <li>
            <button
              onClick={() => dispatch(setActiveFilter("combined"))}
              className={`${activeFilter === "combined" ? "active" : ""}`}
            >
              Combined
            </button>
          </li>
          <li>
            <button
              onClick={() => dispatch(setActiveFilter("regszn"))}
              className={`${activeFilter === "regszn" ? "active" : ""}`}
            >
              RegSzn
            </button>
          </li>
          <li>
            <button
              onClick={() => dispatch(setActiveFilter("playoffs"))}
              className={`${activeFilter === "playoffs" ? "active" : ""}`}
            >
              Playoffs
            </button>
          </li>
        </ul>
      </nav>
      {activeFilter === "combined" ? (
        <div className="h2h-content-wrapper h2h-column disable-scrollbars">
          <div className="h2h-content h2h-content-wrapper">
            {/* OWNER ONE */}
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
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.combined[ownerTwo.ownerName] && (
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
                            ownerOne.h2h.combined[ownerTwo.ownerName]
                              .gamesPlayed) *
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
                          ownerTwo.h2h.combined[ownerOne.ownerName]
                            .winningPct && (
                          <>
                            <span className="plus-minus green">
                              {(
                                ownerOne.h2h.combined[ownerTwo.ownerName]
                                  .winningPct -
                                ownerTwo.h2h.combined[ownerOne.ownerName]
                                  .winningPct
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
                            ownerOne.h2h.combined[ownerTwo.ownerName]
                              .totalPointsFor /
                            ownerOne.h2h.combined[ownerTwo.ownerName]
                              .gamesPlayed
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
                                ownerTwo.h2h.combined[ownerOne.ownerName]
                                  .avgPF &&
                                `${(
                                  ownerOne.h2h.combined[ownerTwo.ownerName]
                                    .avgPF -
                                  ownerTwo.h2h.combined[ownerOne.ownerName]
                                    .avgPF
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
                  ownerOne.allTime.combined.avgPF >
                    ownerTwo.allTime.combined.avgPF && (
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
                              {ownerOne.h2h.combined[ownerTwo.ownerName]
                                .bestWeek >
                                ownerTwo.h2h.combined[ownerOne.ownerName]
                                  .bestWeek &&
                                `${(
                                  ownerOne.h2h.combined[ownerTwo.ownerName]
                                    .bestWeek -
                                  ownerTwo.h2h.combined[ownerOne.ownerName]
                                    .bestWeek
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
                              {ownerOne.h2h.combined[ownerTwo.ownerName]
                                .worstWeek >
                                ownerTwo.h2h.combined[ownerOne.ownerName]
                                  .worstWeek &&
                                `${(
                                  ownerOne.h2h.combined[ownerTwo.ownerName]
                                    .worstWeek -
                                  ownerTwo.h2h.combined[ownerOne.ownerName]
                                    .worstWeek
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
                      <>
                        {
                          ownerOne.h2h.combined[ownerTwo.ownerName]
                            .totalPointsFor
                        }
                      </>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.combined[ownerTwo.ownerName].totalPointsFor >
                    ownerTwo.h2h.combined[ownerOne.ownerName]
                      .totalPointsFor && (
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
            {/* MIDDLE SECTION */}
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one">Avg. Pts</div>
              <div className="cell stat stat-one">Avg. Pts v Field</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Total Points</div>
              <div className="cell stat stat-one">Avg. Finish</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
            </div>
            {/* OWNER TWO */}
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
                {ownerOne &&
                  ownerTwo &&
                  ownerTwo.h2h.combined[ownerOne.ownerName] && (
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
                            ownerTwo.h2h.combined[ownerOne.ownerName]
                              .gamesPlayed) *
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
                          ownerOne.h2h.combined[ownerTwo.ownerName]
                            .winningPct && (
                          <>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                            <span className="plus-minus green">
                              {(
                                ownerTwo.h2h.combined[ownerOne.ownerName]
                                  .winningPct -
                                ownerOne.h2h.combined[ownerTwo.ownerName]
                                  .winningPct
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
                            ownerTwo.h2h.combined[ownerOne.ownerName]
                              .totalPointsFor /
                            ownerTwo.h2h.combined[ownerOne.ownerName]
                              .gamesPlayed
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
                                ownerOne.h2h.combined[ownerTwo.ownerName]
                                  .avgPF &&
                                `${(
                                  ownerTwo.h2h.combined[ownerOne.ownerName]
                                    .avgPF -
                                  ownerOne.h2h.combined[ownerTwo.ownerName]
                                    .avgPF
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
                  ownerTwo.allTime.combined.avgPF >
                    ownerOne.allTime.combined.avgPF && (
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
                              {ownerTwo.h2h.combined[ownerOne.ownerName]
                                .bestWeek >
                                ownerOne.h2h.combined[ownerTwo.ownerName]
                                  .bestWeek &&
                                `${(
                                  ownerTwo.h2h.combined[ownerOne.ownerName]
                                    .bestWeek -
                                  ownerOne.h2h.combined[ownerTwo.ownerName]
                                    .bestWeek
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
                              {ownerTwo.h2h.combined[ownerOne.ownerName]
                                .worstWeek >
                                ownerOne.h2h.combined[ownerTwo.ownerName]
                                  .worstWeek &&
                                `${(
                                  ownerTwo.h2h.combined[ownerOne.ownerName]
                                    .worstWeek -
                                  ownerOne.h2h.combined[ownerTwo.ownerName]
                                    .worstWeek
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
                      <>
                        {
                          ownerTwo.h2h.combined[ownerOne.ownerName]
                            .totalPointsFor
                        }
                      </>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerTwo.h2h.combined[ownerOne.ownerName].totalPointsFor >
                    ownerOne.h2h.combined[ownerTwo.ownerName]
                      .totalPointsFor && (
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
          </div>
        </div>
      ) : activeFilter === "regszn" ? (
        <div className="h2h-content-wrapper">
          <div className="h2h-content h2h-content-wrapper">
            {/* OWNER ONE */}
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
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                    <>
                      {ownerOne.h2h.regSzn[ownerTwo.ownerName].wins} -{" "}
                      {ownerOne.h2h.regSzn[ownerTwo.ownerName].losses} -{" "}
                      {ownerOne.h2h.regSzn[ownerTwo.ownerName].ties}
                    </>
                  )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne &&
                    ownerTwo &&
                    ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                      <>
                        {(
                          (ownerOne.h2h.regSzn[ownerTwo.ownerName].wins /
                            ownerOne.h2h.regSzn[ownerTwo.ownerName]
                              .RSgamesPlayed) *
                          100
                        ).toFixed(1)}
                        %
                      </>
                    )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerOne &&
                    ownerTwo &&
                    ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                      <>
                        {ownerOne.h2h.regSzn[ownerTwo.ownerName].winningPct >
                          ownerTwo.h2h.regSzn[ownerOne.ownerName]
                            .winningPct && (
                          <>
                            <span className="plus-minus green">
                              {(
                                ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                  .winningPct -
                                ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                  .winningPct
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
                    ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                      <>
                        {Number(
                          (
                            ownerOne.h2h.regSzn[ownerTwo.ownerName]
                              .totalPointsFor /
                            ownerOne.h2h.regSzn[ownerTwo.ownerName]
                              .RSgamesPlayed
                          ).toFixed(2)
                        )}
                      </>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF >
                    ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName].avgPF >
                                ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF &&
                                `${(
                                  ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                    .avgPF -
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName].avgPF
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
                  {ownerOne && ownerOne.allTime.regSzn.RSavgPF}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.regSzn.RSavgPF >
                    ownerTwo.allTime.regSzn.RSavgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.allTime.regSzn.RSavgPF >
                                ownerTwo.allTime.regSzn.RSavgPF &&
                                `${(
                                  ownerOne.allTime.regSzn.RSavgPF -
                                  ownerTwo.allTime.regSzn.RSavgPF
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
                    ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                      <>{ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek}</>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.regSzn[ownerTwo.ownerName].bestWeek >
                    ownerTwo.h2h.regSzn[ownerOne.ownerName].bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                .bestWeek >
                                ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                  .bestWeek &&
                                `${(
                                  ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                    .bestWeek -
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                    .bestWeek
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
                    ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                      <>{ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek}</>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.regSzn[ownerTwo.ownerName].worstWeek >
                    ownerTwo.h2h.regSzn[ownerOne.ownerName].worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                .worstWeek >
                                ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                  .worstWeek &&
                                `${(
                                  ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                    .worstWeek -
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                    .worstWeek
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
                    ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                      <>
                        {ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor}
                      </>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.regSzn[ownerTwo.ownerName].totalPointsFor >
                    ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne &&
                          ownerTwo &&
                          ownerOne.h2h.regSzn[ownerTwo.ownerName] && (
                            <>
                              {ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                .totalPointsFor >
                                ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                  .totalPointsFor &&
                                `${(
                                  ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                    .totalPointsFor -
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName]
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
            {/* MIDDLE SECTION */}
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one">Avg. Pts</div>
              <div className="cell stat stat-one">Avg. Pts v Field</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Total Points</div>
              <div className="cell stat stat-one">Avg. Finish</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
            </div>
            {/* OWNER TWO */}
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
                {ownerOne &&
                  ownerTwo &&
                  ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                    <>
                      {ownerTwo.h2h.regSzn[ownerOne.ownerName].wins} -{" "}
                      {ownerTwo.h2h.regSzn[ownerOne.ownerName].losses} -{" "}
                      {ownerTwo.h2h.regSzn[ownerOne.ownerName].ties}
                    </>
                  )}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne &&
                    ownerTwo &&
                    ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                      <>
                        {(
                          (ownerTwo.h2h.regSzn[ownerOne.ownerName].wins /
                            ownerTwo.h2h.regSzn[ownerOne.ownerName]
                              .RSgamesPlayed) *
                          100
                        ).toFixed(1)}
                        %
                      </>
                    )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerTwo &&
                    ownerOne &&
                    ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                      <>
                        {ownerTwo.h2h.regSzn[ownerOne.ownerName].winningPct >
                          ownerOne.h2h.regSzn[ownerTwo.ownerName]
                            .winningPct && (
                          <>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                            <span className="plus-minus green">
                              {(
                                ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                  .winningPct -
                                ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                  .winningPct
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
                    ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                      <>
                        {Number(
                          (
                            ownerTwo.h2h.regSzn[ownerOne.ownerName]
                              .totalPointsFor /
                            ownerTwo.h2h.regSzn[ownerOne.ownerName]
                              .RSgamesPlayed
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
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                    .avgPF -
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
                  ownerTwo.allTime.regSzn.RSavgPF >
                    ownerOne.allTime.regSzn.RSavgPF && (
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
                  {ownerTwo &&
                    ownerOne &&
                    ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
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
                              {ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                .bestWeek >
                                ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                  .bestWeek &&
                                `${(
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                    .bestWeek -
                                  ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                    .bestWeek
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
                    ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
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
                              {ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                .worstWeek >
                                ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                  .worstWeek &&
                                `${(
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                    .worstWeek -
                                  ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                    .worstWeek
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
                    ownerTwo.h2h.regSzn[ownerOne.ownerName] && (
                      <>
                        {ownerTwo.h2h.regSzn[ownerOne.ownerName].totalPointsFor}
                      </>
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
                              {ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                .totalPointsFor >
                                ownerOne.h2h.regSzn[ownerTwo.ownerName]
                                  .totalPointsFor &&
                                `${(
                                  ownerTwo.h2h.regSzn[ownerOne.ownerName]
                                    .totalPointsFor -
                                  ownerOne.h2h.regSzn[ownerTwo.ownerName]
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
          </div>
        </div>
      ) : activeFilter === "playoffs" ? (
        <div className="h2h-content-wrapper">
          <div className="h2h-content h2h-content-wrapper">
            {/* OWNER ONE */}
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
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.playoffs[ownerTwo.ownerName] && (
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
                            ownerOne.h2h.playoffs[ownerTwo.ownerName]
                              .POgamesPlayed) *
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
                          ownerTwo.h2h.playoffs[ownerOne.ownerName]
                            .winningPct && (
                          <>
                            <span className="plus-minus green">
                              {Number(
                                (
                                  ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                    .winningPct -
                                  ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                    .winningPct
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
                            ownerOne.h2h.playoffs[ownerTwo.ownerName]
                              .totalPointsFor /
                              ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                .POgamesPlayed
                          )
                        )
                          ? "-"
                          : Number(
                              (
                                ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                  .totalPointsFor /
                                ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                  .POgamesPlayed
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
                                ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                  .avgPF &&
                                `${(
                                  ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                    .avgPF -
                                  ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                    .avgPF
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
                        {ownerOne.h2h.playoffs[ownerTwo.ownerName].bestWeek ===
                        0
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
                              {ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                .bestWeek >
                                ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                  .bestWeek &&
                                `${(
                                  ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                    .bestWeek -
                                  ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                    .bestWeek
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
                        {ownerOne.h2h.playoffs[ownerTwo.ownerName].worstWeek ===
                        0
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
                              {ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                .worstWeek >
                                ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                  .worstWeek &&
                                `${(
                                  ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                    .worstWeek -
                                  ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                    .worstWeek
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
                        {ownerOne.h2h.playoffs[ownerTwo.ownerName]
                          .totalPointsFor === 0
                          ? "-"
                          : ownerOne.h2h.playoffs[ownerTwo.ownerName]
                              .totalPointsFor}
                      </>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.h2h.playoffs[ownerTwo.ownerName].totalPointsFor >
                    ownerTwo.h2h.playoffs[ownerOne.ownerName]
                      .totalPointsFor && (
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
            {/* MIDDLE SECTION */}
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one">Avg. Pts</div>
              <div className="cell stat stat-one">Avg. Pts v Field</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Total Points</div>
              <div className="cell stat stat-one">Avg. Finish</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
              <div className="cell stat stat-one">*YOUR IDEA HERE*</div>
            </div>
            {/* OWNER TWO */}
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
                {ownerOne &&
                  ownerTwo &&
                  ownerTwo.h2h.playoffs[ownerOne.ownerName] && (
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
                            ownerTwo.h2h.playoffs[ownerOne.ownerName]
                              .POgamesPlayed) *
                            100
                        )
                          ? "-"
                          : Number(
                              (
                                (ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                  .wins /
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
                          ownerOne.h2h.playoffs[ownerTwo.ownerName]
                            .winningPct && (
                          <>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                            <span className="plus-minus green">
                              {(
                                ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                  .winningPct -
                                ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                  .winningPct
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
                            ownerTwo.h2h.playoffs[ownerOne.ownerName]
                              .totalPointsFor /
                              ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                .POgamesPlayed
                          )
                        )
                          ? "-"
                          : Number(
                              ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                .totalPointsFor /
                                ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                  .POgamesPlayed
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
                                ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                  .avgPF &&
                                `${(
                                  ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                    .avgPF -
                                  ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                    .avgPF
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
                        {ownerTwo.h2h.playoffs[ownerOne.ownerName].bestWeek ===
                        0
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
                              {ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                .bestWeek >
                                ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                  .bestWeek &&
                                `${(
                                  ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                    .bestWeek -
                                  ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                    .bestWeek
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
                        {ownerTwo.h2h.playoffs[ownerOne.ownerName].worstWeek ===
                        0
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
                              {ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                .worstWeek >
                                ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                  .worstWeek &&
                                `${(
                                  ownerTwo.h2h.playoffs[ownerOne.ownerName]
                                    .worstWeek -
                                  ownerOne.h2h.playoffs[ownerTwo.ownerName]
                                    .worstWeek
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
                        {ownerTwo.h2h.playoffs[ownerOne.ownerName]
                          .totalPointsFor === 0
                          ? "-"
                          : ownerTwo.h2h.playoffs[ownerOne.ownerName]
                              .totalPointsFor}
                      </>
                    )}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerTwo.h2h.playoffs[ownerOne.ownerName].totalPointsFor >
                    ownerOne.h2h.playoffs[ownerTwo.ownerName]
                      .totalPointsFor && (
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
          </div>
        </div>
      ) : (
        <div>ERROR</div>
      )}
    </div>
  )
}
