import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: '10-52202-079017-4075',
  subtitle: '用目标无关价值优势决定扩散 copilot 何时接管',
  sourceNote: '已预读 arXiv:2409.15317，并以 NeurIPS 2024 官方论文页和 DOI 核验；未找到稳定的作者代码仓库。',
  contributions: [
    '提出 Interventional Assistance，在每个控制周期选择用户动作或 copilot 动作。',
    '对目标空间积分计算优势分数，仅在 copilot 对所有可能目标都更优时介入。',
    '给出在近最优或低性能 pilot 条件下的回报下界，并与目标遮蔽扩散 copilot 组合成 IDA。',
  ],
  evidence: [
    '8 名无经验参与者各完成 270 次 Lunar Lander；成功率为用户单独 14.0%、持续扩散 68.2%、IDA 91.7%。',
    'IDA 对用户单独和持续 copilot 的成功率提升均达到 p<0.01。',
    'IDA 超时率 0.1%，持续 copilot 为 13.8%，选择性介入减少了“安全但不完成目标”。',
    '主观易用、可控和自主性评分也优于持续 copilot（p<0.01）。',
  ],
  limitations: [
    '需要可查询状态—动作价值的专家策略，真实灵巧操作中不一定容易获得。',
    '仲裁是硬二元切换，接触瞬间可能需要额外平滑或滞回。',
    '人类验证仅为二维 Lunar Lander，没有机械臂、灵巧手、EMG 或触觉实验。',
  ],
  relevance: [
    '是动态 arbitration 的核心强基线，可将价值比较扩展为触觉风险、接触稳定性或意图置信度。',
    '适合构造 approach、contact、closure、manipulation 等阶段相关的介入门控。',
    '明确属于部署时在线 shared autonomy。',
  ],
  nextReading: '重点回看 §3.4、Theorem 1、Tables 2–3、Figs. 3–4、Appendix A 与 C–D。',
  suggestedTags: ['硬切换', '性能下界'],
  links: [
    { label: '论文（NeurIPS）', url: 'https://papers.nips.cc/paper_files/paper/2024/hash/e7ba43ea2a7f94d86e69de761e178792-Abstract-Conference.html' },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2409.15317' },
    { label: 'DOI', url: 'https://doi.org/10.52202/079017-4075' },
  ],
};
