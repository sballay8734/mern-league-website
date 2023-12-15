import React, { useState, useEffect } from "react"
import "./CountDownTimer.scss"
import { differenceInSeconds, intervalToDuration } from "date-fns"

interface CountdownTimerProps {
  targetDate: Date
  setLockPick: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function CountdownTimer({
  targetDate,
  setLockPick,
  setLoading
}: CountdownTimerProps): JSX.Element {
  const [remainingTime, setRemainingTime] = useState(
    intervalToDuration({ start: new Date(), end: targetDate })
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const timeLeftInSeconds = differenceInSeconds(targetDate, now)

      if (timeLeftInSeconds <= 0) {
        clearInterval(interval)
        setLockPick(true)
        setLoading(false)
        setRemainingTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
      } else {
        setLockPick(false)
        setLoading(false)
        const days = Math.floor(timeLeftInSeconds / 86400) // 86400 seconds in a day
        const hours = Math.floor((timeLeftInSeconds % 86400) / 3600) // 3600 seconds in an hour
        const minutes = Math.floor((timeLeftInSeconds % 3600) / 60) // 60 seconds in a minute
        const seconds = timeLeftInSeconds % 60

        setRemainingTime({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [targetDate, setLockPick, setLoading])

  return (
    <div className="countdown-timer-wrapper">
      <div className="days">
        <div className="number days-number">
          {remainingTime.days}
          <span className="word">d</span>
        </div>
      </div>
      <div className="colon">:</div>
      <div className="hours">
        <div className="number hours-number">
          {remainingTime.hours}
          <span className="word">h</span>
        </div>
      </div>
      <div className="colon">:</div>
      <div className="minutes">
        <div className="number minutes-number">
          {remainingTime.minutes}
          <span className="word">min</span>
        </div>
      </div>
      <div className="colon">:</div>
      <div className="seconds">
        <div className="number seconds-number">
          {remainingTime.seconds}
          <span className="word">s</span>
        </div>
      </div>
    </div>
  )
}

export default CountdownTimer
