import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'flashback-pmlr-v305-sun25a',
  subtitle: '用一致性蒸馏把扩散共享控制加速到毫秒级',
  sourceNote: '已预读 arXiv:2505.16892，并以 CoRL 2025 PMLR、项目页和官方代码核验；真实实验中的力信号作用仍需精读消融。',
  contributions: [
    '把 ODE 形式扩散教师蒸馏成单步一致性模型，以一次网络调用修正用户动作。',
    'CSA† 通过下一状态预测显式编码用户瞬时运动意图，使结果对辅助比例更不敏感。',
    '统一评估 Lunar Lander、ManiSkill 精密插装和真实 UR5 插装并开放实现。',
  ],
  evidence: [
    'Laggy pilot 上 CSA† 成功率 91.00±3.87%，DDPM 为 75.67±9.30%；推理 1.22 ms，DDPM 为 13.62 ms。',
    '10 名参与者使用 Quest 3 控制真实 UR5 插装，成功率由 66.7% 提至 83.3%，时间由 28.4 s 降至 24.1 s。',
    '0.5 mm 间隙 charger 插装中，DDPM 在十种噪声调度下均无成功，CSA 系列获得非零成功率。',
  ],
  limitations: [
    '辅助强度 α 仍需人工调节，没有随用户质量、风险或接触阶段自动变化。',
    'CSA† 在较高 surrogate 噪声下可能退化，因为下一状态不再代表理性用户行为。',
    '真实实验控制末端位置，并非多指关节级灵巧手策略。',
  ],
  relevance: [
    '直接覆盖 flow/consistency policy、Quest 用户输入、力反馈状态和接触丰富插装。',
    '可作为灵巧手的低时延动作投影器，并与 IDA 或触觉阶段机组合成动态 α。',
    '当前主线中最直接的实时 diffusion/flow shared-control 实现基线。',
  ],
  nextReading: '重点回看 §3、Tables 1–3、真实插装实验、Appendix 7.5–7.6 和 §6 Limitations。',
  suggestedTags: ['PF-ODE蒸馏', '力觉状态'],
  links: [
    { label: '论文（PMLR）', url: 'https://proceedings.mlr.press/v305/sun25a.html' },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2505.16892' },
    { label: '项目页', url: 'https://ripl.github.io/CSA-website/' },
    { label: '代码', url: 'https://github.com/ripl/FlashBackSharedAutonomy' },
  ],
};
