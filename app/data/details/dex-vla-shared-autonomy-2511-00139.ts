import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dex-vla-shared-autonomy-2511-00139',
  subtitle: '用共享自主采集示教，再蒸馏为全自主 arm–hand VLA',
  sourceNote: '已核对 36 页 arXiv v2 正文、附录与项目页；当前为预印本。注意：shared autonomy 用于数据采集，最终策略部署时为全自主。',
  contributions: [
    '提出人控制机械臂、视觉–触觉 hand VLA 控制手指的共享自主示教采集方式，降低高自由度 arm–hand 同步操控负担。',
    '先训练 tactile–proprioception LSTM 和 hand-only DexGrasp-VLA，再用协同轨迹微调统一的 arm–hand VLA。',
    '增加 arm 与 hand 的专用编码器和辅助预测头，用 limb-specific supervision 强化两类动作表示。',
    '针对方向错误和工作空间边缘失败采集纠错轨迹，而不是重复收集大量完整成功示范。',
  ],
  evidence: [
    'hand-only policy 在超过 50 个物体和 5 个杂乱场景中报告 95.5% 成功率。',
    '最终 arm–hand policy 在 seen / unseen objects 上分别为 91.7% / 85.6%，报告平均 88.7%。',
    '触觉消融中，无触觉、resultant force、再加入 spatial tactile feature 的成功率为 21%、70%、90%。',
    'Arm–Hand Feature Enhancement 在 XHand 上由 88% 提至 95%，在 RY-H2 上由 71% 提至 81%；遮挡时由 19% 提至 58%。',
    '共享自主采集速度报告为每小时 110 条轨迹，完整遥操作为 90 条，约提升 22%。',
  ],
  limitations: [
    '没有 NASA-TLX、操作者人数、方差或统计检验，因此“显著降低认知负担”尚未被严格验证。',
    '没有用等量完整遥操作数据与共享自主数据训练同一模型，数据质量优势仍缺直接对照。',
    'arm / hand 分工固定，没有动态 arbitration、用户意图推断或同一自由度上的人机融合。',
    '最终策略把人移出控制回路，因此不能直接当作持续共享控制方案。',
    '触觉直接加入统一 arm–hand policy 时成功率由 95% 降至 82%，说明需要按任务阶段和控制对象选择性融合。',
  ],
  relevance: [
    '直接支持 human wrist / arm + autonomous finger teacher 的混合示教采集路线。',
    '可借鉴 wrist / human-intent、finger / grasp-stability 与 shared context 三分支结构。',
    '触觉更适合在 contact、grasp 和 slip 阶段影响手指，而不是从 reaching 开始均匀注入所有动作预测。',
    '可把错误抓型、滑动、人机冲突和 workspace edge cases 做成定向纠错片段。',
  ],
  nextReading: '选择性回看 §3.2.1、§3.3.2 与 Eq. 8、§3.4.1–3.4.2 与 Fig. 6 / Eq. 12、Tables 2–4，以及 Appendix B.2.1 的触觉负结果。',
  suggestedTags: ['动态仲裁缺口', '阶段触觉门控', '人机混合示教'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2511.00139' },
    { label: '项目页', url: 'https://dexvla-seed.github.io/dex-vla/' },
  ],
};
