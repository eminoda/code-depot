import "./App.css";
import React from "react";

const App = () => {
  return (
    <div className="content">
      <h1>Sub App</h1>
    </div>
  );
};

const Hello = React.lazy(() => Promise.resolve({ default: App }));

export default Hello;
