import "./App.css";

import AmisRenderer from "./components/AmisRenderer";
import type { Schema } from "amis";

const App = () => {
  const shema: Schema = {
    type: "page",
    initApi: "/amis/api/mock2/page/initData",
    body: "date is ${date}",
  };

  const shema2: Schema = {
    type: "page",
    data: {
      name: "zhangsan",
      age: 20,
    },
    body: [
      {
        type: "tpl",
        tpl: "my name is ${name}",
      },
      {
        type: "service",
        data: {
          name: "lisi",
        },
        body: {
          type: "tpl",
          tpl: "my name is ${name}, I'm ${age} years old",
        },
      },
    ],
  };

  const shema3: Schema = {
    type: "service",
    data: {
      date: "2024-01-01",
    },
    body: {
      type: "tpl",
      tpl: "date is ${date}",
    },
  };

  const shecma4: Schema = {
    type: "tpl",
    tpl: "访问 http://localhost:3000/?urlParams=123 is ${urlParams}",
  };
  return (
    <div>
      <h2>接口数据初始化</h2>
      <AmisRenderer schema={shema} />

      <h2>一般数据初始化</h2>
      <AmisRenderer schema={shema3} />

      <h2>数据链</h2>
      <AmisRenderer schema={shema2} />

      <h2>url数据</h2>
      <AmisRenderer schema={shecma4} />
    </div>
  );
};

export default App;
