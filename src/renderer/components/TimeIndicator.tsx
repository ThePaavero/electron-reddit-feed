import { useEffect, useState } from 'react'

export type TimeIndicatorProps = {
  nextPollTimestamp: number
}

const millisecondsToFlooredSeconds = (ms: number): number => {
  return Math.floor(ms / 1000)
}

const TimeIndicator = ({
  nextPollTimestamp,
}: TimeIndicatorProps): JSX.Element => {
  if (nextPollTimestamp === -1) {
    return <></>
  }

  const [secondsToNext, setSecondsToNext] = useState<number>(
    nextPollTimestamp / 1000
  )

  const tick = () => {
    const millisecondsToNext = nextPollTimestamp - Date.now()
    setSecondsToNext(millisecondsToFlooredSeconds(millisecondsToNext))
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
