import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function AllTimeOwnerOneCombined() {
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
        {ownerOne?.allTime.combined.wins} - {ownerOne?.allTime.combined.losses}{" "}
        - {ownerOne?.allTime.combined.ties}
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
  )
}
