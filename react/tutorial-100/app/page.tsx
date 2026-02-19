import Link from "next/link";

const ARTICLES = [
  {
    slug: "context-performance",
    title: "Context 一用就卡？性能问题的根源与解决方案",
    description:
      "value 引用一变整棵子树重渲染、内联 value 与 useMemo、拆分 Context、use-context-selector 按需订阅、状态下沉。",
  },
  {
    slug: "use-callback-use-memo",
    title: "useCallback 和 useMemo 傻傻分不清？一次讲透两者的本质区别",
    description:
      "传函数用 useCallback 还是 useMemo？包了有没有用？结合列表重渲染、正确依赖、useMemo 缓存与 React Compiler 的示例与避坑。",
  },
  {
    slug: "set-state-batching",
    title: "setState 到底是同步还是异步？搞懂 React 18 的批处理机制",
    description:
      "批处理是什么、为何 console.log 拿到旧值、函数式更新、setTimeout 内批处理、flushSync 打破批处理及对性能的意义。",
  },
  {
    slug: "use-ref",
    title: "useRef 不只是存 DOM：作为可变容器的 3 大妙用",
    description:
      "为什么需要 useRef、与 useState 的区别、改 ref 不触发渲染、DOM 引用、定时器与跨渲染存可变值、闭包问题。",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Tutorial 100
        </h1>
        <p className="mb-10 text-zinc-600 dark:text-zinc-400">
          基于文章的示例与代码，点击进入对应路由查看。
        </p>

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
