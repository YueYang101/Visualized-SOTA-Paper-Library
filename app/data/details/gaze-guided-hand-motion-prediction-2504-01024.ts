import type { PaperDetail } from '../types';

export const detail: PaperDetail = {
  id: 'gaze-guided-hand-motion-prediction-2504-01024',
  subtitle: '从动作历史、物体与眼动显式预测未来手部关节点序列',
  sourceNote:
    '2026-09-13 预读 arXiv:2504.01024v1 的问题定义、方法、数据和实验；论文为健康参与者 pilot study，当前标为中优先级、待精读。',
  contributions: [
    '把 Human Model 写成未来序列预测：历史手部运动、眼动和场景物体共同条件化未来手部关节点。',
    '用 VQ-VAE 将连续手部动作编码成离散 token，再由自回归 Transformer 预测未来 token 序列。',
    '分别评估跨被试、跨动作以及二者同时变化，并通过无眼动对照测量 gaze 的贡献。',
  ],
  evidence: [
    '数据来自 15 名健康参与者，使用 Project Aria 采集第一视角图像和眼动，并提取 3D 手部运动。',
    '输入和输出均用双手各 21 个三维关键点表示；评估同时报告整段平均误差和最终抓取位置误差。',
    '较少输入帧时，加入眼动的模型通常比无眼动版本具有更低的位置误差。',
    '表格中的最终位置误差仍约为 0.16–0.41 m，随输入帧增加而下降。',
  ],
  limitations: [
    '物体位置由人工从第一帧提取，并非完整的实时感知系统。',
    '每类物体基本对应固定抓型，不能充分证明同一物体多个合理抓取位置之间的个体意图辨别。',
    'Quest 3 没有该工作所用的原生眼动输入，当前应采用无眼动版本或另设传感器。',
    '位置误差尚不足以直接驱动精细抓取，需要候选约束、末端修正或低层 grasping model。',
  ],
  relevance: [
    '问题形式最接近“已观察动作 → 用户未来真实动作”，可作为完整时序 Human Model 的结构参考。',
    'Quest／OpenXR 的 J 点手骨架可选取公共关节子集映射到论文表示，但应增加物体相对坐标和跟踪质量标记。',
    'Stage 1.2 采用单物体、无视觉编码器的状态条件 Flow Matching：从 Quest 手部动作前缀生成未来人手状态序列，并与 Stage 1.1 的确定性小模型比较。',
  ],
  nextReading:
    '重点核对序列长度、采样率、关键点重建误差、训练规模和终点定义，并单独复现 no-gaze baseline。',
  suggestedTags: ['Human Model', '未来序列预测', 'Quest无眼动对照', 'Stage 1.2'],
  links: [
    { label: '论文（arXiv）', url: 'https://arxiv.org/abs/2504.01024' },
    { label: 'HTML 全文', url: 'https://arxiv.org/html/2504.01024v1' },
  ],
  qa: [
    {
      id: 'quest-single-object-adaptation',
      question: '只有一个物体时，Gaze-Guided 应如何适配 Quest 数采场景？',
      answer:
        '单物体只消除了“识别目标物体”的需求，不等于可以忽略物体坐标：若物体固定，可每次采集前标定一次 T_world_object 并从网络输入中删除 RGB、object encoder 与 gaze；若物体会移动，仍应输入数值型物体 6D 位姿，但不需要视觉类别特征。Quest 每帧保留时间戳、腕部位姿、J 个手关节点或关节旋转、速度、左右手标志及 tracking-valid mask；把腕部位置和方向变换到物体坐标系，把手指位置写成腕部相对量。模型观察 0.5–1.0 s 动作前缀，预测后续 0.5–1.0 s 的腕部 6D 轨迹与手指姿态。若 Stage 1.2 只研究到接触，应统一截到 contact frame；若还要研究松手，必须采集 reach/grasp/manipulate/release 全周期并增加 phase、contact_state 与 release_frame。',
      updatedAt: '2026-09-13',
      relatedQaIds: ['stage-1-2-flow-matching'],
      sources: [
        { label: 'Gaze-Guided §II–III', url: 'https://arxiv.org/html/2504.01024v1#S2' },
      ],
    },
    {
      id: 'stage-1-2-flow-matching',
      question: 'Flow Matching／Diffusion Policy 是否属于 IL，Stage 1.2 如何训练？',
      answer:
        'Diffusion 与 Flow Matching 是条件生成分布的建模方法，本身不等于 IL；当条件是机器人观测、输出是示范动作并用离线示范训练时，Diffusion Policy 属于生成式 behavior cloning，即 offline imitation learning。Stage 1.2 的输出改为未来“人手状态”而非机器人动作，因此数学管线类似 BC，但功能上是监督式人类动作预测，不能直接称为机器人 policy。训练样本为 c=过去 L 帧 Quest 手部状态、y=未来 H 帧人手轨迹。Flow Matching 每次采样噪声 ε 和时间 τ，构造 xτ=(1−τ)ε+τy，以目标速度 u*=y−ε 训练 vθ(xτ,τ,c)，主损失为 ||vθ−u*||²，并可加终点、旋转、速度平滑、骨长和关节限位损失。推理从多个 ε 出发积分 dx/dτ=vθ，得到多条未来候选；每次只使用短预测窗口并随新观测滚动重算。首轮用手部状态的 TCN/小型 Transformer 作条件编码器，不加入 RGB/VLM；必须与 Stage 1.1 的确定性 MLP/Transformer 比较，按跨被试划分报告 ADE/FDE、最终腕姿误差、关节误差、top-k oracle 与多样性。若单物体、单抓型的数据本身近似单峰，生成模型没有明显收益，应保留 Stage 1.1 而不继续扩大模型。',
      updatedAt: '2026-09-13',
      relatedQaIds: ['quest-single-object-adaptation'],
      sources: [
        { label: 'Diffusion Policy', url: 'https://arxiv.org/abs/2303.04137' },
        { label: 'Flow Matching', url: 'https://arxiv.org/abs/2210.02747' },
      ],
    },
  ],
};
