import "./App.css";
import React from "react";
// import SubApp from 'SubApp'
// const Hello = React.lazy(() => {
//   console.log(SubApp);
//   return Promise.resolve({ default: SubApp });
// });

console.log(SubApp)
const App = () => {
  return (
    <div className="content">
      <h1>Main App</h1>
      <SubApp></SubApp>
    </div>
  );
};

export default App;
