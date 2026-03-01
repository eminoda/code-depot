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
  Demos007,
} from "./demos";

const TABS = [
  { id: "001", label: "001 为啥拿不到最新值" },
  { id: "002", label: "002 同一事件 setA/setB 合并" },
  { id: "003", label: "003 React 17 — setTimeout 不批处理" },
  { id: "004", label: "004 React 18 — setTimeout 批处理" },
  { id: "005", label: "005 flushSync 打破批处理" },
  { id: "007", label: "007 批处理对性能的意义" },
] as const;

const TAB_IDS = TABS.map((t) => t.id);
type TabId = (typeof TABS)[number]["id"];

function parseTabFromQuery(tab: string | null): TabId {
  if (tab && TAB_IDS.includes(tab as TabId)) return tab as TabId;
  return "001";
}

export default function SetStateBatchingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [active, setActive] = useState<TabId>(
    () => parseTabFromQuery(searchParams.get("tab"))
  );
  const [bubbleOpen, setBubbleOpen] = useState(false);

  useEffect(() => {
    setActive(parseTabFromQuery(searchParams.get("tab")));
  }, [searchParams]);

  const handleTabClick = (id: TabId) => {
    setActive(id);
    setBubbleOpen(false);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", id);
    router.replace(url.pathname + "?" + url.searchParams.toString());
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-zinc-50 to-violet-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/20 text-zinc-900 dark:text-zinc-100">
      <main className="min-w-0 flex-1 p-6 relative">
        <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end gap-2" role="tablist" aria-label="示例切换">
          {bubbleOpen && (
            <div className="rounded-2xl border border-violet-200/60 bg-white/95 p-2 shadow-xl shadow-violet-500/20 backdrop-blur-sm dark:border-violet-800/50 dark:bg-zinc-900/95">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active === tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`block w-full rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                    active === tab.id
                      ? "bg-violet-500 text-white"
                      : "text-zinc-600 hover:bg-violet-100/80 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <Link
                href="/"
                className="mt-2 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100/80 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200/80 dark:border-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300 dark:hover:bg-zinc-700/80"
              >
                ← 文章列表
              </Link>
            </div>
          )}
          <button
            type="button"
            onClick={() => setBubbleOpen((o) => !o)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg shadow-violet-500/30 transition hover:bg-violet-600 dark:shadow-violet-500/20"
            aria-expanded={bubbleOpen}
            aria-label={bubbleOpen ? "收起示例切换" : "展开示例切换"}
          >
            {active}
          </button>
        </div>
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
          {active === "007" && <Demos007 />}
        </div>
      </main>
    </div>
  );
}
