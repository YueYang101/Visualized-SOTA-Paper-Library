import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dro-grasp-2410-01702',
  subtitle: '交互距离表示驱动的跨本体灵巧抓取生成',
  sourceNote:
    '已预读 arXiv v4 / ICRA 2025 版本，并核验项目页、MIT 代码、下载脚本和 v1.0 权重/数据 release；未实际下载约 1.27 GB 资产或运行代码。',
  contributions: [
    '用目标抓取姿态下机器人点云与物体点云的成对距离矩阵统一编码手部运动学和物体几何。',
    '通过配置不变对比预训练，让同一手表面点在不同关节构型下保持特征对应。',
    '以 CVAE 预测交互距离，再用多边定位、逐链接 SVD 与带关节限制的 Jacobian 迭代恢复可执行姿态。',
    '统一模型覆盖 Barrett、Allegro、ShadowHand，并公开多手、单手和部分观测权重。',
  ],
  evidence: [
    '在 10 个未见物体上，Barrett/Allegro/ShadowHand 成功率为 87.30%、92.30%、83.00%，平均 87.53%，耗时 0.49/0.47/0.98 秒。',
    '移除配置不变预训练时平均成功率降为 72.20%；ShadowHand 从 83.00% 降至 46.70%。',
    'xArm6+LEAP Hand 在 10 个未见物体上共 89/100 成功，但依赖预扫描模型、FoundationPose 和候选排序。',
    '零样本迁移不对称：ShadowHand→Barrett 为 83.70%，Allegro→ShadowHand 仅 1.10%。',
  ],
  limitations: [
    '主结果是三手联合训练，不是任意新手即插即用；新手流程要求自有抓取数据、重新预训练和训练。',
    '生成器是静态预测，执行仅用启发式闭合/PD，没有视觉、触觉或力反馈纠错。',
    '真机仅 LEAP、10 个物体，且官方 release 未包含 LEAP 权重、FoundationPose/MPLib 或真机部署代码。',
    '部分观测是人工删除完整模型点云的 50%，未覆盖真实杂乱、严重遮挡或动态物体。',
  ],
  relevance: [
    '三手统一/单手/部分观测权重可直接用于 Barrett、Allegro、ShadowHand 的研究复现。',
    '接入新手时最可复用的是 URDF 点云处理、配置不变编码器和运动学恢复器，而不是现有抓取权重。',
    '无需教师—学生策略蒸馏，适合与跨手策略蒸馏路线对照；但不能替代闭环抗扰控制。',
  ],
  nextReading:
    '重点回看 §III-A–C、Tables II–III、附录真机流程与零样本迁移表，以及官方 README 的“Steps to Apply our Method to a New Hand”。',
  suggestedTags: ['点云匹配', '多边定位', 'CVAE抓取', '零样本迁移'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2410.01702' },
    {
      label: '正式版（DOI）',
      url: 'https://doi.org/10.1109/ICRA55743.2025.11127754',
    },
    { label: '项目页', url: 'https://nus-lins-lab.github.io/drograspweb/' },
    { label: '代码', url: 'https://github.com/zhenyuwei2003/DRO-Grasp' },
    {
      label: '权重与数据',
      url: 'https://github.com/zhenyuwei2003/DRO-Grasp/releases/tag/v1.0',
    },
  ],
};
