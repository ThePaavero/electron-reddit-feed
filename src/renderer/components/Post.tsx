import { createRef } from 'react'
import { PostSchema } from 'renderer/types/PollTypes'
import { ArrowUp } from 'react-feather' // https://github.com/feathericons/react-feather

const redditBaseUrl = 'https://www.reddit.com'

const Post = (data: PostSchema): JSX.Element => {
  const fullUrl = `${redditBaseUrl}${data.permalink}`
  const authorUrl = `${redditBaseUrl}/u/${data.author}`

  const cardRef: React.LegacyRef<HTMLDivElement> = createRef()

  const onPostCardClick = (e: React.MouseEvent<HTMLElement>) => {
    const targetElement = e.target as HTMLElement
    if (targetElement.tagName.toLowerCase() === 'a') {
      return
    }
    window.open(fullUrl)
  }

  const thumbnailTitle = `Thumbnail for post "${data.title.substring(
    0,
    15
  )}..."`

  return (
    <div className="Post" onClick={onPostCardClick} ref={cardRef}>
      <header>
        <div className="in-row">
          <h3 className="post-main-title">
            {decodeURIComponent(data.title)}
            {!!data.link_flair_text && !data.link_flair_text.includes(':') && (
              <span className="flair">{data.link_flair_text}</span>
            )}
          </h3>

          <div className="votes">
            <div className="ups">
              <ArrowUp size={15} color="#67d696" />
              &nbsp;{Math.max(data.ups, data.score)}
            </div>
          </div>
          <h4 className="post-author-link-wrapper">
            Posted by{' '}
            <a href={authorUrl} target="_blank">
              /u/{data.author}
            </a>
          </h4>
        </div>
        {data.thumbnail && data.thumbnail.includes('http') && (
          <img
            className="post-thumbnail"
            src={data.thumbnail}
            alt={thumbnailTitle}
            title={thumbnailTitle}
          />
        )}
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Post
