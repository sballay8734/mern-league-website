import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { RootState } from "../../redux/store"
import { setActiveFilter } from "../../redux/owners/compareSlice"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import { IoMdSwap } from "react-icons/io"

export default function AllTimeContent() {
  const dispatch = useDispatch()
  const { ownerOne, ownerTwo, activeFilter, activeYear } = useSelector(
    (state: RootState) => state.compare
  )

  return (
    <div className="compare-all-time">
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
      {activeFilter === "regszn" ? (
        <div className="h2h-content-wrapper disable-scrollbars">
          <div className="h2h-content h2h-content-wrapper">
            {/* ALL TIME REGSZN OWNER ONE */}
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
                {ownerOne?.allTime.regSzn.RSwins} -{" "}
                {ownerOne?.allTime.regSzn.RSlosses} -{" "}
                {ownerOne?.allTime.regSzn.RSties}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne?.allTime.regSzn.RSwinningPct.toFixed(1)}%
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne?.allTime.regSzn.RSwinningPct >
                    ownerTwo?.allTime.regSzn.RSwinningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.allTime.regSzn.RSwinningPct -
                          ownerTwo?.allTime.regSzn.RSwinningPct
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell ss-record">
                <span className="stat-value">
                  {ownerOne &&
                  ownerTwo &&
                  ownerOne.scheduleSwap[ownerTwo.ownerName].allTime &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <>
                      {
                        ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                          .scheduleSwapWins
                      }
                      {" - "}
                      {
                        ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                          .scheduleSwapLosses
                      }
                      {" - "}
                      {
                        ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                          .scheduleSwapTies
                      }
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
              <div className="cell ss-winPct">
                <span className="stat-value">
                  {ownerOne &&
                  ownerTwo &&
                  ownerOne.scheduleSwap[ownerTwo.ownerName].allTime &&
                  ownerTwo.yearly[activeYear].participated === true ? (
                    <>
                      {ownerOne.scheduleSwap[
                        ownerTwo.ownerName
                      ].allTime.scheduleSwapWinPct.toFixed(1)}
                      %
                    </>
                  ) : (
                    "-"
                  )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerOne &&
                    ownerTwo &&
                    ownerOne.scheduleSwap[ownerTwo.ownerName].allTime && (
                      <>
                        {ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                          .scheduleSwapWinPct >
                          ownerOne.allTime.regSzn.RSwinningPct &&
                        ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                          .scheduleSwapWinPct -
                          ownerOne.allTime.regSzn.RSwinningPct >
                          0.1 ? (
                          <>
                            <span className="plus-minus green">
                              *
                              {(
                                ownerOne.scheduleSwap[ownerTwo.ownerName]
                                  .allTime.scheduleSwapWinPct -
                                ownerOne.allTime.regSzn.RSwinningPct
                              ).toFixed(1)}
                              %
                            </span>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                          </>
                        ) : ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                            .scheduleSwapWinPct <
                            ownerOne.allTime.regSzn.RSwinningPct &&
                          Math.abs(
                            ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                              .scheduleSwapWinPct -
                              ownerOne.allTime.regSzn.RSwinningPct
                          ) > 0.1 ? (
                          <>
                            <span className="plus-minus red">
                              *
                              {(
                                ownerOne.allTime.regSzn.RSwinningPct -
                                ownerOne.scheduleSwap[ownerTwo.ownerName]
                                  .allTime.scheduleSwapWinPct
                              ).toFixed(1)}
                              %
                            </span>
                            <span className="arrow-icon red">
                              <FaCaretDown />
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                </div>
              </div>
              <div className="cell etewRecord">
                <span className="stat-value">
                  {ownerOne?.bonusStats.everyTeamEveryWeek.wins} -{" "}
                  {ownerOne?.bonusStats.everyTeamEveryWeek.losses} -{" "}
                  {ownerOne?.bonusStats.everyTeamEveryWeek.ties}
                </span>
              </div>
              <div className="cell etewWinPct">
                <span className="stat-value">
                  {ownerOne &&
                    ownerOne?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}
                  %
                </span>

                {ownerOne &&
                  ownerTwo &&
                  ownerOne?.bonusStats.everyTeamEveryWeek.winPct >
                    ownerTwo?.bonusStats.everyTeamEveryWeek.winPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.bonusStats.everyTeamEveryWeek.winPct -
                          ownerTwo?.bonusStats.everyTeamEveryWeek.winPct
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
                  {ownerOne?.allTime.regSzn.RSavgPF.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.regSzn.RSavgPF >
                    ownerTwo?.allTime.regSzn.RSavgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.regSzn.RSavgPF -
                          ownerTwo?.allTime.regSzn.RSavgPF
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
                  {ownerOne?.allTime.regSzn.RSavgPA.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.regSzn.RSavgPA >
                    ownerTwo?.allTime.regSzn.RSavgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.regSzn.RSavgPA -
                          ownerTwo?.allTime.regSzn.RSavgPA
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell playoff-rate">
                <span className="stat-value">
                  {ownerOne?.bonusStats.playoffRate.toFixed(1)}%
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.playoffRate >
                    ownerTwo?.bonusStats.playoffRate && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.bonusStats.playoffRate -
                          ownerTwo?.bonusStats.playoffRate
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerOne?.allTime.regSzn.bestWeek.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.regSzn.bestWeek >
                    ownerTwo?.allTime.regSzn.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.regSzn.bestWeek -
                          ownerTwo?.allTime.regSzn.bestWeek
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
                  {ownerOne?.allTime.regSzn.worstWeek.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.regSzn.worstWeek >
                    ownerTwo?.allTime.regSzn.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.regSzn.worstWeek -
                          ownerTwo?.allTime.regSzn.worstWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell lucky-wins">
                <span className="stat-value">
                  {ownerOne?.bonusStats.luckyWins}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.luckyWins >
                    ownerTwo?.bonusStats.luckyWins && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.luckyWins -
                          ownerTwo?.bonusStats.luckyWins}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell unlucky-losses">
                <span className="stat-value">
                  {ownerOne?.bonusStats.unluckyLosses}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.unluckyLosses >
                    ownerTwo?.bonusStats.unluckyLosses && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.unluckyLosses -
                          ownerTwo?.bonusStats.unluckyLosses}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highWSeason">
                <span className="stat-value">
                  {ownerOne?.bonusStats.mostWinsOneSeason}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.mostWinsOneSeason >
                    ownerTwo?.bonusStats.mostWinsOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.mostWinsOneSeason -
                          ownerTwo?.bonusStats.mostWinsOneSeason}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highLSeason">
                <span className="stat-value">
                  {ownerOne?.bonusStats.mostLossesOneSeason}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.mostLossesOneSeason >
                    ownerTwo?.bonusStats.mostLossesOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.mostLossesOneSeason -
                          ownerTwo?.bonusStats.mostLossesOneSeason}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerOne?.allTime.regSzn.RSPF.toFixed(1)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.regSzn.RSPF >
                    ownerTwo?.allTime.regSzn.RSPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.regSzn.RSPF -
                          ownerTwo?.allTime.regSzn.RSPF
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
                  {ownerOne?.allTime.regSzn.RSPA.toFixed(1)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.regSzn.RSPA >
                    ownerTwo?.allTime.regSzn.RSPA && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.regSzn.RSPA -
                          ownerTwo?.allTime.regSzn.RSPA
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
            </div>
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one special">
                <IoMdSwap />
                <span>Schedule</span>
              </div>
              <div className="cell stat stat-one special">
                <IoMdSwap />
                <span>Win %</span>
              </div>
              <div className="cell stat stat-one special">ETEW Record</div>
              <div className="cell stat stat-one special">ETEW Win %</div>
              <div className="cell stat stat-one">Avg. PF</div>
              <div className="cell stat stat-one">Avg. PA</div>
              <div className="cell stat stat-one">Playoff Rate</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Lucky Ws</div>
              <div className="cell stat stat-one">Unlucky Ls</div>
              <div className="cell stat stat-one">High W Szn</div>
              <div className="cell stat stat-one">High L Szn</div>
              <div className="cell stat stat-one">Total PF</div>
              <div className="cell stat stat-one">Total PA</div>
            </div>
            {/* ALL TIME REGSZN OWNER TWO */}
            <div className="owner-stats owner-two-stats">
              <div className="main-cell owner-name owner-two-name">
                {ownerTwo?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerTwo.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell record owner-one-record">
                {ownerTwo?.allTime.regSzn.RSwins} -{" "}
                {ownerTwo?.allTime.regSzn.RSlosses} -{" "}
                {ownerTwo?.allTime.regSzn.RSties}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerTwo?.allTime.regSzn.RSwinningPct.toFixed(1)}%
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo?.allTime.regSzn.RSwinningPct >
                    ownerOne?.allTime.regSzn.RSwinningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.allTime.regSzn.RSwinningPct -
                          ownerOne?.allTime.regSzn.RSwinningPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell ss-record">
                <span className="stat-value">
                  {ownerOne &&
                  ownerTwo &&
                  ownerTwo.scheduleSwap[ownerOne.ownerName].allTime &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <>
                      {
                        ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                          .scheduleSwapWins
                      }
                      {" - "}
                      {
                        ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                          .scheduleSwapLosses
                      }
                      {" - "}
                      {
                        ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                          .scheduleSwapTies
                      }
                    </>
                  ) : (
                    "-"
                  )}
                </span>
              </div>
              <div className="cell ss-winPct">
                <span className="stat-value">
                  {ownerTwo &&
                  ownerOne &&
                  ownerTwo.scheduleSwap[ownerOne.ownerName].allTime &&
                  ownerOne.yearly[activeYear].participated === true ? (
                    <>
                      {ownerTwo.scheduleSwap[
                        ownerOne.ownerName
                      ].allTime.scheduleSwapWinPct.toFixed(1)}
                      %
                    </>
                  ) : (
                    "-"
                  )}
                </span>
                <div className="plus-minus-and-icon">
                  {ownerTwo &&
                    ownerOne &&
                    ownerTwo.scheduleSwap[ownerOne.ownerName].allTime && (
                      <>
                        {ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                          .scheduleSwapWinPct >
                          ownerTwo.allTime.regSzn.RSwinningPct &&
                        ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                          .scheduleSwapWinPct -
                          ownerTwo.allTime.regSzn.RSwinningPct >
                          0.1 ? (
                          <>
                            <span className="arrow-icon green">
                              <FaCaretUp />
                            </span>
                            <span className="plus-minus green">
                              *
                              {(
                                ownerTwo.scheduleSwap[ownerOne.ownerName]
                                  .allTime.scheduleSwapWinPct -
                                ownerTwo.allTime.regSzn.RSwinningPct
                              ).toFixed(1)}
                              %
                            </span>
                          </>
                        ) : ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                            .scheduleSwapWinPct <
                            ownerTwo.allTime.regSzn.RSwinningPct &&
                          Math.abs(
                            ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                              .scheduleSwapWinPct -
                              ownerTwo.allTime.regSzn.RSwinningPct
                          ) > 0.1 ? (
                          <>
                            <span className="arrow-icon red">
                              <FaCaretDown />
                            </span>
                            <span className="plus-minus red">
                              *
                              {(
                                ownerTwo.allTime.regSzn.RSwinningPct -
                                ownerTwo.scheduleSwap[ownerOne.ownerName]
                                  .allTime.scheduleSwapWinPct
                              ).toFixed(1)}
                              %
                            </span>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                </div>
              </div>
              <div className="cell etewRecord">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.everyTeamEveryWeek.wins} -{" "}
                  {ownerTwo?.bonusStats.everyTeamEveryWeek.losses} -{" "}
                  {ownerTwo?.bonusStats.everyTeamEveryWeek.ties}
                </span>
              </div>
              <div className="cell etewWinPct">
                <span className="stat-value">
                  {ownerTwo &&
                    ownerTwo?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}
                  %
                </span>

                {ownerTwo &&
                  ownerOne &&
                  ownerTwo?.bonusStats.everyTeamEveryWeek.winPct >
                    ownerOne?.bonusStats.everyTeamEveryWeek.winPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.bonusStats.everyTeamEveryWeek.winPct -
                          ownerOne?.bonusStats.everyTeamEveryWeek.winPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerTwo?.allTime.regSzn.RSavgPF.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.regSzn.RSavgPF >
                    ownerOne?.allTime.regSzn.RSavgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.regSzn.RSavgPF -
                          ownerOne?.allTime.regSzn.RSavgPF
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerTwo?.allTime.regSzn.RSavgPA.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.regSzn.RSavgPA >
                    ownerOne?.allTime.regSzn.RSavgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.regSzn.RSavgPA -
                          ownerOne?.allTime.regSzn.RSavgPA
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell playoff-rate">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.playoffRate.toFixed(1)}%
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.playoffRate >
                    ownerOne?.bonusStats.playoffRate && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.bonusStats.playoffRate -
                          ownerOne?.bonusStats.playoffRate
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerTwo?.allTime.regSzn.bestWeek.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.regSzn.bestWeek >
                    ownerOne?.allTime.regSzn.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.regSzn.bestWeek -
                          ownerOne?.allTime.regSzn.bestWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerTwo?.allTime.regSzn.worstWeek.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.regSzn.worstWeek >
                    ownerOne?.allTime.regSzn.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.regSzn.worstWeek -
                          ownerOne?.allTime.regSzn.worstWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell lucky-wins">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.luckyWins}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.luckyWins >
                    ownerOne?.bonusStats.luckyWins && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.luckyWins -
                          ownerOne?.bonusStats.luckyWins}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell unlucky-losses">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.unluckyLosses}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.unluckyLosses >
                    ownerOne?.bonusStats.unluckyLosses && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.unluckyLosses -
                          ownerOne?.bonusStats.unluckyLosses}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highWSeason">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.mostWinsOneSeason}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.mostWinsOneSeason >
                    ownerOne?.bonusStats.mostWinsOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.mostWinsOneSeason -
                          ownerOne?.bonusStats.mostWinsOneSeason}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highLSeason">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.mostLossesOneSeason}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.mostLossesOneSeason >
                    ownerOne?.bonusStats.mostLossesOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.mostLossesOneSeason -
                          ownerOne?.bonusStats.mostLossesOneSeason}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerTwo?.allTime.regSzn.RSPF.toFixed(1)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.regSzn.RSPF >
                    ownerOne?.allTime.regSzn.RSPF && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.regSzn.RSPF -
                          ownerOne?.allTime.regSzn.RSPF
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerTwo?.allTime.regSzn.RSPA.toFixed(1)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.regSzn.RSPA >
                    ownerOne?.allTime.regSzn.RSPA && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.regSzn.RSPA -
                          ownerOne?.allTime.regSzn.RSPA
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : activeFilter === "playoffs" ? (
        <div className="h2h-content-wrapper disable-scrollbars">
          <div className="h2h-content h2h-content-wrapper">
            {/* ALL TIME PLAYOFFS OWNER ONE */}
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
                {ownerOne?.allTime.playoffs.POwins} -{" "}
                {ownerOne?.allTime.playoffs.POlosses}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne?.allTime.playoffs.POwinningPct.toFixed(1)}%
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne?.allTime.playoffs.POwinningPct >
                    ownerTwo?.allTime.playoffs.POwinningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.allTime.playoffs.POwinningPct -
                          ownerTwo?.allTime.playoffs.POwinningPct
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
                  {ownerOne?.allTime.playoffs.POavgPF.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.playoffs.POavgPF >
                    ownerTwo?.allTime.playoffs.POavgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.playoffs.POavgPF -
                          ownerTwo?.allTime.playoffs.POavgPF
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
                  {ownerOne?.allTime.playoffs.POavgPA.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.playoffs.POavgPA >
                    ownerTwo?.allTime.playoffs.POavgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.playoffs.POavgPA -
                          ownerTwo?.allTime.playoffs.POavgPA
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
                  {ownerOne?.allTime.playoffs.bestWeek.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.playoffs.bestWeek >
                    ownerTwo?.allTime.playoffs.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.playoffs.bestWeek -
                          ownerTwo?.allTime.playoffs.bestWeek
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
                  {ownerOne?.allTime.playoffs.worstWeek.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.playoffs.worstWeek >
                    ownerTwo?.allTime.playoffs.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.playoffs.worstWeek -
                          ownerTwo?.allTime.playoffs.worstWeek
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
                  {ownerOne?.allTime.playoffs.POpointsFor.toFixed(1)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.playoffs.POpointsFor >
                    ownerTwo?.allTime.playoffs.POpointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.playoffs.POpointsFor -
                          ownerTwo?.allTime.playoffs.POpointsFor
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
                  {ownerOne?.allTime.playoffs.POpointsAgainst.toFixed(1)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.playoffs.POpointsAgainst >
                    ownerTwo?.allTime.playoffs.POpointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.playoffs.POpointsAgainst -
                          ownerTwo?.allTime.playoffs.POpointsAgainst
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
            </div>
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one">Avg. PF</div>
              <div className="cell stat stat-one">Avg. PA</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Total PF</div>
              <div className="cell stat stat-one">Total PA</div>
            </div>
            {/* ALL TIME PLAYOFFS OWNER TWO */}
            <div className="owner-stats owner-two-stats">
              <div className="main-cell owner-name owner-two-name">
                {ownerTwo?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerTwo.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell record owner-one-record">
                {ownerTwo?.allTime.playoffs.POwins} -{" "}
                {ownerTwo?.allTime.playoffs.POlosses}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerTwo?.allTime.playoffs.POwinningPct.toFixed(1)}%
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo?.allTime.playoffs.POwinningPct >
                    ownerOne?.allTime.playoffs.POwinningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.allTime.playoffs.POwinningPct -
                          ownerOne?.allTime.playoffs.POwinningPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerTwo?.allTime.playoffs.POavgPF.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.playoffs.POavgPF >
                    ownerOne?.allTime.playoffs.POavgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.playoffs.POavgPF -
                          ownerOne?.allTime.playoffs.POavgPF
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerTwo?.allTime.playoffs.POavgPA.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.playoffs.POavgPA >
                    ownerOne?.allTime.playoffs.POavgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.playoffs.POavgPA -
                          ownerOne?.allTime.playoffs.POavgPA
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerTwo?.allTime.playoffs.bestWeek.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.playoffs.bestWeek >
                    ownerOne?.allTime.playoffs.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.playoffs.bestWeek -
                          ownerOne?.allTime.playoffs.bestWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerTwo?.allTime.playoffs.worstWeek.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.playoffs.worstWeek >
                    ownerOne?.allTime.playoffs.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.playoffs.worstWeek -
                          ownerOne?.allTime.playoffs.worstWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerTwo?.allTime.playoffs.POpointsFor.toFixed(1)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.playoffs.POpointsFor >
                    ownerOne?.allTime.playoffs.POpointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.playoffs.POpointsFor -
                          ownerOne?.allTime.playoffs.POpointsFor
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerTwo?.allTime.playoffs.POpointsAgainst.toFixed(1)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.playoffs.POpointsAgainst >
                    ownerOne?.allTime.playoffs.POpointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.playoffs.POpointsAgainst -
                          ownerOne?.allTime.playoffs.POpointsAgainst
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : activeFilter === "combined" ? (
        <div className="h2h-content-wrapper disable-scrollbars">
          <div className="h2h-content h2h-content-wrapper">
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
                {ownerOne?.allTime.combined.wins} -{" "}
                {ownerOne?.allTime.combined.losses} -{" "}
                {ownerOne?.allTime.combined.ties}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerOne?.allTime.combined.winningPct.toFixed(1)}%
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne?.allTime.combined.winningPct >
                    ownerTwo?.allTime.combined.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.allTime.combined.winningPct -
                          ownerTwo?.allTime.combined.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell etewRecord">
                <span className="stat-value">
                  {ownerOne?.bonusStats.everyTeamEveryWeek.wins} -{" "}
                  {ownerOne?.bonusStats.everyTeamEveryWeek.losses} -{" "}
                  {ownerOne?.bonusStats.everyTeamEveryWeek.ties}
                </span>
              </div>
              <div className="cell etewWinPct">
                <span className="stat-value">
                  {ownerOne &&
                    ownerOne?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}
                  %
                </span>

                {ownerOne &&
                  ownerTwo &&
                  ownerOne?.bonusStats.everyTeamEveryWeek.winPct >
                    ownerTwo?.bonusStats.everyTeamEveryWeek.winPct && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne?.bonusStats.everyTeamEveryWeek.winPct -
                          ownerTwo?.bonusStats.everyTeamEveryWeek.winPct
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
                  {ownerOne?.allTime.combined.avgPF.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.combined.avgPF >
                    ownerTwo?.allTime.combined.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.combined.avgPF -
                          ownerTwo?.allTime.combined.avgPF
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
                  {ownerOne?.allTime.combined.avgPA.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.combined.avgPA >
                    ownerTwo?.allTime.combined.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.combined.avgPA -
                          ownerTwo?.allTime.combined.avgPA
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell playoff-rate">
                <span className="stat-value">
                  {ownerOne?.bonusStats.playoffRate.toFixed(1)}%
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.playoffRate >
                    ownerTwo?.bonusStats.playoffRate && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.bonusStats.playoffRate -
                          ownerTwo?.bonusStats.playoffRate
                        ).toFixed(1)}
                        %
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerOne?.allTime.combined.bestWeek.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.combined.bestWeek >
                    ownerTwo?.allTime.combined.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.combined.bestWeek -
                          ownerTwo?.allTime.combined.bestWeek
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
                  {ownerOne?.allTime.combined.worstWeek.toFixed(2)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.combined.worstWeek >
                    ownerTwo?.allTime.combined.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.combined.worstWeek -
                          ownerTwo?.allTime.combined.worstWeek
                        ).toFixed(2)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell lucky-wins">
                <span className="stat-value">
                  {ownerOne?.bonusStats.luckyWins}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.luckyWins >
                    ownerTwo?.bonusStats.luckyWins && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.luckyWins -
                          ownerTwo?.bonusStats.luckyWins}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell unlucky-losses">
                <span className="stat-value">
                  {ownerOne?.bonusStats.unluckyLosses}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.unluckyLosses >
                    ownerTwo?.bonusStats.unluckyLosses && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.unluckyLosses -
                          ownerTwo?.bonusStats.unluckyLosses}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highWSeason">
                <span className="stat-value">
                  {ownerOne?.bonusStats.mostWinsOneSeason}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.mostWinsOneSeason >
                    ownerTwo?.bonusStats.mostWinsOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.mostWinsOneSeason -
                          ownerTwo?.bonusStats.mostWinsOneSeason}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highLSeason">
                <span className="stat-value">
                  {ownerOne?.bonusStats.mostLossesOneSeason}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.bonusStats.mostLossesOneSeason >
                    ownerTwo?.bonusStats.mostLossesOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {ownerOne.bonusStats.mostLossesOneSeason -
                          ownerTwo?.bonusStats.mostLossesOneSeason}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerOne?.allTime.combined.pointsFor.toFixed(1)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.combined.pointsFor >
                    ownerTwo?.allTime.combined.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.combined.pointsFor -
                          ownerTwo?.allTime.combined.pointsFor
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
                  {ownerOne?.allTime.combined.pointsAgainst.toFixed(1)}
                </span>
                {ownerOne &&
                  ownerTwo &&
                  ownerOne.allTime.combined.pointsAgainst >
                    ownerTwo?.allTime.combined.pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="plus-minus green">
                        {(
                          ownerOne.allTime.combined.pointsAgainst -
                          ownerTwo?.allTime.combined.pointsAgainst
                        ).toFixed(1)}
                      </span>
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                    </div>
                  )}
              </div>
            </div>
            <div className="stat-names">
              <div className="main-cell cell stat stat-title">Stat</div>
              <div className="cell stat stat-one">Record</div>
              <div className="cell stat stat-one">Win %</div>
              <div className="cell stat stat-one special">ETEW Record</div>
              <div className="cell stat stat-one special">ETEW Win %</div>
              <div className="cell stat stat-one">Avg. PF</div>
              <div className="cell stat stat-one">Avg. PA</div>
              <div className="cell stat stat-one">Playoff Rate</div>
              <div className="cell stat stat-one">Best Week</div>
              <div className="cell stat stat-one">Worst Week</div>
              <div className="cell stat stat-one">Lucky Ws</div>
              <div className="cell stat stat-one">Unlucky Ls</div>
              <div className="cell stat stat-one">High W Szn</div>
              <div className="cell stat stat-one">High L Szn</div>
              <div className="cell stat stat-one">Total PF</div>
              <div className="cell stat stat-one">Total PA</div>
            </div>
            <div className="owner-stats owner-two-stats">
              <div className="main-cell owner-name owner-two-name">
                {ownerTwo?.ownerName &&
                  (() => {
                    const [firstName, lastName] = ownerTwo.ownerName.split(" ")
                    const lastInitial = lastName ? lastName.charAt(0) : ""
                    return `${firstName} ${lastInitial}.`
                  })()}
              </div>
              <div className="cell record owner-one-record">
                {ownerTwo?.allTime.combined.wins} -{" "}
                {ownerTwo?.allTime.combined.losses} -{" "}
                {ownerTwo?.allTime.combined.ties}
              </div>
              <div className="cell win-pct">
                <span className="stat-value">
                  {ownerTwo?.allTime.combined.winningPct.toFixed(1)}%
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo?.allTime.combined.winningPct >
                    ownerOne?.allTime.combined.winningPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.allTime.combined.winningPct -
                          ownerOne?.allTime.combined.winningPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell etewRecord">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.everyTeamEveryWeek.wins} -{" "}
                  {ownerTwo?.bonusStats.everyTeamEveryWeek.losses} -{" "}
                  {ownerTwo?.bonusStats.everyTeamEveryWeek.ties}
                </span>
              </div>
              <div className="cell etewWinPct">
                <span className="stat-value">
                  {ownerTwo &&
                    ownerTwo?.bonusStats.everyTeamEveryWeek.winPct.toFixed(1)}
                  %
                </span>

                {ownerTwo &&
                  ownerOne &&
                  ownerTwo?.bonusStats.everyTeamEveryWeek.winPct >
                    ownerOne?.bonusStats.everyTeamEveryWeek.winPct && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo?.bonusStats.everyTeamEveryWeek.winPct -
                          ownerOne?.bonusStats.everyTeamEveryWeek.winPct
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPf">
                <span className="stat-value">
                  {ownerTwo?.allTime.combined.avgPF.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.combined.avgPF >
                    ownerOne?.allTime.combined.avgPF && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.combined.avgPF -
                          ownerOne?.allTime.combined.avgPF
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell avgPa">
                <span className="stat-value">
                  {ownerTwo?.allTime.combined.avgPA.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.combined.avgPA >
                    ownerOne?.allTime.combined.avgPA && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.combined.avgPA -
                          ownerOne?.allTime.combined.avgPA
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell playoff-rate">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.playoffRate.toFixed(1)}%
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.playoffRate >
                    ownerOne?.bonusStats.playoffRate && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.bonusStats.playoffRate -
                          ownerOne?.bonusStats.playoffRate
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell best-week">
                <span className="stat-value">
                  {ownerTwo?.allTime.combined.bestWeek.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.combined.bestWeek >
                    ownerOne?.allTime.combined.bestWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.combined.bestWeek -
                          ownerOne?.allTime.combined.bestWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell worst-week">
                <span className="stat-value">
                  {ownerTwo?.allTime.combined.worstWeek.toFixed(2)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.combined.worstWeek >
                    ownerOne?.allTime.combined.worstWeek && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.combined.worstWeek -
                          ownerOne?.allTime.combined.worstWeek
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell lucky-wins">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.luckyWins}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.luckyWins >
                    ownerOne?.bonusStats.luckyWins && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.luckyWins -
                          ownerOne?.bonusStats.luckyWins}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell unlucky-losses">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.unluckyLosses}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.unluckyLosses >
                    ownerOne?.bonusStats.unluckyLosses && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.unluckyLosses -
                          ownerOne?.bonusStats.unluckyLosses}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highWSeason">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.mostWinsOneSeason}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.mostWinsOneSeason >
                    ownerOne?.bonusStats.mostWinsOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.mostWinsOneSeason -
                          ownerOne?.bonusStats.mostWinsOneSeason}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell highLSeason">
                <span className="stat-value">
                  {ownerTwo?.bonusStats.mostLossesOneSeason}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.bonusStats.mostLossesOneSeason >
                    ownerOne?.bonusStats.mostLossesOneSeason && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {ownerTwo.bonusStats.mostLossesOneSeason -
                          ownerOne?.bonusStats.mostLossesOneSeason}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-for">
                <span className="stat-value">
                  {ownerTwo?.allTime.combined.pointsFor.toFixed(1)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.combined.pointsFor >
                    ownerOne?.allTime.combined.pointsFor && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.combined.pointsFor -
                          ownerOne?.allTime.combined.pointsFor
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
              <div className="cell total-points-against">
                <span className="stat-value">
                  {ownerTwo?.allTime.combined.pointsAgainst.toFixed(1)}
                </span>
                {ownerTwo &&
                  ownerOne &&
                  ownerTwo.allTime.combined.pointsAgainst >
                    ownerOne?.allTime.combined.pointsAgainst && (
                    <div className="plus-minus-and-icon">
                      <span className="arrow-icon green">
                        <FaCaretUp />
                      </span>
                      <span className="plus-minus green">
                        {(
                          ownerTwo.allTime.combined.pointsAgainst -
                          ownerOne?.allTime.combined.pointsAgainst
                        ).toFixed(1)}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}
    </div>
  )
}
