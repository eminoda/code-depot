"use client";

import { useState, useEffect, useRef } from "react";

/** 对应文章：定时器与「跨渲染存可变值」— timerRef 存 ID、usePrevious */
function usePrevious(value: number) {
  const prevRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    prevRef.current = value;
  });
  return prevRef.current;
}

export function Demos003() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [tick, setTick] = useState(0);
  const prevTick = usePrevious(tick);

  useEffect(() => {
    timerRef.current = setInterval(() => setTick((n) => n + 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        003 定时器与跨渲染存可变值
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        effect 里 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">setInterval</code> 返回的 ID 用 ref 存，
        cleanup 里 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">clearInterval(timerRef.current)</code>。
        下面同时演示「存上一次的 props」：<code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">usePrevious(tick)</code> 返回上一轮的 tick。
      </p>

      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-sm">
          当前 tick（每秒 +1）= <strong>{tick}</strong>
          {" · "}
          上一次 tick = <strong>{prevTick ?? "-"}</strong>
        </p>
      </div>
    </div>
  );
}
