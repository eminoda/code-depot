"use client";

import { useState, useRef, useLayoutEffect } from "react";

export function Demos001() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  console.log("[Demo001] 渲染", { a, b, 渲染次数: renderCountRef.current });

  const handleClick = () => {
    setA(1);
    setB(2);
    // 同一事件、同一批次：React 合并 a、b 的更新，只渲染一次
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        001 同一事件内连续 setState 批处理
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        同一事件、同一批次：handleClick 整次执行中多次 setState，React 会合并为一次更新，只触发一次渲染。
      </p>

      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
        <p className="text-sm">
          a = <strong className="text-violet-600 dark:text-violet-400">{a}</strong>
          {" · "}
          b = <strong className="text-violet-600 dark:text-violet-400">{b}</strong>
        </p>
        <p className="text-xs text-zinc-500">
          本组件自挂载以来渲染次数：<strong>{renderCountRef.current}</strong>
          （点一次按钮应只增加 1，说明两次 setState 被合并）
        </p>
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={handleClick}
        >
          点我：setA(1) + setB(2)
        </button>
      </div>
    </div>
  );
}
