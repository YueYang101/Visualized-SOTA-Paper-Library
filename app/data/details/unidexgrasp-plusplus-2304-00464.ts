import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'unidexgrasp-plusplus-2304-00464',
  subtitle: '用几何课程与通才—专家迭代学习跨物体点云抓取策略',
  sourceNote:
    '已预读 arXiv v2（17 页），并核验 ICCV 2023 正式页面、项目页与官方仓库；未运行代码，仓库只明确提供 state-based checkpoint。',
  contributions: [
    '用点云自编码器的几何—姿态特征组织从少量任务到全部任务的 GeoCurriculum，训练状态通才策略。',
    '从约 27 万个任务的视觉特征聚成 20 个专家子空间，反复执行 PPO 专家微调与通才蒸馏。',
    '扩展 DAgger 同时学习 actor 和 critic，使蒸馏后的通才仍能继续 actor-critic 强化学习。',
    '把最终状态专家跨模态蒸馏为接收多相机融合点云和本体感觉的闭环视觉策略。',
  ],
  evidence: [
    '视觉策略在训练物体、同类未见物体和未见类别上的成功率为 85.4%、79.6%、76.7%；UniDexGrasp 为 73.7%、68.6%、65.1%。',
    '状态策略对应成功率为 87.9%、84.3%、83.1%，说明视觉学生的上限主要来自更强状态教师。',
    '无专家时视觉策略在三组任务上为 77.4%、72.6%、68.8%；加入 20 个几何专家后升至 85.4%、79.6%、76.7%。',
    '含 critic 的 DAgger 在未见类别上达到 83.1%，但它可在线查询教师 checkpoint，监督条件强于只用固定示范的对照。',
  ],
  limitations: [
    '全部实验在 Shadow Hand 仿真中，未验证真机、sim-to-real、外力扰动或安全恢复。',
    '依赖固定多相机、桌面拾取和复杂的 20 专家、多轮 PPO、在线教师查询与两阶段蒸馏链路。',
    '不支持跨手型，也没有杂乱、功能抓取或触觉闭环。',
    '官方仓库依赖旧 Isaac Gym，且未明确发布最终 vision-based checkpoint，不能当作开箱即用真机模型。',
  ],
  relevance: [
    '是“状态/特权专家→视觉学生→再强化学习”范式的代表性强基线，直接解释当前文献中常见的训练—蒸馏趋势。',
    '几何课程和专家聚类可迁移到大规模物体训练，且比对象类别标签更通用。',
    '适合作为训练方法参考；若目标是现有真机快速部署，仍需另建感知与 sim-to-real 栈。',
  ],
  nextReading:
    '重点回看 §4.1–4.4、Fig. 2、含 actor+critic 的 DAgger 目标、Algorithms 1–3、Tables 1–2，以及附录中的训练量和多种蒸馏消融。',
  suggestedTags: ['多任务强化学习', '特权信息教师', 'Shadow Hand'],
  links: [
    {
      label: '论文（ICCV/CVF）',
      url: 'https://openaccess.thecvf.com/content/ICCV2023/html/Wan_UniDexGrasp_Improving_Dexterous_Grasping_Policy_Learning_via_Geometry-Aware_Curriculum_and_ICCV_2023_paper.html',
    },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2304.00464' },
    { label: '项目页', url: 'https://pku-epic.github.io/UniDexGrasp++/' },
    { label: '代码', url: 'https://github.com/PKU-EPIC/UniDexGrasp2' },
  ],
};
