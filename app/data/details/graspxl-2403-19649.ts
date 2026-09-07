import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'graspxl-2403-19649',
  subtitle: '面向多目标、多物体和多种手形态的仿真闭环抓取运动生成',
  sourceNote:
    '已预读 arXiv v2（23 页）并核验 ECCV 2024 正式页面、官方仓库、预训练模型与 Hugging Face 数据入口；未运行 RaiSim，代码与数据为 CC BY-NC 4.0。',
  contributions: [
    '把抓取区域、接近方向、腕旋转和手位置统一为可组合目标，用状态反馈策略连续输出 PD 控制目标。',
    '以每个手链接到最近可抓物体表面的相对向量形成局部几何特征，避免依赖固定类别或全局形状编码。',
    '采用两阶段课程，先学习目标精度，再在可动物体上学习稳定抓取，并用腕部 6-DoF PD 引导目标误差。',
    '只用 58 个物体训练，在 50 万余 Objaverse 物体上测试，并提供 MANO、Allegro、Shadow 和 LEAP 等数据/环境。',
  ],
  evidence: [
    '503,409 个 Objaverse 未见物体按小、中、大尺度的成功率为 85.9%、84.5%、79.0%，平均 82.2%；成功要求抬高超过 10 cm 并稳定至序列结束。',
    'PartNet 上 Allegro、Shadow、Faive、MANO 成功率为 95.3%、94.0%、95.8%、95.0%；ShapeNet 为 83.4%、83.2%、82.4%、81.0%。',
    '移除局部距离特征时 ShapeNet 成功率从 81.0% 降至 70.7%，移除腕部引导降至 68.5%。',
    '官方仓库提供 12 个 RaiSim 环境、预训练模型、对象预处理脚本和 50 万余物体的生成运动数据。',
  ],
  limitations: [
    '全部核心结果来自 RaiSim，没有实体手、sim-to-real 或真实感知测试。',
    '策略依赖精确接触、接触力、物体速度和完整表面距离等仿真特权状态，不能直接部署。',
    '跨手结果证明同一框架可适配多种手，未证明一套 checkpoint 对未见手零样本共享。',
    '对象经过刚体筛选和尺度归一化；鲁棒性只含有限摩擦随机化，没有外力扰动、执行器误差或传感噪声。',
    '使用 RaiSim 需要激活许可，GraspXL 代码与数据为 CC BY-NC 4.0。',
  ],
  relevance: [
    '它是动态闭环策略而非静态抓姿生成器，适合借鉴接近—闭合—抬升一体化控制、局部距离特征和目标课程。',
    '代码、数据和预训练模型可以直接用于仿真生成；真机最现实的路线仍是把它当状态教师，再蒸馏到视觉/触觉学生。',
    '2026 的 DexGrasp-Zero 直接以 GraspXL/RaiSim 为底座，说明其工程和研究基线价值，但不等于真机通用底座。',
  ],
  nextReading:
    '重点回看 Fig. 3/§3、Tables 2/3/5/6、补充材料的训练量和奖励权重，以及官方仓库的 12 个环境、预训练模型与许可证说明。',
  suggestedTags: ['状态策略', '目标驱动抓取', 'RaiSim', 'Objaverse'],
  links: [
    {
      label: '论文（ECCV/ECVA）',
      url: 'https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/3801_ECCV_2024_paper.php',
    },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2403.19649' },
    { label: '项目页', url: 'https://eth-ait.github.io/graspxl/' },
    { label: '代码与模型', url: 'https://github.com/zdchan/GraspXL' },
    { label: '数据', url: 'https://huggingface.co/datasets/zdchan/GraspXL' },
  ],
};
