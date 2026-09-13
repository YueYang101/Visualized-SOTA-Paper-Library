import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'human-intent-action-review-2024',
  subtitle: '从潜在目标、协作状态到未来动作：共享控制中的人类预测方法脉络',
  sourceNote:
    '2026-09-13 完整阅读 Annual Reviews 官方开放 HTML 全文。本文是选择性叙述综述，不含作者新实验；代表性实验为综述的二手概述，尚未逐篇回查原论文。',
  contributions: [
    '将 HRC 人类建模整理为三条线：不可观测的意图/目标、影响协作的内部特征，以及可观测的未来空间运动。',
    '梳理显式贝叶斯后验、HMM/MDP/POMDP 时序概率模型与监督学习/神经网络的优缺点。',
    '把预测连接到机器人规划、MPC、触觉引导与共享辅助，并指出长时程、人机互适应和统一基准的缺口。',
  ],
  evidence: [
    '意图推断估计不可观测目标/内部状态；动作预测则输出未来轨迹、位置、速度或动作，二者可以串联。',
    '目标信念 b_t(g)=P(g_t|θ_0:t) 可随新观测实时更新；这是 online inference，不是预测模型本身在学习。',
    '个体学习曲线参数由扩展卡尔曼滤波在线估计，用于动态排程，是文中比较清晰的在线参数估计例子。',
    '多数工作只处理有限候选目标和短时预测，很少显式建模人机互适应。',
  ],
  limitations: [
    '是选择性叙述综述，不是系统综述；也未给出统一数据集、意图预测基准或定量汇总。',
    '论文没有把 online learning 与 online inference 当作正式专题分类，需阅读者按“是否更新模型/奖励/偏好参数”自行判断。',
    '与抓取最相关的内容主要是到达目标、交接位置和共同操纵，未系统覆盖最终抓姿、抓型或接触可行性。',
  ],
  relevance: [
    '给零基础读者一个三层心智模型：预测“想做什么”、“人当前怎样”和“身体接下来怎样动”。',
    '抓取预测可拆为目标物体、连续接触位置、最终抓姿/抓型和到达轨迹，不同输出对应不同模型。',
    '系统宜拆为两个环：快速 inference 环更新目标/轨迹后验并仲裁；较慢 learning 环利用纠正和跨回合数据更新个体偏好、动力学或噪声参数。',
    '保留预测分布与不确定性，并将置信度传入 MPC 或 arbitration；低置信时延迟承诺或采用保守控制。',
  ],
  nextReading: '先读第1.1节区分意图与动作预测，再读第2.1–2.4、4.2、5.2和第6节，结合图1建立全局脉络。',
  suggestedTags: ['在线推断', '人类模型', '多模态预测', '人机互适应'],
  media: [
    {
      type: 'image', role: 'architecture', title: '意图与动作预测文献分类框架',
      url: 'https://www.annualreviews.org/docserver/fulltext/control/7/1/as7073.f1.gif',
      caption: '一图展示意图/目标、协作特征与空间动作预测三条主线。',
      sourceUrl: 'https://www.annualreviews.org/content/journals/10.1146/annurev-control-071223-105834', alt: '人类意图和动作预测的分类框架',
    },
  ],
  links: [
    { label: '开放全文', url: 'https://www.annualreviews.org/content/journals/10.1146/annurev-control-071223-105834' },
    { label: '论文 DOI', url: 'https://doi.org/10.1146/annurev-control-071223-105834' },
  ],
};
