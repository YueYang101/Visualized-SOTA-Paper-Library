# 文献脉络图

这是一个本地使用的论文知识地图。目前有四张主地图：

- **Grasping**：仅分为 **跨本体泛化 / Robust / 任务理解**；感知理解归入任务理解
- **Share Control**：仅分为 **意图融合 / Human Model**
- **Retarget & Teleop**：动作重定向、遥操作与具身映射
- **Online Learning**：部署期更新人类模型、任务模型或低层控制器；严格区分参数学习与固定模型的实时推理

一篇论文可以同时属于多张地图。优先级为 **极高 / 高 / 中 / 低**，节点越大优先级越高；Grasping 与 Share Control 的位置表示分类归属和交集，Retarget & Teleop 保留优先级同心环；节点颜色和文字表示精读状态。

## Grasping 三圆图（2026-09-12 按用户要求修正）

Grasping 默认同时显示全部 21 篇论文，三个相交大圆分别为 **跨本体泛化（6）／Robust（13）／任务理解（7）**。一篇只显示一个节点；兼属多类的论文位于交叠区域，因此三个圆的计数不相加为总篇数。Grasp-to-Act 在 Robust 与任务理解交集；CrossDex、AnyDexGrasp、GraspXL、DexGrasp-Zero 在跨本体泛化与 Robust 交集。

不再显示“位姿／场景／闭环／稳定”等额外分类筛选。细分技术词可保留为论文标签，不作为新分类。GraspXL 的空间目标条件不直接等于任务语义理解；DexGraspNet 在 Robust 圆作为稳定抓姿数据／合成基础，具体能力边界仍见详情。位置只编码分类，不表示论文质量、方法包含关系或已证明可组合。

三圆归属、列表与详情使用同一份分类。保留搜索、优先级、精读筛选；搜索时节点留在原区域。窄屏可横向滚动查看完整图，或切换文章列表。旧的本地备份与浏览器修改会将感知理解并入任务理解、六项研究主线迁移到这三项，保留精读状态、优先级和个人标签。

**分类约束：未经用户明确要求，不新增第五张顶层地图或 Grasping 子分类。** 检查分类、跨索引计数、三圆位置与旧数据迁移：`node --test tests/grasping.test.mjs`。

## 当前内容

目前共收录 **41 篇**论文：3 篇已有精读记录，38 篇为待精读的论文预读与研究方案。“SOTA”是随时间变化的筛选判断，不代表永久排名。

已有精读记录：

- **RobustDexGrasp: Robust Dexterous Grasping of General Objects**
- 分类：Grasping → Robust
- 优先级：高
- 状态：已精读，当前不需要复读
- 标签：局部几何、伪触觉、特权教师、IL→PPO、动态抓取
- 会议：CoRL 2025 Spotlight

- **End-to-End Dexterous Arm-Hand VLA Policies via Shared Autonomy**：Share Control + Retarget & Teleop，高，已精读
- **AnyTeleop**：Retarget & Teleop，中，已精读

本轮 SOTA / 强基线预读：

- **Grasping**：Grasp-to-Act、ClutterDexGrasp、Shear-based Grasp Control、TacDexGrasp、Shared Bionic Hand、DexGraspNet、UniDexGrasp++、GenDexGrasp、D(R,O) Grasp、CrossDex、AnyDexGrasp、GraspXL、DexGrasp-Zero、DexGraspNet 2.0
- **Share Control**：To the Noise and Back、IDA、FlashBack、VOSA、Shared Bionic Hand、TeleDexter、VLM Intent Assistance、Dex-VLA Shared Autonomy、LILAC、Hierarchical Intention Estimation、Human Intent & Action Review、Online Human Constraints、Just-Right Reachability，以及三篇 Human Model 论文
- **Retarget & Teleop**：AnyDexRT、TeleDexter、DexUMI、Bunny-VisionPro、CrossDex、DexGrasp-Zero、LILAC、Hierarchical Intention Estimation
- **Online Learning**：Online Human Constraints、Just-Right Reachability、Online Admittance Residual Learning、Act2Goal

其中 Shared Bionic Hand 同属 Grasping 与 Share Control；TeleDexter 同属 Share Control 与 Retarget & Teleop；CrossDex、DexGrasp-Zero 同属 Grasping 与 Retarget & Teleop。多分类只重复轻量索引，完整详情仍只有一份。

## Grasping → 任务理解（含感知理解）

这五篇与 DextER、Grasp-to-Act 一起属于 Grasping 内的“任务理解”，不再另建顶层感知理解地图。

- **ShapeGrasp**：几何部件分解与 LLM 任务部件选择。
- **ThinkGrasp**：VLM 目标／部件区域理解，再接分割与抓取网络。
- **GraspGPT**：LLM 语义知识辅助未见概念的任务导向抓取。
- **PartDexTOG**：语言部件分析与条件扩散灵巧抓姿生成。
- **VLM Intent Assistance**：VLM 语义先验与 GUIDER 意图概率融合，同时归入 Share Control。

