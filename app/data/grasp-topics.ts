import type { GraspTopicManifestItem } from './types';

export const graspTopicManifest: GraspTopicManifestItem[] = [
  {
    id: 'pose-contact-synthesis',
    label: '位姿 / 接触生成',
    shortLabel: '位姿',
    description: '从物体几何生成手腕位姿、关节角或接触图：where / how to grasp。',
  },
  {
    id: 'task-language-conditioned',
    label: '任务 / 语言条件',
    shortLabel: '任务',
    description: '根据工具用途、可供性或自然语言生成功能性抓取。',
  },
  {
    id: 'cross-embodiment',
    label: '跨本体迁移',
    shortLabel: '跨体',
    description: '在不同手型、自由度与运动学之间共享表示或策略。',
  },
  {
    id: 'scene-level-grasping',
    label: '场景级抓取',
    shortLabel: '场景',
    description: '在杂乱、遮挡或多物体场景中选择目标并生成无碰抓取。',
  },
  {
    id: 'closed-loop-acquisition',
    label: '闭环抓取执行',
    shortLabel: '闭环',
    description: '从接近、闭合到抬升的视觉 / 本体反馈策略与受扰恢复。',
  },
  {
    id: 'post-grasp-stabilization',
    label: '抓后稳定',
    shortLabel: '稳定',
    description: '接触后利用触觉、力或滑移信号在线调节多指抓力。',
  },
];
