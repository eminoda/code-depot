import "./App.css";
import md5 from "md5";
const App = () => {
  return (
    <div>
      <h3>Remote One</h3>
      <p>Rsbuild + React</p>
      <p>{md5("123456")}</p>
    </div>
  );
};

export default App;
