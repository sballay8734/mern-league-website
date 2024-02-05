import { useSelector } from "react-redux"
import { RootState } from "../../../../redux/store"
import { FaCaretUp } from "react-icons/fa"

export default function AllTimeOwnerTwoCombined() {
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
      <div className="cell record owner-one-record">
        {ownerTwo?.allTime.combined.wins} - {ownerTwo?.allTime.combined.losses}{" "}
        - {ownerTwo?.allTime.combined.ties}
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
  )
}
