const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => 
                <div key = {part.id}>
                    <Part part={part} />
                </div>
            )}
        </>
    )
}

const Total = ({ parts }) => {
    const exerciseArray = parts.map(e => e.exercises)
    const total = exerciseArray.reduce((ini, cV) => ini + cV)

    return (
        <h4>
            total of {total} exercises
        </h4>
    )
}

const Course = ({ courses }) => {
    return (
        <div>
            <h1>Wed development curriculum</h1>
            {courses.map(course =>
                <div key = {course.id}>
                    <Header course={course.name} />
                    <Content parts={course.parts} />
                    <Total parts={course.parts} />
                </div>
            )}
        </div>
    )
}

export default Course