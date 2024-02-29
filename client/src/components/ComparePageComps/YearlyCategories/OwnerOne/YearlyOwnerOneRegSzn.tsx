import { useSelector } from "react-redux";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { RootState } from "../../../../redux/store";

export default function YearlyOwnerOneRegSzn() {
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne);
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo);
  const activeYear = useSelector(
    (state: RootState) => state.compare.activeYear,
  );

  return (
    <div className="owner-stats owner-one-stats">
      <div className="main-cell owner-name owner-one-name">
        {ownerOne?.ownerName &&
          (() => {
            const [firstName, lastName] = ownerOne.ownerName.split(" ");
            const lastInitial = lastName ? lastName.charAt(0) : "";
            return `${firstName} ${lastInitial}.`;
          })()}
      </div>
      <div className="cell finished">
        <span className="stat-value">
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>{ownerOne?.yearly[activeYear].regSznStats.finishPlace}</div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.finishPlace <
            ownerTwo?.yearly[activeYear].regSznStats.finishPlace && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {ownerTwo?.yearly[activeYear].regSznStats.finishPlace -
                  ownerOne?.yearly[activeYear].regSznStats.finishPlace}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      <div className="cell record owner-one-record">
        {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
          <>
            {ownerOne.yearly[activeYear].regSznStats.wins} -{" "}
            {ownerOne.yearly[activeYear].regSznStats.losses} -{" "}
            {ownerOne.yearly[activeYear].regSznStats.ties}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].regSznStats.winningPct.toFixed(1)}%
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.winningPct >
            ownerTwo?.yearly[activeYear].regSznStats.winningPct && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].regSznStats.winningPct -
                  ownerTwo?.yearly[activeYear].regSznStats.winningPct
                ).toFixed(1)}
                %
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
      {/* NEED TO COMPARE WINPCT TO YOURSELF */}
      <div className="cell ss-record">
        <span className="stat-value">
          {ownerOne &&
          ownerTwo &&
          ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear] &&
          ownerTwo.yearly[activeYear].participated === true ? (
            <>
              {
                ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear]
                  .scheduleSwapWins
              }
              {" - "}
              {
                ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear]
                  .scheduleSwapLosses
              }
              {" - "}
              {
                ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear]
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
          ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear] &&
          ownerTwo.yearly[activeYear].participated === true ? (
            <>
              {ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                activeYear
              ].scheduleSwapWinPct.toFixed(1)}
              %
            </>
          ) : (
            "-"
          )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerOne &&
            ownerTwo &&
            ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear] && (
              <>
                {ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear]
                  .scheduleSwapWinPct >
                  ownerOne.yearly[activeYear].regSznStats.winningPct &&
                ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear]
                  .scheduleSwapWinPct -
                  ownerOne.yearly[activeYear].regSznStats.winningPct >
                  0.1 ? (
                  <>
                    <span className="plus-minus green">
                      *
                      {(
                        ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct -
                        ownerOne.yearly[activeYear].regSznStats.winningPct
                      ).toFixed(1)}
                      %
                    </span>
                    <span className="arrow-icon green">
                      <FaCaretUp />
                    </span>
                  </>
                ) : ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear]
                    .scheduleSwapWinPct <
                    ownerOne.yearly[activeYear].regSznStats.winningPct &&
                  Math.abs(
                    ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[activeYear]
                      .scheduleSwapWinPct -
                      ownerOne.yearly[activeYear].regSznStats.winningPct,
                  ) > 0.1 ? (
                  <>
                    <span className="plus-minus red">
                      *
                      {(
                        ownerOne.yearly[activeYear].regSznStats.winningPct -
                        ownerOne.scheduleSwap[ownerTwo.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct
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
      <div className="cell etew-record stat-value">
        {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
          <>
            {ownerOne.yearly[activeYear].everyTeamEveryWeekStats.ETEWWins} -{" "}
            {ownerOne.yearly[activeYear].everyTeamEveryWeekStats.ETEWLosses} -{" "}
            {ownerOne.yearly[activeYear].everyTeamEveryWeekStats.ETEWTies}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell etew-winPct">
        <span className="stat-value">
          {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true ? (
            <>
              {ownerOne.yearly[activeYear].everyTeamEveryWeekStats.ETEWWinPct}%
            </>
          ) : (
            "-"
          )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerOne &&
            ownerTwo &&
            ownerOne.yearly[activeYear].participated === true &&
            ownerTwo.yearly[activeYear].participated === true && (
              <>
                {ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                  .ETEWWinPct >
                  ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct &&
                ownerOne.yearly[activeYear].everyTeamEveryWeekStats.ETEWWinPct -
                  ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct >
                  0.1 ? (
                  <>
                    <span className="plus-minus green">
                      {(
                        ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct -
                        ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct
                      ).toFixed(1)}
                      %
                    </span>
                    <span className="arrow-icon green">
                      <FaCaretUp />
                    </span>
                  </>
                ) : ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct <
                    ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                      .ETEWWinPct &&
                  ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct -
                    ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                      .ETEWWinPct >
                    0 ? (
                  <>
                    <span className="plus-minus red">
                      {(
                        ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct -
                        ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct
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
      <div className="cell avgPf">
        <span className="stat-value">
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].regSznStats.avgPF.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.avgPF >
            ownerTwo?.yearly[activeYear].regSznStats.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].regSznStats.avgPF -
                  ownerTwo?.yearly[activeYear].regSznStats.avgPF
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].regSznStats.avgPA.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.avgPA >
            ownerTwo?.yearly[activeYear].regSznStats.avgPA && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].regSznStats.avgPA -
                  ownerTwo?.yearly[activeYear].regSznStats.avgPA
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].regSznStats.bestWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.bestWeek >
            ownerTwo?.yearly[activeYear].regSznStats.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].regSznStats.bestWeek -
                  ownerTwo?.yearly[activeYear].regSznStats.bestWeek
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].regSznStats.worstWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.worstWeek >
            ownerTwo?.yearly[activeYear].regSznStats.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].regSznStats.worstWeek -
                  ownerTwo?.yearly[activeYear].regSznStats.worstWeek
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].regSznStats.pointsFor.toFixed(1)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.pointsFor >
            ownerTwo?.yearly[activeYear].regSznStats.pointsFor && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].regSznStats.pointsFor -
                  ownerTwo?.yearly[activeYear].regSznStats.pointsFor
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
          {ownerOne && ownerOne.yearly[activeYear].participated === true ? (
            <div>
              {ownerOne?.yearly[activeYear].regSznStats.pointsAgainst.toFixed(
                1,
              )}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerOne &&
          ownerTwo &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne?.yearly[activeYear].regSznStats.pointsAgainst >
            ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="plus-minus green">
                {(
                  ownerOne?.yearly[activeYear].regSznStats.pointsAgainst -
                  ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst
                ).toFixed(1)}
              </span>
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
            </div>
          )}
      </div>
    </div>
  );
}
