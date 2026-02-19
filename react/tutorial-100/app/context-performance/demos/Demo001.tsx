"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
  memo,
} from "react";

type AppValue = { user: string; theme: string };
const AppContext = createContext<AppValue | null>(null);

function useRenderCount(label: string) {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
}

function ConsumerUser() {
  const ctx = useContext(AppContext);
  const renders = useRenderCount("ConsumerUser");
  return (
    <div className="rounded border border-amber-200 bg-amber-50/50 px-3 py-2 dark:border-amber-800 dark:bg-amber-950/30">
      <span className="font-medium">ConsumerUser</span> user={ctx?.user ?? "-"} · 渲染次数{" "}
      <strong>{renders}</strong>
    </div>
  );
}

function ConsumerTheme() {
  const ctx = useContext(AppContext);
  const renders = useRenderCount("ConsumerTheme");
  return (
    <div className="rounded border border-emerald-200 bg-emerald-50/50 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/30">
      <span className="font-medium">ConsumerTheme</span> theme={ctx?.theme ?? "-"} · 渲染次数{" "}
      <strong>{renders}</strong>
    </div>
  );
}

// 订阅 Context 且用 memo 包裹：只有 value 引用变时才重渲染，父组件因 tick 重渲染不会带起这里
const ConsumerLayout = memo(function ConsumerLayout() {
  useContext(AppContext);
  return (
    <div className="flex flex-wrap gap-3">
      <ConsumerUser />
      <ConsumerTheme />
    </div>
  );
});

export function Demos001() {
  const [user, setUser] = useState("alice");
  const [theme, setTheme] = useState("light");
  const [tick, setTick] = useState(0);
  const [useStableValue, setUseStableValue] = useState(true);
  const parentRenders = useRenderCount("Parent");

  const stableValue = useMemo(() => ({ user, theme }), [user, theme]);
  const value = useStableValue ? stableValue : { user, theme };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        001 内联 value vs useMemo 稳定引用
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        父组件有 user、theme、tick 三个 state。用「改 tick」触发父组件重渲染但不改 value 内容：内联 value 时每次都是新对象，所有 consumer 跟着重渲染；用 useMemo 包 value 时引用不变，consumer 不重渲染。
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={() => setUser((u) => (u === "alice" ? "bob" : "alice"))}
        >
          改 user
        </button>
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          改 theme
        </button>
        <button
          type="button"
          className="rounded bg-zinc-500 px-3 py-1.5 text-sm text-white hover:bg-zinc-600"
          onClick={() => setTick((c) => c + 1)}
        >
          改 tick（与 Context 无关）
        </button>
        <button
          type="button"
          className="rounded border border-violet-500 px-3 py-1.5 text-sm text-violet-600 dark:text-violet-400"
          onClick={() => setUseStableValue((v) => !v)}
        >
          {useStableValue ? "当前：useMemo 稳定" : "当前：内联 value"}
        </button>
      </div>

      <p className="text-xs text-zinc-500">
        父组件渲染次数：<strong>{parentRenders}</strong>
      </p>

      <AppContext.Provider value={value}>
        <ConsumerLayout />
      </AppContext.Provider>
    </div>
  );
}
