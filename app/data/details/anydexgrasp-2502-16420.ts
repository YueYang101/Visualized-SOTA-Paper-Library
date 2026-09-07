import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'anydexgrasp-2502-16420',
  subtitle: '共享接触几何表征，用数百次真机试抓适配不同灵巧手',
  sourceNote:
    '已预读 29 页 arXiv v1，并核验项目页、官方仓库、运行脚本和权重入口；截至 2026-09 未核实主会或期刊正式接收，也未下载 Google Drive 权重。',
  contributions: [
    '提出手无关的 Contact-centric Grasp Representation：在局部规范坐标中编码抓取深度、平面内角度、距离和表面法向。',
    '先由点云网络预测共享 CGR，再将其映射到每只手的预定义抓型，用轻量分类器预测真机成功概率。',
    '在 DH-3、Allegro、Inspire 三种不同结构的手上共享感知表征，只为每只手重新收集少量二元成败标签。',
    '用局部几何覆盖分析说明：增加每个训练物体上的局部采样密度，比单纯增加物体数更有效。',
  ],
  evidence: [
    '40 个训练物体、每抓型 100 次试抓时，DH-3 共 400 条数据达到 94.5%，Allegro 1000 条达到 75%，Inspire 800 条达到 77%。',
    '使用 144 个训练物体和更多真机数据时，三手在日常物体上为 97%、78%、83%，启发式基线为 66%、51%、58%。',
    '测试采用 UR5、腕上 RealSense D415 和约 150 个未见物体，成功以把物体搬运到目标位置计。',
    '通用表征并非只用数百次试抓训练：它从 GraspNet 场景重标注超过十亿个 CGR；每手少样本只训练下游决策器。',
    '网络生成 200 个抓姿约 0.5 秒，但 Open3D CPU 碰撞检测另需约 20 秒。',
  ],
  limitations: [
    '“human-level learning efficiency”只描述每手决策适配，未计入十亿级 CGR 预训练成本。',
    '每只新手仍需定义抓型与闭合轴、准备几何和碰撞模型、接控制器并重新收集真机数据，不能零样本接入。',
    '单次视觉后开环闭合，无触觉反馈、在线纠错或受扰恢复；鲁棒证据主要是跨物体和杂乱场景。',
    '官方实现只覆盖三款手且依赖旧 CUDA/MinkowskiEngine 和专用硬件接口，CC BY-NC 也限制商业使用。',
  ],
  relevance: [
    '已支持三款手的代码与权重入口适合作为研究原型；新硬件更适合复用 CGR 和数据采集框架，而不是直接部署。',
    '它提供一条不靠教师—学生策略蒸馏的路线：解析几何标签预训练共享表示，再用少量真机二元数据适配。',
    '若用于鲁棒抓取，应把 20 秒碰撞检测、无触觉开环执行和有限抓型作为优先改进点。',
  ],
  nextReading:
    '重点回看 Fig. 1、§2.2 的 CGR、Fig. 5/§3.2–3.3 的少样本数字、§4.1 的十亿级标注，以及补充材料的新手适配和数据采集流程。',
  suggestedTags: ['点云抓取', '抓型离散化', '真实试错', '手无关表征'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2502.16420' },
    { label: '项目页', url: 'https://graspnet.net/anydexgrasp/' },
    { label: '代码', url: 'https://github.com/graspnet/AnyDexGrasp' },
    {
      label: '模型权重与数据',
      url: 'https://drive.google.com/drive/folders/1XfJmEkg29vq7swCndnS_B0Y4djwWhZRo',
    },
  ],
};
