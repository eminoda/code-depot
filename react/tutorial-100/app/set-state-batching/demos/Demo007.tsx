"use client";

import { useState, useRef, useLayoutEffect } from "react";

/** 示例 7：批处理对性能的意义 —— 10 次 setState 只触发 1 次渲染 */
export function Demos007() {
  console.log("触发渲染");
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);
  const lastRenderRef = useRef<number>(0);

  renderCountRef.current += 1;
  useLayoutEffect(() => {
    lastRenderRef.current = renderCountRef.current;
  });

  const handleClick = () => {
    for (let i = 0; i < 10; i++) {
      setCount((c) => c + 1);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">示例 7：批处理对性能的意义</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        连续 10 次 setCount(c =&gt; c + 1) 在 React 18 中会合并成一次更新，只触发 1 次渲染。若不批处理可能渲染 10 次。
      </p>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-2">
        <p className="text-sm">
          count: <strong>{count}</strong>（点击一次 +10）
        </p>
        <p className="text-xs text-zinc-500">
          本组件当次挂载后渲染次数：{lastRenderRef.current || renderCountRef.current}
        </p>
        <button
          type="button"
          className="rounded border border-zinc-400 px-2 py-1 text-xs dark:border-zinc-500"
          onClick={handleClick}
        >
          测试一下
        </button>
      </div>
    </div>
  );
}
