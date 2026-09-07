import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: '10-52202-079017-4075',
  subtitle: '用目标无关价值优势决定扩散 copilot 何时接管',
  sourceNote: '已预读 arXiv:2409.15317，并以 NeurIPS 2024 官方论文页和 DOI 核验；未找到稳定的作者代码仓库。',
  contributions: [
    '提出 Interventional Assistance，在每个控制周期选择用户动作或 copilot 动作。',
    '对目标空间积分计算优势分数，仅在 copilot 对所有可能目标都更优时介入。',
    '给出在近最优或低性能 pilot 条件下的回报下界，并与目标遮蔽扩散 copilot 组合成 IDA。',
  ],
  evidence: [
    '8 名无经验参与者各完成 270 次 Lunar Lander；成功率为用户单独 14.0%、持续扩散 68.2%、IDA 91.7%。',
    'IDA 对用户单独和持续 copilot 的成功率提升均达到 p<0.01。',
    'IDA 超时率 0.1%，持续 copilot 为 13.8%，选择性介入减少了“安全但不完成目标”。',
    '主观易用、可控和自主性评分也优于持续 copilot（p<0.01）。',
  ],
  experiments: [
    {
      title: '人类 Lunar Lander 目标选择实验',
      setup: '8 名无经验参与者，每人 270 次试验；比较用户单独、持续扩散 copilot 与 IDA，考察成功、超时及主观体验。',
      result: '成功率分别为 14.0%、68.2% 与 91.7%；IDA 相对两个对照的提升均达到 p<0.01，超时率仅 0.1%，持续 copilot 为 13.8%。',
      takeaway: '只在 copilot 对所有可能目标都更优时介入，比持续辅助更能同时保留目标自主性并完成任务。',
      source: 'Tables 2–3、Figs. 3–4、Appendix C–D',
    },
    {
      title: '主观可控性与自主性感受',
      setup: '同一人类实验后比较不同辅助方式的易用、可控和自主性评分。',
      result: 'IDA 的主观评分优于持续 copilot，论文报告差异达到 p<0.01。',
      takeaway: '动态二元仲裁不仅提高任务结果，也缓解持续 copilot 对用户控制感的侵蚀。',
      source: 'Table 3、Appendix D',
    },
  ],
  limitations: [
    '需要可查询状态—动作价值的专家策略，真实灵巧操作中不一定容易获得。',
    '仲裁是硬二元切换，接触瞬间可能需要额外平滑或滞回。',
    '人类验证仅为二维 Lunar Lander，没有机械臂、灵巧手、EMG 或触觉实验。',
  ],
  relevance: [
    '是动态 arbitration 的核心强基线，可将价值比较扩展为触觉风险、接触稳定性或意图置信度。',
    '适合构造 approach、contact、closure、manipulation 等阶段相关的介入门控。',
    '明确属于部署时在线 shared autonomy。',
  ],
  nextReading: '重点回看 §3.4、Theorem 1、Tables 2–3、Figs. 3–4、Appendix A 与 C–D。',
  suggestedTags: ['硬切换', '性能下界'],
  links: [
    { label: '论文（NeurIPS）', url: 'https://papers.nips.cc/paper_files/paper/2024/hash/e7ba43ea2a7f94d86e69de761e178792-Abstract-Conference.html' },
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2409.15317' },
    { label: 'DOI', url: 'https://doi.org/10.52202/079017-4075' },
  ],
  qa: [
    {
      id: 'ida-definition',
      question: 'IDA 是什么？',
      answer: 'IDA 是 Interventional Diffusion Assistance：用 Interventional Assistance（IA）仲裁器在用户动作与 diffusion copilot 动作之间逐时刻选择。IA 是通用框架；当 copilot 由扩散模型实现时，整个系统称为 IDA。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'lunar-lander-task',
      question: '论文的 Lunar Lander 任务是什么？',
      answer: '这是一个二维连续控制环境，操作者通过主推进器和左右侧向推进器，将火箭平稳降落在旗帜标记的目标区。作者将着陆区改为从地面上 9 个候选位置中随机出现。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'action-comparison',
      question: '怎么比较人和 copilot 当前的动作？',
      answer: '同一个专家 Q 函数分别为用户动作 a_p 和 copilot 动作 a_c 打分。系统对每个候选目标计算 Q(s̃, a_c | g) - Q(s̃, a_p | g)，再比较其符号；这是对两个动作的比较，不是分别训练一个“人类 value”和“模型 value”。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'copilot-advantage-horizon',
      question: 'Copilot advantage 只计算目前状态吗？',
      answer: '它的输入是当前状态和当前候选动作，但 Q(s,a) 表示从这里开始的折扣累计未来回报，因此不是只看即时奖励。它在每个 environment timestep 重新计算。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'expert-q-critic',
      question: '专家 Q 是不是 actor–critic 中的 critic，它和专家 policy 一起训练吗？',
      answer: '是。论文先用 SAC 联合训练专家 actor π_e 和 action-value critic Q^{π_e}(s,a)。它与 PPO critic 功能类似，但 PPO 通常直接学 V(s)，而这里需要显式输入动作的 Q(s,a)，才能比较人和 copilot 的两个候选动作。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'human-action-q',
      question: '人的动作不是专家动作，Q 怎么评估？',
      answer: 'Q^{π_e}(s,a) 允许当前的 a 是任意候选动作：它表示“现在先执行 a，之后按专家策略继续”的预期回报。因此人的动作可以直接输入 critic；但如果该状态—动作严重偏离训练分布，Q 的外推可能不可靠。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'continuation-policy-assumption',
      question: '评估假设之后都由专家控制，但实际不一定，对吗？',
      answer: '对。Q^{π_e} 的 continuation policy 是专家 π_e，而实际下一步仍由用户和 copilot 重新仲裁。所以专家 Q 是评价当前动作后果的代理标准，不是对实际共享控制后续轨迹的精确预测。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'dynamic-arbitration-intent',
      question: '这里有动态 arbitration 和意图识别吗？',
      answer: '有逐 timestep 的动态二元仲裁：每次完整选择用户动作或 copilot 动作，不做连续权重融合。但没有显式的意图识别模型；copilot 只可从用户动作中隐式推断，仲裁器则通过对所有候选目标都保守比较来规避猜错意图。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'control-frequency-intervention-rate',
      question: '控制频率和模型接管率是多少？',
      answer: '论文明确说 advantage 每个 environment timestep 计算，人类实验画面为 50 FPS，但没有明确证明 action step 与每帧一一对应，因此不能严格宣称为 50 Hz。论文也没有给出人类实验的单一总体接管百分比。',
      updatedAt: '2026-09-07',
    },
    {
      id: 'nine-goal-values',
      question: '为什么是 9 个目标？Value 是 9 个分数的集合吗？',
      answer: '9 是修改后 Lunar Lander 的实验设定，不是 IDA 的固定要求。Q 函数对一个给定的（状态、动作、假设目标）输出一个标量；对 9 个目标分别查询后，可以排成每个动作各 9 个 Q 值的向量。这通常是同一个 goal-conditioned critic 的批量查询，不是 9 个独立 value 网络。',
      updatedAt: '2026-09-07',
    },
  ],
  humanSummary: [
    '可借鉴的方向：把强化学习 critic 当作动作后果预测器，比较当前的人类输入与模型候选动作将带来的后续奖励。',
    '若从 PPO 开始，其 critic 通常直接预测 V(s)；要比较具体动作，还需要 action-conditioned Q(s,a)、advantage，或一步环境模型。因此这个思路可以参考，但不能直接把 PPO 的 V-critic 当成论文中的 SAC Q-critic。',
    '这还不是一个充分的共享控制方案：它没有显式的用户意图识别，而是用“对所有可能目标都不伤害”的条件规避误接管。',
    '在 Lunar Lander 中，copilot 动作必须在 9 个候选目标下的 Q 值都高于用户动作才能介入。这有利于保护用户自主性，但过于保守，会放弃“对大多数目标很好、仅对少数目标稍差”的有益介入，因而限制模型发挥。',
    '另一个前提是：专家 Q 评估当前动作时，假设之后由专家策略继续；真实系统之后仍是用户与 copilot 仲裁。因此该 value 是有用的代理评分，但不是对真实后续共享轨迹的精确预测。',
  ],
};
