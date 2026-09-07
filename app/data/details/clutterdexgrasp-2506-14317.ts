import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'clutterdexgrasp-2506-14317',
  subtitle: '从仿真特权教师到真实杂乱场景闭环抓取',
  sourceNote: '已预读 arXiv v3，并核验 CoRL 2025 Oral 项目页和作者代码；代码仓库的完整复现程度仍需精读确认。',
  contributions: [
    '提出面向杂乱场景目标导向灵巧抓取的教师—学生框架，教师使用目标与非目标物体到手部链节的几何距离。',
    '以单物体到杂乱场景的密度课程和逐步收紧接触力约束的安全课程学习连续清障、接近与抓取。',
    '把成功轨迹蒸馏为 15 Hz、基于单视角局部点云的 DP3 学生策略，并零样本部署到真实系统。',
  ],
  evidence: [
    '真实实验覆盖 41 个未见物体和 17 个不同密度场景；167 次尝试总体成功率为 83.9%。',
    '未见布局成功率由稀疏场景 90.8% 降至未参与训练的超密集场景 74.2%。',
    '安全课程把仿真平均最大接触力由 80.6±1.9 降至 43.2±0.7，成功率仅由 88.9% 变为 87.0%。',
    '移除密度课程、直接在杂乱场景训练时，同等训练时长成功率为 0%。',
  ],
  limitations: [
    '微小物体仍受手部遮挡和 sim-to-real 偏差影响。',
    '依赖单视角点云、目标掩码与系统标定，未证明跨手形态迁移。',
    '真实评估缺少同场景强基线，83.9% 主要验证自身迁移效果。',
  ],
  relevance: [
    '可作为“用户选择目标、策略负责清障和闭环抓取”的 shared-control 视觉先验。',
    '安全课程与教师—学生蒸馏适合把仿真 expert prior 压缩成可部署稳定器。',
    '与触觉反射互补：覆盖接触前至抓起，触觉模块处理接触后的滑移与力调节。',
  ],
  nextReading: '重点回看第 4 节框架、第 5.1 节 Tables 1–2 的课程消融、第 5.2 节 Table 3 的真实实验，以及第 7 节局限。',
  suggestedTags: ['目标条件策略', '安全接触'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2506.14317' },
    { label: '项目页', url: 'https://clutterdexgrasp.github.io/' },
    { label: '代码', url: 'https://github.com/QiyangYan/ClutterDexGrasp' },
  ],
};
