import React, { useState } from 'react'
const Title = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button  = ({onclick, text}) => {
  return (
    <button onClick={onclick}>
        {text}
    </button>
  )
}

const AnecDisplay = ({anecdotes, selected}) => {
  return (
    <p>{anecdotes[selected]}</p>
  )
}

const VoteDisplay = ({votes}) => {
  if(votes <= 1) {
    return (
      <p>has {votes} vote</p>
    )
  }
  return (
    <p>has {votes} votes</p>
  )
}

const MostVoted = ({anecdotes, votes, mostVoted, mostSelected}) => {
  for(var i=0; i<anecdotes.length; ++i)
  {
    if(votes[i]>mostVoted)
    {
      mostVoted = votes[i]
      mostSelected = i
    }
  }
  return (
    <div>
    <AnecDisplay anecdotes={anecdotes} selected={mostSelected} />
    <VoteDisplay votes={mostVoted} />
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const anecLength = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecLength).fill(0))
  let mostVoted = 0, mostSelected = 0;

  const randAnecdotes = () => {
    setSelected(Math.floor(Math.random()*anecLength))
  }

  const vote = () => {
    let newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <AnecDisplay anecdotes={anecdotes} selected={selected} />
      <VoteDisplay votes={votes[selected]} />
      <Button onclick={vote} text="vote" />
      <Button onclick={randAnecdotes} text="next anecdotes" />
      <Title text='Anecdote has the most votes' />
      <MostVoted anecdotes={anecdotes} votes={votes} mostVoted={mostVoted} mostSelected={mostSelected} />
    </div>
  )
}

export default App