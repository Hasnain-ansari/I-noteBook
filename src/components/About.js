import React from 'react'
//here we are directly importing the noteContext to 
// import noteContext from '../context/notes/noteContext'


export const About = () => {

  //this was just an example
  // const a = useContext(noteContext);
  // useEffect(() => {
  //   a.update();
  //   // eslint-disable-next-line
  // }, [])
  
  return (
    <div>
      {/* the below statement is the example of  using the useContext of react of how we are importing the value of the state provided in usecontext */}
      {/* //a.state.name because we using the state so we have to fetch the value from state */}
      this is about page
      {/* {a.state.name}
      <br />
      and he is in class
      {a.state.class} */}
    </div>
  )
}
