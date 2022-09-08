import { createRef, useEffect } from 'react'
import { SubResultProps } from 'renderer/types/PollTypes'

export type ConfigurationProps = {
  data: SubResultProps[]
  show: boolean
  togglerFunction: () => void
}

const Configuration = ({
  data,
  show,
  togglerFunction,
}: ConfigurationProps): JSX.Element => {
  const getTogglerButton = () => {
    return (
      <button className={show ? 'small' : 'medium'} onClick={togglerFunction}>
        {show ? 'Hide configuration' : 'Configure'}
      </button>
    )
  }

  const contentElementRef: React.RefObject<HTMLDivElement> = createRef()

  useEffect(() => {
    const el = contentElementRef.current
    if (!el) {
      return
    }

    setTimeout(() => {
      el.classList.add('active')
    }, 0)
  }, [show])

  return (
    <div className={`Configuration ${show ? 'active' : ''}`}>
      {getTogglerButton()}
      {show && (
        <div className="fade" ref={contentElementRef}>
          <h1>Configuration</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Configuration
