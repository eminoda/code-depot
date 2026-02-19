"use client";

import { createContext, useContext, useState, useRef } from "react";

const ThemeContext = createContext<string>("light");

function useRenderCount(label: string) {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
}

function Form() {
  const [name, setName] = useState("");
  const theme = useContext(ThemeContext);
  const renders = useRenderCount("Form");
  return (
    <div className="rounded border border-violet-200 bg-violet-50/50 p-3 dark:border-violet-800 dark:bg-violet-950/30">
      <span className="font-medium">Form</span>（本地 state：name；Context：theme）· 渲染{" "}
      <strong>{renders}</strong>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="输入姓名（仅 Form 重渲染）"
          className="rounded border border-zinc-300 bg-white px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <span className="text-xs text-zinc-500">theme={theme}</span>
      </div>
    </div>
  );
}

function Sidebar() {
  const theme = useContext(ThemeContext);
  const renders = useRenderCount("Sidebar");
  return (
    <div className="rounded border border-emerald-200 bg-emerald-50/50 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/30">
      <span className="font-medium">Sidebar</span>（只用 theme）theme={theme} · 渲染{" "}
      <strong>{renders}</strong>
    </div>
  );
}

export function Demos004() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        004 状态下沉（表单本地 state）
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        表单的 name 用本地 useState，只把需要跨层级的 theme 放 Context。在输入框打字时只有 Form 重渲染，Sidebar 不会因为 name 变化而重渲染（name 根本没进 Context）。
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          改 theme
        </button>
      </div>

      <ThemeContext.Provider value={theme}>
        <div className="flex flex-wrap gap-3">
          <Form />
          <Sidebar />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}
