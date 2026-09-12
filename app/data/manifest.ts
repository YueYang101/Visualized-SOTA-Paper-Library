import type { CategoryManifestItem } from './types';

export const categoryManifest: CategoryManifestItem[] = [
  {
    id: 'robust-grasp',
    label: 'Robust Grasp',
    shortLabel: 'RG',
    description: '抗扰动、闭环反馈与泛化抓取',
    count: 16,
  },
  {
    id: 'perception-understanding',
    label: '感知与理解',
    shortLabel: 'PU',
    description: '物体部件、可供性、语义抓取与意图理解',
    count: 5,
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
