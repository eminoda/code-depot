import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 关闭后，开发环境不再双重渲染（Strict Mode 会故意执行两次以帮助发现副作用）
  reactStrictMode: false,
};

export default nextConfig;
