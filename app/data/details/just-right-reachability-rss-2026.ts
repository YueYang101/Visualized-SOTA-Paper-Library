import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'just-right-reachability-rss-2026',
  subtitle: '以稀疏主动查询在线估计个体上肢可达域，并据此抑制过度辅助',
  sourceNote: '2026-09-13 完整阅读 RSS 2026 官方12页论文，核对第III–VII节、图2–6、表I–III，并核验作者项目页媒体。官方未提供代码或 arXiv 链接。',
  contributions: [
    '以独立关节上下界的基础盒和30个高斯原语表示四自由度上肢关节可达域。',
    '用16维潜空间解码可达域参数，并用几何距离、肌骨仿真和康复文献临床锚点组织潜空间。',
    '在3000个训练用户嵌入上维护贝叶斯后验，主动查询分歧最大的边界姿态，据成功/失败在线更新。',
    '把估计的目标可达性直接映射为辅助增益或物体重放决策。',
  ],
  evidence: [
    '组合参数模型达到0.971重建 IoU、1.32个平均连通分量和0.998潜空间几何相关性；SIREN 基线为0.827、32.23和0.844。',
    '20名分布内测试用户上，约20次查询达0.50 IoU，100次约0.65；分布外100次约0.57。',
    '10名佩戴阻力带的学生中，辅助条件显著影响身体参与感（χ²(3)=18.29，p<0.001），just-right 优于恒定辅助与过度辅助。',
  ],
  experiments: [
    {
      title: '稀疏查询下的在线可达域恢复',
      setup: '对20名分布内和20名分布外用户最多查询100次，以离线 one-class SVM 包络为参考，比较 oracle、空间填充、BALD 与近邻检索。',
      result: '分布内约20次达0.50 IoU、100次达0.65；分布外100次约0.57，优于最近生成用户约0.48和最近真实用户约0.30。',
      takeaway: '主动边界查询和潜空间后验插值是样本效率与分布外恢复的主要来源。',
      source: '第VI-C节，图5',
    },
    {
      title: '三明治制作中的适度辅助',
      setup: '10名学生佩戴阻力带，用 Franka Panda 执行四步取食材；被试内比较两种错估、恒定帮助与 just-right。',
      result: 'just-right 的参与感均值3.6、中位数4.0，显著优于 always-help（p=0.010）和过度辅助（p=0.006）；任务完成4/4。',
      takeaway: '按个体能力决定是否介入，可在不牺牲任务完成的情况下提高主观参与度。',
      source: '第VI-D1节，图6a–c',
    },
    {
      title: 'ARAT 式任务的闭环适应演示',
      setup: '任务中增加阻力带张力，失败抓取后触发新查询并将物体重放至最近可达位置。',
      result: '后验可达边界随张力增加而收缩；未报告查询数、适应延迟或成功率统计。',
      takeaway: '只证明系统链路能在线更新，不能证明动态适应的稳定性或样本效率。',
      source: '第VI-D2节，图6d–e',
    },
  ],
  limitations: [
    '只建模肩关节三自由度与肘关节一自由度，未覆盖躯干代偿、手腕、手指、力量、疼痛或精细抓握能力。',
    '真机研究仅10名健康学生，用阻力带模拟障碍，未验证真实临床人群。',
    '三明治实验仍需20次初始查询且任务期间不更新；ARAT 适应只有单次定性演示。',
    '模型预测给定关节配置能否到达，不从动作前缀预测最终抓姿或抓型。',
  ],
  relevance: [
    '提供 shared control 的在线个性化层：从极少量个体二值反馈维护能力后验，而不是为每名用户重训完整策略。',
    '可把可达概率作为抓取终态候选的身体可行性先验，对动作前缀预测的多个抓取位置过滤或重排序。',
    '它可作为辅助门控器，但需与手部姿态、物体几何、抓型及动作前缀模型组合。',
  ],
  nextReading: '回看第III节观测假设、第IV–V节模型与主动查询、表II和图5；迁移到抓取预测时重点核对第VI-D2与第VII节。',
  suggestedTags: ['贝叶斯主动学习', '临床先验', '辅助仲裁'],
  media: [
    { type: 'image', role: 'architecture', title: '结构化个体可达域潜空间', url: 'https://emprise.cs.cornell.edu/human-reachability/static/images/latent_reachability.png', caption: '展示潜空间、参数解码器以及几何、临床和肌骨锚点。', sourceUrl: 'https://emprise.cs.cornell.edu/human-reachability/', alt: '个体可达域潜空间架构' },
    { type: 'video', role: 'demo', title: 'ARAT 在线适应演示', url: 'https://emprise.cs.cornell.edu/human-reachability/static/videos/ARAT.mp4', caption: '展示阻力变化、失败抓取、追加查询与物体重放组成的在线环。', sourceUrl: 'https://emprise.cs.cornell.edu/human-reachability/', alt: 'ARAT式任务中的在线可达域适应' },
  ],
  links: [
    { label: '论文（RSS）', url: 'https://www.roboticsproceedings.org/rss22/p119.html' },
    { label: 'DOI', url: 'https://doi.org/10.15607/RSS.2026.XXII.119' },
    { label: '作者项目页', url: 'https://emprise.cs.cornell.edu/human-reachability/' },
  ],
};
