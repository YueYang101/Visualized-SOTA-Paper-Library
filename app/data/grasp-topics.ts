import type { GraspTopicManifestItem } from './types';

// 用户指定的三个分类；未经用户要求，不增加其他 Grasping 分类。
export const graspTopicManifest: GraspTopicManifestItem[] = [
  { id: 'cross-embodiment', label: '跨本体泛化', shortLabel: '跨本体泛化', description: '不同机械手、自由度与运动学之间的抓取迁移和泛化。' },
  { id: 'robust', label: 'Robust', shortLabel: 'Robust', description: '稳定抓取、抗扰动、闭环反馈及复杂场景中的可靠执行。' },
  { id: 'task-understanding', label: '任务理解', shortLabel: '任务理解', description: '物体部件、可供性、任务语义及 VLM / LLM 辅助理解。' },
];
