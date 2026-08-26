const Header = ({courseName}) => {
  console.log("Header rendered")
  return(
    <div>
      <h1>{courseName}</h1>

    </div>
  )

}

const Part = (section) => {
  return (
    <div>
      <p>{section.part} {section.exercise}</p>
    </div>
  );
};

const Content = ({part}) => {
  console.log("Content rendered");
  const elements = part.map(part => 
    <Part key={part.name} part={part.name} exercise={part.exercises} />
  );

  return <div>{elements}</div>;
};


const Total = ({total}) => {
  console.log("Total rendered")
  const sum = total.reduce((acc, cur_val) => acc + cur_val.exercises,0)
  console.log(sum)
  return (
    <div>

      <p><b>Total number of exercises {sum}</b></p>
    </div>
  

  )

}

const Course = ({course}) =>{
  return(
    // <div>
    //   <Header course={course.name}/>
    //   <Content part = {course.parts} />
    //   <Total total={course.parts}/>
      
    // </div>
    <div>
      {course.map(course => 
        <div>
          <Header courseName={course.name}/>
          <Content part = {course.parts} />
          <Total total={course.parts}/>
      </div>
      )}

    </div>
  )
  
}

export default Course