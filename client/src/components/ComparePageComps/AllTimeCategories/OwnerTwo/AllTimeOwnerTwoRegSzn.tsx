import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"

export default function AllTimeOwnerTwoRegSzn() {
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
      <div className="cell record owner-one-record">
        {ownerTwo?.allTime.regSzn.RSwins} - {ownerTwo?.allTime.regSzn.RSlosses}{" "}
        - {ownerTwo?.allTime.regSzn.RSties}
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
                  .scheduleSwapWinPct > ownerTwo.allTime.regSzn.RSwinningPct &&
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
                        ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                          .scheduleSwapWinPct -
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
                      .scheduleSwapWinPct - ownerTwo.allTime.regSzn.RSwinningPct
                  ) > 0.1 ? (
                  <>
                    <span className="arrow-icon red">
                      <FaCaretDown />
                    </span>
                    <span className="plus-minus red">
                      *
                      {(
                        ownerTwo.allTime.regSzn.RSwinningPct -
                        ownerTwo.scheduleSwap[ownerOne.ownerName].allTime
                          .scheduleSwapWinPct
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
        <span className="stat-value">{ownerTwo?.bonusStats.luckyWins}</span>
        {ownerTwo &&
          ownerOne &&
          ownerTwo.bonusStats.luckyWins > ownerOne?.bonusStats.luckyWins && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerTwo.bonusStats.luckyWins - ownerOne?.bonusStats.luckyWins}
              </span>
            </div>
          )}
      </div>
      <div className="cell unlucky-losses">
        <span className="stat-value">{ownerTwo?.bonusStats.unluckyLosses}</span>
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
          ownerTwo.allTime.regSzn.RSPF > ownerOne?.allTime.regSzn.RSPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.regSzn.RSPF - ownerOne?.allTime.regSzn.RSPF
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
          ownerTwo.allTime.regSzn.RSPA > ownerOne?.allTime.regSzn.RSPA && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo.allTime.regSzn.RSPA - ownerOne?.allTime.regSzn.RSPA
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
    </div>
  )
}
