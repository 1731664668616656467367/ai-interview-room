import type { ReactNode } from "react";

import "./globals.css";

export const metadata = {
  title: "AI面试室模拟 - 产品经理大厂校招压力面试 Agent",
  description:
    "AI面试室模拟：上传简历，选择面试官风格，进入 AI 模拟面试间，实时动态追问，结束后生成面试诊断报告。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
