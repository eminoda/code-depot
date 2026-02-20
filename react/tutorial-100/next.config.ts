import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 关闭后，开发环境不再双重渲染（Strict Mode 会故意执行两次以帮助发现副作用）
  reactStrictMode: false,
  // DEBUG=1 时启用教学模式（隐藏文章页左侧菜单），需在 .env 或 .env.local 中设置
  env: {
    NEXT_PUBLIC_DEBUG: process.env.DEBUG,
  },
};

export default nextConfig;
