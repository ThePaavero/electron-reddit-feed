import { useEffect, useState } from 'react'

export type TimeIndicatorProps = { nextPollTimestamp: number }

const TimeIndicator = ({
  nextPollTimestamp,
}: TimeIndicatorProps): JSX.Element => {
  const [secondsToNext, setSecondsToNext] = useState<number>(0)
  const [tickInterval, setTickInterval] = useState<number>(1000)

  const tick = () => {
    const secondsToNextCalculated = Math.floor(
      (nextPollTimestamp - Date.now()) / 1000
    )
    setSecondsToNext(secondsToNextCalculated)
    setTickInterval(secondsToNextCalculated < 60 ? 1000 : 5999)
    setTimeout(tick, tickInterval)
  }

  useEffect(tick, [nextPollTimestamp])

  return (
    <div className="TimeIndicator">
      Refreshing in{' '}
      {secondsToNext < 60
        ? `${secondsToNext} seconds...`
        : `${Math.round(secondsToNext / 60)} minute${
            secondsToNext > 1 ? 's' : ''
          }...`}
    </div>
  )
}

export default TimeIndicator
