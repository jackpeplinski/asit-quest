import { useEffect, useState } from "react";

function App() {
  /*
  useState() is a React hook. A hook is a React method that let's us 'hook'
  into React state and lifecycle features in functional components. 

  Functional components are components like the one we are in right now, App(), 
  compared to Class components which are an older React feature.

  Specifically, useState() allows us to set the state of a variable. In the 
  example below, the state is store in `data` and is set using setData(). The 
  syntax used below to define `data` and setData() is called destructuring.
  */
  const [data, setData] = useState(false);

  /*
  useEffect() is another React hook.

  useEffect() is a bit more complicated than useState() so I will refer you to this
  video [https://www.youtube.com/watch?v=0ZJgIjIuY7U&t=254s]. 
  */

  /*
  This code block immediately below says the equivalent of:
  
  "When setData changes run useEffect(). Within useEffect(), fetchData() is defined and called. 
  When fetchData() is called, the async/await syntax says 'this request may not 
  be immediately answered'. Once we recieve the response, we should update `data` so we set `data`'s
  state to the `data` we recieved from the API call. This `data` we are setting is not the same as the
  `data` variable we defined earlier.""
  */
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("https://jsonplaceholder.typicode.com/todos");
      resp.json().then((data) => {
        setData(data);
      });
    };
    fetchData();
  }, [setData]);

  /* 
  We now return the HTML that is actually rendered on the page. React only allows one element to 
  return so we need to surround all of other elements with a fragement which is the `<></>` tag set.

  In JavaScript variables are truthy so I used the ternary syntax [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator] 
  to display either "Loading..." if the data is still being fetched or display the data if it is ready.
  
  Inside of the return statement, `{}` are used to enclose JavaScript. They tell React that
  the code with the `{}` contains JavaScript. 
  */
  return (
    <>
      {!data
        ? "Loading..."
        : data.map((element, index) => (
            <div key={index}>
              <strong>ID:</strong>
              {element.id}
              <br></br>
              <strong>Title:</strong>
              {element.title}
            </div>
          ))}
    </>
  );
}

export default App;
