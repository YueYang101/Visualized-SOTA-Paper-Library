import type { PaperIndex } from '../types';

export const papers: PaperIndex[] = [
  {
    id: 'shapegrasp-2403-18062',
    title:
      'ShapeGrasp: Zero-Shot Task-Oriented Grasping with Large Language Models through Geometric Decomposition',
    shortTitle: 'ShapeGrasp',
    paperUrl: 'https://arxiv.org/abs/2403.18062',
    authors: [
      'Samuel Li',
      'Sarthak Bhagat',
      'Joseph Campbell',
      'Yaqi Xie',
      'Woojun Kim',
      'Katia Sycara',
      'Simon Stepputtis',
    ],
    year: 2024,
    venue: 'IROS 2024',
    categories: ['perception-understanding'],
    priority: 'very-high',
    deepRead: { completed: false, needed: true },
    tags: ['几何部件分解', 'LLM语义推理', '任务导向抓取', '零样本部件选择'],
    oneMinute:
      '把 RGB-D 中的物体分解为简单凸部件，再用包含几何属性和空间关系的图让 LLM 推断部件功能、选择适合任务的抓取区域。最适合作为 Human Model 的物体可供性先验，但输入仍含明确任务，不能仅凭物体形状确定真实用户的意图。',
  },
  {
    id: 'thinkgrasp-2407-11298',
    title:
      'ThinkGrasp: A Vision-Language System for Strategic Part Grasping in Clutter',
    shortTitle: 'ThinkGrasp',
    paperUrl: 'https://arxiv.org/abs/2407.11298',
    authors: [
      'Yaoyao Qian',
      'Xupeng Zhu',
      'Ondrej Biza',
      'Shuo Jiang',
      'Linfeng Zhao',
      'Haojie Huang',
      'Yu Qi',
      'Robert Platt',
    ],
    year: 2024,
    venue: 'CoRL 2024 · PMLR 2025',
    categories: ['perception-understanding'],
    priority: 'high',
    deepRead: { completed: false, needed: true },
    tags: ['VLM部件理解', '语言目标定位', '杂乱遮挡处理', '区域引导抓取'],
    oneMinute:
      '利用 GPT-4o 理解图像和语言目标，选择物体或可抓部件，再结合分割、点云与专用抓取网络生成姿态；必要时先移开遮挡物。可借鉴“语义选区域—几何生成抓姿”的接口，但其语言条件自主抓取不等于基于用户运动的意图识别或多指稳抓。',
  },
  {
    id: 'graspgpt-2307-13204',
    title:
      'GraspGPT: Leveraging Semantic Knowledge from a Large Language Model for Task-Oriented Grasping',
    shortTitle: 'GraspGPT',
    paperUrl: 'https://arxiv.org/abs/2307.13204',
    authors: [
      'Chao Tang',
      'Dehao Huang',
      'Wenqi Ge',
      'Weiyu Liu',
      'Hong Zhang',
    ],
    year: 2023,
    venue: 'IEEE RA-L 2023',
    categories: ['perception-understanding'],
    priority: 'high',
    deepRead: { completed: false, needed: true },
    tags: ['LLM语义先验', '任务导向抓取', '未见概念泛化', '语言增强数据'],
    oneMinute:
      '用 LLM 提供物体与任务的语义描述，帮助抓取模型理解任务和抓姿之间的关系，并向训练集外的概念泛化。它是语义先验辅助抓取的重要入口；“零样本泛化”不表示整套系统无需训练，也没有直接学习某位用户的连续交互习惯。',
  },
  {
    id: 'partdextog-2505-12294',
    title:
      'PartDexTOG: Generating Dexterous Task-Oriented Grasping via Language-driven Part Analysis',
    shortTitle: 'PartDexTOG',
    paperUrl: 'https://arxiv.org/abs/2505.12294',
    authors: ['Weishang Wu', 'Yifei Shi', 'Zhizhong Chen', 'Zhipong Cai'],
    year: 2025,
    venue: 'arXiv 2025 · v2 更新于 2026',
    categories: ['perception-understanding'],
    priority: 'high',
    deepRead: { completed: false, needed: true },
    tags: ['灵巧抓姿生成', '语言部件分析', '条件扩散', '几何一致性'],
    oneMinute:
      '输入三维物体和语言任务，LLM 生成类别与部件层面的抓取描述，条件扩散模型为各部件生成灵巧抓姿，再用几何一致性选择组合。与多指手语义抓取相关，但抓姿生成依赖训练数据，OakInk-shape 结果不能直接当作 L20 的真机闭环稳抓能力。',
  },
  {
    id: 'vlm-intent-assistance-2508-11093',
    title:
      'Utilizing Vision-Language Models as Action Models for Intent Recognition and Assistance',
    shortTitle: 'VLM Intent Assistance',
    paperUrl: 'https://arxiv.org/abs/2508.11093',
    authors: [
      'Cesar Alan Contreras',
      'Manolis Chiou',
      'Alireza Rastegarpanah',
      'Michal Szulik',
      'Rustam Stolkin',
    ],
    year: 2025,
    venue: 'arXiv 2025 · 扩展摘要／待验证方案',
    categories: ['perception-understanding', 'shared-control'],
    priority: 'medium',
    deepRead: { completed: false, needed: true },
    tags: ['VLM语义先验', '概率意图推断', '共享自主', '待验证方案'],
    oneMinute:
      '提出将 VLM 的图像与任务相关性、LLM 的物体排序融入 GUIDER 的导航和操作意图概率，再按承诺规则触发辅助。结构贴近“语义先验＋用户行为模型”，但当前核验的是扩展摘要，新增系统的仿真和真机效果尚未验证，不能引用原 GUIDER 结果替代。',
  },
];
