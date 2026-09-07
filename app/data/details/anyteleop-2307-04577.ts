import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'anyteleop-2307-04577',
  subtitle: '跨机器人、相机与仿真器的模块化视觉遥操作基线',
  sourceNote: '已按用户提供的选择性精读记录录入，并用 arXiv v3 元数据核对正式题名、作者与链接。',
  contributions: [
    '把视觉手部追踪、手指重定向、机械臂运动生成和机器人接口拆成相对独立的模块。',
    '用 MediaPipe 的 21 个手部关键点与手腕 6D 位姿，支持单相机、多相机和不同现实/仿真设置。',
    '通过带关节界限和时间平滑项的逐帧优化，将人手关键点几何映射到不同机器人手。',
    '用 CuRobo 独立生成机械臂避碰轨迹，使手指映射无需同时承担 arm–hand 全局运动约束。',
  ],
  evidence: [
    '真实系统使用 XArm6 + Allegro Hand；10 个任务各测试 10 次，报告 8/10 高于 Telekinesis、2/10 相同。',
    '仿真中每个设置采集 50 条示范，并用统一 DAPG 学习；6 个设置中 5 个优于旧遥操作数据。',
    'arm–hand Relocate、Flip Mug、Open Door 分别由 40.3、36.0、51.3 提升至 70.0、53.7、79.7。',
  ],
  limitations: [
    '核心目标是运动学姿态匹配，不显式建模物体几何、接触、摩擦、触觉、握力或任务意图。',
    '没有 autonomous policy、辅助动作或人机控制权仲裁，因此不能归为 shared autonomy。',
    '真实机器人基线采用旧论文报告数字，未在完全相同实验中重新运行。',
    '没有用户研究、未训练用户测试或操作负担指标；四种手的通用性主要是定性展示。',
    '缺少对平滑权重、关键点选择、CuRobo 和 retargeting objective 的系统消融。',
  ],
  relevance: [
    '可作为 Quest、视觉或 EMG 输入到 L20 关节命令之间的 retargeting baseline。',
    '可同步记录 EMG、人手关键点、重定向后的 L20 关节角、物体状态和最终动作，形成连续监督标签。',
    '适合保留“手腕人控、手指共享控制”的两条控制链，但需要另加 assist policy 与 arbitration。',
    'joint order、URDF link / key-vector 对应，以及尺寸和平滑系数需要针对 L20 明确校准。',
  ],
  nextReading: '选择性回看 PDF p.5 Eq. (1)、p.6 CuRobo、pp.7–8 Tables III–IV、p.9 Failure Modes、p.13 Table V，并检查 dex-retargeting 的 URDF 与 joint-order 配置。',
  suggestedTags: ['L20映射基线', 'EMG监督标签', '运动学局限'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2307.04577' },
    { label: '项目页', url: 'https://yzqin.github.io/anyteleop/' },
  ],
};
