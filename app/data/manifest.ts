import type { CategoryManifestItem } from './types';

export const categoryManifest: CategoryManifestItem[] = [
  {
    id: 'robust-grasp',
    label: 'Robust Grasp',
    shortLabel: 'RG',
    description: '抗扰动、闭环反馈与泛化抓取',
    count: 5,
  },
  {
    id: 'shared-control',
    label: 'Share Control',
    shortLabel: 'SC',
    description: '人机意图融合、仲裁与辅助控制',
    count: 7,
  },
  {
    id: 'retarget-teleop',
    label: 'Retarget & Teleop',
    shortLabel: 'RT',
    description: '动作重定向、遥操作与具身映射',
    count: 6,
  },
];
