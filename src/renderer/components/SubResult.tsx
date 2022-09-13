import { PostSchema, SubResultProps, SubState } from 'renderer/types/PollTypes'
import { useEffect, useState } from 'react'
import useCrawler from 'renderer/hooks/useCrawler'
import Post from './Post'
import TimeIndicator from './TimeIndicator'

const SubResult = ({
  title,
  name,
  pollIntervalInMinutes,
  keywords,
  itemsOnScreen,
}: SubResultProps): JSX.Element => {
  const [subState, setSubState] = useState<SubState>()

  const { tick } = useCrawler(
    {
      title,
      name,
      pollIntervalInMinutes,
      keywords,
      itemsOnScreen,
    },
    (data: SubState): void => {
      setSubState(data)
    },
    (): void => {
      console.log('NEW POST')
    }
  )

  useEffect(() => {
    tick()
  }, [])

  const getPostCards = () => {
    if (!subState) {
      return <small>Loading...</small>
    }

    return subState.items?.length ? (
      <ul>
        {subState.items.map((item: PostSchema) => {
          return (
            !item.stickied &&
            !item.pinned && (
              <li key={item.id}>
                <Post
                  id={item.id}
                  subreddit={item.subreddit}
                  author_fullname={item.author_fullname}
                  title={item.title}
                  ups={item.ups}
                  downs={item.downs}
                  score={item.score}
                  is_self={item.is_self}
                  created_utc={item.created_utc}
                  author={item.author}
                  permalink={item.permalink}
                  is_video={item.is_video}
                  selftext={item.selftext}
                  link_flair_text={item.link_flair_text}
                  thumbnail={item.thumbnail}
                  domain={item.domain}
                  url={item.url}
                />
              </li>
            )
          )
        })}
      </ul>
    ) : (
      <div className="no-data">No posts</div>
    )
  }

  const subUrl = `https://www.reddit.com/r/${name}`

  return (
    <div className="SubResult">
      <h1>
        <a
          href={subUrl}
          target="_blank"
          title={`Visit subreddit "${name}"\n(${subUrl})`}
        >
          <small>/r/</small>
          {title}
        </a>
      </h1>
      {subState?.nextPollTimestamp && (
        <TimeIndicator nextPollTimestamp={subState.nextPollTimestamp} />
      )}
      {getPostCards()}
    </div>
  )
}

export default SubResult
