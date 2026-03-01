"use client";

import { useState } from "react";
import { flushSync } from "react-dom";

/** 示例 5：flushSync 打破批处理 —— 立刻拿到更新后 DOM */
export function Demos005() {
  const [count, setCount] = useState(0);

  const handleClickFlush = () => {
    flushSync(() => setCount(1));
    const text = document.getElementById("demo5-count")?.textContent;
    console.log("flushSync 后 DOM 中的 count:", text);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">示例 5：flushSync 打破批处理</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        需要「立刻」拿到更新后 DOM 时用 flushSync。执行完后 count 已是新值，DOM 已更新。打开控制台看打印。
      </p>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 flex items-center gap-4">
        <span id="demo5-count" className="text-lg font-mono font-medium">
          {count}
        </span>
        <button
          type="button"
          className="rounded border border-zinc-400 px-2 py-1 text-xs dark:border-zinc-500"
          onClick={handleClickFlush}
        >
          测试一下
        </button>
      </div>
    </div>
  );
}
