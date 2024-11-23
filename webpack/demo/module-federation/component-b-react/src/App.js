import React, { useState } from "react";
function App() {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "cyan",
        }}
      >
        <h1>component-b-react</h1>
      </div>
      <div onClick={() => add()}>count: {count}</div>
    </>
  );
}

export default App;
