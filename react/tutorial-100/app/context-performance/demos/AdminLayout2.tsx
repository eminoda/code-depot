"use client";

import React, { createContext, useContext, useState } from "react";

/**
 * AdminLayout2：只把真正需要跨层级共享的放 Context，表单内部状态放本地 state
 *
 * 原则（参考 Demo006 状态下沉）：
 * 1. Context 只放跨层级共享：user（Header 需要展示）
 * 2. 表单内部状态放本地：Modal 的 input、Content 的搜索框
 * 3. 不订阅的组件不放进 Provider 的消费范围，或只让真正需要的组件订阅
 */

export type AdminUser = { nickname: string };

export const AdminUserContext2 = createContext<{
  user: AdminUser;
  setUser: (u: AdminUser) => void;
} | null>(null);

/** 后管界面布局 2：Header 订阅 Context，Sidebar/Content 不订阅，表单用本地 state */
export function AdminLayout2() {
  return (
    <div className="overflow-hidden rounded border border-zinc-200 dark:border-zinc-700">
      <AdminHeader2 />
      <div className="flex min-h-[200px]">
        <AdminSidebar2 />
        <AdminContent2 />
      </div>
    </div>
  );
}

/** 唯一需要 user 的组件，订阅 Context */
export function AdminHeader2() {
  const ctx = useContext(AdminUserContext2);
  const [modalOpen, setModalOpen] = useState(false); // 本地 state
  console.log("Header2 重渲染");

  if (!ctx) return null;
  const { user } = ctx;

  return (
    <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
      <span className="text-sm font-medium">后管系统</span>
      <span
        className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-400"
        onClick={() => setModalOpen(true)}
      >
        用户：{user.nickname}
      </span>
      {modalOpen && (
        <EditNicknameModal
          nickname={user.nickname}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
/** Modal 内的 input 用本地 state，不放进 Context */
function EditNicknameModal({
  nickname,
  onClose,
}: {
  nickname: string;
  onClose: () => void;
}) {
  const ctx = useContext(AdminUserContext2);
  const [value, setValue] = useState(nickname); // 本地 state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ctx?.setUser?.({ nickname: value });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <div className="rounded border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
        <h3 className="mb-3 text-sm font-medium">修改昵称</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded border border-zinc-300 px-2 py-1 dark:border-zinc-600 dark:bg-zinc-700"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded border px-2 py-1 text-xs"
              onClick={onClose}
            >
              取消
            </button>
            <button
              type="submit"
              className="rounded bg-zinc-800 px-2 py-1 text-xs text-white dark:bg-zinc-200 dark:text-zinc-800"
            >
              确定
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/** 不订阅 Context，不需要 user，用 memo 避免被父级重渲染牵连 */
export const AdminSidebar2 = React.memo(function AdminSidebar2() {
  console.log("Sidebar2 重渲染");
  return (
    <aside className="w-40 border-r border-zinc-200 p-2 dark:border-zinc-700">
      <div className="text-sm text-zinc-500">菜单</div>
      <ul className="mt-2 space-y-1 text-sm">
        <li>首页</li>
        <li>设置</li>
      </ul>
    </aside>
  );
});

/**
 * Content 区：不订阅 Context，内含表单用本地 state。
 * 输入搜索时只有本组件重渲染，Header/Sidebar 不受影响。
 */
export const AdminContent2 = React.memo(function AdminContent2() {
  const [search, setSearch] = useState(""); // 本地 state，不放进 Context
  console.log("Content2 重渲染");

  return (
    <main className="flex-1 p-4">
      主内容
    </main>
  );
});
