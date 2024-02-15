export default CountdownTimerNoLock;
import { useEffect, useRef, useState } from "react";
import { FaLock } from "react-icons/fa";

interface CountdownTimerProps {
  endDate: string;
}

function CountdownTimerNoLock({ endDate }: CountdownTimerProps) {
  const [timerDisplay, setTimerDisplay] = useState("");
  const timerIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const endDateTime = new Date(endDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const timeDifference = endDateTime - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const display = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        setTimerDisplay(display);
      } else {
        clearInterval(timerIntervalRef.current as NodeJS.Timeout);
        setTimerDisplay("LOCKED");
      }
    };

    updateTimer(); // Initial call to set up the timer

    timerIntervalRef.current = setInterval(updateTimer, 1000); // Update the timer every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerIntervalRef.current as NodeJS.Timeout);
  }, [endDate]);

  return (
    <div className="countdown-timer h-full w-full">
      <span className="h-full w-full text-xs">
        {timerDisplay === "LOCKED" ? (
          <span className="text-lg">
            <FaLock />
          </span>
        ) : (
          ""
        )}
      </span>
      {timerDisplay !== "LOCKED" && (
        <span className="absolute left-0 top-0 flex h-full w-full items-center justify-end pr-2 text-red-600">
          {timerDisplay}
        </span>
      )}
    </div>
  );
}

// Example usage:
// <CountdownTimer endDate="12/17/2023" />
