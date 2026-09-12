import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'vlm-intent-assistance-2508-11093',
  subtitle: '待验证方案：将 VLM 语义先验融入用户意图概率，再触发辅助',
  sourceNote:
    '2026-09-12 核验 arXiv:2508.11093v1（2025-08-14），预读公开 HTML 的 Method / System、Planned Study、Contribution and Next Steps。文稿明确为 Extended Abstract；新增 VLM 系统的全面仿真评估与真机部署属于后续工作，未标为已精读。',
  contributions: [
    '提出用 VLM 对物体图像与任务提示的相关性、可选文本 LLM 对标签的排序，构建语义先验。',
    '将语义权重融合到 GUIDER 的导航与操作意图信念，筛除与当前任务不相关的候选。',
    '提出按概率阈值和用户接受建议等承诺规则，从意图推断进入共享自主或自主辅助。',
  ],
  evidence: [
    '本文提供系统设计和 Planned Study，没有给出新增 VLM 融合系统的完整对比结果。',
    '拟在 Isaac Sim 中以 Franka Emika Panda 加 Ridgeback 移动底座评估目标识别和辅助完成时间。',
    '文中引用的原 GUIDER 稳定性结果属于先前工作，不是新增 VLM 模块的实验收益。',
    '作者明确提出不微调基础模型，而利用预训练语义能力构建权重。',
  ],
  experiments: [],
  limitations: [
    '证据阶段是方案与扩展摘要，尚不能宣称已改善准确率、实时性或用户体验。',
    '依赖任务提示；其导航与物体级意图不等于本项目同一物体内的抓取部件偏好。',
    'VLM 分数归一化不自动带来校准后的意图概率，需要独立验证。',
  ],
  relevance: [
    '可参考“语义先验＋连续行为证据”的组合方式，而不必把整个 Human Model 改成 VLM。',
    '本项目可用 Quest 手掌轨迹和解码手形作为局部意图证据，用 VLM 提供物体部件候选。',
    '适合设计运动模型、语义先验与二者融合的对照，单独测量错误辅助和用户纠正。',
  ],
  nextReading:
    '重点回看 §II 的权重融合与承诺规则、§III 的计划评估、§IV 的未验证边界；查阅原 GUIDER 时保持两项工作的实验结果分开。',
  suggestedTags: ['Human Model', '候选目标筛选', '概率校准'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2508.11093' },
    { label: '扩展摘要全文', url: 'https://arxiv.org/html/2508.11093v1' },
  ],
};
