import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'robustdexgrasp-2504-05287',
  subtitle: '单视角、无真实触觉条件下的闭环灵巧抓取',
  spotlight: true,
  sourceNote: '已读 16 页 v3 / CoRL 2025 正式版本（含附录）；视频仅核对作者描述，未逐帧审计。',
  contributions: [
    '用 17 个手部关键点到最近物体表面的三维向量形成固定的 51D 手中心局部几何表示。',
    '以拥有完整视觉与接触信息的 PPO 教师，训练只能看到真实可获得观测的 LSTM 学生。',
    '通过 mixed curriculum 从动作模仿逐步过渡到 PPO，同时保留接触重建损失。',
    '从关节目标、实际状态与跟踪误差重建接触，形成无真实触觉传感器的“伪触觉”。',
  ],
  evidence: [
    '仅用 35 个训练物体；在 247,786 个未见仿真物体上报告 97.0% 成功率。',
    '在 512 个未见真实物体上报告 94.6% 成功率。',
    '2.5 N 扰动下，真实成功率由 92.0% 降至 84.0%。',
    '完整学生为 95.3%，特权教师为 96.0%；消融中移除 privileged learning 降至 77.3%。',
  ],
  limitations: [
    '只覆盖单物体、桌面与稳定 power grasp，依赖预抓取初始化、分割和外部跟踪。',
    '抬升由固定手臂目标完成，不是完整的端到端 pick-and-lift 策略。',
    '51D 表示没有与 PointNet、全局点云或其他局部编码做直接消融。',
    '没有用户意图、功能抓取、共享控制或遥操作机制。',
  ],
  relevance: [
    '可作为 PPO 鲁棒抓取专家策略、autonomous stabilizer 或 expert prior。',
    '伪触觉可扩展为 contact / slip probability，并作为动态 arbitration 的置信度输入。',
    '若用于共享控制，应在训练时把人的 wrist trajectory 作为环境动态与观测，模型只学 finger residual。',
  ],
  nextReading: '选择性回看 p.3 Fig.3/§3.1、p.4–5 Fig.2/§3.2–3.3、p.7–8 Tables 4–6，以及 p.15–16 Appendix B.2–B.5。',
  suggestedTags: ['sim-to-real', '接触重建', '残差稳定器'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2504.05287' },
    { label: '项目页', url: 'https://zdchan.github.io/Robust_DexGrasp/' },
    { label: '代码', url: 'https://github.com/zdchan/RobustDexGrasp' },
  ],
};
