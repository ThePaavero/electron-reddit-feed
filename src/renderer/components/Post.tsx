import { PostSchema } from 'renderer/types/PollTypes'

const Post = (data: PostSchema): JSX.Element => {
  const fullUrl = `https://www.reddit.com/${data.permalink}`

  return (
    <div className="Post">
      <a href={fullUrl} className="subtle-link" target="_blank">
        <h3 dangerouslySetInnerHTML={{ __html: data.title }} />
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </a>
    </div>
  )
}

export default Post
