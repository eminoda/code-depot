"use client";

import React, { createContext, useContext, useState } from "react";

export type AdminUser = { nickname: string };

export const AdminUserContext = createContext<{
  user: AdminUser;
  setUser: (u: AdminUser) => void;
} | null>(null);

function EditNicknameModal({
  nickname,
  onClose,
}: {
  nickname: string;
  onClose: () => void;
}) {
  const ctx = useContext(AdminUserContext);
  const [value, setValue] = useState(nickname);

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

/** 后管界面布局：Header + Sidebar + Content */
export function AdminLayout() {
  return (
    <div className="overflow-hidden rounded border border-zinc-200 dark:border-zinc-700">
      <AdminHeader />
      <div className="flex min-h-[200px]">
        <AdminSidebar />
        <AdminContent />
      </div>
    </div>
  );
}

export function AdminHeader() {
  const ctx = useContext(AdminUserContext);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("Header 重渲染");

  if (!ctx) return null;
  const { user } = ctx;

  return (
    <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
      <span className="text-sm font-medium">后管系统</span>
      <div
        className="relative"
      >
        <span className="text-sm text-zinc-600 dark:text-zinc-400" onClick={() => setModalOpen(true)}>
          用户：{user.nickname}
        </span>
      </div>
      {modalOpen && (
        <EditNicknameModal
          nickname={user.nickname}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

export function AdminSidebar() {
  useContext(AdminUserContext);
  console.log("Sidebar 重渲染");
  return (
    <aside className="w-40 border-r border-zinc-200 p-2 dark:border-zinc-700">
      <div className="text-sm text-zinc-500">菜单</div>
      <ul className="mt-2 space-y-1 text-sm">
        <li>首页</li>
        <li>设置</li>
      </ul>
    </aside>
  );
}

export function AdminContent() {
  useContext(AdminUserContext);
  console.log("Content 重渲染");
  return (
    <main className="flex-1 p-4">
      <div className="text-sm text-zinc-600 dark:text-zinc-400">内容区</div>
    </main>
  );
}