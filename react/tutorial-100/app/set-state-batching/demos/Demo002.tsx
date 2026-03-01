"use client";

import { useState } from "react";

/** 示例 2：点一次按钮 → 从 onClick 到 handleClick 执行完，整段算「同一事件」，setA/setB 合并一次渲染 */
export function Demos002() {
  console.log("触发渲染");
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const handleClick = () => {
    setA(1); // 与下面的 setB 同属这一次事件
    setB(2);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        点一次按钮 → 整段算「同一事件」
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        从 onClick 入口到 handleClick 执行完，setA(1) 和 setB(2) 同属这一次事件，会合并成一次渲染（控制台只打印一次「触发渲染」）。
      </p>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex items-center gap-4">
          <span className="text-sm">a: {a}</span>
          <span className="text-sm">b: {b}</span>
          <button
            type="button"
            className="rounded border border-zinc-400 px-2 py-1 text-xs dark:border-zinc-500"
            onClick={handleClick}
          >
            测试一下
          </button>
        </div>
      </div>
    </div>
  );
}
