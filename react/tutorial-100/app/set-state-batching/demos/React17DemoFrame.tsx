"use client";

import React from "react";

/**
 * React 17 通过 script 加载后的 UMD 会挂到 window 上为 React / ReactDOM。
 * 下方 iframe 内单独加载 React 17，用 window.React / window.ReactDOM 渲染，
 * 从而在 Next.js（React 18）页面里也能看到 React 17 的「setTimeout 里不批处理」效果。
 */

const REACT17_SCRIPT = "https://unpkg.com/react@17.0.2/umd/react.production.min.js";
const REACT_DOM17_SCRIPT = "https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js";

// 内联 demo 脚本：用 window.React / window.ReactDOM，避免 </script> 写成字符串
const INLINE_DEMO_SCRIPT = `
(function() {
  var React = window.React;
  var ReactDOM = window.ReactDOM;
  if (!React || !ReactDOM) return;
  var useState = React.useState;
  function Demo() {
    console.log('触发渲染');
    var _a = useState(0), count = _a[0], setCount = _a[1];
    var _b = useState(false), flag = _b[0], setFlag = _b[1];
    function handleClick() {
      setTimeout(function() {
        setCount(function(c) { return c + 1; });
        setFlag(function(f) { return !f; });
      }, 0);
    }
    return React.createElement('div', { className: 'space-y-4' },
      React.createElement('div', { className: 'rounded border border-zinc-200 p-4' },
        React.createElement('button', { type: 'button', className: 'rounded border border-zinc-400 px-2 py-1 text-xs', onClick: handleClick }, '测试一下')
      )
    );
  }
  ReactDOM.render(React.createElement(Demo), document.getElementById('root'));
})();
`;

function getIframeHtml(): string {
  return [
    "<!DOCTYPE html>",
    "<html><head><meta charset='utf-8'></head><body>",
    "<div id='root'></div>",
    "<script src='" + REACT17_SCRIPT + "'><" + "/script>",
    "<script src='" + REACT_DOM17_SCRIPT + "'><" + "/script>",
    "<script>" + INLINE_DEMO_SCRIPT + "<" + "/script>",
    "</body></html>",
  ].join("");
}

export function React17DemoFrame({
  className,
  title,
  description,
  iframeHeight = 220,
}: {
  className?: string;
  title?: string;
  description?: string;
  iframeHeight?: number;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={className}>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 mb-2">
          {description}
        </p>
      )}
      <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">
        下方为 iframe 内 React 17 环境，请打开控制台并选择该 iframe 的上下文查看「触发渲染」打印（点一次按钮会打印两次）。
      </p>
      {mounted && (
        <iframe
          title="React 17 setTimeout 不批处理 Demo"
          srcDoc={getIframeHtml()}
          className="w-full rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
          style={{ height: iframeHeight }}
          sandbox="allow-scripts"
        />
      )}
    </div>
  );
}
