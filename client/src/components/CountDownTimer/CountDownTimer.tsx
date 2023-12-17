export default CountdownTimer
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"

interface CountdownTimerProps {
  endDate: string
  setLockPick: Dispatch<SetStateAction<boolean>>
}

function CountdownTimer({ endDate, setLockPick }: CountdownTimerProps) {
  const [timerDisplay, setTimerDisplay] = useState("")
  const timerIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const endDateTime = new Date(endDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const timeDifference = endDateTime - now

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        )
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        const display = `${days}d ${hours}h ${minutes}m ${seconds}s`
        setTimerDisplay(display)
        setLockPick(false)
      } else {
        clearInterval(timerIntervalRef.current as NodeJS.Timeout)
        setTimerDisplay("LOCKED")
        setLockPick(true)
      }
    }

    updateTimer() // Initial call to set up the timer

    timerIntervalRef.current = setInterval(updateTimer, 1000) // Update the timer every second

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerIntervalRef.current as NodeJS.Timeout)
  }, [endDate])

  return (
    <div className="countdown-timer">
      <span>Locks in: </span>
      {timerDisplay}
    </div>
  )
}

// Example usage:
// <CountdownTimer endDate="12/17/2023" />
