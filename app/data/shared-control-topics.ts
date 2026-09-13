import type { SharedControlTopicManifestItem } from './types';

// 用户指定的 Share Control 两个分类；未经用户要求，不增加其他分类。
export const sharedControlTopicManifest: SharedControlTopicManifestItem[] = [
  {
    id: 'intent-fusion',
    label: '意图融合',
    shortLabel: '意图融合',
    description: '将用户输入、意图估计与机器人策略结合，用于仲裁、辅助或低层执行。',
  },
  {
    id: 'human-model',
    label: 'Human Model',
    shortLabel: 'Human Model',
    description: '根据用户已经发生的动作前缀，预测其最终抓取位置、姿态或抓握类型。',
  },
];
