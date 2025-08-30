import "./App.css";
import CreateScene from "./components/CreateScene";
import CreateText from "./components/CreateText";
import WebGLRenderer from "./components/WebGLRenderer";
const App = () => {
  return (
    <div className="App">
      {/* <CreateScene /> */}
      {/* <CreateText /> */}
      <WebGLRenderer />
    </div>
  );
};

export default App;
