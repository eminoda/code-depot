import { useState, useEffect } from "react";
import reactLogo from "./assets/images/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("准备监听");

    const clickListen = () => {
      document.addEventListener("click", (event) => {
        function getElementSelector(element: Element) {
          // 构造选择器字符串
          let selector = "";

          // 如果有 id，优先使用 id
          if (element.id) {
            selector += "#" + element.id;
          } else {
            // 否则使用 class 名称
            const classes = element.className.split(" ").filter(Boolean);
            if (classes.length > 0) {
              selector += "." + classes.join(".");
            }
          }

          // 如果以上都没有，则使用 tagName
          if (!selector) {
            selector = element.tagName.toLowerCase();
          }

          // 添加额外属性来进一步限定选择器
          console.log(element.attributes);
          const attributes = Object.keys(element.attributes).reduce((acc, key) => {
            const attr = element.attributes[Number(key)];
            acc[attr.name] = attr.value;
            return acc;
          }, {} as Record<string, string>);

          // 将属性添加到选择器中
          for (const [key, value] of Object.entries(attributes)) {
            selector += `[${key}="${value}"]`;
          }

          return selector;
        }
        chrome.runtime.sendMessage({ type: "click", target: getElementSelector(event.target as Element) });
      });
    };
    const beforeuploadListen = () => {
      window.addEventListener("beforeunload", (event: BeforeUnloadEvent) => {
        chrome.runtime.sendMessage({ type: "beforeunload", origin: (event.currentTarget as Window)?.location.href });
      });
    };

    clickListen();
    beforeuploadListen();
    return () => {
      document.removeEventListener("click", clickListen);
      window.removeEventListener("beforeunload", beforeuploadListen);
    };
  }, []);

  const handleAdd = () => {
    chrome.runtime.sendMessage({ type: "test" });
    setCount((count) => count + 1);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={chrome.runtime.getURL(viteLogo)} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={chrome.runtime.getURL(reactLogo)} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleAdd}>count is {count}</button>
      </div>
    </>
  );
}

export default App;
