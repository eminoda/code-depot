"use client";

import Link from "next/link";

const ARTICLES = [
  {
    slug: "context-performance",
    title: "Context 一用就卡？性能问题的根源与解决方案",
    description:
      "value 引用一变整棵子树重渲染、内联 value 与 useMemo、拆分 Context、use-context-selector 按需订阅、状态下沉。",
    intent: "理解 Context 导致重渲染的原因，掌握拆分、按需订阅与状态下沉等优化手段。",
  },
  {
    slug: "use-callback-use-memo",
    title: "useCallback 和 useMemo 傻傻分不清？一次讲透两者的本质区别",
    description:
      "传函数用 useCallback 还是 useMemo？包了有没有用？结合列表重渲染、正确依赖、useMemo 缓存与 React Compiler 的示例与避坑。",
    intent: "区分 useCallback 与 useMemo 的适用场景，学会正确设置依赖并在必要时配合 memo。",
  },
  {
    slug: "set-state-batching",
    title: "setState 到底是同步还是异步？搞懂 React 18 的批处理机制",
    description:
      "批处理是什么、为何 console.log 拿到旧值、函数式更新、setTimeout 内批处理、flushSync 打破批处理及对性能的意义。",
    intent: "理解 React 18 批处理行为，会用函数式更新和 flushSync 在需要时控制更新时机。",
  },
  {
    slug: "use-ref",
    title: "useRef 不只是存 DOM：作为可变容器的 3 大妙用",
    description:
      "为什么需要 useRef、与 useState 的区别、改 ref 不触发渲染、DOM 引用、定时器与跨渲染存可变值、闭包问题。",
    intent: "掌握 useRef 作为可变容器、DOM 引用与解决闭包旧值的用法。",
  },
];

// 未设置 DEBUG 时默认 true（教学模式开启）；.env 中 DEBUG=0 可关闭
const isDebugTeachingMode = String(process.env.NEXT_PUBLIC_DEBUG ?? "1") === "1";

export default function Home() {
  const isTeaching = isDebugTeachingMode;
  const teachingQuery = isTeaching ? "?teaching=1" : "";

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-16">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Tutorial 100
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              基于文章的示例与代码，点击进入对应路由查看。
            </p>
          </div>
          {!isDebugTeachingMode && (
            <Link
              href={isTeaching ? "/" : "/?teaching=1"}
              className="shrink-0 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
            >
              {isTeaching ? "退出教学模式" : "教学模式"}
            </Link>
          )}
          {isDebugTeachingMode && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              DEBUG=1 教学模式
            </span>
          )}
        </div>

        {isTeaching && (
          <p className="mb-6 rounded-lg border border-amber-200/60 bg-amber-50/80 px-4 py-2 text-sm text-amber-800 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-200">
            教学模式已开启：进入文章后将隐藏左侧菜单栏，仅保留主内容与顶部导航。
          </p>
        )}

        <ul className="space-y-4">
          {ARTICLES.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/${article.slug}`}
                className="block rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/50"
              >
                <h2 className="font-medium text-zinc-900 dark:text-zinc-100">
                  {article.title}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {article.description}
                </p>
                {!isDebugTeachingMode && (
                  <p className="mt-2 text-sm text-violet-600 dark:text-violet-400">
                    <span className="font-medium">意图：</span>
                    {article.intent}
                  </p>
                )}
                <span className="mt-2 inline-block text-sm font-medium text-zinc-500 dark:text-zinc-500">
                  /{article.slug} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
