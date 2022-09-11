import { useEffect, useState } from 'react'

export type TimeIndicatorProps = { nextPollTimestamp: number }

const TimeIndicator = ({
  nextPollTimestamp,
}: TimeIndicatorProps): JSX.Element => {
  const [secondsToNext, setSecondsToNext] = useState<number>(0)

  const tick = () => {
    setSecondsToNext(Math.floor((nextPollTimestamp - Date.now()) / 1000))
    setTimeout(tick, 1000)
  }

  useEffect(tick, [])

  return (
    <div className="TimeIndicator">
      Refreshing in {secondsToNext} seconds...
    </div>
  )
}

export default TimeIndicator
