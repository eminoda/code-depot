"use client";

import { useState, useRef } from "react";

/** 对应文章：useRef 是什么：定义与和 useState 的区别 — 改 ref 不触发重渲染 */
export function Demos001() {
  const [stateVal, setStateVal] = useState(0);
  const refVal = useRef(0);
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        001 useRef vs useState：改 .current 不触发重渲染
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        修改 <code className="rounded bg-zinc-200 px-1 dark:bg-zinc-700">ref.current</code> 不会触发重渲染；
        修改 state（setState）会触发重渲染。下面用「渲染次数」观察：点「改 ref」不增加，点「改 state」增加。
      </p>

      <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-sm">
          当前渲染次数 = <strong>{renderCountRef.current}</strong>
          {" · "}
          state 值 = <strong>{stateVal}</strong>
          {" · "}
          ref.current = <strong>{refVal.current}</strong>
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="rounded bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
            onClick={() => {
              refVal.current += 1;
              // 不触发重渲染，界面上的 ref.current 不会自动更新，但下次渲染会显示最新
            }}
          >
            改 ref（+1）
          </button>
          <button
            type="button"
            className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
            onClick={() => setStateVal((n) => n + 1)}
          >
            改 state（+1）
          </button>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          只点「改 ref」时渲染次数不变；点「改 state」会重渲染，此时才能看到 ref 的最新值（因为组件重新执行了）。
        </p>
      </div>
    </div>
  );
}
