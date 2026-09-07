import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'shear-grasp-control-2503-17501',
  subtitle: '用多指剪切力反馈实现柔顺、抗扰的快速抓握反射',
  sourceNote: '已预读 arXiv v1；arXiv 标注已被 IEEE Transactions on Robotics 触觉机器人专刊接收，最终卷期和代码尚未核实。',
  contributions: [
    '把 microTac 视觉触觉传感器集成到五指欠驱动 SoftHand，并并行估计接触姿态、法向力和剪切力。',
    '用轻柔初抓和基于剪切力变化率的闭环 PID，使抓力随外部负载和手腕姿态变化。',
    '将指尖合力映射为机械臂速度，实现通过被抓物体施力引导机械臂的触觉 leader-follower 行为。',
  ],
  evidence: [
    '100、200、300 g 三种静态加重实验共 15 次，全部保持纸杯且未滑落或压坏。',
    '阶跃扰动平均稳定时间 0.32 s、稳态误差 0.0023 N/s，法向力低于约 9 N 压坏阈值。',
    '动态倾倒实验共 20 次，纸杯在质心与总质量变化期间均未掉落或损坏。',
    '多传感器迁移学习的力/姿态预测误差相对独立模型平均改善超过 70%。',
  ],
  limitations: [
    '控制器增益与力范围针对 SoftHand 和当前任务调节，跨手型免调参泛化未证明。',
    '欠驱动手缺少关节本体感觉，合力估计采用了较强方向假设。',
    '对象和扰动类型较少，缺少与学习型策略或优化型多指力控制的统一对照。',
  ],
  relevance: [
    '可抽象为低层 autonomous stabilizer，在用户给出闭合意图后自动维持最低安全抓力。',
    '剪切力变化率是快速、可解释的反射信号，适合与较慢的视觉或 EMG 意图回路并联。',
    'leader-follower 展示了触觉反馈的人机协作潜力，但本文没有正式的控制权仲裁。',
  ],
  nextReading: '重点回看 §IV-C 控制律、§V 三组实验、§VI-B/C Figs. 8–10，以及附录中的增益和跨指尖误差。',
  suggestedTags: ['抓力调节', '触觉反射'],
  links: [{ label: '论文（arXiv）', url: 'https://arxiv.org/abs/2503.17501' }],
};
