import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dexumi-2505-21864',
  subtitle: '通过外骨骼与视觉替换缩小人手—机器人手具身差距',
  sourceNote: '已预读 CoRL 2025 PMLR、arXiv v3、作者项目页与公开仓库；项目材料将其标为 Best Paper Finalist。',
  contributions: [
    '为不同机器人手优化可穿戴外骨骼，使人类动作落入目标手可行空间并保留直接触觉。',
    '同步记录外骨骼编码器、腕部位姿与触觉，再在目标机器人手上重放。',
    '用 SAM2、ProPainter 和机器人手渲染替换训练视频中的人手与外骨骼，缩小视觉域差距。',
    '在欠驱动 Inspire Hand 与全驱动 XHand 上统一验证多指和长时序技能。',
  ],
  evidence: [
    '两种手、四项真实任务上，学习策略平均成功率为 86%。',
    '作者报告相对传统遥操作的数据采集效率提高 3.2 倍。',
    '镊子取茶叶任务在两种手上平均成功率 85%。',
    '厨房任务消融中，无触觉策略无法稳定抓取调味料。',
  ],
  limitations: [
    '每种机器人手都需重新设计和调节专用外骨骼，不能直接即插即用于 L20。',
    '硬件优化主要匹配指尖工作空间，没有建模掌面和其他链节接触。',
    '固定腕载相机、分割遗漏、修补模糊和光照差异会留下视觉域残差。',
    '触觉漂移、机器人手回差与 3D 打印结构形变会降低映射精度。',
  ],
  relevance: [
    '提供不同于 Quest/视觉/EMG 实时映射的路线：采集时用外骨骼物理约束可行域。',
    '适合采集接触丰富、需要人类直接触感的示范，并可同步记录 EMG。',
    '视频机器人手替换可减少人手示范到 L20 部署的视觉形态差。',
  ],
  nextReading: '重点回看 §3 硬件优化、§4 视觉适配、§5 实验与效率、§7 局限，以及仓库中的 linkage_optimization 与数据流程。',
  suggestedTags: ['L20外骨骼', 'EMG同步采集', '视觉具身适配'],
  links: [
    { label: '论文（PMLR）', url: 'https://proceedings.mlr.press/v305/xu25b.html' },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2505.21864' },
    { label: '项目页', url: 'https://dex-umi.github.io/' },
    { label: '代码与硬件', url: 'https://github.com/real-stanford/DexUMI' },
  ],
};
