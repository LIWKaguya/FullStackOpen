import React from 'react'
const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}
const Total = (props) => {
  const tempParts = props.course.parts;
  return (
    <p>Number of exercise {tempParts[0].exercises+tempParts[1].exercises+tempParts[2].exercises}</p>
  )
}
const Content = (props) => {
  const tempParts = props.course.parts;
  return (
    <div>
      <Part name={tempParts[0].name} exercises={tempParts[0].exercises} />
      <Part name={tempParts[1].name} exercises={tempParts[1].exercises} />
      <Part name={tempParts[2].name} exercises={tempParts[2].exercises} />
    </div>
  )
}
const Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )
}
const App = (props) => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App