import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: '10-15607-rss-2023-xix-014',
  subtitle: '无需奖励或已知目标集合的在线扩散动作修正',
  sourceNote: '已预读 arXiv v4，并以 RSS 官方页、作者项目页和代码仓库核验。v4 新增的人类与 UR5 实验相对会议版的范围仍需精读。',
  contributions: [
    '逐控制周期执行部分前向—反向扩散，把用户动作映射到专家示范分布。',
    '用 forward diffusion ratio γ 连续权衡用户动作保真度与专家行为一致性，并给出偏离用户动作的概率界。',
    '训练只需期望行为示范，不要求奖励、显式目标集合、环境动力学或训练期用户策略。',
  ],
  evidence: [
    'Lunar Lander 的 Noisy pilot 成功率由 20.67±4.50% 提至 68.00±5.35%，崩溃/OOB 由 28.33% 降至 7.67%。',
    'Block Pushing 的 Laggy pilot 正确目标率由 42.00±4.90% 提至 74.33±2.87%。',
    'v4 的 14 人 UR5 放环任务中，成功率由 0.89 升至 1.00，平均步数由 209.23 降至 143.66。',
  ],
  limitations: [
    'γ 全程固定且需人工选择，不随用户熟练度、风险、接触阶段或模型置信度变化。',
    '未处理 pilot 与 expert demonstrations 的状态访问分布失配。',
    '动作级 DDPM 多步去噪的实时开销较高，且没有 EMG、视觉意图或触觉阶段仲裁。',
  ],
  relevance: [
    '是 diffusion/flow shared-control 主线的起点和新仲裁方法的强基线。',
    '可把 γ 改为由 EMG/视觉置信度、接触状态和触觉风险共同决定的时变量。',
    '属于部署期在线共享控制，不是仅服务于示教采集的 shared autonomy。',
  ],
  nextReading: '重点回看 §II-B–II-C、Algorithm 1、Fig. 2、Tables I–IV，以及 v4 Appendix B–C。',
  suggestedTags: ['部分扩散', '控制权保留'],
  links: [
    { label: '论文（RSS）', url: 'https://roboticsproceedings.org/rss19/p014.html' },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2302.12244' },
    { label: '项目页', url: 'https://diffusion-for-shared-autonomy.github.io/' },
    { label: '代码', url: 'https://github.com/ripl/diffusion-for-shared-autonomy' },
  ],
};
