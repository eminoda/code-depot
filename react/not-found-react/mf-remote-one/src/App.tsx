import "./App.css";

const App = (props: { name: string }) => {
  return (
    <div className="content2">
      <h1>mf remote one</h1>
      <p>{props.name}</p>
    </div>
  );
};

export default App;