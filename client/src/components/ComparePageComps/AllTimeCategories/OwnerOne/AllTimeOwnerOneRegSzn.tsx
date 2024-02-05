import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"

export default function AllTimeOwnerOneRegSzn() {
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
      <div className="cell record owner-one-record">
        {ownerOne?.allTime.regSzn.RSwins} - {ownerOne?.allTime.regSzn.RSlosses}{" "}
        - {ownerOne?.allTime.regSzn.RSties}
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
                  .scheduleSwapWinPct > ownerOne.allTime.regSzn.RSwinningPct &&
                ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                  .scheduleSwapWinPct -
                  ownerOne.allTime.regSzn.RSwinningPct >
                  0.1 ? (
                  <>
                    <span className="plus-minus green">
                      *
                      {(
                        ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                          .scheduleSwapWinPct -
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
                      .scheduleSwapWinPct - ownerOne.allTime.regSzn.RSwinningPct
                  ) > 0.1 ? (
                  <>
                    <span className="plus-minus red">
                      *
                      {(
                        ownerOne.allTime.regSzn.RSwinningPct -
                        ownerOne.scheduleSwap[ownerTwo.ownerName].allTime
                          .scheduleSwapWinPct
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
        <span className="stat-value">{ownerOne?.bonusStats.luckyWins}</span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.bonusStats.luckyWins > ownerTwo?.bonusStats.luckyWins && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerOne.bonusStats.luckyWins - ownerTwo?.bonusStats.luckyWins}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell unlucky-losses">
        <span className="stat-value">{ownerOne?.bonusStats.unluckyLosses}</span>
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
          ownerOne.allTime.regSzn.RSPF > ownerTwo?.allTime.regSzn.RSPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.regSzn.RSPF - ownerTwo?.allTime.regSzn.RSPF
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
          ownerOne.allTime.regSzn.RSPA > ownerTwo?.allTime.regSzn.RSPA && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne.allTime.regSzn.RSPA - ownerTwo?.allTime.regSzn.RSPA
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
