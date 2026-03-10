"use client";

import React, { useState } from "react";
import { AdminUserContext2, AdminLayout2 } from "./AdminLayout2";

/**
 * Demo008：只把真正需要跨层级共享的放 Context，表单内部状态放本地 state
 *
 * 对比 Demo002：修改昵称时只有 Header2 重渲染，Sidebar2、Content2 不重渲染；
 * 在 Content2 搜索框输入时只有 Content2 重渲染，Header2、Sidebar2 不受影响。
 */
export function Demos008() {
  const [user, setUser] = useState({ nickname: "张三" });
  const value = { user, setUser };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        只把真正需要跨层级共享的放 Context，表单内部状态放本地 state
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        只让 Header2 订阅 Context；Sidebar2、Content2 不订阅，用 memo 隔离。
        Content2 的搜索框用本地 state。修改昵称时只有 Header2 重渲染；输入搜索时只有 Content2 重渲染。
      </p>
      <div className="rounded border border-zinc-200 dark:border-zinc-700 p-4">
        <AdminUserContext2.Provider value={value}>
          <AdminLayout2 />
        </AdminUserContext2.Provider>
      </div>
    </div>
  );
}
