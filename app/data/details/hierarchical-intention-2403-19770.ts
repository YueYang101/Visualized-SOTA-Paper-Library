import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'hierarchical-intention-2403-19770',
  subtitle: '用多尺度动作前缀联合估计低层动作与高层装配任务',
  sourceNote: '2026-09-13 通读 arXiv:2403.19770v1，并以 IEEE/Crossref 核对 ICRA 2024 题名、作者、页码与 DOI；未找到公开代码。',
  contributions: [
    '把遥操意图写成任务—动作两层结构：高层预测长期装配任务，低层识别当前拾取、放置、紧固等动作。',
    '用层级依赖惩罚减少预测动作与预测任务在类别树上的冲突。',
    '让任务分支查35帧约3.5秒历史，动作分支只查最近10帧约1秒，匹配两个层级的不同时间尺度。',
  ],
  evidence: [
    '数据含13名参与者、202段仿真双手机器人遥操示范，覆盖6项装配任务和21类动作。',
    'Table I 中，运动特征 Hie-LSTM 的动作/任务逐帧准确率为95.41%/98.25%，独立 LSTM 为92.27%/96.79%。',
    '仅第一视角视频的 Hie-SlowFast 为86.18%/87.33%，普通 SlowFast 为82.81%/84.57%。',
    '论文的 online 指训练后模型以2 Hz流式前向推理，不含部署期参数更新或个性化。',
  ],
  experiments: [
    {
      title: '运动特征上的层级建模比较',
      setup: 'VR仿真装配数据；输入双臂末端、物体6D位姿和凝视等特征，比较 LSTM、GCN、NN-HMM 及其层级版。',
      result: 'Hie-LSTM 为95.41%/98.25%，分别比独立 LSTM 高3.14和1.46个百分点；Hie-GCN 比 GCN 高4.75/0.95个百分点。',
      takeaway: '在该闭集仿真数据上，任务—动作层级关系对动作分类的提升更稳定。',
      source: '§IV，Table I',
    },
    {
      title: '多窗口时间尺度消融',
      setup: '任务分支35帧、动作分支10帧；比较使用与不使用多窗口的视觉和运动模型。',
      result: '视觉输入由82.21%/84.57%升至86.18%/87.33%；运动输入由93.82%/95.89%升至95.41%/98.25%。',
      takeaway: '让短动作与长任务读取不同长度历史是最清晰可迁移的设计。',
      source: '§III-B、§IV，Table III',
    },
  ],
  limitations: [
    '只评价仿真中的闭集意图分类，没有证明辅助后的任务成功率、安全性、完成时间或操作者负担改善。',
    '未交代训练/验证/测试比例与是否按参与者隔离，高逐帧准确率的跨用户解释有风险。',
    '不预测最终抓取位置、姿态或抓型，也不是真在线学习。',
    '没有 time-to-intent、首次稳定正确时刻或校准指标，2 Hz 也不足以代表低层连续控制频率。',
  ],
  relevance: [
    '可作为“从操作者动作历史估计当前低层动作与高层任务”的直接 manipulation 基线。',
    '1秒动作窗口加3.5秒任务窗口可迁移到手腕、手部骨架、物体状态与视觉输入。',
    '它是实时意图推理强基线，不是 online-learning 方法；部署期个性化需另加参数更新与安全学习环。',
  ],
  nextReading: '回看 §II、§III-A/B 的时刻级目标、层级损失和35/10帧窗口，再核对 Tables I–III 与 Fig. 6。',
  suggestedTags: ['仅实时推理', '层级依赖损失', '闭环评估缺口'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2403.19770' },
    { label: '正式论文（IEEE）', url: 'https://doi.org/10.1109/ICRA57147.2024.10610388' },
    { label: 'Honda Research Institute 项目页', url: 'https://usa.honda-ri.com/w/icra2024-hierarchical-intention' },
    { label: '作者演示视频', url: 'https://youtu.be/CMYDgcI4j1g' },
  ],
};