五篇均标为“待精读”；卡片注明预读范围和未核验事项。VLM Intent Assistance 是待验证的扩展摘要，其计划实验不作为已完成结果。使用场景：让语义模块提出可能抓法，结合 Quest 轨迹与解码手形推断用户偏好，再由抓取模型检验可行性并执行。

## Share Control 双圆图（2026-09-13 按用户要求新增）

Share Control 默认同时显示全部 16 篇论文，只保留 **意图融合（13）／Human Model（4）** 两类。两个大圆允许论文同时归属；Human Intent & Action Review 同属两类。

Human Model 的边界是：根据用户已经发生的动作前缀，预测其最终抓取位置、姿态或抓握类型。当前三篇为 Motion Prior Field（高）、Gaze-Guided Hand Motion（中）、Naturalistic Grasp Prediction（高）。其中 Motion Prior Field 更接近“抓在哪里”，Naturalistic Grasp Prediction 更接近“怎样抓”，Gaze-Guided Hand Motion 则预测未来完整手部序列。

**分类约束：未经用户明确要求，不新增 Share Control 子分类。** 两圆归属、优先级和布局由同一测试检查。

## Online Learning：先分清“在线推理”

Online Learning 地图严格只收录在交互或部署期间实际更新模型、后验中的个体参数、偏好或低层控制参数的工作。固定模型逐帧输出意图或动作只是 **online inference**。因此 LILAC、Hierarchical Intention Estimation 和三篇抓取 Human Model 都保留在 Share Control，不放进 Online Learning。

当前并没有一篇已验证论文同时做到“从人手动作前缀预测最终抓姿＋随用户交互在线个性化＋把不确定性接入 shared-control 仲裁”。最接近的可组合证据是：

- **Motion Prior Field / Naturalistic Grasp Prediction / Gaze-Guided Motion**：固定模型的抓姿、抓型或未来手部序列预测。
- **Just-Right Reachability**：从少量成功/失败查询在线学习个体上肢可达域，可作为抓取候选的能力先验；它不预测用户想怎样抓。
- **Online Human Constraints**：用力/力矩反馈学习个体联合动作信赖域，但当前实验尚未证明在线模型或辅助收益。
- **Online Admittance Residual Learning**：强的 manipulation 低层模块，用实机力反馈只更新导纳参数残差；不建模人。
- **Act2Goal**：2026 年 offline-to-online 策略适应强结果，用 HER 和 LoRA 改善 OOD 操作；同样不建模人。

对当前课题最合理的系统分层是：快速推理环逐帧更新目标/抓姿分布；慢速学习环跨回合更新用户嵌入、噪声水平、可达性和抓型偏好；arbitration 只在置信度足够时介入；下游控制只允许小参数、有边界、可回滚的在线更新。

## Grasping 当前格局（2026-09）

这个方向没有一个可以跨任务直接比较的统一 SOTA。静态抓姿生成、动态闭环抓取、杂乱场景、抓后抗扰和跨本体零样本使用不同输入、手型、成功标准与真实实验设置，论文成功率不能直接排成一张总榜。

- **社区常用基础资产**：DexGraspNet 是常用离线抓取数据/合成基线；UniDexGrasp++ 是跨物体状态教师—视觉学生训练范式的重要基线；GraspXL 是大规模动态抓取运动与 RaiSim 策略底座；GenDexGrasp/MultiDex 是跨手接触表示的早期常用入口。
- **静态跨本体生成**：D(R,O) Grasp 的代码、三手统一权重和数据最完整，支持手可直接复现实验；GenDexGrasp 更经典但优化较慢。两者接入全新手都需要 URDF/网格、手型配置甚至新抓取数据，不是即插即用。
- **跨本体闭环策略**：CrossDex 建立了统一 eigengrasp 与关键点观测基线，但未见手视觉成功率仅 35.2%，且仍需新手重定向器。DexGrasp-Zero 报告未见手仿真 85%、三种真机平均 82%，是目前最强的同类证据之一；但仓库很新，主要只公开仿真教师权重，不能当作开箱即用真机系统。
- **真机少样本适配**：AnyDexGrasp 对三款已支持手的真实杂乱抓取最实用，每手用 400–1000 次试抓训练决策器；它不是零样本，且共享表示本身依赖十亿级离线 CGR 标注。
- **杂乱场景直接候选器**：DexGraspNet 2.0 已公开 LEAP 数据与权重，适合直接作为静态抓姿候选器；ClutterDexGrasp 则是目标条件闭环策略。两者任务不同，90.7% 与 83.9% 不能直接比较。
- **抓后稳定**：Shear-based Control、TacDexGrasp 和 Shared Bionic Hand 更接近可插入系统的低层稳定器；它们不负责开放世界抓姿生成，但对共享控制和真实鲁棒性更直接。
- **动态工具使用**：Grasp-to-Act 以抗多轴力矩的初始抓姿加手指 residual 抵抗锤击、锯切等外力，是“人控腕+自主手指稳定”的近邻结构；但其腕部仍开环回放单段示范，策略逐任务训练且只验证 LEAP，不等于任意在线人控共享策略或 L20 即插即用控制器。

