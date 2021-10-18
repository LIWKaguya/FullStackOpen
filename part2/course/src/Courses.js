const Header = ({course}) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Content = ({course}) => {
    return (
      course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
    )
  }
  
  const Total = ({course}) => {
    const arrExercises = course.parts.map(part => part.exercises)
    const total = arrExercises.reduce((s, p) => s+p)
    return (
      <h2>Total of {total} exercises </h2>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  
  const Courses = ({courses}) => {
    return (
      <div>
        <h1>Web development curriculum</h1>
        {courses.map(course => <Course course={course} key={course.id} />)}
      </div>
    )
  }

  export default Courses