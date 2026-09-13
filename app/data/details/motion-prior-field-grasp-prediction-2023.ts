import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'motion-prior-field-grasp-prediction-2023',
  subtitle: '从接近阶段的人手—物体相对位姿预测最终抓姿',
  sourceNote:
    '2026-09-13 依据 Biomimetics 开放全文、DOI 与 PubMed 预读；当前记录用于 Human Model 方法筛选，尚未逐项复核数据划分和跨被试泛化。',
  contributions: [
    '把人类接近—抓取轨迹变换到物体坐标系，建立当前位置与最终抓姿之间的运动先验场。',
    '将最终抓姿定义为物体坐标系中的 6-DoF 手腕位姿与预抓取类型，并对候选抓姿聚类。',
    '用五层 MLP 从当前 7 维手腕位姿预测聚类后的最终抓姿候选，可在接近阶段持续更新。',
  ],
  evidence: [
    '实验采集 19 类日常物体的真实人类接近与抓取动作，并以多相机运动捕捉重建手—物体关系。',
    '论文报告最佳设置的分类准确率为 90.2%，抓姿误差距离为 1.27 cm。',
    '作者报告在接近序列前 50% 内即可得到正确预测，用于提前规划手腕和预抓取手型。',
  ],
  limitations: [
    '输出是聚类后的离散平均抓姿，不能直接表达同一意图下连续、多个合理解的分布。',
    '手指部分只输出预抓取类型，没有回归本项目需要的 L20 16 个连续关节目标。',
    '论文的精密运动捕捉条件与 Quest 3 的遮挡、抖动和跟踪丢失条件不同，需要重新验证。',
  ],
  relevance: [
    '三篇 Human Model 中最直接对应“Quest 动作前缀 → 物体相对最终抓取位置与手腕姿态”。',
    '可先复现“候选抓姿聚类＋小型 MLP”的低数据基线，再与时序模型比较。',
    '本项目应将输出扩展为物体相对掌部 6D 位姿、L20 16 关节和候选置信度。',
  ],
  nextReading:
    '重点核对运动先验场的数据量、抓姿聚类尺度、训练测试划分和随接近进度变化的误差，再决定是否直接复现 MPFNet。',
  suggestedTags: ['Human Model', '物体相对坐标', '最终抓姿候选'],
  links: [
    { label: '开放全文', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10296099/' },
    { label: 'DOI', url: 'https://doi.org/10.3390/biomimetics8020250' },
    { label: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/37366845/' },
  ],
};
