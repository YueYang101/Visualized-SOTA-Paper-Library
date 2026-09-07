import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'tacdexgrasp-2603-07040',
  subtitle: '以摩擦裕度约束统一多指承重、旋转防滑与柔顺性',
  sourceNote: '已预读 arXiv v1 并核对 OpenReview 方法页；当前是 2026 年预印本，正式 venue、代码和独立复现尚未核实。',
  contributions: [
    '以接触点切向/法向力比作为无需显式滑移检测的稳定指标。',
    '在线估计物重和摩擦信息，以 SOCP 在摩擦锥与平衡约束下分配多指接触力。',
    '用低层 PID 跟踪目标力，并在质量突变、快速摇晃和不规则机械臂运动中动态调节。',
  ],
  evidence: [
    '真实评估覆盖 12 个刚性、可变形及细长物体，每个 5 次，总体成功率 83%。',
    '多数物体的最大接触力保持在物体重力 2 倍以内；移除 PID 或 SOCP 都会降成功率并增峰值力。',
    '两次增加载荷后，系统通过触觉重新估计重量并提高目标法向力。',
    '快速摇瓶与持脆片书写属于定性鲁棒性证据。',
  ],
  limitations: [
    '预印本状态且实验规模小，扰动测试主要为定性案例。',
    '30 Hz 触觉更新、LEAP Hand 输出力和指尖触觉覆盖限制细长或大形变物体。',
    '抓姿多样性、工具使用和跨硬件泛化证据有限。',
  ],
  relevance: [
    'SOCP 可作为学习策略或用户动作后的安全投影层。',
    '可解释约束适合安全要求较高的假肢与 shared-control 低层回路。',
    '在线物重、摩擦和稳定裕度可为上层仲裁提供风险状态。',
  ],
  nextReading: '重点回看稳定条件与 SOCP 推导、Tables I–II 的基线/消融、§IV-F 鲁棒性测试及 §V 限制。',
  suggestedTags: ['安全投影层', '在线物性估计'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2603.07040' },
    { label: '论文（OpenReview）', url: 'https://openreview.net/forum?id=TaGbEK5zhq' },
  ],
};
