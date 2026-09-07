import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'shared-bionic-hand-10-1038-s41467-025-65965-9',
  subtitle: '机器自动贴合、用户调节抓力的连续共享假肢控制',
  sourceNote: '已通过 Nature DOI、PubMed 和开放 PMC 全文预读并核验元数据；尚未发现官方代码，截肢参与者完整个体效应仍需精读补充材料。',
  contributions: [
    '在商用 TASKA Hand 集成接近与压力传感器，并训练逐指控制器预测到物体接触点的运动。',
    '提出随物体相对位置变化的连续共享控制：机器最小力贴合，用户通过 sEMG 保留抓力调节。',
    '在多种抓型、脆弱物转移和保持任务中同时测量成功率、峰值力、认知负担与肌肉用力。',
  ],
  evidence: [
    '完整研究测试 9 名健全肢体参与者和 4 名经桡侧截肢参与者。',
    '脆弱物转移中，共享控制显著提升成功率（p=0.004）并降低峰值力（p<0.001）。',
    '所有物体和实验使用同一套共享控制参数，没有逐对象重新调参。',
    '未检测到物体时仅由用户控制；接近物体后机器逐渐贡献接触运动。',
  ],
  limitations: [
    '截肢参与者仅 4 名且是短期实验，长期家庭使用和更广泛人群适用性未知。',
    '自主部分主要处理逐指接近与接触，不具备通用抓型规划或复杂重抓。',
    '传感和控制集成于特定商用假肢，跨硬件迁移未验证。',
  ],
  relevance: [
    '直接给出“自主稳定器不夺权”的假肢 shared-control 设计范式。',
    '动态权重可连接 EMG 高层命令与触觉/剪切力低层反射。',
    '提示评估除成功率外还应报告认知负担、峰值力和用户控制感。',
  ],
  nextReading: '重点回看 Fig. 3 的连续融合公式与输入重映射、Fig. 4 脆弱物转移、截肢者保持实验，以及 Methods 的统计设计。',
  suggestedTags: ['动态仲裁', '用户保留控制'],
  links: [
    { label: '论文（DOI）', url: 'https://doi.org/10.1038/s41467-025-65965-9' },
    { label: '开放全文（PMC）', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12689642/' },
    { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/41365851/' },
  ],
};
