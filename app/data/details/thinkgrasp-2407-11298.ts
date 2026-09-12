import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'thinkgrasp-2407-11298',
  subtitle: 'VLM 选择目标与部件区域，分割和抓取网络完成几何落地',
  sourceNote:
    '2026-09-12 核验 arXiv:2407.11298、CoRL 作者项目页与 PMLR 270 论文集页面，并预读公开主文的 System Pipeline 和网格选择描述。会议为 CoRL 2024，论文集出版年为 2025；未完成附录和逐表精读，不录入未核验的性能数字。',
  contributions: [
    '通过 GPT-4o 联合理解场景图像与语言目标，选择目标物体、部件或需要先移开的遮挡物。',
    '用区域网格表达偏好抓取位置，再以 LangSAM 或 VLPart 进行物体／部件分割并裁剪点云。',
    '将语义区域选择与专门抓取网络解耦，执行后用新观测更新后续策略。',
  ],
  evidence: [
    '论文报告仿真和真实机器人实验，覆盖重度杂乱和未见物体；此次仅保留定性结论，不将摘要表述改成精确成功率。',
    '公开方法描述使用 3×3 区域选择；仿真采用 GraspNet-1Billion，真实实验采用 FGC-GraspNet 生成候选。',
  ],
  experiments: [
    {
      title: '杂乱场景中的目标获取',
      setup:
        '给定 RGB-D 场景和语言目标，在仿真中比较处理遮挡后的目标抓取表现。',
      result:
        '作者报告相对既有方法的优势；完整基线、场景分组和成功率待精读实验表。',
      takeaway: '高层策略负责目标与遮挡处理，低层候选生成保持为专门模块。',
      source: '论文摘要与 §3.2 System Pipeline',
    },
    {
      title: '真实物体与未见物体抓取',
      setup: '真实机械臂与夹爪在杂乱环境下，根据语言要求定位并抓取物体或部件。',
      result: '论文与项目页提供实机验证；本卡未核验各物体的逐项统计。',
      takeaway:
        '支持语义区域选择与实机抓取集成，不证明 L20 多指稳抓或用户意图推断。',
      source: 'PMLR 论文摘要；作者项目页',
    },
  ],
  limitations: [
    '目标主要由语言给出，没有直接根据 Quest 轨迹或生理信号推断个人偏好。',
    '网格位置是粗区域，仍需分割、深度几何和专用抓取网络才能生成可执行姿态。',
    '重新观察并规划下一次抓取，不等于高频接触力控制或连续防滑。',
  ],
  relevance: [
    '可借鉴“VLM 给区域—几何模型给抓姿”的模块接口，避免让 VLM 直接输出 L20 关节命令。',
    '本项目可将语言目标替换或补充为 Human Model 维护的候选偏好，但需要单独验证。',
    '适合在场景变化时更新语义候选，实时手部运动与接触控制走独立闭环。',
  ],
  nextReading:
    '优先回看 §3.2 系统流程、§3.4 网格选择、附录提示和抓取网络接口，再核对延迟、失败恢复与分割错误的影响。',
  suggestedTags: ['语义几何分工', '重规划', '部件分割'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2407.11298' },
    {
      label: '正式论文集（PMLR）',
      url: 'https://proceedings.mlr.press/v270/qian25c.html',
    },
    {
      label: '作者项目页与演示',
      url: 'https://h-freax.github.io/thinkgrasp_page/',
    },
  ],
};
