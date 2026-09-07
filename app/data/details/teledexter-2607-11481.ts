import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'teledexter-2607-11481',
  subtitle: '学习型手—物协同控制器承接人类意图与接触执行',
  sourceNote: '已预读 arXiv v1 与作者项目页；目前为预印本，尚未核实正式 venue、代码或训练资产。',
  contributions: [
    '把操作者同步指尖位置与物体位姿表示为连续子目标，由低层强化学习策略完成多接触执行。',
    '用两阶段重定向构造参考动作：先对齐手部运动学，再依据物体网格维持接触并抑制穿透。',
    '以稀疏子目标、稠密跟踪、课程学习和随机动作遮蔽实现单阶段训练与零样本实机迁移。',
    '在 SharpaWave 与 16 自由度 LEAP Hand 上运行，并将遥操作轨迹用于行为克隆。',
  ],
  evidence: [
    '七项任务各 15 次，TeleDexter 平均成功率 75.2%、任务进度 87.1%；DexRT 成功率 5.7%。',
    '在手重定向任务成功率为 66.7%–80.0%，四类多阶段工具任务为 66.7%–86.7%。',
    'BulbReplace 前四阶段全部完成，完整成功 13/15；ScrewdriverUse 中 13/15 保持 finger gaiting。',
    '每项自主任务用 50 条示范训练；HammerDriver 行为克隆达到 73.3% 完整成功率。',
  ],
  limitations: [
    '控制器是物体特定的，新物体需要新手—物示范和单独训练。',
    '实机依赖同时跟踪手、腕和物体的动作捕捉系统。',
    '初始接近仍用运动学重定向，稳定接触后才切换学习控制器。',
    '没有完整覆盖移动机械臂与手腕的联合约束。',
  ],
  relevance: [
    '是 L20 上“人给目标、策略管接触”的 contact-aware/shared-control 参照。',
    'Quest 或视觉可替换 MoCap，EMG 可补充抓型、接触切换或模式选择。',
    '展示了纯关节跟随难以采集的指间步态、重抓和工具使用示范。',
  ],
  nextReading: '重点回看 §3.1 协同追踪、§3.2 参考动作、§3.3 在线切换、§4.2 Tables 1–2、§4.3 Table 3 和动作遮蔽消融。',
  suggestedTags: ['L20接触层', '目标级共享控制', '物体特定策略'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2607.11481' },
    { label: '作者项目页', url: 'https://bigai-dex.github.io/blog/teledexter/' },
  ],
};
