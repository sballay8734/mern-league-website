import { useSelector } from "react-redux";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { RootState } from "../../../../redux/store";

export default function YearlyOwnerTwoRegSzn() {
  const ownerOne = useSelector((state: RootState) => state.compare.ownerOne);
  const ownerTwo = useSelector((state: RootState) => state.compare.ownerTwo);
  const activeYear = useSelector(
    (state: RootState) => state.compare.activeYear,
  );

  return (
    <div className="owner-stats owner-two-stats">
      <div className="main-cell owner-name owner-two-name">
        {ownerTwo?.ownerName &&
          (() => {
            const [firstName, lastName] = ownerTwo.ownerName.split(" ");
            const lastInitial = lastName ? lastName.charAt(0) : "";
            return `${firstName} ${lastInitial}.`;
          })()}
      </div>
      <div className="cell finished">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>{ownerTwo?.yearly[activeYear].regSznStats.finishPlace}</div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.finishPlace <
            ownerOne?.yearly[activeYear].regSznStats.finishPlace && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {ownerOne?.yearly[activeYear].regSznStats.finishPlace -
                  ownerTwo?.yearly[activeYear].regSznStats.finishPlace}
              </span>
            </div>
          )}
      </div>
      <div className="cell record owner-one-record">
        {ownerTwo &&
        ownerOne &&
        ownerTwo.yearly[activeYear].participated === true ? (
          <>
            {ownerTwo.yearly[activeYear].regSznStats.wins} -{" "}
            {ownerTwo.yearly[activeYear].regSznStats.losses} -{" "}
            {ownerTwo.yearly[activeYear].regSznStats.ties}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell win-pct">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].regSznStats.winningPct.toFixed(1)}%
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.winningPct >
            ownerOne?.yearly[activeYear].regSznStats.winningPct && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].regSznStats.winningPct -
                  ownerOne?.yearly[activeYear].regSznStats.winningPct
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
          ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear] &&
          ownerOne.yearly[activeYear].participated === true ? (
            <>
              {
                ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear]
                  .scheduleSwapWins
              }
              {" - "}
              {
                ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear]
                  .scheduleSwapLosses
              }
              {" - "}
              {
                ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear]
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
          ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear] &&
          ownerOne.yearly[activeYear].participated === true ? (
            <>
              {ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                activeYear
              ].scheduleSwapWinPct.toFixed(1)}
              %
            </>
          ) : (
            "-"
          )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerTwo &&
            ownerOne &&
            ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear] && (
              <>
                {ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear]
                  .scheduleSwapWinPct >
                  ownerTwo.yearly[activeYear].regSznStats.winningPct &&
                ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear]
                  .scheduleSwapWinPct -
                  ownerTwo.yearly[activeYear].regSznStats.winningPct >
                  0.1 ? (
                  <>
                    <span className="arrow-icon green">
                      <FaCaretUp />
                    </span>
                    <span className="plus-minus green">
                      *
                      {(
                        ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct -
                        ownerTwo.yearly[activeYear].regSznStats.winningPct
                      ).toFixed(1)}
                      %
                    </span>
                  </>
                ) : ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear]
                    .scheduleSwapWinPct <
                    ownerTwo.yearly[activeYear].regSznStats.winningPct &&
                  Math.abs(
                    ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[activeYear]
                      .scheduleSwapWinPct -
                      ownerTwo.yearly[activeYear].regSznStats.winningPct,
                  ) > 0.1 ? (
                  <>
                    <span className="arrow-icon red">
                      <FaCaretDown />
                    </span>
                    <span className="plus-minus red">
                      *
                      {(
                        ownerTwo.yearly[activeYear].regSznStats.winningPct -
                        ownerTwo.scheduleSwap[ownerOne.ownerName].yearly[
                          activeYear
                        ].scheduleSwapWinPct
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
      <div className="cell etew-record stat-value">
        {ownerTwo &&
        ownerOne &&
        ownerTwo.yearly[activeYear].participated === true ? (
          <>
            {ownerTwo.yearly[activeYear].everyTeamEveryWeekStats.ETEWWins} -{" "}
            {ownerTwo.yearly[activeYear].everyTeamEveryWeekStats.ETEWLosses} -{" "}
            {ownerTwo.yearly[activeYear].everyTeamEveryWeekStats.ETEWTies}
          </>
        ) : (
          "DNP"
        )}
      </div>
      <div className="cell etew-winPct">
        <span className="stat-value">
          {ownerTwo &&
          ownerOne &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerOne.yearly[activeYear].participated === true ? (
            <>
              {ownerTwo.yearly[activeYear].everyTeamEveryWeekStats.ETEWWinPct}%
            </>
          ) : (
            "-"
          )}
        </span>
        <div className="plus-minus-and-icon">
          {ownerTwo &&
            ownerOne &&
            ownerTwo.yearly[activeYear].participated === true &&
            ownerOne.yearly[activeYear].participated === true && (
              <>
                {ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                  .ETEWWinPct >
                  ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct &&
                ownerTwo.yearly[activeYear].everyTeamEveryWeekStats.ETEWWinPct -
                  ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct >
                  0.1 ? (
                  <>
                    <span className="arrow-icon green">
                      <FaCaretUp />
                    </span>
                    <span className="plus-minus green">
                      {(
                        ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct -
                        ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct
                      ).toFixed(1)}
                      %
                    </span>
                  </>
                ) : ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct <
                    ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                      .ETEWWinPct &&
                  ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                    .ETEWWinPct -
                    ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                      .ETEWWinPct >
                    0 ? (
                  <>
                    <span className="arrow-icon red">
                      <FaCaretDown />
                    </span>
                    <span className="plus-minus red">
                      {(
                        ownerTwo.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct -
                        ownerOne.yearly[activeYear].everyTeamEveryWeekStats
                          .ETEWWinPct
                      ).toFixed(1)}
                      %
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </>
            )}
        </div>
      </div>
      <div className="cell avgPf">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].regSznStats.avgPF.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.avgPF >
            ownerOne?.yearly[activeYear].regSznStats.avgPF && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].regSznStats.avgPF -
                  ownerOne?.yearly[activeYear].regSznStats.avgPF
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell avgPa">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].regSznStats.avgPA.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.avgPA >
            ownerOne?.yearly[activeYear].regSznStats.avgPA && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].regSznStats.avgPA -
                  ownerOne?.yearly[activeYear].regSznStats.avgPA
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell best-week">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].regSznStats.bestWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.bestWeek >
            ownerOne?.yearly[activeYear].regSznStats.bestWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].regSznStats.bestWeek -
                  ownerOne?.yearly[activeYear].regSznStats.bestWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell worst-week">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].regSznStats.worstWeek.toFixed(2)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.worstWeek >
            ownerOne?.yearly[activeYear].regSznStats.worstWeek && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].regSznStats.worstWeek -
                  ownerOne?.yearly[activeYear].regSznStats.worstWeek
                ).toFixed(2)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-for">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].regSznStats.pointsFor.toFixed(1)}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.pointsFor >
            ownerOne?.yearly[activeYear].regSznStats.pointsFor && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].regSznStats.pointsFor -
                  ownerOne?.yearly[activeYear].regSznStats.pointsFor
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
      <div className="cell total-points-against">
        <span className="stat-value">
          {ownerTwo && ownerTwo.yearly[activeYear].participated === true ? (
            <div>
              {ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst.toFixed(
                1,
              )}
            </div>
          ) : (
            "DNP"
          )}
        </span>
        {ownerTwo &&
          ownerOne &&
          ownerOne.yearly[activeYear].participated === true &&
          ownerTwo.yearly[activeYear].participated === true &&
          ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst >
            ownerOne?.yearly[activeYear].regSznStats.pointsAgainst && (
            <div className="plus-minus-and-icon">
              <span className="arrow-icon green">
                <FaCaretUp />
              </span>
              <span className="plus-minus green">
                {(
                  ownerTwo?.yearly[activeYear].regSznStats.pointsAgainst -
                  ownerOne?.yearly[activeYear].regSznStats.pointsAgainst
                ).toFixed(1)}
              </span>
            </div>
          )}
      </div>
    </div>
  );
}
