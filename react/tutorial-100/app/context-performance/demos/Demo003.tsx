"use client";

import { createContext, useContext, useState } from "react";

const MyContext = createContext<{ user: string; theme: string } | null>(null);

function ConsumerUser() {
  const ctx = useContext(MyContext);
  console.log("ConsumerUser 重渲染");
  return <span className="text-sm">user: {ctx?.user ?? "-"}</span>;
}

function ConsumerTheme() {
  const ctx = useContext(MyContext);
  console.log("ConsumerTheme 重渲染");
  return <span className="text-sm">theme: {ctx?.theme ?? "-"}</span>;
}

/** Demo003：value 内联对象，每次渲染都是新引用，所有 consumer 重渲染 */
export function Demos003() {
  const [user, setUser] = useState("张三");
  const [theme, setTheme] = useState("light");

  // ❌ value={{ user, theme }} 每次渲染都是新对象
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">value 内联对象 → 所有 consumer 重渲染</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        切换 user 或 theme 时，value 引用改变，ConsumerUser、ConsumerTheme 都会重渲染（看控制台）。
      </p>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
        <MyContext.Provider value={{ user, theme }}>
          <div className="flex gap-4">
            <ConsumerUser />
            <ConsumerTheme />
          </div>
        </MyContext.Provider>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded border border-zinc-400 px-2 py-1 text-xs"
            onClick={() => setUser((u) => (u === "张三" ? "李四" : "张三"))}
          >
            切换 user
          </button>
          <button
            type="button"
            className="rounded border border-zinc-400 px-2 py-1 text-xs"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
          >
            切换 theme
          </button>
        </div>
      </div>
    </div>
  );
}
