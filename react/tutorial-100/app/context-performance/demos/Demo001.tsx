"use client";

import React, { useState } from "react";

/** Demo001：逐层透传 props 的痛点 */
function Level1({ theme }: { theme: string }) {
  return <Level2 theme={theme} />;
}

function Level2({ theme }: { theme: string }) {
  return <Level3 theme={theme} />;
}

function Level3({ theme }: { theme: string }) {
  return <Level4 theme={theme} />;
}

const themeStyles = {
  light: { bg: "#f5f5f5", text: "#171717", border: "#e5e5e5" },
  dark: { bg: "#27272a", text: "#fafafa", border: "#3f3f46" },
} as const;

function Level4({ theme }: { theme: string }) {
  const style = themeStyles[theme as keyof typeof themeStyles] ?? themeStyles.light;
  return (
    <div
      className="rounded px-3 py-2 text-sm"
      style={{ backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      最底层组件拿到的 theme：<strong>{theme}</strong>
    </div>
  );
}

export function Demos001() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">逐层透传 props 的痛点</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        父组件的 theme 要通过 props 一层层传给 Level1 → Level2 → Level3 → Level4，中间层根本不用 theme，却要透传。
      </p>
      <div className="flex items-center gap-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        >
          <option value="light">light</option>
          <option value="dark">dark</option>
        </select>
        <span className="text-sm text-zinc-500">切换 theme，每层都要透传 props</span>
      </div>
      <div
        className="rounded border p-4"
        style={
          theme === "dark"
            ? { backgroundColor: "#18181b", borderColor: "#3f3f46" }
            : { backgroundColor: "#fff", borderColor: "#e5e5e5" }
        }
      >
        <Level1 theme={theme} />
      </div>
    </div>
  );
}
