import React, { useState } from 'react';
import './App.css';
import Freq from './components/Frequency'

const createOscillator = (ctx, side, f) => {
  const o = ctx.createOscillator()
  o.type = "sine"
  o.frequency.value = f
  // const g = context.createGain()
  // o.connect(g)
  const panNode = ctx.createStereoPanner()
  panNode.pan.value = side ? -1 : 1
  // g.connect(context.destination)
  // return { o, g }
  o.connect(panNode)
  panNode.connect(context.destination)
  return { o }
}

const context = new AudioContext()

function App() {

  const [ freqs, setFreqs ] = useState([])
  const [ frequency, setFrequency ] = useState(200)

  const addFreq = side => () => {
    // all code here from https://marcgg.com/blog/2016/11/01/javascript-audio/
    setFreqs([
      ...freqs,
      {
        frequency,
        start: () => {
          const { o, g } = createOscillator(context, side, frequency)
          o.start(0)
          return {
            stop: () => {
              // g.gain.exponentialRampToValueAtTime(
              //   0.00001, context.currentTime + 0.04
              // )
              o.stop()
            }
          }
        }
      }
    ])
  }

  const getRemove = s => () => {
    setFreqs(freqs.filter(sounder => s !== sounder))
  }

  return (
    <div className="App">
      {
        freqs.map(s => <Freq key={s.frequency} s={s} remove={getRemove(s)} />)
      }
      <input type="number" value={frequency} onChange={({target: { value }}) => setFrequency(value)} />
      {
        freqs.length < 2 ?
          <>
            <button onClick={ addFreq(true) }>Add Left Frequency</button>
            <button onClick={ addFreq(false) }>Add Right Frequency</button>
          </> :
          null
      }
    </div>
  );
}

export default App;
