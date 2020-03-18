
import React, { useState } from 'react'

export default ({ s, remove }) => {
  const [ stopper, setStopper ] = useState({ stop: () => {} })
  const [ started, setStarted ] = useState(false)

  const getStart = s => () => {
    setStarted(true)
    const newStopper = s.start()
    setStopper({
      stop: () => {
        newStopper.stop()
        setStarted(false)
      }
    })
  }

  const remover = () => {
    stopper.stop()
    remove()
  }

  return (
    <div className="Frequency">
      <div className="display">{ s.frequency }</div>
      <button onClick={ getStart(s) } disabled={started}>Start</button>
      <button onClick={ stopper.stop }>Stop</button>
      <button onClick={ remover }>Remove</button>
    </div>
  )
}
