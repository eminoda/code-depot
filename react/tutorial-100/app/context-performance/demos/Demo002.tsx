"use client";

import React, { useState } from "react";
import { AdminUserContext, AdminLayout } from "./AdminLayout";

/** Demo002：Context 共享用户昵称，修改后所有组件重渲染 */
export function Demos002() {
  const [user, setUser] = useState({ nickname: "张三" });

  // ❌ value 每次都是新对象，所有 consumer 重渲染
  const value = { user, setUser };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        Context 共享用户昵称，修改后整棵子树重渲染
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        标题栏悬停可修改昵称；修改后 Header、Sidebar、Content 都会重渲染，打开控制台看日志。
      </p>
      <AdminUserContext.Provider value={value}>
        <AdminLayout />
      </AdminUserContext.Provider>
    </div>
  );
}
