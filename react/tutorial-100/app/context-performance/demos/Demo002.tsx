"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  memo,
} from "react";

const UserContext = createContext<string>("");
const ThemeContext = createContext<string>("light");

function useRenderCount(label: string) {
  const ref = useRef(0);
  ref.current += 1;
  return ref.current;
}

function Header() {
  const user = useContext(UserContext);
  const renders = useRenderCount("Header");
  return (
    <header className="rounded border border-amber-200 bg-amber-50/50 px-3 py-2 dark:border-amber-800 dark:bg-amber-950/30">
      <span className="font-medium">Header</span>（只用 user）user={user} · 渲染{" "}
      <strong>{renders}</strong>
    </header>
  );
}

function Sidebar() {
  const theme = useContext(ThemeContext);
  const renders = useRenderCount("Sidebar");
  return (
    <aside className="rounded border border-emerald-200 bg-emerald-50/50 px-3 py-2 dark:border-emerald-800 dark:bg-emerald-950/30">
      <span className="font-medium">Sidebar</span>（只用 theme）theme={theme} · 渲染{" "}
      <strong>{renders}</strong>
    </aside>
  );
}

function Content() {
  useContext(UserContext);
  useContext(ThemeContext);
  const renders = useRenderCount("Content");
  return (
    <div className="rounded border border-violet-200 bg-violet-50/50 px-3 py-2 dark:border-violet-800 dark:bg-violet-950/30">
      <span className="font-medium">Content</span>（用 user+theme）· 渲染{" "}
      <strong>{renders}</strong>
    </div>
  );
}

// 各包装层订阅对应 Context 并用 memo：只有自己用的 context 值变时才重渲染
const HeaderWrapper = memo(function HeaderWrapper() {
  useContext(UserContext);
  return <Header />;
});
const SidebarWrapper = memo(function SidebarWrapper() {
  useContext(ThemeContext);
  return <Sidebar />;
});
const ContentWrapper = memo(function ContentWrapper() {
  useContext(UserContext);
  useContext(ThemeContext);
  return <Content />;
});

const Layout = memo(function Layout() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3">
      <HeaderWrapper />
      <SidebarWrapper />
      <ContentWrapper />
    </div>
  );
});

export function Demos002() {
  const [user, setUser] = useState("alice");
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        002 拆分 Context（User / Theme）
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        按功能拆成 UserContext、ThemeContext。改 user 时只有消费 user 的 Header、Content 重渲染，只消费 theme 的 Sidebar 不会重渲染；改 theme 时同理。
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={() => setUser((u) => (u === "alice" ? "bob" : "alice"))}
        >
          改 user
        </button>
        <button
          type="button"
          className="rounded bg-violet-500 px-3 py-1.5 text-sm text-white hover:bg-violet-600"
          onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        >
          改 theme
        </button>
      </div>

      <UserContext.Provider value={user}>
        <ThemeContext.Provider value={theme}>
          <Layout />
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
