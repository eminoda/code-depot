"use client";

import { useState, useMemo, useCallback, memo, useRef, useEffect } from "react";

const Child = memo(function Child({ onClick }: { onClick: () => void }) {
  console.log("Child 渲染");
  return <div onClick={onClick}>Child</div>;
});

export function Demos003() {
  console.log("Demos003 渲染");
  const [count, setCount] = useState(0);
  const [data] = useState(() => [1, 2, 3, 4, 5]);

  // useMemo：依赖不变时不会重新执行，直接返回上次结果（打日志体现缓存）
  const list = useMemo(() => {
    console.log("useMemo：只要依赖 [data] 不变，就不会重新执行");
    return data.filter((n) => n % 2 === 0);
  }, [data]);

  // useCallback：依赖 [] 不变时返回同一函数引用，传给 memo 子组件可避免其重渲染
  const handler = useCallback(() => setCount((c) => c + 1), []);

  const prevHandlerRef = useRef<(() => void) | symbol>(Symbol("init"));
  const [refChangeCount, setRefChangeCount] = useState(0);
  const sameRefAsPrev = prevHandlerRef.current === handler;
  useEffect(() => {
    if (prevHandlerRef.current !== handler) {
      const isInitial = typeof prevHandlerRef.current === "symbol";
      prevHandlerRef.current = handler;
      // 仅当「上次已是真实函数且引用变了」才计为变化，避免首次挂载时 setState 导致多渲染一次
      if (!isInitial) setRefChangeCount((c) => c + 1);
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        useMemo、useCallback 基本用法
      </h2>
      <p className="mb-2 flex items-center gap-2">
        <button
          type="button"
          className="rounded border border-zinc-400 px-2 py-1 text-xs dark:border-zinc-500"
          onClick={() => setCount((c) => c + 1)}
        >
          点击体验
        </button>
        <span className="text-sm">count: {count}</span>
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4">
          <h3 className="mb-2 text-sm font-medium text-violet-600 dark:text-violet-400">
            useMemo 缓存计算结果
          </h3>
          <p className="mb-2 text-xs text-zinc-500">
            只要依赖 [data] 不变，重渲染不会再次执行
          </p>
          <pre className="mb-2 overflow-x-auto rounded bg-zinc-100 p-2 text-xs dark:bg-zinc-800">
{`const list = useMemo(() => {
  return data.filter((n) => n % 2 === 0);
}, [data]);`}
          </pre>
        </div>
        <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4">
          <h3 className="mb-2 text-sm font-medium text-violet-600 dark:text-violet-400">
            useCallback 缓存函数引用
          </h3>
          <p className="mb-2 text-xs text-zinc-500">
            只要依赖 [] 不变，就不会重新创建函数
          </p>
          <pre className="mb-2 overflow-x-auto rounded bg-zinc-100 p-2 text-xs dark:bg-zinc-800">
{`const handler = useCallback(
  () => setCount((c) => c + 1),
  []
);`}
          </pre>
          <p className="mb-2 text-xs text-zinc-500">
            handler 引用变化次数：<strong>{refChangeCount}</strong>（useCallback 依赖 [] 时通常为 0）
          </p>
          <Child onClick={handler} />
        </div>
      </div>
    </div>
  );
}
