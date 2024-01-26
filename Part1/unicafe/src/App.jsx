import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    if (good || neutral || bad) {
        return (
            <div>
              <h2> Statistics </h2>
                <table>
                    <tbody>
                        <StatisticLine text = "good" value = { good } />
                        <StatisticLine text = "neutral" value = { neutral } />
                        <StatisticLine text = "bad" value = { bad } />
                        <StatisticLine text = "all" value = { all } />
                        <StatisticLine text = "average" value = { (good - bad) / all } />
                        <StatisticLine text = "positive" value = { good / all * 100 } etext = "%"/>
                    </tbody>
                </table>
            </div>
    )
    } 
    else {
        return (
            <div>
            <h2> Statistics </h2>
            No feedback given
            </div>
        )
    }
    
}

const StatisticLine = ({ text, value, etext }) => {
    return(
        <tr> 
            <td> {text} </td> 
            <td> {value} </td>
            <td> {etext} </td>
        </tr>
    )
    }

const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => { setGood(good + 1) }
  const increaseNeutral = () => { setNeutral(neutral + 1) }
  const increaseBad = () => { setBad(bad + 1) }

  return (
    <div>
    <h1> give feedback </h1>
    <div>
        <Button onClick = {increaseGood} text = "good"/>
        <Button onClick = {increaseNeutral} text = "neutral"/>
        <Button onClick = {increaseBad} text = "bad"/>
    </div>
    <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App