import { createRef } from 'react'
import { PostSchema } from 'renderer/types/PollTypes'

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
      <h3
        className="post-main-title"
        dangerouslySetInnerHTML={{ __html: data.title }}
      />
      <h4 className="post-author-link-wrapper">
        Posted by{' '}
        <a href={authorUrl} target="_blank">
          /u/{data.author}
        </a>
      </h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Post
