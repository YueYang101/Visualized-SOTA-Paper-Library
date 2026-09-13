import type { CategoryManifestItem } from './types';

export const categoryManifest: CategoryManifestItem[] = [
  {
    id: 'grasping',
    label: 'Grasping',
    shortLabel: 'G',
    description: '跨本体泛化 · Robust · 任务理解',
    count: 21,
  },
  {
    id: 'shared-control',
    label: 'Share Control',
    shortLabel: 'SC',
    description: '意图融合 · Human Model',
    count: 16,
  },
  {
    id: 'retarget-teleop',
    label: 'Retarget & Teleop',
    shortLabel: 'RT',
    description: '动作重定向、遥操作与具身映射',
    count: 10,
  },
  {
    id: 'online-learning',
    label: 'Online Learning',
    shortLabel: 'OL',
    description: '在线个性化 · 交互反馈 · 控制器适应',
    count: 4,
  },
];
