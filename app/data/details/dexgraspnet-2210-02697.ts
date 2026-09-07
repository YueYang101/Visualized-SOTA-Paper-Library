import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dexgraspnet-2210-02697',
  subtitle: '可微力闭合驱动的 132 万条 ShadowHand 仿真抓取数据集',
  sourceNote:
    '已预读 arXiv v2（8 页）并核验 ICRA 2023 DOI、项目页、官方代码、分支和数据镜像；未下载全量数据或运行旧版 CUDA/Isaac Gym 流水线。',
  contributions: [
    '在可微力闭合优化中加入开放手初始化、反向穿透、自碰撞和关节限位，并用梯度下降提高大规模合成效率。',
    '发布 132 万条 ShadowHand 抓取，覆盖 5355 个物体和 133 个有标签类别，每个实例超过 200 条仿真验证抓取。',
    '以六向重力和穿透阈值筛选抓取，并用 DDG、GraspTTA 的跨数据集训练验证数据质量。',
    '公开对象预处理、抓取生成和仿真验证代码，另有 Allegro、MANO 和桌面抓取分支。',
  ],
  evidence: [
    'A100 上优化 10000 个候选、6000 步需 74 分钟，约 18% 通过验证；全量生成约耗 950 A100 GPU 小时。',
    'DDG 用 DexGraspNet 训练并在同数据集测试时成功率 67.5%，用旧 DDGdata 训练时为 57.4%。',
    '所有入库抓取需在 Isaac Gym 中抵抗六个轴向重力方向各 100 步，且最大穿透不超过 0.1 cm。',
    '官方仓库提供生成/验证脚本、数据格式和下载入口，代码与数据标为 CC BY-NC 4.0。',
  ],
  limitations: [
    '主数据全部面向 ShadowHand；其他手只有生成分支，没有大规模跨手数据或统一策略的实证。',
    '无真实机器人、感知噪声、接近轨迹、闭环反馈或抓后扰动恢复，仿真稳定不能外推为真实鲁棒性。',
    '优化偏向接触丰富的 power grasp，precision/functional grasp 较少且缺少语义指导。',
    '完整生成依赖已知网格、手型几何和约 950 A100 GPU 小时；旧依赖栈及非商业许可证也限制直接复用。',
  ],
  relevance: [
    '可直接复用为 ShadowHand 离线目标姿态库、抓取生成训练集和仿真筛选基线。',
    '跨本体价值在于可微优化框架可按 URDF 和手网格改造，不应误写成一套权重跨任意手。',
    '完全不依赖教师—学生蒸馏，可作为优化生成数据再训练策略的另一条路线。',
  ],
  nextReading:
    '重点回看 §III-B 的初始化与能量项、§III-C 六向重力筛选、Tables II–IV，以及 §VI 对 precision/functional grasp 的限制；复现前再审官方各手型分支。',
  suggestedTags: ['反向穿透能量', '抓取多样性', '离线抓取基线'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2210.02697' },
    {
      label: '正式版（DOI）',
      url: 'https://doi.org/10.1109/ICRA48891.2023.10160982',
    },
    { label: '项目页', url: 'https://pku-epic.github.io/DexGraspNet/' },
    { label: '代码', url: 'https://github.com/PKU-EPIC/DexGraspNet' },
    {
      label: '数据镜像',
      url: 'https://mirrors.pku.edu.cn/dl-release/DexGraspNet-ICRA2023/',
    },
  ],
};
