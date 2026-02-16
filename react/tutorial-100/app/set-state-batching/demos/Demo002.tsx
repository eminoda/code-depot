"use client";

import { useState } from "react";

export function Demos002() {
  const [count, setCount] = useState(0);
  const [useFunctional, setUseFunctional] = useState(false);

  // 典型翻车：setState 后立刻 console.log 拿到的是旧值
  const handleClickStale = () => {
    setCount(count + 1);
    console.log("【闭包】点击后立刻 log count =", count, "← 仍是当前渲染的旧值");
  };

  // 正确姿势：函数式更新，基于最新值计算
  const handleClickFunctional = () => {
    setCount((c) => {
      const next = c + 1;
      console.log("【函数式更新】updater 内 next =", next);
      return next;
    });
  };

  const handleClick = useFunctional ? handleClickFunctional : handleClickStale;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        002 console.log 旧值 + 函数式更新
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        setState 只是「安排一次更新」，不会立刻修改当前渲染里的 count；立刻 console.log 拿到的是旧值。需要基于最新状态计算时，用 setState(updater) 函数式更新。
      </p>

      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
        <p className="text-sm">
          当前 count = <strong className="text-violet-600 dark:text-violet-400">{count}</strong>
        </p>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={useFunctional}
            onChange={(e) => setUseFunctional(e.target.checked)}
            className="rounded border-zinc-400"
          />
          使用函数式更新 setCount(c {"=>"} c + 1)（否则用 setCount(count + 1)）
        </label>
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={handleClick}
        >
          点击 +1（看控制台）
        </button>
        <p className="text-xs text-zinc-500">
          用闭包方式时，控制台打印的是上一次渲染的 count；用函数式更新时，updater 里拿到的是即将应用的最新值。
        </p>
      </div>
    </div>
  );
}
