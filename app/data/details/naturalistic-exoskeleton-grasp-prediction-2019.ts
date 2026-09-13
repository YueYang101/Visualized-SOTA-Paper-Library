import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'naturalistic-exoskeleton-grasp-prediction-2019',
  subtitle: '在低维手部协同空间中提前预测用户最终抓型',
  sourceNote:
    '2026-09-13 依据 IEEE THMS 论文全文与 DOI 预读；已核对方法、仿真数据和外骨骼手套实验，尚未独立复现。',
  contributions: [
    '先用 PCA 将 16-DoF 人手关节运动压缩到低维协同空间，降低噪声和预测变量数量。',
    '提出线性回归外推与 Gaussian Process 轨迹匹配两种提前抓型预测器。',
    'GP 方法对每种已知抓型建立概率轨迹，并通过时间缩放的对数似然匹配当前动作前缀。',
    '为预测输出定义随时间积累的置信度，可作为后续辅助控制介入的门控信号。',
  ],
  evidence: [
    'HUST 数据覆盖 Feix taxonomy 的 33 类抓型；论文报告约完成 25% 动作时平均准确率约 75%。',
    '外骨骼手套实验测试 5 种抓型和 4 名健康参与者；25%、75%、100% 动作进度的平均准确率分别为 68.45%、87.86%、90.00%。',
    '轨迹匹配比线性外推更稳定地预测精确抓型，并且随着动作推进准确率提高。',
  ],
  limitations: [
    '主要预测离散抓型，不输出物体坐标系中的三维抓取位置和手腕方向。',
    '概率模板依赖预定义抓型和用户数据；新抓型、同类内连续差异与跨用户迁移仍受限制。',
    '辅助控制器在文中仍属于后续集成方向，不能把预测结果等同于完整 shared-control 验证。',
  ],
  relevance: [
    '提供不依赖大规模深度网络的 Human Model 基线，适合目前数据量较小的 Stage 1.1。',
    '可把 Quest／Bioimpedance 解码的手指配置投影到 PCA 空间，用 GP 输出抓型概率和置信度。',
    '需要与位置模型互补：它回答“怎样抓”，Motion Prior Field 更接近“抓在哪里”。',
  ],
  nextReading:
    '优先复核 HUST 数据预处理、PCA 维度、GP 时间缩放和置信度阈值，并评估将离散抓型模板替换为 L20 最终姿态候选。',
  suggestedTags: ['Human Model', 'PCA 协同', 'GP 轨迹匹配'],
  links: [
    { label: 'DOI', url: 'https://doi.org/10.1109/THMS.2019.2938139' },
    { label: '作者全文', url: 'https://rmlab.org/pdf/Grasp_Prediction_IEEE_THMS_2020.pdf' },
  ],
};
