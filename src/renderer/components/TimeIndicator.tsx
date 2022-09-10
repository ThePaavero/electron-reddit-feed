import { useEffect, useState } from 'react'

export type TimeIndicatorProps = {
  nextPollTimestamp: number
}

const millisecondsToSecondsRounded = (ms: number): number => {
  return Math.round(ms / 1000)
}

const TimeIndicator = ({
  nextPollTimestamp,
}: TimeIndicatorProps): JSX.Element => {
  const [secondsToNext, setSecondsToNext] = useState<number>(
    millisecondsToSecondsRounded(nextPollTimestamp)
  )

  const tick = () => {
    console.log('nextPollTimestamp:', nextPollTimestamp)
    console.log('Date.now():', Date.now())
    console.log('-------')

    const millisecondsToNext = Math.round(nextPollTimestamp - Date.now())
    setTimeout(tick, 1000)
    setSecondsToNext(millisecondsToSecondsRounded(millisecondsToNext))
  }

  useEffect(tick, [])

  return (
    <div className="TimeIndicator">
      Refreshing in {secondsToNext} seconds...
    </div>
  )
}

export default TimeIndicator
