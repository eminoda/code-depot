"use client";

import { useState, useRef, memo } from "react";
import { createContext, useContextSelector } from "use-context-selector";

type AppValue = { user: string; theme: string };
const AppContext = createContext<AppValue | null>(null);

function useRenderCount(label: string) {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
}

function ConsumerUser() {
  const user = useContextSelector(AppContext, (c) => c?.user ?? "");
  const renders = useRenderCount("ConsumerUser");
  return (
    <div className="rounded border border-amber-200 bg-amber-50/50 px-3 py-2 dark:border-amber-800 dark:bg-amber-950/30">
      <span className="font-medium">ConsumerUser</span>（selector 只选 user）user={user} · 渲染{" "}
      <strong>{renders}</strong>
    </div>
  );
}

function ConsumerTheme() {
  const theme = useContextSelector(AppContext, (c) => c?.theme ?? "");
  const renders = useRenderCount("ConsumerTheme");
  return (
    <div className="rounded border border-emerald-200 bg-emerald-50/50 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/30">
      <span className="font-medium">ConsumerTheme</span>（selector 只选 theme）theme={theme} · 渲染{" "}
      <strong>{renders}</strong>
    </div>
  );
}

// memo 包裹：父重渲染不会带起这里，只有 selector 选中的值变时由 use-context-selector 触发对应 consumer 重渲染
const ConsumerLayout = memo(function ConsumerLayout() {
  return (
    <div className="flex flex-wrap gap-3">
      <ConsumerUser />
      <ConsumerTheme />
    </div>
  );
});

export function Demos003() {
  const [user, setUser] = useState("alice");
  const [theme, setTheme] = useState("light");
  const value = { user, theme };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        003 use-context-selector 按字段订阅
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        同一个 Context 存 user + theme，用 useContextSelector 按字段订阅：改 user 时只有 ConsumerUser 重渲染，ConsumerTheme 不重渲染；改 theme 时反之。
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
      </div>

      <AppContext.Provider value={value}>
        <ConsumerLayout />
      </AppContext.Provider>
    </div>
  );
}
