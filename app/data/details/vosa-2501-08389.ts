import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'vosa-2501-08389',
  subtitle: '腕部视觉发现目标并按意图置信度动态混合控制',
  sourceNote: '已预读 arXiv v1，并以作者项目页、HRI 2025 官方日程和公开代码核验；正式 DOI 尚未核实。',
  contributions: [
    '提出 perception–prediction–arbitration 框架，用腕部 RGB-D 实时更新未知、移动的候选目标。',
    '结合用户摇杆方向和末端到目标距离形成意图置信度，并动态设置混合系数 α。',
    '无需任务专用预训练或离线示范，在 Kinova Gen3 上完成三类辅助操作用户研究。',
  ],
  evidence: [
    '18 名参与者完成 pick-and-place、deceptive grasping 和 shelving 三项任务。',
    '已知目标中，VOSA 对 oracle baseline 的完成时间和输入量处于预设非劣界。',
    '目标不完整的 deceptive grasping 中，VOSA 的时间和输入量均显著优于错误先验 baseline（p<0.001）。',
    '跨任务信任评分仍低于纯遥操作，说明性能提升尚未转化为更高信任。',
  ],
  limitations: [
    '依赖 YOLOv5、点云聚类和物体质心，对光照、漏检和近距离深度退化敏感。',
    '意图被简化为离散空间目标，未建模抓型、接触模式或在手操作意图。',
    '仲裁依据几何方向和距离，不含 EMG、Quest 姿态、触觉或风险估计。',
  ],
  relevance: [
    '为视觉用户意图、未知候选目标和动态仲裁提供可复现强基线。',
    '可把候选目标扩展为物体部位、抓握预形和接触阶段，并融合 EMG 或 Quest。',
    '属于部署期实时混合控制，而不是示教采集。',
  ],
  nextReading: '重点回看 §IV、Figs. 1/4、三项用户任务、§VI 统计检验，以及结论中的三个模块改进方向。',
  suggestedTags: ['腕部RGB-D', '摇杆意图'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2501.08389' },
    { label: '项目页', url: 'https://sites.google.com/view/zeroshot-sharedautonomy/home' },
    { label: '代码', url: 'https://github.com/aria-lab-code/VOSA' },
  ],
};
