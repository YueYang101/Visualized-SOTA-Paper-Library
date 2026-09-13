import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dexgen-2502-04307',
  subtitle: '用机器人动作先验承接人的粗动作：Stage 1.3 的极高优先级执行层参考',
  sourceNote:
    '2026-09-13 入库，沿用 Stage 1.3 讨论中对 arXiv:2502.04307v1 方法部分、附录实现说明及作者项目页的预读核验；会议版本为 RSS 2025。尚未完成逐表精读、视频逐项审计或代码复现。作者页 Code (I) 指向 Lightning Grasp 抓姿生成器，未核验完整 DexGen 控制器权重、RL 轨迹数据及 L20 适配。',
  contributions: [
    '以仿真 RL 学习旋转、平移和 Anygrasp-to-Anygrasp 转换，将多任务 rollout 汇集为机器人低层动作数据。',
    'diffusion 模型根据本体状态历史及模式条件生成短时手指关键点运动；inverse dynamics MLP 再把关键点运动转成关节位置控制目标。',
    '部署时把遥操作的粗略关键点运动作为采样梯度引导，兼顾动作先验与输入参考；人类输入不必作为配对数据参与动作先验训练。',
    '将人提供的动作参考与低层接触执行分开，使遥操作可借助动作先验完成重定向、换抓和工具使用。',
  ],
  evidence: [
    'Fig. 4 和 §III-C 明确给出 diffusion＋inverse dynamics 两模块；前者生成运动表示，后者输出可执行关节目标。',
    '§IV 的仿真对照用受扰输入检验稳定性，实机在 Allegro＋Franka 平台展示遥操作辅助和工具操作；预读不把作者的保持时长提升表述写成统一成功率。',
    '附录的模型输入为本体感觉历史，包含关键点、实际关节、目标关节与控制误差；它不是仅凭人手动作预测未来意图的模型。',
  ],
  experiments: [
    {
      title: '仿真：受扰动作输入下的稳定性',
      setup:
        '在仿真中向高层参考动作加入扰动，比较 DexGen 辅助与直接执行受扰参考；考察持物持续时间及任务表现。',
      result:
        '论文报告生成先验能改善受扰输入下的稳定执行。当前卡片未逐表核对各扰动条件的数值与分母，不将摘要中的倍数视为所有任务的共同效果。',
      takeaway: '支持动作修正先验的价值；不证明任意输入均能被安全纠正。',
      source: '§IV-B；Fig. 2、Fig. 5 的动作先验与引导机制',
    },
    {
      title: '实机：人类粗动作引导的灵巧操作',
      setup:
        'Allegro Hand＋Franka Panda，手套捕捉人手动作并 retarget；用 DexGen 辅助重定向、换抓及笔、注射器、螺丝刀等工具操作。',
      result:
        '论文及作者项目页展示多种实机辅助操作与意图跟随。当前预读未汇总逐任务试验分母、置信区间，也未独立复现实机结果。',
      takeaway:
        '是持续遥操作与接触执行结合的直接证据；与 L20、Quest 和单 cube 的接口仍需适配。',
      source:
        '§IV-C–D；作者项目页 Application: Robust Teleoperation with DexGen',
    },
  ],
  limitations: [
    '动作先验的学习数据来自机器人物理交互；Stage 1.2 的最终抓姿标签不能替代这些状态—动作数据。',
    '论文的实机本体是 Allegro；与 L20 关节数相近不表示关节轴、耦合、接触几何、传感或动力学兼容。',
    '采样引导与训练分布提供经验性修正，不构成碰撞、力或稳定性的形式保证。',
    '保持物体的先验可能抵触释放意图；原文说明实际释放时关闭 DexGen 即可，不能据此声称模型已统一学会完整 release 控制。',
    '作者公开入口 Lightning Grasp 是抓姿生成引擎；完整 diffusion／逆动力学 checkpoint 和训练数据的可用性仍需进一步核验。',
  ],
  relevance: [
    '用户指定为超高优先级，对应库内最高档“极高”；应优先精读其训练数据、动作表示和遥操作引导接口。',
    'Stage 1.3 借鉴“实时用户参考／预测目标 → 动作先验 → 关节控制”的分工，先用单 cube 基础控制与目标条件 RL／残差验证。',
    '研究适配建议：Stage 1.2 A／B 的预测可作为额外目标或采样引导，但须保留用户当前输入和取消机制；这是本项目方案，并非原文已验证组合。',
    '用人工正确目标诊断执行器，再接预测目标；比较直接跟踪、预测辅助与专用执行，分别记录抓稳和意图偏离。',
  ],
  nextReading:
    '优先精读 §III-B 数据生成、§III-C / Fig. 4 两模块、§III-D 引导采样、§IV 实验与意图跟随，以及附录 RL 观测、随机化和关键点表示；核对完整控制器发布情况。',
  suggestedTags: ['Anygrasp-to-Anygrasp', '本体感觉历史', 'Stage 1.3'],
  media: [],
  qa: [
    {
      id: 'qa-001',
      question: 'Stage 1.2 已训练预测模型，为什么 Stage 1.3 还参考 DexGen？',
      answer:
        '两者学习目标不同：1.2 根据用户历史预测希望达到的抓姿／运动；DexGen 根据机器人状态学习可执行动作分布，用人的粗动作引导 diffusion，再经逆动力学输出关节目标。其执行能力来自仿真 RL 轨迹，不能由最终手姿标签直接替代。本项目先把 1.2 预测接到几何修正和基础闭环，按失败证据升级目标条件 RL／残差；数据充分后再评估 DexGen 式生成执行。这是适配计划，尚未验证 L20 效果。',
      updatedAt: '2026-09-13',
      sources: [
        {
          label: 'DexGen §III / Fig. 4',
          url: 'https://arxiv.org/html/2502.04307v1',
        },
        {
          label: '我们的 Stage 1.3 计划',
          url: 'https://yueyang101.github.io/Machine-Learning-Handbook/l20-stage1-3-shared-grasp.html',
        },
      ],
    },
  ],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2502.04307' },
    {
      label: 'RSS 2025 会议原文',
      url: 'https://www.roboticsproceedings.org/rss21/p103.pdf',
    },
    {
      label: '作者项目与演示',
      url: 'https://zhaohengyin.github.io/dexteritygen/',
    },
    {
      label: 'Code (I)：Lightning Grasp 抓姿生成器',
      url: 'https://github.com/zhaohengyin/lightning-grasp',
    },
    {
      label: '我们的 Stage 1.3：共享抓取控制',
      url: 'https://yueyang101.github.io/Machine-Learning-Handbook/l20-stage1-3-shared-grasp.html',
    },
  ],
};
