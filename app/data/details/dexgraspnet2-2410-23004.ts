import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dexgraspnet2-2410-23004',
  subtitle: '从 4.266 亿合成标签学习杂乱场景静态灵巧抓姿',
  sourceNote:
    '已预读 arXiv v1 / CoRL 2024 论文及补充材料，并核验 PMLR 正式条目、项目页、官方仓库和 Hugging Face 资源；arXiv 没有可核实的 v2，未运行完整约 319 GB 数据栈。',
  contributions: [
    '构建 7600 个训练场景、670 个测试场景与 4.266 亿个 LEAP 抓姿标签，数据经力闭合、仿真稳定性和场景碰撞筛选。',
    '先从单视角点云预测逐点 graspness，再用局部条件扩散生成 SE(3) 腕姿、用 MLP 回归 16 维关节角。',
    '通过局部条件、腕姿/关节分解建模和随机密度场景，提高对新对象与新杂乱布局的泛化。',
    '公开训练、推理、预处理和 Isaac Gym 评估代码，以及大规模数据与预训练权重。',
  ],
  evidence: [
    'Isaac Gym 六组测试中，GraspNet Dense/Random/Loose 成功率为 90.6%/83.7%/73.2%，ShapeNet 为 81.0%/85.4%/74.2%。',
    'UR5+LEAP+顶视 RealSense D435 在 32 个物体组成的 6 个场景中成功率 90.7%；透明/反光场景经深度修复从 50.0% 升至 80.0%。',
    'RTX 4090 上对 4 万点场景生成并排序 128 个抓姿低于 0.5 秒、约占 3 GB 显存；深度修复另需约 0.2 秒。',
    '官方 Hugging Face 资源约 318.8 GB，含约 6.19 GB checkpoint；论文中的“两阶段”不是教师—学生蒸馏。',
  ],
  limitations: [
    '核心是单帧点云到静态抓姿，执行只做启发式接近、闭合和抬升，不能在线处理动态场景或外扰。',
    '没有触觉；粗手指和 power grasp 数据使小物体、精细抓取与功能抓取仍然困难。',
    '真机结果限于固定顶视相机、32 个物体、6 个场景，并依赖深度修复；没有跨手型迁移。',
    '软件栈固定于旧 Ubuntu/CUDA/Isaac Gym/MinkowskiEngine，且仓库未发布完整真机控制和深度修复集成。',
  ],
  relevance: [
    '已有 LEAP 权重可直接试做静态抓姿候选器；真机仍需自己接相机标定、深度修复、规划和控制。',
    '可把高质量候选、graspness 或 4.266 亿数据作为闭环策略的初始化与训练先验。',
    '与 ClutterDexGrasp 的区别是：本方法离线预测静态姿态并开环执行；后者是目标条件的闭环清障与抓取策略。',
  ],
  nextReading:
    '重点回看 Fig. 3、Table 1、Table 3、补充材料的数据构建/深度修复/训练细节与推理成本；复现前先评估约 319 GB 资源和旧依赖。',
  suggestedTags: ['静态抓姿生成', '合成抓取基准', '开放权重'],
  links: [
    {
      label: '正式论文（PMLR）',
      url: 'https://proceedings.mlr.press/v270/zhang25j.html',
    },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2410.23004' },
    { label: '项目页', url: 'https://pku-epic.github.io/DexGraspNet2.0/' },
    { label: '代码', url: 'https://github.com/PKU-EPIC/DexGraspNet2' },
    {
      label: '数据与权重',
      url: 'https://huggingface.co/datasets/lhrlhr/DexGraspNet2.0',
    },
  ],
};