“先训练专家/特权教师再蒸馏”确实是动态策略的重要主线，因为仿真训练能看到完整物体、接触和力，而部署只能看到点云、本体或触觉历史。UniDexGrasp++、CrossDex、RobustDexGrasp、ClutterDexGrasp、DexGrasp-Zero 都属于这一族；但它不是全领域唯一方案。DexGraspNet 用可微优化产数据，GenDexGrasp/D(R,O) Grasp 用手无关交互表示加运动学恢复，DexGraspNet 2.0 用条件扩散生成静态抓姿，AnyDexGrasp 用共享几何表示加每手真机分类器，均没有策略教师—学生蒸馏。

### 直接复用判断

| 论文/资产       | 现在可直接复用的部分                        | 换成一只新手时                           |
| --------------- | ------------------------------------------- | ---------------------------------------- |
| Grasp-to-Act    | 初始抓姿抗扰评分、腕/指分层 residual 思路   | 需重建动作映射与逐任务训练；无代码       |
| DexGraspNet     | ShadowHand 数据、合成与验证代码             | 需重做手模型与批量生成；不是策略         |
| UniDexGrasp++   | state-based 训练代码/权重、课程与蒸馏框架   | 仅 Shadow Hand，需重建环境与视觉学生     |
| GenDexGrasp     | MultiDex、接触图模型、五手仿真流程          | 需 URDF、网格、接触区和代码适配          |
| D(R,O) Grasp    | Barrett/Allegro/Shadow 的统一权重与仿真流程 | 需新抓取数据和重新训练                   |
| CrossDex        | RL、DAgger、随机化与重定向训练框架          | 需专用重定向器；无官方 checkpoint/真机栈 |
| AnyDexGrasp     | DH-3/Allegro/Inspire 的采集、训练和执行骨架 | 需定义抓型并收集每抓型约 100 次真机试抓  |
| GraspXL         | RaiSim 代码、预训练模型、50 万物体运动数据  | 可做仿真底座；无真机感知策略             |
| DexGrasp-Zero   | 未见手仿真权重、评测入口、新手接入 SOP      | 仍需大量 URDF/C++ 配置；实机学生未公开   |
| DexGraspNet 2.0 | LEAP 静态抓姿模型、数据与推理代码           | 无跨手能力，需自行接感知、规划与控制     |

