import { useEffect, useState } from 'react'
import useCrawler from 'renderer/hooks/useCrawler'
import { PostSchema, SubResultProps } from 'renderer/types/PollTypes'
import Post from './Post'

const SubResult = ({
  title,
  name,
  pollIntervalInMinutes,
  keywords,
}: SubResultProps): JSX.Element => {
  const [subState, setSubState] = useState<any>()

  const { tick } = useCrawler(
    {
      title,
      name,
      pollIntervalInMinutes,
      keywords,
    },
    (data: any): void => {
      setSubState(data)
    },
    (): void => {
      console.log('NEW POST')
    }
  )

  useEffect(() => {
    tick()
      .then((data: any) => {
        if (data) {
          setSubState(data)
        }
      })
      .catch((err) => console.warn(err))
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

  return (
    <div className="SubResult">
      <h1>{title}</h1>
      {getPostCards()}
    </div>
  )
}

export default SubResult
