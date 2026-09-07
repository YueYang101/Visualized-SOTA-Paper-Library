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
  experiments: [
    {
      title: '人类 Lunar Lander 目标选择实验',
      setup: '8 名无经验参与者，每人 270 次试验；比较用户单独、持续扩散 copilot 与 IDA，考察成功、超时及主观体验。',
      result: '成功率分别为 14.0%、68.2% 与 91.7%；IDA 相对两个对照的提升均达到 p<0.01，超时率仅 0.1%，持续 copilot 为 13.8%。',
      takeaway: '只在 copilot 对所有可能目标都更优时介入，比持续辅助更能同时保留目标自主性并完成任务。',
      source: 'Tables 2–3、Figs. 3–4、Appendix C–D',
    },
    {
      title: '主观可控性与自主性感受',
      setup: '同一人类实验后比较不同辅助方式的易用、可控和自主性评分。',
      result: 'IDA 的主观评分优于持续 copilot，论文报告差异达到 p<0.01。',
      takeaway: '动态二元仲裁不仅提高任务结果，也缓解持续 copilot 对用户控制感的侵蚀。',
      source: 'Table 3、Appendix D',
    },
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
