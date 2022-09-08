import { useState } from 'react'
import Configuration from './components/Configuration'
import SubResult from './components/SubResult'
import db from '../../config.json'
import ConfigHelpMessage from './components/ConfigHelpMessage'
import './App.scss'
import { SubResultProps } from './types/PollTypes'

interface Schema {
  subs: SubResultProps[]
}

export default (): JSX.Element => {
  const config: Schema = db
  const [showConfiguration, setShowConfiguration] = useState(false)

  const toggleShowConfiguration = () => {
    setShowConfiguration(!showConfiguration)
  }

  const getSubResults = (): JSX.Element => {
    return config.subs && config.subs.length ? (
      <>
        {config.subs.map((sub) => (
          <SubResult
            itemsOnScreen={sub.itemsOnScreen}
            key={sub.title}
            title={sub.title}
            name={sub.name}
            pollIntervalInMinutes={sub.pollIntervalInMinutes}
            keywords={sub.keywords}
          />
        ))}
      </>
    ) : (
      <ConfigHelpMessage
        openConfiguration={(): void => {
          setShowConfiguration(true)
        }}
      />
    )
  }

  return (
    <div className="app-wrapper">
      <div className="header">
        <h1>
          Reddit Feed&nbsp;
          <small>
            (Subscribed to&nbsp;
            <span
              title={
                config.subs.length
                  ? config.subs.map((sub) => sub.title).join(', ')
                  : ':('
              }
            >
              {config.subs ? config.subs.length : 0}
            </span>
            &nbsp;subreddits)
          </small>
        </h1>
      </div>
      <div className="dynamic-content">
        <div className="results-wrapper">{getSubResults()}</div>
      </div>
      <div className="footer">
        <Configuration
          data={config.subs}
          show={showConfiguration}
          togglerFunction={toggleShowConfiguration}
        />
      </div>
    </div>
  )
}
