import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'crossdex-2410-02479',
  subtitle: '统一动作与观测接口下的跨灵巧手视觉抓取策略',
  sourceNote:
    '已预读 arXiv v1，并核验 ICLR 2025 正式论文、项目页与官方仓库；仓库已含仿真 RL/DAgger 源码，但未提供策略权重、真机栈或许可证。',
  contributions: [
    '以 MANO 人手 eigengrasp 作为统一动作空间，再经每种手的神经重定向器映射到关节目标。',
    '去掉手关节角和机器人 ID，只用掌心、最多四个指尖、机械臂状态及物体状态/点云构成统一观测。',
    '逐物体训练跨四手的特权状态 PPO 教师，再用 DAgger 蒸馏为覆盖全部物体和手的单一视觉策略。',
    '以 MLP 近似逐步优化式 DexPilot，并随机化手—臂安装位置以提高新本体泛化。',
  ],
  evidence: [
    '45 个 YCB 物体上，单一视觉策略对四个训练手平均成功率 80.0%，对未见 LEAP/Inspire 为 35.2%；状态策略为 88.5%/39.1%。',
    '在未见 LEAP 上微调后，YCB 全物体视觉策略达 64.3%，从头训练为 43.6%；55 个未见 GRAB 物体为 74.0% 对 31.3%。',
    '安装位置随机化且不提供本体标签时，未见手视觉成功率由 20.9% 升至 35.2%；加入机器人 ID 反而损害迁移。',
    '真机只在 RM65+LEAP 上给出定性视频，没有物体数、试验次数或成功率。',
  ],
  limitations: [
    '“零样本新手”仍要求目标手 URDF、语义关键点和单独训练的 MANO→机器人重定向网络。',
    '未见手视觉成功率只有 35.2%，且无外力扰动、触觉闭环、动态场景或抓后滑移恢复。',
    '逐物体 PPO 教师使训练成本随物体数增长，再蒸馏成多物体视觉策略的链路较重。',
    '仓库无 checkpoint、release、许可证和相机/分割/控制代码，适合研究复现，不是开箱即用真机系统。',
  ],
  relevance: [
    '“共享高层动作空间 + 手专用低层适配器”是跨本体策略的重要分层基线。',
    '去掉机器人 ID 和关节角、只保留共同任务空间关键点的消融，为避免过拟合具身标签提供直接证据。',
    '它解释了当前常见的逐物体特权教师→师→DAgger 视觉学生趋势，也清楚暴露了成本和迁移上限。',
  ],
  nextReading:
    '重点回看 §4.1–4.3、Table 1、Table 2、Table 4、Algorithm 1 与附录 B；复现前检查官方 README、数据依赖及 checkpoint 相关 issues。',
  suggestedTags: ['具身随机化', '点云闭环', 'PPO微调'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2410.02479' },
    {
      label: '论文（OpenReview）',
      url: 'https://openreview.net/forum?id=twIPSx9qHn',
    },
    { label: '项目页', url: 'https://sites.google.com/view/crossdex/' },
    { label: '代码', url: 'https://github.com/PKU-RL/CrossDex' },
  ],
};
