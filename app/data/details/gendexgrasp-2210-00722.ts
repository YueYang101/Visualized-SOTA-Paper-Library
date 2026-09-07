import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'gendexgrasp-2210-00722',
  subtitle: '以手无关接触图连接多手数据与新手型姿态优化',
  sourceNote:
    '已预读 arXiv v2 / ICRA 2023 正式版本，并核验项目页、官方代码、预训练权重和 MultiDex 下载入口；未运行旧 CUDA/Isaac Gym 环境。',
  contributions: [
    '以 CVAE 从物体点云生成与手型无关的接触图，再用可微正向运动学优化具体手的全局位姿与关节角。',
    '提出利用物体表面法向的 aligned distance，减少薄壳物体两侧接触被欧氏距离混淆的问题。',
    '发布 MultiDex：436,000 个抓取，覆盖五种二至五指机械手与 58 个日常物体。',
    '用留一手型训练验证接触图可迁移到训练时未出现的手型。',
  ],
  evidence: [
    '留出 ShadowHand、仅用其余四手训练 CVAE 时，成功率 77.19%、关节角多样性 0.207 rad、推理 16.415 秒。',
    '留一手型与全手型训练的成功率分别为：EZGripper 38.59%/43.44%、Barrett 70.31%/71.72%、ShadowHand 77.19%/77.03%。',
    '使用 aligned distance 后三手成功率为 38.59%、70.31%、77.19%；欧氏距离版本为 29.53%、52.19%、58.91%。',
    '官方仓库公开训练、推理、姿态生成、仿真测试脚本和四组 CVAE 权重；方法不含教师—学生蒸馏。',
  ],
  limitations: [
    '只有完整物体点云下的离线目标姿态，没有真机、感知噪声、接近轨迹或闭环反馈。',
    '“未见手型”仍来自五种预定义手之间的留一实验，不是完全独立新硬件的零样本真机验证。',
    '新手仍需 URDF、网格、关节限制、接触区域和手型特定坐标适配；16 秒推理也不适合实时规划。',
    'MultiDex 的 force-closure 近似、58 个物体和未明确的仓库许可证限制了真实与商业复用结论。',
  ],
  relevance: [
    '手无关接触图是跨关节空间的清晰中介表示，适合与 D(R,O) 和形态图策略做直接对比。',
    '官方权重可复现既有五手型的接触图生成；接入新手是中等工程量，并非只换 URDF。',
    '它不靠策略蒸馏；若需要实时闭环，可另行把慢优化器的结果用作策略目标或初始化。',
  ],
  nextReading:
    '重点回看 §III-A 的 MultiDex/DFC、§IV-A–B 的接触图与姿态优化、Tables I–III、Fig. 6 失败案例；复现前检查 HandModel 与手型配置。',
  suggestedTags: ['留一手型泛化', '离线抓取生成', '接触表示'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2210.00722' },
    {
      label: '正式版（DOI）',
      url: 'https://doi.org/10.1109/ICRA48891.2023.10160667',
    },
    { label: '项目页', url: 'https://sites.google.com/view/gendexgrasp/home' },
    { label: '代码', url: 'https://github.com/tengyu-liu/GenDexGrasp' },
    {
      label: 'MultiDex',
      url: 'https://sites.google.com/view/gendexgrasp/multidex',
    },
  ],
};
