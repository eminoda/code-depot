"use client";

import { React17DemoFrame } from "./React17DemoFrame";

/** 示例 3：React 17 — setTimeout 里不批处理，两次 setState → 两次渲染（会打印两次「触发渲染」）。通过 iframe + script 加载 React 17，用 window.React 运行。 */
export function Demos003() {
  return (
    <div className="space-y-4">
      <React17DemoFrame
        title="示例 3：React 17 — setTimeout 里不批处理"
        description="两次 setState → 两次渲染，控制台会打印两次「触发渲染」。下方 iframe 内通过 script 加载 React 17，使用 window.React / window.ReactDOM 渲染。"
        iframeHeight={220}
      />
    </div>
  );
}
