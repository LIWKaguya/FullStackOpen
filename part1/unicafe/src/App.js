import { useState } from 'react';

const Title = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, counter}) => {
  if(text === "positive")
  {
    return (
      <tr><td>{text}</td><td>{counter} %</td></tr>
    )
  }
  return (
    <tr><td>{text}</td><td>{counter}</td></tr>
  )
}

const Statistics = ({total, good, neutral, bad, score}) => {
  if(total === 0)
  {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <StatisticLine text="good" counter={good} />
      <StatisticLine text="neutral" counter={neutral} />
      <StatisticLine text="bad" counter={bad} />
      <StatisticLine text="all" counter={total} />
      <StatisticLine text="average" counter={score/(total === 0 ? 1: total)} />
      <StatisticLine text="positive" counter={good/(total === 0 ? 1: total)*100} />
    </table>  
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [score, setScore] = useState(0);
  const title = 'give feedback', stat = 'statistics';
  let total=good+bad+neutral;

  const handleGood = () => {
    setGood(good+1)
    setScore(score+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
    setScore(score-1)
  }

  return (
    <div>
      <Title name={title} />
      <Button onClick={handleBad} text="bad"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleGood} text="good"/>
      <Title name={stat} />
      <Statistics total={total} good={good} neutral={neutral} bad={bad} score={score}/>
    </div>
  );
}

export default App;
