import { useEffect, useState } from 'react'

export type TimeIndicatorProps = { nextPollTimestamp: number }

const TimeIndicator = ({
  nextPollTimestamp,
}: TimeIndicatorProps): JSX.Element => {
  const [secondsToNext, setSecondsToNext] = useState<number>(0)
  const [tickInterval, setTickInterval] = useState<number>(1000)
  const [timeoutID, setTimeoutID] = useState<number>(0)

  const tick = () => {
    const secondsToNextCalculated = Math.floor(
      (nextPollTimestamp - Date.now()) / 1000
    )
    setSecondsToNext(secondsToNextCalculated)
    setTickInterval(secondsToNextCalculated < 60 ? 1000 : 5999)
    setTimeoutID(Number(setTimeout(tick, tickInterval)))
  }

  useEffect(tick, [nextPollTimestamp])

  if (secondsToNext === 0 && timeoutID > 0) {
    clearTimeout(timeoutID)
  }

  return (
    <div className="TimeIndicator">
      Refreshing in{' '}
      {secondsToNext < 60
        ? `${secondsToNext} seconds...`
        : `${Math.round(secondsToNext / 60)} minute${
            secondsToNext > 120 ? 's' : ''
          }...`}
    </div>
  )
}

export default TimeIndicator
