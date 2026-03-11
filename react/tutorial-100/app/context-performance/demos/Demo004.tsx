"use client";

import React,{ createContext, ReactNode, useContext, useState, useMemo } from "react";

type User = { name: string };
type Theme = "light" | "dark";

const AppContext = createContext<{ user: User; theme: Theme } | null>(null);

function ConsumerUser() {
  const ctx = useContext(AppContext);
  console.log("ConsumerUser 重渲染");
  return <span className="text-sm">user: {ctx?.user.name ?? "-"}</span>;
}

function ConsumerTheme() {
  const ctx = useContext(AppContext);
  console.log("ConsumerTheme 重渲染");
  return <span className="text-sm">theme: {ctx?.theme ?? "-"}</span>;
}

/** 父组件：管理 user、theme，控制按钮 */
function Demo004({
  mode,
  children,
}: {
  mode: "inline" | "useMemo";
  children: ReactNode;
}) {
  console.log("Demo004 重渲染");
  const [user, setUser] = useState<User>({ name: "张三" });
  const [theme, setTheme] = useState<Theme>("light");
  const [, setTick] = useState(0);

  const valueMemo = useMemo(() => ({ user, theme }), [user, theme]);

  return (
    <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
      {mode === "inline" && (
        <AppContext.Provider value={{ user, theme }}>{children}</AppContext.Provider>
      )}
      {mode === "useMemo" && (
        <AppContext.Provider value={valueMemo}>{children}</AppContext.Provider>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
        <button
          type="button"
          className="rounded border border-zinc-400 px-2 py-1 text-xs"
          onClick={() => setUser((u) => ({ ...u, name: u.name + "!" }))}
        >
          改 user
        </button>
        <button
          type="button"
          className="rounded border border-zinc-400 px-2 py-1 text-xs"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          改 theme
        </button>
        <button
          type="button"
          className="rounded border border-amber-500 px-2 py-1 text-xs"
          onClick={() => setTick((x) => x + 1)}
        >
          父重渲染（user/theme 不变）
        </button>
      </div>
    </div>
  );
}

/** Demo004：内联 value 次次渲染；useMemo 稳定引用不重渲染 */
export function Demos004() {
  const [mode, setMode] = useState<"inline" | "useMemo">("inline");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">稳定 value 引用</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        内联 value 每次父渲染都是新引用 → 子组件次次重渲染；useMemo 稳定引用，父重渲染（user/theme 不变）时子组件不重渲染。
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className={`rounded border px-2 py-1 text-xs ${mode === "inline" ? "border-amber-500" : ""}`}
          onClick={() => setMode("inline")}
        >
          内联 value（❌）
        </button>
        <button
          type="button"
          className={`rounded border px-2 py-1 text-xs ${mode === "useMemo" ? "border-green-500" : ""}`}
          onClick={() => setMode("useMemo")}
        >
          useMemo（✅）
        </button>
      </div>

      <Demo004 mode={mode}>
        <div className="flex gap-4">
          <ConsumerUser />
          <ConsumerTheme />
        </div>
      </Demo004>
    </div>
  );
}
