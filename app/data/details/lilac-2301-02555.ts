import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'lilac-2301-02555',
  subtitle: '以自然语言实时重塑低维遥操空间的共享自主框架',
  sourceNote: '2026-09-13 通读 arXiv:2301.02555v1，并核验 HRI 2023 DOI、作者项目页、代码与图3–7。',
  contributions: [
    '把当前状态、初始任务语言、最新在线语言纠正和2-DoF摇杆输入融合为6-DoF末端增量动作。',
    '用状态—语言条件动作自编码器从少量示范中学习正交潜在动作基。',
    '在真实 Franka Panda 上进行12人被试内实验，对比开环语言模仿和无在线纠正的 LILA。',
  ],
  evidence: [
    '模型实现 Fθ(s_t,z_t,u,c_t)→a_t：用户动作与语言/状态生成的6×2动作基相乘。',
    '训练使用预先采集的50条完整任务示范和不足2小时的纠正示范；部署时没有梯度或参数更新。',
    '12名参与者中，LILAC 在抓取、转移和完整完成率上相对两条基线均达 p<0.05。',
    '7点主观评分的7项中，LILAC 有6项显著优于基线（p<0.05）。',
  ],
  experiments: [
    {
      title: '真实机器人分阶段成功率',
      setup: '12名大学生的被试内实验；每人使用 Imitation、LILA、LILAC 完成3项桌面操作，评价到达、抓取、转移和完整完成。',
      result: 'LILAC 四阶段成功率均最高，并在抓取、转移、完整完成上显著优于两条基线（p<0.05）；原文未给精确数值表。',
      takeaway: '执行时语言纠正能从固定潜在控制流形的关键失败状态中恢复。',
      source: '§5–§6，Figure 4',
    },
    {
      title: '主观可用性评价',
      setup: '同一被试内实验，每种条件后填写7点评分。',
      result: 'LILAC 在7项中有6项显著更受偏好；“平滑控制”是唯一未显著项。',
      takeaway: '优势主要来自适应性、精确性和可恢复性，不是运动平滑度。',
      source: '§5–§6，Figure 4',
    },
  ],
  limitations: [
    '最关键：“online”只指执行时接收纠正并重新条件化推理，不含参数更新；也没有个性化用户模型。',
    '只保留最新话语，无法处理依赖历史、指代或隐含共指的纠正。',
    '方向、旋转和倾斜依赖用户参照系，而系统没有个体参照系校准。',
    '仅验证12名大学生、单一机械臂和固定桌面环境。',
  ],
  relevance: [
    '是显式语言意图、场景状态和摇杆动作实时融合的直接 shared-control 基线。',
    '语言不只作一次性高层指令，而是在运行时重新定义用户控制空间。',
    '它不从动作前缀推断最终抓姿；在 Online Learning 阅读路径中的价值是说清“在线交互不等于在线学习”。',
  ],
  nextReading: '回看 §4.1–§4.3 与 Figure 3 的语言栈、门控和动作基，再看 Figure 4、6、7。',
  suggestedTags: ['执行期条件化', '语言门控', '失败恢复'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2301.02555' },
    { label: '会议论文 DOI', url: 'https://doi.org/10.1145/3568162.3578623' },
    { label: '作者项目页', url: 'https://sites.google.com/view/hri-lilac' },
    { label: '代码', url: 'https://github.com/Stanford-ILIAD/lilac' },
  ],
};
