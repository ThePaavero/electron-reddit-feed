export interface PostSchema {
  id: string
  subreddit: string
  author_fullname: string
  title: string
  ups: number
  downs: number
  score: number
  is_self: boolean
  created_utc: number
  author: string
  permalink: string
  is_video: boolean
  selftext: string
  link_flair_text: string
  thumbnail: string
  domain: string
  url: string

  pinned?: boolean
  stickied?: boolean

  [index: string]: any
}

export interface RedditPostNativeAPIFormat {
  data: PostSchema
}

export type SubResultProps = {
  itemsOnScreen: number
  title: string
  name: string
  pollIntervalInMinutes: number
  keywords: string[] | undefined
}

export type SubState = {
  previousTimestamp: number
  nextPollTimestamp: number
  items: PostSchema[]
}
