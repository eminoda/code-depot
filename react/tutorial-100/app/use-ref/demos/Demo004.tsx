"use client";

import { useState, useEffect, useRef } from "react";

/** 对应文章：闭包问题 — 闭包拿旧 count vs ref 拿最新 */
export function Demos004() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);
  countRef.current = count;

  const [logFromClosure, setLogFromClosure] = useState<string[]>([]);
  const [logFromRef, setLogFromRef] = useState<string[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setLogFromClosure((prev) => [...prev.slice(-4), `count(闭包)=${count}`]);
      setLogFromRef((prev) => [
        ...prev.slice(-4),
        `countRef.current=${countRef.current}`,
      ]);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        004 闭包问题：回调里拿最新 state
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        effect 依赖 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">[]</code> 只跑一次，
        定时器回调里的 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">count</code> 被闭包锁在挂载时的值；
        <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">countRef.current</code> 每次渲染都被更新，所以读到最新。
        先点几次「count+1」再观察下方每秒打印。
      </p>

      <div className="flex gap-4">
        <div className="flex-1 rounded-lg border border-red-200 bg-red-50/50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            ❌ 闭包拿到的 count
          </p>
          <p className="mt-1 text-xs text-zinc-500">永远是挂载那次的值</p>
          <ul className="mt-2 text-sm font-mono">
            {logFromClosure.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="flex-1 rounded-lg border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            ✅ ref 拿到的 countRef.current
          </p>
          <p className="mt-1 text-xs text-zinc-500">每次渲染都会更新</p>
          <ul className="mt-2 text-sm font-mono">
            {logFromRef.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-sm">
        当前 count = <strong>{count}</strong>
        {" "}
        <button
          type="button"
          className="rounded bg-violet-500 px-2 py-1 text-sm text-white hover:bg-violet-600"
          onClick={() => setCount((n) => n + 1)}
        >
          count + 1
        </button>
      </p>
    </div>
  );
}
