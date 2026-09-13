export const onlineLearningOverview = {
  definition:
    '最简单的定义：机器人在部署期间持续收到新数据，并用它更新对人、任务或控制器的模型。如果只是每个时刻用固定模型做新预测，那是 online inference，不是 online learning。',
  loop: ['观察动作前缀 / 反馈', '预测意图或未来动作', '产生辅助动作', '从新证据更新'],
  directions: [
    {
      title: '在线个性化人类模型',
      badge: '与你的课题最直接',
      description:
        '从少量交互中更新某个用户的可达性、人机动作约束、抓型或轨迹偏好；然后让 arbitration 根据不确定性决定何时帮、帮多少。',
    },
    {
      title: '实时意图 / 动作预测',
      badge: '强基线，但常不是真在线学习',
      description:
        '用手、腕、物体、视线或操作命令的历史预测目标、抓型或未来轨迹。部署时可逐帧预测，但训练通常在离线完成。',
    },
    {
      title: '人在环纠错与交互式学习',
      badge: '最容易形成可用系统',
      description:
        '把语言纠错、物理修正、接管或偏好选择当成监督信号，只更新小的用户模型、潜在控制空间或 residual，避免在真机上重训大模型。',
    },
    {
      title: '机器人侧快速适应',
      badge: '相邻主线',
      description:
        '用力觉 residual、自主采样、hindsight relabeling 或 LoRA 在现场改善控制策略。它不直接预测人，但可以和人类模型共用一个安全的小步更新层。',
    },
  ],
  sota: [
    {
      label: '人类模型',
      text: '2026 年 Knowing When Not to Help 用不到 20 次主动查询估计个体关节可达域，是“少量交互＋个人化辅助”的强证据；它学的是能力边界，还不是完整抓取轨迹。',
    },
    {
      label: '交互纠错',
      text: 'LILAC 是 manipulation 中最贴近“边操作边纠正”的基线：实时语言会改写低维潜在动作空间，但不更新参数，因此只收入 Share Control，不算真 online learning。',
    },
    {
      label: '自主适应',
      text: '2026 年 Act2Goal 展示了当前很强的离线先验＋现场小参数更新范式：用 hindsight 目标重标记和 LoRA 在数分钟内改善 OOD 长时程操作；这是机器人适应，不是人动作建模。',
    },
  ],
} as const;
