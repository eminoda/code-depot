"use client";

import { useState } from "react";

/** 示例 4：React 18 — setTimeout 里也批处理，两次 setState → 一次渲染（只打印一次「触发渲染」） */
export function Demos004() {
  console.log("触发渲染");
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 0);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">示例 4：React 18 — setTimeout 里也批处理</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        两次 setState → 一次渲染，控制台只打印一次「触发渲染」。
      </p>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4">
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
