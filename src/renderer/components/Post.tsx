import { createRef } from 'react'
import { PostSchema } from 'renderer/types/PollTypes'
import { ArrowUp } from 'react-feather' // https://github.com/feathericons/react-feather
import { marked } from 'marked'

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

  return (
    <div className="Post" onClick={onPostCardClick} ref={cardRef}>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <header title={data.title}>
        <div className="in-row">
          <h3 className="post-main-title">
            {decodeURIComponent(data.title)}
            {!!data.link_flair_text && !data.link_flair_text.includes(':') && (
              <span className="flair">{data.link_flair_text}</span>
            )}
          </h3>
          <div className="meta">
            <div className="ups">
              <ArrowUp size={15} color="#67d696" />
              &nbsp;{Math.max(data.ups, data.score)}
            </div>
            <h4 className="post-author-link-wrapper">
              Posted by{' '}
              <a href={authorUrl} target="_blank" title={authorUrl}>
                /u/{data.author}
              </a>
            </h4>
          </div>
        </div>
        {data.thumbnail && data.thumbnail.includes('http') && (
          <img
            className="post-thumbnail"
            src={data.url.includes('//i.redd.it/') ? data.url : data.thumbnail}
            alt={`Thumbnail for post "${data.title.substring(0, 15)}..."`}
          />
        )}
      </header>
      {data.is_self && !!data.selftext.trim() && (
        <p
          className="selfText"
          dangerouslySetInnerHTML={{
            __html: marked.parse(
              data.selftext.replace('a href', 'a target="_blank" href')
            ),
          }}
        />
      )}
      {data.url && !data.url.includes('reddit.com') && (
        <a href={data.url} className="url-link" target="_blank">
          {data.url.substring(0, 20)}
        </a>
      )}
    </div>
  )
}

export default Post
