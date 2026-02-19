"use client";

import { useState, useRef, useLayoutEffect } from "react";

export function Demos004() {
  const [count, setCount] = useState(0);
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  useLayoutEffect(() => {});

  // 批处理：10 次 setState 只触发 1 次渲染
  const handleClick = () => {
    for (let i = 0; i < 10; i++) {
      setCount((c) => c + 1);
    }
    // React 18：全部合并，最后只渲染一次，count 会变成 +10
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        004 批处理对性能的意义
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        同一事件内连续多次 setState（如循环 10 次 setCount(c {"=>"} c + 1)），批处理后只触发 1 次渲染；若不批处理可能渲染 10 次，大大增加开销。
      </p>

      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
        <p className="text-sm">
          count = <strong className="text-violet-600 dark:text-violet-400">{count}</strong>
        </p>
        <p className="text-xs text-zinc-500">
          本组件自挂载以来渲染次数：<strong>{renderCountRef.current}</strong>
          （点一次「+10」应只增加 1 次渲染，说明 10 次 setState 被合并）
        </p>
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={handleClick}
        >
          一次点击内 setCount(c {"=>"} c + 1) 共 10 次
        </button>
      </div>
    </div>
  );
}
