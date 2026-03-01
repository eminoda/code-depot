"use client";

import { useState } from "react";

/** 示例 1：为什么 console.log 拿到的是旧值？ */
export function Demos001() {
  const [count, setCount] = useState(0);

  const handleClickOld = () => {
    setCount(count + 1);
    console.log("setState 后立刻 log count:", count);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        为啥有时候「拿不到最新值」？
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        setState 只是「安排」更新，不会立刻改当前渲染里的 count；要等 re-render 之后 count 才更新。打开控制台看打印。
      </p>
      <div className="flex flex-wrap items-center gap-4 rounded border border-zinc-200 dark:border-zinc-700 p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">count: {count}</span>
          <button
            type="button"
            className="rounded border border-zinc-400 px-2 py-1 text-xs dark:border-zinc-500"
            onClick={handleClickOld}
          >
            测试一下
          </button>
        </div>
      </div>
    </div>
  );
}
