import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dexter-2601-16046',
  subtitle: '先显式回答“哪根手指接触哪里”，再生成语言条件的灵巧手抓姿',
  sourceNote:
    '已预读 18 页 arXiv v2（2026-04-26），核对主文表 1–5、补充材料的部分点云和失败模式。论文提供项目页；截至本次整理未在论文中找到公开代码仓库。',
  contributions: [
    '将多指接触集合 C={(link, position)} 设计为语言语义与最终抓姿之间的具身推理中间层。',
    '用统一的下一 token 预测框架，依次生成手指 link token、三维接触位置 token 和完整 Shadow Hand 动作 token。',
    '以 MuJoCo 精确碰撞查询为 DexGYS 与 Dexonomy 自动增补接触链路和表面位置标注，并用 VLM 为 Dexonomy 生成抓取指令。',
    '提出 contact-position dropout，训练时随机保留“哪些 link 接触”而省略精确坐标，改善不同粒度条件下的生成。',
    '借助自回归前缀实现 steerable generation：用户可指定 1–5 个手指接触约束，模型补全其余接触与抓姿。',
  ],
  evidence: [
    'DexGYS 上 DextER 的 P-FID 为 0.20、仿真成功率为 67.14%；DexGYSNet 分别为 5.60 和 63.31%。',
    '去掉接触推理后，P-FID 由 0.20 退化到 0.30，成功率由 67.14% 降到 62.37%，Q1 由 0.89 降到 0.66。',
    '预测接触 link 的 IoU / F1 为 0.42 / 0.57；以 1 cm 为阈值的接触位置准确率为 0.79。',
    '在仅保留约 35% 点、并加入深度与横向噪声的零样本测试中，成功率从 67.14% 降到 65.77%。',
    '单张 A6000 上平均推理 1.458 秒，比直接生成抓姿的 1.105 秒多出约 0.35 秒。',
  ],
  experiments: [
    {
      title: 'DexGYS 语言条件抓取',
      setup:
        '输入未见物体的完整点云与功能指令，在 Isaac Gym 中评估意图一致性、稳定性、穿透与生成多样性。',
      result:
        '成功率 67.14%，比上一个最强基线高 3.83 个百分点；P-FID 从 5.60 降到 0.20。',
      takeaway:
        '显式接触中间层同时帮助任务意图对齐和物理稳定，收益不是单纯来自更大的 LLM。',
      source: '§4.2、Table 1',
    },
    {
      title: 'Dexonomy 零样本组合泛化',
      setup:
        '按物体和 grasp taxonomy 是否在训练中出现划分为 Seen、Unseen Object、Unseen Taxonomy 和 Unseen Both。',
      result:
        '对未见物体的泛化明显好于未见抓取类型；Unseen Both 上的抓取成功率仅 8.41%。',
      takeaway:
        '论文支持的是跨物体 / 跨抓取 taxonomy，不是跨机器手本体泛化。',
      source: '§4.4、Table 3',
    },
    {
      title: '部分接触约束的可控生成',
      setup:
        '将 1–5 个 link-position 对作为已知前缀，让模型自回归补全剩余接触和动作。',
      result:
        '约束越多，意图距离总体越低，成功率通常上升；但未见 taxonomy 下仍常出现抖动与不稳定。',
      takeaway:
        '这个接口比纯文字描述更精确，可用于功能接触、禁入区域和失败调试。',
      source: '§4.5、Table 3',
    },
  ],
  limitations: [
    '只在 Shadow Hand 上训练与评估；link token 直接绑定手部链路名称，不能证明跨本体。',
    '主实验是单个静态物体与仿真执行，没有真机、杂乱遮挡、触觉闭环或受扰恢复证据。',
    '连续接触与关节量化成 token 会引入误差；补充材料将 14.7% 失败案例归因于量化造成的穿透。',
    '自回归生成存在误差累积，1.458 秒的 A6000 推理也不是高频在线控制。',
    '位置 token 是数据集绑定的全局 XYZ 分箱，没有显式摩擦锥、力矩分配、关节限位余量或碰撞后处理。',
  ],
  relevance: [
    '它很适合作为“意图→接触约束”的高层模块，再把约束交给专门的跨本体求解器或闭环策略。',
    '对共享控制而言，部分 link-position 前缀是一种可解释、可编辑的用户约束接口。',
    '与 AnyDexGrasp 的手无关 CGR 不同，DextER 预测的是 Shadow Hand 特定 link 接触；要用于 L20，需要接触语义映射而不能直接复用 token。',
    '最值得复现的消融是“接触推理 vs. 直接动作”；真机可用性则应另行补充抓姿优化、碰撞检查和触觉稳定器。',
  ],
  nextReading:
    '优先回看 Fig. 2 的 token 流、§3.2 的 link-position 表示、Table 1 的接触推理消融、Table 3 的未见 taxonomy 与 steerable generation，以及补充 B.1 的量化穿透失败。',
  suggestedTags: ['功能性抓取', '接触 token', '部分接触约束', '自回归策略'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2601.16046' },
    { label: '论文 PDF', url: 'https://arxiv.org/pdf/2601.16046' },
    { label: '项目页', url: 'https://junha-l.github.io/dexter' },
  ],
  qa: [
    {
      id: 'qa-001',
      question: 'DextER 学的是 where to grasp，还是完整的抓取策略？',
      answer:
        '两者之间：它先预测特定手指 link 在物体表面的接触位置，然后生成完整的手腕位姿和关节配置。但它是一次性静态抓姿生成，不是从视觉观测到接近、闭合、抗扰的高频闭环策略。',
      updatedAt: '2026-09-08',
      sources: [
        { label: '§3.1–3.2', url: 'https://arxiv.org/html/2601.16046v2#S3' },
        { label: '§5 Limitations', url: 'https://arxiv.org/html/2601.16046v2#S5' },
      ],
    },
    {
      id: 'qa-002',
      question: '它的接触推理为什么不等于跨本体表示？',
      answer:
        '因为 link token 是 Shadow Hand 的具体解剖名称，动作 token 也直接编码该手的位姿和关节。论文的“Unseen grasp taxonomy”指未见的抓取类型，不是未见机器手；整篇没有第二种机器手的训练或测试。',
      updatedAt: '2026-09-08',
      sources: [
        { label: '§3.2 Contact representation', url: 'https://arxiv.org/html/2601.16046v2#S3.SS2' },
        { label: '§4.4 Dexonomy', url: 'https://arxiv.org/html/2601.16046v2#S4.SS4' },
      ],
    },
    {
      id: 'qa-003',
      question: '论文声称的 96.4% 提升应该怎么理解？',
      answer:
        '这是意图对齐指标 P-FID 从 DexGYSNet 的 5.60 降到 0.20 所对应的相对改善，不是抓取成功率提升 96.4%。物理成功率是从 63.31% 到 67.14%，绝对提升 3.83 个百分点。',
      updatedAt: '2026-09-08',
      sources: [
        { label: 'Table 1', url: 'https://arxiv.org/html/2601.16046v2#S4.SS2' },
      ],
    },
  ],
};
