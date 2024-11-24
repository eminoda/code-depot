import React, { useState } from "react";
function App() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h2>react-webpack-remote</h2>
      <button onClick={() => add()}>count </button>
      <span>{count}</span>
    </>
  );
}

export default App;
