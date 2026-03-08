"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext<"light" | "dark">("light");

function Form() {
  const [username, setUsername] = useState("");
  const theme = useContext(ThemeContext);
  console.log("Form 重渲染", { theme });

  return (
    <div className="space-y-2">
      <label className="block text-sm text-zinc-600 dark:text-zinc-400">
        用户名（本地 state，不放进 Context）
      </label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="输入用户名"
        className="w-full rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
      />
      <p className="text-xs text-zinc-500">
        当前 theme：{theme}；输入时只有 Form 重渲染，其他 Context 消费者不受影响
      </p>
    </div>
  );
}

function Sidebar() {
  const theme = useContext(ThemeContext);
  console.log("Sidebar 重渲染");
  return <div className="text-sm text-zinc-500">Sidebar theme: {theme}</div>;
}

/** Demo006：状态下沉 —— 减少 Context 范围 */
export function Demos006() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">状态下沉 —— 减少 Context 范围</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        用户名字段用本地 state，只从 Context 取 theme。输入用户名时只有 Form 重渲染，Sidebar 不重渲染；切 theme 时两者都重渲染（因都用 theme）。
      </p>
      <div className="flex gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
        <button
          type="button"
          className="rounded border px-2 py-1 text-xs"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          切换 theme
        </button>
      </div>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-4">
        <ThemeContext.Provider value={theme}>
          <Form />
          <Sidebar />
        </ThemeContext.Provider>
      </div>
    </div>
  );
}
