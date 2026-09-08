import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'anydexgrasp-2502-16420',
  subtitle: '共享接触几何表征，用数百次真机试抓适配不同灵巧手',
  sourceNote:
    '已预读 29 页 arXiv v1，并核验项目页、官方仓库、运行脚本和权重入口；截至 2026-09 未核实主会或期刊正式接收，也未下载 Google Drive 权重。',
  contributions: [
    '提出手无关的 Contact-centric Grasp Representation：在局部规范坐标中编码抓取深度、平面内角度、距离和表面法向。',
    '完整 mesh 可直接生成 CGR 标签：以 5 mm 分辨率取表面 seed，每点采样 300 个球面 approach directions，每个 seed-view 再表示 48 个 roll 与 5 个 depth 的局部几何。',
    '先由点云网络预测共享 CGR，再将其映射到每只手的预定义抓型，用轻量分类器预测真机成功概率。',
    '在 DH-3、Allegro、Inspire 三种不同结构的手上共享感知表征，只为每只手重新收集少量二元成败标签。',
    '用局部几何覆盖分析说明：增加每个训练物体上的局部采样密度，比单纯增加物体数更有效。',
  ],
  evidence: [
    '40 个训练物体、每抓型 100 次试抓时，DH-3 共 400 条数据达到 94.5%，Allegro 1000 条达到 75%，Inspire 800 条达到 77%。',
    '使用 144 个训练物体和更多真机数据时，三手在日常物体上为 97%、78%、83%，启发式基线为 66%、51%、58%。',
    '测试采用 UR5、腕上 RealSense D415 和约 150 个未见物体，成功以把物体搬运到目标位置计。',
    '通用表征并非只用数百次试抓训练：它从 GraspNet 场景重标注超过十亿个 CGR；每手少样本只训练下游决策器。',
    '网络生成 200 个抓姿约 0.5 秒，但 Open3D CPU 碰撞检测另需约 20 秒。',
  ],
  experiments: [
    {
      title: '每手少量真机试抓适配',
      setup:
        '40 个训练物体，每个预定义抓型收集 100 次真机成功/失败样本；在约 150 个未见日常与对抗物体的杂乱场景中测试。',
      result:
        'DH-3 使用 400 条试抓数据达到 94.5%，Allegro 使用 1000 条达到 75%，Inspire 使用 800 条达到 77%。',
      takeaway:
        '少样本是指手专属决策器的适配成本，不包括前端超过十亿个 CGR 标签的预训练。',
      source: '§3.2–3.3、Fig. 5',
    },
    {
      title: '更多真机数据下的三手对照',
      setup:
        '使用 144 个训练物体，DH-3/Inspire 每抓型约 1000 条、Allegro 每抓型约 200 条试抓数据；对照对齐主闭合轴、只做碰撞检测的启发式方法。',
      result:
        '三手在日常物体上分别为 97%/78%/83%，启发式基线为 66%/51%/58%；在对抗物体上为 99%/82%/79%，基线为 72%/54%/59%。',
      takeaway:
        '真机成败预测器能在几何启发式候选上学到明显的手专属可执行性修正。',
      source: '§3.1、Fig. 4',
    },
    {
      title: 'Allegro 抓型数量消融',
      setup:
        '在对抗物体上比较 Allegro 使用全部 10 种抓型、最优 5 种与单一最优抓型。',
      result: '成功率分别为 80.3%、77.6% 和 67.3%。',
      takeaway:
        '有限但多样的手专属抓型能适应不同物体几何与杂乱空间；论文的最终表现并非由纯手无关 CGR 独立产生。',
      source: '§3.4、Fig. 6C',
    },
  ],
  limitations: [
    '“human-level learning efficiency”只描述每手决策适配，未计入十亿级 CGR 预训练成本。',
    '每只新手仍需定义抓型与闭合轴、准备几何和碰撞模型、接控制器并重新收集真机数据，不能零样本接入。',
    '单次视觉后开环闭合，无触觉反馈、在线纠错或受扰恢复；鲁棒证据主要是跨物体和杂乱场景。',
    'CGR 只提供接触位置与法向的几何先验，没有指尖分工、显式摩擦锥/抓取 wrench 求解、关节力矩余量或力闭合保证。',
    '论文没有 Jacobian 条件数、奇异位形惩罚、关节限位裕量或人体工学目标；人类 grasp taxonomy 只用于人工选取部分预抓型。',
    '官方实现只覆盖三款手且依赖旧 CUDA/MinkowskiEngine 和专用硬件接口，CC BY-NC 也限制商业使用。',
  ],
  relevance: [
    '已支持三款手的代码与权重入口适合作为研究原型；新硬件更适合复用 CGR 和数据采集框架，而不是直接部署。',
    '它提供一条不靠教师—学生策略蒸馏的路线：解析几何标签预训练共享表示，再用少量真机二元数据适配。',
    '若用于鲁棒抓取，应把 20 秒碰撞检测、无触觉开环执行和有限抓型作为优先改进点。',
    '对 L20 更合理的接入是保留手无关 CGR，另建包含指长、关节轴/限位、PIP–DIP 耦合、指腹和力矩上限的 morphology adapter，而非直接复用 Allegro 关节模板。',
  ],
  nextReading:
    '重点回看 Fig. 1、§2.2/Eqs. 6–9 的 CGR，§5.2 的 300 view×48 roll×5 depth 预测与候选筛选，§5.3 的 mesh 标注，Fig. 5 的少样本数字，以及§4.1 的十亿级标注成本。',
  suggestedTags: ['点云抓取', '抓型离散化', '真实试错', '手无关表征'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2502.16420' },
    { label: '项目页', url: 'https://graspnet.net/anydexgrasp/' },
    { label: '代码', url: 'https://github.com/graspnet/AnyDexGrasp' },
    {
      label: '模型权重与数据',
      url: 'https://drive.google.com/drive/folders/1XfJmEkg29vq7swCndnS_B0Y4djwWhZRo',
    },
  ],
  qa: [
    {
      id: 'qa-001',
      question: 'AnyDexGrasp 是否真正实现了跨本体，共享的抓取 skill 是什么？',
      answer:
        '它共享的是物体侧“哪里、从什么方向可能适合接触”的 CGR，而不是通用手指控制 skill。最终抓型、主闭合轴、CGR→关节模板映射、成功率预测与执行仍然按手定制；新手需新建这一适配层并收集少量真机成败数据，不是未见手的完全零样本执行。',
      updatedAt: '2026-09-08',
      relatedQaIds: ['qa-002', 'qa-006'],
      sources: [
        {
          label: '§2.1、Eqs. 2–5',
          url: 'https://arxiv.org/html/2502.16420v1#S2.SS1',
        },
        { label: '§5.2', url: 'https://arxiv.org/html/2502.16420v1#S5.SS2' },
      ],
    },
    {
      id: 'qa-002',
      question: 'CGR 到底是什么，可以直接从完整 mesh 计算吗？',
      answer:
        'CGR 是附着在候选局部坐标系 (R,t) 上的物体几何扫描，不是单个点或最终抓姿。训练时先以 5 mm 分辨率体素化 mesh，从全部表面 seed 与 300 个 approach 组合计算 CGR；每个 CGR 用 48×5 个径向距离 d 和法向夹角 θ 描述不同 roll/depth 下的局部表面。已知 mesh 可绕过点云网络直接生成 CGR，但仍不能直接得到任意手的最优可执行抓姿。',
      updatedAt: '2026-09-08',
      relatedQaIds: ['qa-003', 'qa-006'],
      sources: [
        {
          label: '§2.2、Eqs. 6–9',
          url: 'https://arxiv.org/html/2502.16420v1#S2.SS2',
        },
        {
          label: '§5.3 Data Annotation',
          url: 'https://arxiv.org/html/2502.16420v1#S5.SS3',
        },
      ],
    },
    {
      id: 'qa-003',
      question: '300 个 approach、48 个 roll、5 个 depth 分别是什么？',
      answer:
        '300 是在三维单位球面上近似均匀采样的手掌接近方向，不是一个圆的 300 个角度，也不是由 48×5 推导出来的。48 是接近轴已确定后，手绕该轴旋转一圈的 roll，间隔 7.5°；5 是沿接近轴的 5/10/20/30/40 mm 抓取深度。而 mesh 的 5 mm 体素尺寸只是表面 seed 的采样分辨率，与第一个 5 mm depth 数值相同但含义不同。',
      updatedAt: '2026-09-08',
      relatedQaIds: ['qa-002', 'qa-004'],
      sources: [
        {
          label: '§5.2 Representation Model',
          url: 'https://arxiv.org/html/2502.16420v1#S5.SS2',
        },
        {
          label: '官方球面 view 采样代码',
          url: 'https://github.com/graspnet/AnyDexGrasp/blob/main/utils/pt_utils.py#L49-L57',
        },
      ],
    },
    {
      id: 'qa-004',
      question: 'CGR 是对所有点建模吗，高质量候选如何筛选？',
      answer:
        '离线标注近似对全部 5 mm 表面 seed×300 views 计算；推理时骨干网络先为所有输入体素点预测 objectness 和 point graspness，再从合格点中用分数与 FPS 保留约 1024 个空间分散的 seed。每个 seed 对 300 views 评分并在推理时只取最高 view，再产生 48×5 个 score/width。具体测试协议保留 top-100 CGR，与该手全部抓型展开后用手专属预测器重评分，取 top-200 做碰撞检测，最后选一个。',
      updatedAt: '2026-09-08',
      relatedQaIds: ['qa-003', 'qa-005'],
      sources: [
        { label: '§5.2、§5.4', url: 'https://arxiv.org/html/2502.16420v1#S5' },
        {
          label: '官方 seed/view 筛选代码',
          url: 'https://github.com/graspnet/AnyDexGrasp/blob/main/models/minkowski_graspnet_single_point.py#L97-L270',
        },
      ],
    },
    {
      id: 'qa-005',
      question: '每只手是否有预定义手势，系统如何与 CGR 匹配？',
      answer:
        '是，每只手有有限的预抓型 anchor poses：DH-3 由关节空间离散得到，Allegro/Inspire 从人类 grasp taxonomy 中人工挑选硬件可执行的抓型。系统不做“最相似手势”的近邻匹配；它将每个高分 CGR 与该手所有抓型组合，对齐人工指定的主闭合轴，再由每手/每抓型的真机成功预测器排序。手到达预抓姿后继续闭合，真实接触位置由几何、闭合轨迹和力限共同决定。',
      updatedAt: '2026-09-08',
      relatedQaIds: ['qa-004', 'qa-006'],
      sources: [
        {
          label: '§2.3、Fig. 2',
          url: 'https://arxiv.org/html/2502.16420v1#S2.SS3',
        },
        { label: '§5.1–5.2', url: 'https://arxiv.org/html/2502.16420v1#S5' },
      ],
    },
    {
      id: 'qa-006',
      question: 'CGR 能保证多指接触、施力方向、人体工学与奇异点安全吗？',
      answer:
        '不能。CGR 可提供局部表面距离和法向，并以对向接触作为几何代理，但不为具体指头分配接触点，也不显式求解摩擦锥内的接触力、抓取矩阵、关节力矩或任务 wrench。论文也没有 Jacobian/奇异位形、关节限位裕量或人体工学目标；这些只被预定义抓型、碰撞检测、闭合力限和真机成败数据间接约束，没有形式保证。',
      updatedAt: '2026-09-08',
      relatedQaIds: ['qa-001', 'qa-002', 'qa-005'],
      sources: [
        {
          label: '§4.1 Force-closure discussion',
          url: 'https://arxiv.org/html/2502.16420v1#S4.SS1',
        },
        { label: '§2.3', url: 'https://arxiv.org/html/2502.16420v1#S2.SS3' },
      ],
    },
  ],
  humanSummary: [
    'AnyDexGrasp 的跨本体核心是将物体侧局部接触几何 CGR 与手侧执行拆开；它学到“哪里可能好抓”，不是跨手的闭环手指控制 skill。',
    '完整 mesh 可直接高密度生成 CGR，可减少单视角点云的遮挡与法向错误；但 mesh 不含手指可达性、摩擦、力矩、任务外力和用户意图，不能单独决定任意手的最优抓姿。',
    '300 view、48 roll 和 5 depth 分别覆盖三维接近方向、绕接近轴的手掌方向，以及沿轴的进入深度；这些是独立离散维度。',
    '论文的最终“最优”只是有限候选中，手专属预测分最高且通过点云碰撞检测的一个；不是连续接触—关节—力空间的全局最优或力闭合证明。',
    '面向 L20，应将 CGR 作为共享候选，再使用 L20 的指长、16 主动自由度、PIP–DIP 耦合、关节限位、Jacobian、力矩和碰撞约束进行可执行投影，必要时再加触觉/电流闭环。',
  ],
};
