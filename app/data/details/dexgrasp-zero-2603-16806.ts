import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'dexgrasp-zero-2603-16806',
  subtitle: '形态对齐图与运动基元实现无需策略微调的跨灵巧手抓取',
  sourceNote:
    '已预读 arXiv v2，并核验 RSS 2026 论文页、项目页、官方仓库、CrossDex 原论文和 GraspXL/RaiSim 依赖；未实际编译，仓库目前主要覆盖仿真教师策略且无顶层许可证。',
  contributions: [
    '按腕、掌骨和各指节的解剖功能单元，把不同手构造成保留不同节点数但语义对齐的图。',
    '在每个节点定义屈曲、外展、轴向旋转三轴运动基元，再通过手特定映射转成物理关节增量。',
    '在图网络每层注入 URDF 的关节限位、速度、轴向、阻尼和连杆信息，并屏蔽不存在或不可行的基元。',
    '用特权仿真教师蒸馏带 LSTM 的无触觉学生，在四种训练手、两种未见仿真手和三种未见真机手上验证。',
  ],
  evidence: [
    '联合训练 Allegro、Shadow、Ability、Schunk 后，无微调测试 LEAP/Inspire 成功率为 93%/82%，平均 85%。',
    '真机 LEAP、Inspire、Revo2 各测试 50 次，成功率为 88%、86%、72%，平均 82%；手内 oracle 为 86%。',
    '移除运动基元后未见手平均成功率从 85% 降至 34%；移除掩码和可行性惩罚降至 63%。',
    '额外未见 Barrett 三指手无需微调达到 70%，但单手训练的跨手结果随源/目标形态差异大幅波动。',
    '官方仓库带约 14 MB 仿真权重和 LEAP/Inspire/Barrett 评测入口；当前入口仍读取仿真 contact/impulse。',
  ],
  limitations: [
    '85% 只直接比较 CrossDex 及作者的 multi-object 改写，不能据此宣称覆盖所有灵巧抓取任务的统一 SOTA。',
    '摘要“提升 59.5%”与表中 85%-26.5%=58.5 个百分点不一致，且 26.5% 不是 CrossDex 原论文的主结果。',
    '“零样本”只免去策略微调；新手仍需 URDF/网格、虚拟腕、关键点、动作映射、C++ 环境修改和重新编译。',
    '公开仓库尚缺论文所述 MAGCN+LSTM 学生、SAM2 感知和三套真机驱动，不能直接上真机。',
    '仓库无顶层许可证；GraspXL 为 CC BY-NC，RaiSim 需许可并有较重的版本与编译依赖。',
  ],
  relevance: [
    '是目前跨本体闭环策略中证据最强的一篇：同时覆盖未见手仿真、未见手真机和三指形态。',
    '语义图、可执行运动基元和 URDF 物理注入比纯 MANO/指尖重定向更贴近关节约束，适合做核心表示基线。',
    '可直接复用的是仿真权重和新手接入 SOP；真实部署仍需补齐学生蒸馏、感知、驱动和许可证。',
  ],
  nextReading:
    '重点回看 §III-B–D、Tables I–III、补充材料的新手图/动作映射、LSTM 蒸馏、失败案例和 Barrett 实验；代码侧重点读 docs/SOP_4_newhand.md。',
  suggestedTags: ['无重定向', '真机零样本', '新手接入'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2603.16806' },
    {
      label: 'RSS 2026 论文页',
      url: 'https://roboticsconference.org/program/papers/122/',
    },
    { label: '项目页', url: 'https://yliangwu.github.io/DexGrasp-Zero/docs/' },
    {
      label: '代码与仿真权重',
      url: 'https://github.com/YliangWu/DexGrasp-Zero-code',
    },
    { label: 'GraspXL 底座', url: 'https://github.com/zdchan/GraspXL' },
  ],
};
