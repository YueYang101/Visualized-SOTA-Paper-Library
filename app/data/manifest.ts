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
    description: '人机意图融合、仲裁与辅助控制',
    count: 8,
  },
  {
    id: 'retarget-teleop',
    label: 'Retarget & Teleop',
    shortLabel: 'RT',
    description: '动作重定向、遥操作与具身映射',
    count: 8,
  },
];
