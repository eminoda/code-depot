"use client";

import { useState, useRef, useLayoutEffect, useImperativeHandle, forwardRef } from "react";

type Item = { id: number; name: string };

const RenderDurationDisplay = forwardRef<
  { setDuration: (ms: number) => void },
  { itemCount: number }
>(function RenderDurationDisplay({ itemCount }, ref) {
  const [lastRenderMs, setLastRenderMs] = useState<number | null>(null);
  useImperativeHandle(ref, () => ({
    setDuration: (ms: number) => setLastRenderMs(ms),
  }));
  if (lastRenderMs == null) return null;
  return (
    <p className="mb-2 text-sm text-zinc-500">
      本次渲染（Parent + {itemCount} 个子组件）耗时：<strong>{lastRenderMs.toFixed(2)}</strong> ms
    </p>
  );
});

function Child({
  item,
  onClick,
}: {
  item: Item;
  onClick: (id: number) => void;
}) {
  console.log(`child component 触发渲染 序号 ${item.id}`);
  return (
    <div
      className="flex items-center gap-2 py-1 text-sm text-zinc-600 dark:text-zinc-400"
      onClick={() => onClick(item.id)}
    >
      <span className="shrink-0 rounded bg-zinc-200 px-1.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
        序号 {item.id}
      </span>
      Child {item.id}
    </div>
  );
}

function Parent({ items }: { items: Item[] }) {
  const [keyword, setKeyword] = useState("");
  const renderStartRef = useRef(0);
  const durationDisplayRef = useRef<{ setDuration: (ms: number) => void }>(null);

  renderStartRef.current = performance.now();
  const handleItemClick = (id: number) => console.log(id);

  useLayoutEffect(() => {
    const duration = performance.now() - renderStartRef.current;
    queueMicrotask(() => durationDisplayRef.current?.setDuration(duration));
  });

  return (
    <>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mb-2 w-full rounded border border-zinc-300 px-2 py-1 dark:border-zinc-600 dark:bg-zinc-800"
        placeholder="输入会触发父组件重渲染，子组件全跟渲染（看控制台）"
      />
      <RenderDurationDisplay ref={durationDisplayRef} itemCount={items.length} />
      {items.map((item) => (
        <Child key={item.id} item={item} onClick={handleItemClick} />
      ))}
    </>
  );
}

export function Demos001() {
  const [childCount, setChildCount] = useState<number | "">(10);

  const count =
    childCount === ""
      ? 10
      : Math.min(500, Math.max(1, Number(childCount) || 1));
  const items: Item[] = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        你知道 React 组件渲染机制吗？
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        本 demo 意图：演示父组件 state（如 keyword）变化时，未使用 useCallback 与 memo 会导致其渲染出的所有子组件重复渲染；可调节子组件数量并观察输入时的渲染耗时与控制台打印。
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">子组件数量：</span>
          <input
            type="number"
            min={1}
            max={500}
            value={childCount}
            onChange={(e) =>
              setChildCount(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-20 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </label>
        <span className="text-sm text-zinc-500">当前渲染 {count} 个子组件，输入时打开控制台可见「child component 触发渲染」打印次数</span>
      </div>

      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-3">
        <Parent items={items} />
      </div>
    </div>
  );
}
