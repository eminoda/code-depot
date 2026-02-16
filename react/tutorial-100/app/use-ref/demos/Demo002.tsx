"use client";

import { useRef } from "react";

/** 对应文章：三种典型用法 — DOM 引用 */
export function Demos002() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">002 DOM 引用：focus</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        用 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">useRef(null)</code> 创建 ref，
        挂到 input 上，需要时通过 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">inputRef.current?.focus()</code> 让输入框获得焦点。
      </p>

      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <input
          ref={inputRef}
          type="text"
          placeholder="点击下方按钮可让我 focus"
          className="w-full rounded border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          type="button"
          className="mt-3 rounded bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
          onClick={() => inputRef.current?.focus()}
        >
          focus 到输入框
        </button>
      </div>
    </div>
  );
}
