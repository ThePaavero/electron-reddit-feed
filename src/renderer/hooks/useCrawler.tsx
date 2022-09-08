import moment from 'moment'
import { useState } from 'react'
import {
  PostSchema,
  RedditPostNativeAPIFormat,
  SubResultProps,
  SubState,
} from 'renderer/types/PollTypes'

const initialState: SubState = {
  previousTimestamp: Number(moment().format('X')),
  previousLatestPostID: '',
  items: [],
}

const useCrawler = (
  config: SubResultProps,
  callbackOnUpdate: (data: any) => void,
  callbackOnNew: () => void
) => {
  console.log('Crawler initialized with config:', config)

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
      `https://www.reddit.com/r/${config.name}/.json?limit=3`
    )

    const responseBody = await response.json()

    const items = responseBody.data.children.map(
      (child: RedditPostNativeAPIFormat) => {
        return formatChild(child)
      }
    )

    const latestPostID = items[0].id

    if (latestPostID !== subState.previousLatestPostID) {
      callbackOnNew()
    }

    const updatedState = {
      previousTimestamp: Number(moment().format('X')),
      previousLatestPostID: items[0].id,
      items,
    }

    setSubState(updatedState)
    callbackOnUpdate(updatedState)

    setTimeout(tick, config.pollIntervalInMinutes * 60000)
  }

  return { tick }
}

export default useCrawler
