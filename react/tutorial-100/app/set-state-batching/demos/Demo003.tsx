"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { flushSync } from "react-dom";

export function Demos003() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  useLayoutEffect(() => {});

  // React 18：setTimeout 里也会批处理，两次 setState → 一次渲染
  const handleSetTimeout = () => {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 0);
  };

  // flushSync 打破批处理：立刻提交更新，可在此后拿到更新后的 DOM/状态
  const [syncCount, setSyncCount] = useState(0);
  const countElRef = useRef<HTMLSpanElement>(null);
  const handleFlushSync = () => {
    flushSync(() => setSyncCount((c) => c + 1));
    // 这里 state 和 DOM 已更新
    console.log(
      "flushSync 后 DOM 文本:",
      countElRef.current?.textContent
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        003 setTimeout 批处理 + flushSync
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        React 18 在 setTimeout、Promise 等里也会自动批处理。若需要「立刻」拿到更新后的 DOM 或状态，可用 flushSync 打破批处理（慎用）。
      </p>

      {/* setTimeout 批处理 */}
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
        <h3 className="text-sm font-medium">setTimeout 内两次 setState</h3>
        <p className="text-sm">
          count = {count} · flag = {String(flag)}
        </p>
        <p className="text-xs text-zinc-500">
          渲染次数：<strong>{renderCountRef.current}</strong>
          （React 18 下点一次应只 +1，setTimeout 内也批处理）
        </p>
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={handleSetTimeout}
        >
          在 setTimeout 里 setCount + setFlag
        </button>
      </div>

      {/* flushSync */}
      <div className="rounded border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 p-4 space-y-3">
        <h3 className="text-sm font-medium">flushSync 立刻更新</h3>
        <p className="text-sm">
          syncCount = <span ref={countElRef}>{syncCount}</span>
        </p>
        <button
          type="button"
          className="rounded bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
          onClick={handleFlushSync}
        >
          flushSync 更新后读 DOM（看控制台）
        </button>
      </div>
    </div>
  );
}
