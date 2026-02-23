"use client";

import { useState, useCallback, memo } from "react";

// 带 memo：只有 props 引用变化时才重渲染；onClick 仅作稳定引用传给 memo 比较用
const ChildWithMemo = memo(function ChildWithMemo({ onClick }: { onClick: () => void }) {
  console.log("Child(memo) 渲染");
  return null;
});

// 不带 memo：父组件每次重渲染都会跟着渲染，即使用 useCallback 也没用
function ChildNoMemo({ onClick }: { onClick: () => void }) {
  console.log("Child(没用 memo) 渲染");
  return null;
}

export function Demos004() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">useCallback + memo</h2>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-4">
        <p className="flex items-center gap-2">
          <span className="text-sm">count: {count}</span>
          <button
            type="button"
            className="rounded border border-zinc-400 px-2 py-1 text-xs dark:border-zinc-500"
            onClick={handleClick}
          >
            体验
          </button>
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-500">带 memo 的子组件</span>
            <ChildWithMemo onClick={handleClick} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-zinc-500">不带 memo 的子组件</span>
            <ChildNoMemo onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
