"use client";

import React, { createContext, memo, useContext, useState } from "react";

type User = { name: string };
type Theme = "light" | "dark";

const UserContext = createContext<User | null>(null);
const ThemeContext = createContext<Theme | null>(null);

const ConsumerUser = memo(function ConsumerUser() {
  const user = useContext(UserContext);
  console.log("ConsumerUser 重渲染");
  return <span className="text-sm">user: {user?.name ?? "-"}</span>;
});

const ConsumerTheme = memo(function ConsumerTheme() {
  const theme = useContext(ThemeContext);
  console.log("ConsumerTheme 重渲染");
  return <span className="text-sm">theme: {theme ?? "-"}</span>;
});

/** Demo005：拆分 Context 可降低渲染 */
export function Demos005() {
  const [user, setUser] = useState<User>({ name: "张三" });
  const [theme, setTheme] = useState<Theme>("light");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">拆分 Context 可降低渲染</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        按功能拆成 UserContext、ThemeContext，改 user 时只重渲染 ConsumerUser，改 theme 时只重渲染 ConsumerTheme。
      </p>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4 space-y-3">
        <UserContext.Provider value={user}>
          <ThemeContext.Provider value={theme}>
            <div className="flex gap-4">
              <ConsumerUser />
              <ConsumerTheme />
            </div>
          </ThemeContext.Provider>
        </UserContext.Provider>
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
        </div>
      </div>
    </div>
  );
}
