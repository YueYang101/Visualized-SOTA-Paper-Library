import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'anydexrt-2607-08341',
  subtitle: '面向多种仿人灵巧手的免标定、少样本指尖映射',
  sourceNote: '已预读 arXiv v1 与作者项目页；代码仍标为 Coming Soon，尚无正式会议或期刊信息，也未直接验证 L20。',
  contributions: [
    '用非对称部分 Chamfer、距离保持和局部运动保持目标学习人手到机器人指尖空间的自监督对应。',
    '以少量成对手势锚点消除映射歧义，并允许按操作者习惯个性化尺度和参考姿态。',
    '用拇指—其他手指接触分类器识别捏取意图，并搜索可行机器人捏取姿态。',
    '同一方法覆盖七种、6 至 20 自由度的仿人灵巧手。',
  ],
  evidence: [
    '七种手、五个随机种子中，平均局部运动一致性由 GeoRT 的 59.8% 提至 90.2%。',
    '真实系统采用 Flexiv Rizon 4、Wuji Hand、Manus 手套和 Vive Tracker；8 名操作者完成 4 类任务。',
    'Pick-10 小球捏取成功率为 62.0%，优化基线 39.6%，GeoRT 29.2%。',
    '四个真实任务的单回合时间均低于两项基线。',
  ],
  limitations: [
    '仍需人工采集少量锚点，并非严格零校准。',
    '接触分类只修正捏取，没有掌面接触、摩擦、接触力或动态重抓。',
    '假设目标手与人手结构相似，非仿人形态未验证。',
    '尚未用采集数据训练下游策略。',
  ],
  relevance: [
    '可把 Quest、视觉关键点、数据手套或 EMG 手势统一转成指尖目标，再映射到 L20。',
    '七手实验提供跨形态 retargeting 强基线，可检验 L20 是否需要专用缩放与关节目标。',
    '捏取分类器展示了把离散接触意图叠加到连续运动映射上的轻量方案。',
  ],
  nextReading: '重点回看 §3.2–3.4 的对应目标和接触分类器、§4.1 Table 1、§4.2 Table 4，以及 Appendix D 的锚点流程。',
  suggestedTags: ['L20映射候选', 'EMG指尖接口', '局部运动一致性'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2607.08341' },
    { label: '项目页', url: 'https://chenxi-wang.github.io/projects/anydexrt/' },
  ],
};
