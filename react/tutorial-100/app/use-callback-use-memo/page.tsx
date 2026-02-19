"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Demos001,
  Demos002,
  Demos003,
  Demos004,
  Demos005,
} from "./demos";

const TABS = [
  { id: "001", label: "001 你知道 React 组件渲染机制吗？" },
  { id: "002", label: "002 用了 useCallback 还是不够" },
  { id: "003", label: "003 useMemo / useCallback 示例" },
  { id: "004", label: "004 memo 何时用" },
  { id: "005", label: "005 React Compiler 开启" },
] as const;

const TAB_IDS = TABS.map((t) => t.id);
type TabId = (typeof TABS)[number]["id"];

function parseTabFromQuery(tab: string | null): TabId {
  if (tab && TAB_IDS.includes(tab as TabId)) return tab as TabId;
  return "001";
}

export default function UseCallbackUseMemoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState<TabId>(
    () => parseTabFromQuery(searchParams.get("tab"))
  );

  useEffect(() => {
    setActive(parseTabFromQuery(searchParams.get("tab")));
  }, [searchParams]);

  const handleTabClick = (id: TabId) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    router.replace(url.pathname + "?" + url.searchParams.toString());
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-violet-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/20 text-zinc-900 dark:text-zinc-100">
      {/* 侧边栏 */}
      <aside
        className="flex w-56 shrink-0 flex-col border-r border-violet-200/60 bg-white/70 backdrop-blur-sm dark:border-violet-900/50 dark:bg-zinc-900/80"
        role="tablist"
        aria-label="示例切换"
      >
        <div className="border-b border-violet-200/60 p-4 dark:border-violet-900/50">
          <h1 className="mb-1 text-lg font-semibold tracking-tight">
            useCallback / useMemo
          </h1>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            示例切换
          </p>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              aria-controls="demo-panel"
              id={`tab-${tab.id}`}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                active === tab.id
                  ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 dark:shadow-violet-500/15"
                  : "text-zinc-600 hover:bg-violet-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              {active === tab.id && (
                <span
                  className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-white/40"
                  aria-hidden
                />
              )}
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-violet-200/60 p-2 dark:border-violet-900/50">
          <Link
            href="/"
            className="flex items-center justify-center rounded-xl border border-zinc-200 bg-white/80 px-3 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-violet-200 hover:bg-violet-50/50 dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:border-violet-800 dark:hover:bg-violet-950/30"
          >
            ← 文章列表
          </Link>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="min-w-0 flex-1 p-6">
        <div
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          id="demo-panel"
          className="rounded-2xl border border-violet-200/50 bg-white/80 p-6 shadow-xl shadow-violet-500/5 ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 dark:border-violet-900/40 dark:bg-zinc-900/80 dark:ring-white/5"
        >
          {active === "001" && <Demos001 />}
          {active === "002" && <Demos002 />}
          {active === "003" && <Demos003 />}
          {active === "004" && <Demos004 />}
          {active === "005" && <Demos005 />}
        </div>
      </main>
    </div>
  );
}