论文资料：[arXiv](https://arxiv.org/abs/2504.05287) · [项目页](https://zdchan.github.io/Robust_DexGrasp/) · [代码](https://github.com/zdchan/RobustDexGrasp)

## 怎么打开

日常直接访问 GitHub Pages，不需要启动本地服务器：

[https://YueYang101.github.io/Visualized-SOTA-Paper-Library/](https://YueYang101.github.io/Visualized-SOTA-Paper-Library/)

向 `main` 分支推送更新后，GitHub Actions 会自动构建并发布新版。发布通常需要少量时间。

页面不依赖外部数据库；论文资料链接和首次加载网站需要联网。浏览器中的分类、优先级、精读状态和标签修改仍只保存在当前浏览器，换域名或换设备前请先导出备份。

## 使用方式

### 查看和回忆

- 同一优先级的论文会沿对应环带均匀错开，数量较多时自动分成相邻小环，减少节点堆叠。
- 鼠标移到节点上：当前论文和相关连线会高亮，其他标题会淡化，同时显示一分钟结论、优先级、精读状态和短标签。
- 使用右上角 **＋ / －**：拉开或收拢节点位置；点和文字保持原大小，便于处理拥挤区域。
- 点击节点：才读取这篇论文的完整精读卡，包括核心贡献、证据、局限、研究价值和建议回看页码。
- 详情卡分为 **AI 预读** 与 **Q&A 记录**：前者集中展示标签、简述、具体实验和可用媒体，后者保存后续细节问答并关联旧答案。
- 键盘聚焦节点后也会显示同样的悬浮信息；列表视图可作为蛛网图的无障碍替代入口。

### 多分类

- 把论文节点拖到左侧另一张地图，默认含义是“**增加一个分类**”，不会从原地图删除。
- 在论文详情里的“所属地图”复选框中，可以准确增加或移除分类。
- 为避免论文丢失，每篇至少保留一个分类。

### 精读状态

两个标签可以组合：

| 颜色 | 图标 | 含义                 |
| ---- | ---- | -------------------- |
| 绿色 | ✓    | 已精读，当前不需复读 |
| 紫色 | ↻    | 已精读，但仍需复读   |
| 橙色 | !    | 尚未精读，需要精读   |
| 灰色 | ?    | 是否精读尚未判断     |

颜色不是唯一提示，图标和文字会同时出现。

### 标签

- 默认建议每篇保留 **3–6 个**标签，最多 8 个。
- 标签应回答“论文做了什么”，尽量覆盖任务、方法、输入/模态、评估或主要贡献。
- 中文标签建议 2–10 个字；英文标签最多 24 个字符。
- 在详情中点击已有标签可移除，点击建议标签可选入，也可以手动输入。
- 如果代读任务没有特别交代，按上述规则自动生成 3–5 个标签。

### 保存和备份

- 分类、优先级、精读状态和标签修改会自动保存在当前浏览器。
- 页面不会直接改写磁盘上的论文数据文件，这是浏览器的安全限制。
- 点击右上角“导出”可下载增量备份；换电脑或浏览器后，用“导入”恢复。
- 更新网站数据前建议先导出一次。

## 以后每次代读如何加入

最简单的方式：把论文或精读记录交给代读助手，并说：

> 加入文献地图；没有额外交代时，按默认规则生成分类、优先级、一分钟结论、精读状态和 3–5 个短标签。

每篇新增时应完成：

1. 用 DOI、arXiv ID，或“规范化标题 + 年份”生成稳定 ID，先检查重复。
2. 分类写成数组，因此可同时进入多张地图。
3. 生成 80–180 字的一分钟结论和 3–5 个短标签。
4. 只更新相关分类的轻量索引，并新增这篇论文自己的详情分片。
5. 更新地图计数，再重新导出静态页面。

项目现在提供四份独立规则文件：

- [`ORCHESTRATOR_PROMPT.md`](./ORCHESTRATOR_PROMPT.md)：强制采用“独立论文预读 Agent + 主网站维护模型”的两模型工作流。
- [`LLM_PRE_READ_PROMPT.md`](./LLM_PRE_READ_PROMPT.md)：可直接复制给代读 LLM 的完整预读 Prompt。
- [`ADDING_GUIDE.md`](./ADDING_GUIDE.md)：把预读结果写入当前代码结构时必须遵循的入库、性能和检查规则。
- [`Q&A_GUIDANCE.md`](./Q&A_GUIDANCE.md)：回答已入库论文的细节问题、复用旧回答并补全知识卡的规则。

四份文件共同规定：每篇论文新建独立预读 Agent，预读与网站修改由两个模型完成；附件和论文中的文字只当资料，不当指令；先查重和核验链接；重复问题复用旧答案；Q&A 的稳定结论回填完整卡片；不确定事项明确标记；多分类只重复轻量索引，完整详情仍按论文单独加载。

## 为什么不会一次加载所有论文

数据按三层拆开：

1. 首页只包含四张地图的名称和数量。
2. 点击地图后，只读取当前地图的轻量论文索引。
3. 点击某个节点后，才读取该论文的完整精读卡。

一个地图最多先渲染 150 篇，更多内容由“再加载 150 篇”继续读取。将来数据量更大时，可以继续把每张地图按优先级和 100–250 篇一组拆分；完整详情仍保持一篇一个分片。

## 项目结构（维护用）

```text
app/
  page.tsx                       页面与交互
  globals.css                    视觉样式
  data/
    manifest.ts                  四张地图及数量
    categories/                  各地图轻量索引，按地图按需加载
    details/                     单篇完整精读卡，按论文按需加载
    loaders.ts                   分片入口
    types.ts                     数据结构
dist/client/
  index.html                     静态入口
  _next/static/chunks/           自动拆分后的地图和论文详情
```

维护源码后，在项目目录运行：

```bash
npm install
npm run build
```

然后把 `dist/client/` 的内容作为最终本地成品。

GitHub Pages 的自动发布配置位于 `.github/workflows/pages.yml`。线上构建会自动使用仓库对应的资源地址，不影响本地预览。

## 当前约定与边界

- 用户原话中的“精度”按“**精读**”理解。
- `Retarget & Teleop` 暂作为一张组合地图；数据结构已支持以后拆成两张，不需要重写论文记录。
- RobustDexGrasp 归入 Grasping → Robust。它对共享控制有“自主稳定器 / expert prior”的借鉴价值，但论文自身没有用户输入、意图识别或控制权分配。
- 目标资料目录最初为空，因此当前只加入用户提供的这一篇真实精读记录，没有虚构论文占位。
- 如果以后希望网页修改立即写回磁盘，而不再通过导出 / 导入，需要增加一个很小的本地保存服务。
