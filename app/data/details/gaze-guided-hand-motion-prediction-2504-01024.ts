import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'gaze-guided-hand-motion-prediction-2504-01024',
  subtitle: '从动作历史、物体与眼动显式预测未来手部关节点序列',
  sourceNote:
    '2026-09-13 预读 arXiv:2504.01024v1 的问题定义、方法、数据和实验；论文为健康参与者 pilot study，当前标为中优先级、待精读。',
  contributions: [
    '把 Human Model 写成未来序列预测：历史手部运动、眼动和场景物体共同条件化未来手部关节点。',
    '用 VQ-VAE 将连续手部动作编码成离散 token，再由自回归 Transformer 预测未来 token 序列。',
    '分别评估跨被试、跨动作以及二者同时变化，并通过无眼动对照测量 gaze 的贡献。',
  ],
  evidence: [
    '数据来自 15 名健康参与者，使用 Project Aria 采集第一视角图像和眼动，并提取 3D 手部运动。',
    '输入和输出均用双手各 21 个三维关键点表示；评估同时报告整段平均误差和最终抓取位置误差。',
    '较少输入帧时，加入眼动的模型通常比无眼动版本具有更低的位置误差。',
    '表格中的最终位置误差仍约为 0.16–0.41 m，随输入帧增加而下降。',
  ],
  limitations: [
    '物体位置由人工从第一帧提取，并非完整的实时感知系统。',
    '每类物体基本对应固定抓型，不能充分证明同一物体多个合理抓取位置之间的个体意图辨别。',
    'Quest 3 没有该工作所用的原生眼动输入，当前应采用无眼动版本或另设传感器。',
    '位置误差尚不足以直接驱动精细抓取，需要候选约束、末端修正或低层 grasping model。',
  ],
  relevance: [
    '问题形式最接近“已观察动作 → 用户未来真实动作”，可作为完整时序 Human Model 的结构参考。',
    'Quest 3 的 21 点手骨架可直接映射到其主要手部表示，但应增加物体相对坐标和跟踪质量标记。',
    '当前更适合作为较大数据后的序列模型，对 PoC 先用小模型或概率轨迹基线。',
  ],
  nextReading:
    '重点核对序列长度、采样率、关键点重建误差、训练规模和终点定义，并单独复现 no-gaze baseline。',
  suggestedTags: ['Human Model', '未来序列预测', 'Quest无眼动对照'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2504.01024' },
    { label: 'HTML 全文', url: 'https://arxiv.org/html/2504.01024v1' },
  ],
};
