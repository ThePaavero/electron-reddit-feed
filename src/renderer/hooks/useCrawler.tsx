import { useState } from 'react'
import {
  PostSchema,
  RedditPostNativeAPIFormat,
  SubResultProps,
  SubState,
} from 'renderer/types/PollTypes'

const initialState: SubState = {
  previousTimestamp: Date.now(),
  nextPollTimestamp: 0,
  items: [],
}

const useCrawler = (
  config: SubResultProps,
  callbackOnUpdate: (data: SubState) => void
) => {
  console.log('Crawler initialized with config:', config)

  const pollIntervalInMilliseconds = Math.floor(
    config.pollIntervalInMinutes * 60000
  )
  const [subState, setSubState] = useState(initialState)

  const formatChild = (child: RedditPostNativeAPIFormat): PostSchema => {
    const keys = [
      'id',
      'subreddit',
      'author_fullname',
      'title',
      'ups',
      'downs',
      'score',
      'is_self',
      'created_utc',
      'pinned',
      'author',
      'permalink',
      'stickied',
      'is_video',
      'selftext',
      'link_flair_text',
      'thumbnail',
      'domain',
      'url',
    ]

    const formatted: any = {}
    keys.forEach((key: string) => {
      formatted[key] = child.data[key]
    })

    // TODO: Format/manipulate something?
    return formatted as PostSchema
  }

  const tick = async (): Promise<any> => {
    const response = await fetch(
      `https://www.reddit.com/r/${config.name}/new/.json?limit=${config.itemsOnScreen}`
    )

    const responseBody = await response.json()

    const items: PostSchema[] = responseBody.data.children.map(formatChild)

    const updatedState: SubState = {
      previousTimestamp: Date.now(),
      nextPollTimestamp: Date.now() + pollIntervalInMilliseconds,
      items,
    }

    setSubState(updatedState)
    callbackOnUpdate(updatedState)

    setTimeout(tick, pollIntervalInMilliseconds)
  }

  return { tick }
}

export default useCrawler
