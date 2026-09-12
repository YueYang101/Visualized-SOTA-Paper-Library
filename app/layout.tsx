import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '文献脉络图',
  description:
    'Grasping（跨本体泛化、Robust、任务理解）、Share Control 与 Retarget & Teleop 文献知识地图',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
