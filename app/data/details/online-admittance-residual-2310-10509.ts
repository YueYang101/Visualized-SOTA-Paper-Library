import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'online-admittance-residual-2310-10509',
  subtitle: '离线 SAC 技能与实机力反馈驱动的在线导纳残差优化',
  sourceNote: '2026-09-13 通读 PMLR 的19页 CoRL 2023 正式论文，核对方法、实验与附录，并核验 arXiv:2310.10509、作者项目页和仿真代码边界。',
  contributions: [
    '在 MuJoCo 中用 SAC 和域随机化离线学习期望运动与初始柔顺参数，再在实机执行时只适配导纳参数残差。',
    '以最新时间窗的腕部六维力/力矩做 record-and-replay，优化位置与速度误差，并约束质量、刚度、阻尼为正。',
    '以 SQP 每隔 T 秒更新对角 M/K/D 残差；实机 PI 位置/速度控制为1 kHz，运动命令为125 Hz。',
  ],
  evidence: [
    '方孔装配中 Proposed 为10/10、19.0±11.2 s、23.6±6.3 N；Direct Transfer 为3/10、39.0±12.8 s、63.7±6.8 N。',
    '实机顶转中 Proposed 为9/10、25.6±2.1 s、20.1±4.1 N；Direct Transfer 为0/10、30.7±4.6 N。',
    '人工调参在装配/顶转的最大力只有10.3±2.2 N 与9.2±0.6 N，均低于 Proposed；因此只能称有效自动适应，不能称最安全。',
    '不同孔型与连接器的装配成功率为10/10、10/10、9/10、9/10；Direct Transfer 除五角孔1/10外均为0/10。',
  ],
  experiments: [
    {
      title: '同任务设置的实机 Sim-to-Real',
      setup: 'FANUC LRMate 200iD 执行方孔装配和木块顶转；比较 Proposed、Direct Transfer 和 Manual Tune，每任务/方法10次。',
      result: '装配 Proposed 10/10、19.0±11.2 s、23.6±6.3 N；Direct 3/10、63.7±6.8 N。顶转 Proposed 9/10、20.1±4.1 N；Direct 0/10。Manual 力峰更低。',
      takeaway: '在线残差优化远优于直接迁移并接近人工调参成功率，但不支持“优于专家安全性”。',
      source: '第4.2节，图2、表1',
    },
    {
      title: '跨几何与动力学设置泛化',
      setup: '装配测三角孔、五角孔、Ethernet 和防水连接器；顶转测不同尺寸与重量物体，每设置10次。',
      result: 'Proposed 装配为10/10、10/10、9/10、9/10，顶转为8/10、9/10、8/10、7/10；固定参数基线大部分失败。',
      takeaway: '力反馈在线改参数比固定柔顺参数更能适应间隙、形状、尺寸和重量变化。',
      source: '第4.3节，表2、图3',
    },
  ],
  limitations: [
    '参数适应发生在首次接触之后，首次仍使用可能不安全的离线参数；作者明确不适合脆弱物体。',
    '正参数约束不等于安全保证；没有硬力上限、passivity/稳定性证明、碰撞约束或故障检测。',
    'record-and-replay 假设最近力反馈能代表下一优化窗，但参数更新会反过来改变环境反力；T 也未报告。',
    '只优化对角 M/K/D，轨迹本身不在线适配，也未验证快速变化的人类 shared-control 输入。',
  ],
  relevance: [
    '是真正的 manipulation 在线控制适配：实机任务中反复读取真实力反馈并更新 M/K/D，但不是在线训练神经网络。',
    '可把 human model/仲裁器产生的目标位姿或期望轨迹接到此低层导纳层，但需加时间尺度隔离、力限、意图突变检测和回退控制。',
    '最值得迁移的原则是缩小在线搜索空间：保留离线任务运动，只修正少量物理可解释的柔顺参数。',
  ],
  nextReading: '回看第3.2节式(2)–(5)与算法1，对照图2、表1，再看附录A.2、C.2、C.3与E的实现和安全边界。',
  suggestedTags: ['SQP优化', '导纳控制', '控制参数残差'],
  links: [
    { label: '论文（PMLR）', url: 'https://proceedings.mlr.press/v229/zhang23e.html' },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2310.10509' },
    { label: '作者项目页', url: 'https://sites.google.com/view/admitlearn' },
    { label: '仿真代码', url: 'https://github.com/Xiang-Zhang-98/Mujoco3_manipulation_sim' },
  ],
};
