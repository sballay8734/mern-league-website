export default CountdownTimer
import { useEffect, useState } from "react"

interface CountdownTimerProps {
  endDate: string
}

function CountdownTimer({ endDate }: CountdownTimerProps) {
  const [timerDisplay, setTimerDisplay] = useState("")

  const calculateCountdownTimer = (endDate: string) => {
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
      } else {
        clearInterval(timerInterval)
        setTimerDisplay("Countdown expired")
      }
    }

    updateTimer() // Initial call to set up the timer

    const timerInterval = setInterval(updateTimer, 1000) // Update the timer every second

    return () => {
      clearInterval(timerInterval) // Cleanup the interval when no longer needed
    }
  }

  // Run the timer calculation on component mount
  useEffect(() => {
    const cleanup = calculateCountdownTimer(endDate)

    // Cleanup the interval on component unmount
    return () => cleanup()
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
