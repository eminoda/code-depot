"use client";

import { useState, useMemo, useCallback, memo, useRef, useEffect } from "react";

const Child = memo(({ onClick }: { onClick: () => void }) => {
  console.log("Child 渲染");
  return <></>
});

export function Demos003() {
  console.log("Demos003 渲染");
  const [count, setCount] = useState(0);
  const [data] = useState(() => [1, 2, 3, 4, 5]);

  // useMemo：依赖不变时不会重新执行，直接返回上次结果（打日志体现缓存）
  const list = useMemo(() => {
    console.log("useMemo：昂贵计算执行（依赖 [data] 不变则不会再次打印，体现缓存）");
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
        useMemo、useCallback 基本用法（追本溯源）
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        本 demo 意图：按官网定义展示 useMemo（缓存「算出来的结果」）与 useCallback（缓存「函数本身」）的最基础用法；useMemo 通过控制台日志体现缓存，useCallback 通过 Child 不重复渲染（「Child 渲染」不再次打印）体现引用稳定。
      </p>
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
            useMemo 最基础用法
          </h3>
          <p className="mb-2 text-xs text-zinc-500">
            useMemo 内打日志；依赖 [data] 不变时重渲染不会再次执行，控制台不再打印。
          </p>
          <pre className="mb-2 overflow-x-auto rounded bg-zinc-100 p-2 text-xs dark:bg-zinc-800">
{`const list = useMemo(() => {
  console.log("useMemo：昂贵计算执行…");
  return data.filter((n) => n % 2 === 0);
}, [data]);`}
          </pre>
        </div>
        <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4">
          <h3 className="mb-2 text-sm font-medium text-violet-600 dark:text-violet-400">
            useCallback 最基础用法
          </h3>
          <p className="mb-2 text-xs text-zinc-500">
            依赖 [] 不变时不会重新创建函数，Child 为 memo，故重渲染时「Child 渲染」不重复打印。
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
