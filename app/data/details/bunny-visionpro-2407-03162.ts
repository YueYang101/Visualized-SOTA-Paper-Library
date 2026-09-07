import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'bunny-visionpro-2407-03162',
  subtitle: '面向双臂—灵巧手协同、触觉回传与模仿学习的实时 VR 系统',
  sourceNote: '已预读 arXiv、项目页和代码，并核验 IROS 2025 DOI；系统使用 Apple Vision Pro，未直接验证 Meta Quest 或 L20。',
  contributions: [
    '从 Apple Vision Pro 同步获取双腕位姿和手部关键点并映射到双臂灵巧手。',
    '把四连杆等闭链约束并入手部重定向，作者报告单 CPU 约 300 Hz。',
    '机械臂控制在线处理自碰撞、环境碰撞和奇异位形。',
    '用触觉信号驱动低成本 ERM 振动指套，并验证示教对 ACT、Diffusion Policy 和 DP3 的价值。',
  ],
  evidence: [
    '实机由两台 xArm-7 与两只 6 自由度 Ability Hand 组成，共 24 自由度。',
    'Telekinesis 十任务上，系统在 9/10 任务达到或超过 Telekinesis 与 AnyTeleop。',
    '相对同硬件 AnyTeleop+，成功率提高 11%、采集时间降低 45%、轨迹长度降低 19%。',
    '5 名未训练操作者实验中，触觉反馈在 10 组比较中的 9 组维持或提高成功率。',
    '三类模仿学习算法平均成功率比 AnyTeleop+ 数据高 22%。',
  ],
  limitations: [
    'Vision Pro 在手指自遮挡时会产生追踪抖动。',
    'ERM 振动对轻微接触不敏感，且最初采集的训练数据未使用人类触觉反馈。',
    '目标手只有 6 个主动自由度，不能直接代表 L20。',
    '部分跨系统比较采用原论文数字，不是全部在同平台复现。',
  ],
  relevance: [
    '提供 Quest 类头显输入、双腕—双手同步、避碰和时间对齐的工程参照。',
    '闭链约束重定向对具有主动与被动联动关节的 L20 尤其相关。',
    '可把 EMG 作为遮挡补偿或抓型信号，与头显关键点融合。',
  ],
  nextReading: '重点回看 §3.2 闭链重定向、§3.3 避碰与奇异控制、Tables 1/3/4，以及附录的数据时间同步。',
  suggestedTags: ['Quest类输入', 'L20闭链约束', 'EMG遮挡补偿'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2407.03162' },
    { label: '正式论文（DOI）', url: 'https://doi.org/10.1109/IROS60139.2025.11247017' },
    { label: '项目页', url: 'https://dingry.github.io/projects/bunny_visionpro.html' },
    { label: '代码', url: 'https://github.com/Dingry/BunnyVisionPro' },
  ],
};
