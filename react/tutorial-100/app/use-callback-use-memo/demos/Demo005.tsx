"use client";

export function Demos005() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">005 React Compiler 开启</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        本 demo 意图：介绍 React 19 配合 React Compiler 可自动分析并插入 useMemo、useCallback，工程上很多手写可删掉；但理解「何时值得包」仍重要，便于调试与优化。
      </p>
    </div>
  );
}
