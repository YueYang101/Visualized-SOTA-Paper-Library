import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'act2goal-rss-2026',
  subtitle: '视觉世界模型与多尺度控制驱动的离线到在线目标条件操控',
  sourceNote: '2026-09-13 通读 RSS 2026 官方11页 PDF，并以 RSS 落地页核验元数据与 DOI；项目页代码和媒体未核实。',
  contributions: [
    '用目标条件视觉世界模型从当前观察和目标图像生成中间视觉轨迹，动作专家通过交叉注意力生成动作。',
    '提出 Multi-Scale Temporal Hashing：密集近端帧支持闭环纠错，稀疏远端帧作为长时程目标锚点。',
    '部署期采集自主 rollout，把实际后继观察重标为已达成目标，冻结基础模型并只更新 LoRA。',
  ],
  evidence: [
    'Algorithm 1 明确给出 rollout—缓存—目标重标记—LoRA优化的参数更新环，因此属于真正的部署期 online learning。',
    '真机 Plug-In 成功率由0.30升至0.90；陌生图案绘制在25分钟微调中定性改善。',
    'RoboTwin 2.0 四个 Hard OOD 场景通常在三轮在线训练后收敛，最高达预训练策略约8倍成功率。',
    '安全措施仅有最大步数、自动重置和偶尔人工调整，未报告风险估计或形式安全保证。',
  ],
  experiments: [
    {
      title: '部署期在线自主改进',
      setup: 'RoboTwin 2.0 四个 Hard OOD 场景，多轮 rollout 与 LoRA 更新，比较成功、失败和全部 rollout 缓存。',
      result: '四个场景均持续改善，通常三轮收敛，最高约为预训练基线8倍；使用全部 rollout 最好。',
      takeaway: '自采数据和 HER 可在无人工标注时提供更新信号，但依赖初始策略产生有意义交互。',
      source: 'Section IV-B，Figure 6',
    },
    {
      title: '真机在线适应',
      setup: 'AgiBot Genie-01 在陌生图案绘制和 OOD Plug-In 上自主 rollout 并微调 LoRA。',
      result: '图案绘制在25分钟内定性改善；Plug-In 成功率0.30→0.90，但未给试验次数、方差或耗时。',
      takeaway: '是真实部署期参数适应证据，同时显示实验报告仍不充分。',
      source: 'Section IV-B，Figure 7',
    },
    {
      title: '长时程 MSTH 消融',
      setup: '真机白板写字，将 MSTH 与固定时域 action chunking 比较。',
      result: 'OOD 短/中/长单词成功率由0.60/0.20/0.00升至0.93/0.90/0.88。',
      takeaway: '稀疏远端锚点能抑制长时程目标漂移。',
      source: 'Section IV-C，Table III',
    },
  ],
  limitations: [
    '在线 HER 有冷启动限制：离线策略必须先有部分能力，能与目标产生有意义交互。',
    '未公布在线缓存阈值、更新步数、LoRA 秩和更新耗时等关键参数。',
    '真机证据较窄，缺少试验次数、置信区间与强在线学习基线。',
    '没有状态/动作约束、数据筛选、不确定性门控或可回滚检查点。',
    '不包含用户动作前缀、人类意图或 shared-control 仲裁。',
  ],
  relevance: [
    '是 manipulation 中清晰的 offline-to-online 范式：大型视觉运动先验离线训练，部署时只更新小型 LoRA 层。',
    '可作 human model 的下游执行器：上游将动作前缀转为目标图像或目标分布，仲裁器决定是否采纳。',
    '人机系统中应保留 LoRA 小步更新，但加入用户接管、安全过滤、置信度门控与可回滚检查点。',
  ],
  nextReading: '回看 Section III-C–D 和 Algorithm 1 的在线环，Section IV-B、Figures 6–7 的在线证据，以及 Section VI 的冷启动边界。',
  suggestedTags: ['offline-to-online', '自主适应'],
  links: [
    { label: 'RSS 官方论文页', url: 'https://www.roboticsproceedings.org/rss22/p015.html' },
    { label: 'DOI', url: 'https://doi.org/10.15607/RSS.2026.XXII.015' },
    { label: '作者项目页（内容未核验）', url: 'https://act2goal.github.io/' },
  ],
};
