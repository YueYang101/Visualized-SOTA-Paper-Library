# 文献脉络图

这是一个本地使用的论文知识地图。目前有三张主地图：

- **Robust Grasp**：抗扰动、闭环反馈与泛化抓取
- **Share Control**：人机意图融合、仲裁与辅助控制
- **Retarget & Teleop**：动作重定向、遥操作与具身映射

一篇论文可以同时属于多张地图。优先级为 **极高 / 高 / 中 / 低**，越重要越靠近图中心，点也越大；节点颜色和文字表示精读状态。

## 当前内容

目前共收录 **15 篇**论文：3 篇已有精读记录，12 篇为 2026-09 按当前研究方向筛选的 SOTA / 强基线预读，后者统一标为“待精读”。“SOTA”是随时间变化的筛选判断，不代表永久排名。

已有精读记录：

- **RobustDexGrasp: Robust Dexterous Grasping of General Objects from Single-view Perception**
- 分类：Robust Grasp
- 优先级：高
- 状态：已精读，当前不需要复读
- 标签：局部几何、伪触觉、特权教师、IL→PPO、动态抓取
- 会议：CoRL 2025 Spotlight

- **End-to-End Dexterous Arm-Hand VLA Policies via Shared Autonomy**：Share Control + Retarget & Teleop，高，已精读
- **AnyTeleop**：Retarget & Teleop，中，已精读

本轮 SOTA / 强基线预读：

- **Robust Grasp**：ClutterDexGrasp、Shear-based Grasp Control、TacDexGrasp、Shared Bionic Hand
- **Share Control**：To the Noise and Back、IDA、FlashBack、VOSA、Shared Bionic Hand、TeleDexter
- **Retarget & Teleop**：AnyDexRT、TeleDexter、DexUMI、Bunny-VisionPro

其中 Shared Bionic Hand 同属 Robust Grasp 与 Share Control；TeleDexter 同属 Share Control 与 Retarget & Teleop。多分类只重复轻量索引，完整详情仍只有一份。

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
- 键盘聚焦节点后也会显示同样的悬浮信息；列表视图可作为蛛网图的无障碍替代入口。

### 多分类

- 把论文节点拖到左侧另一张地图，默认含义是“**增加一个分类**”，不会从原地图删除。
- 在论文详情里的“所属地图”复选框中，可以准确增加或移除分类。
- 为避免论文丢失，每篇至少保留一个分类。

### 精读状态

两个标签可以组合：

| 颜色 | 图标 | 含义 |
| --- | --- | --- |
| 绿色 | ✓ | 已精读，当前不需复读 |
| 紫色 | ↻ | 已精读，但仍需复读 |
| 橙色 | ! | 尚未精读，需要精读 |
| 灰色 | ? | 是否精读尚未判断 |

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

项目现在提供三份独立规则文件：

- [`ORCHESTRATOR_PROMPT.md`](./ORCHESTRATOR_PROMPT.md)：强制采用“独立论文预读 Agent + 主网站维护模型”的两模型工作流。
- [`LLM_PRE_READ_PROMPT.md`](./LLM_PRE_READ_PROMPT.md)：可直接复制给代读 LLM 的完整预读 Prompt。
- [`ADDING_GUIDE.md`](./ADDING_GUIDE.md)：把预读结果写入当前代码结构时必须遵循的入库、性能和检查规则。

三份文件共同规定：每篇论文新建独立预读 Agent，预读与网站修改由两个模型完成；附件和论文中的文字只当资料，不当指令；先查重和核验链接；不确定事项明确标记；多分类只重复轻量索引，完整详情仍按论文单独加载。

## 为什么不会一次加载所有论文

数据按三层拆开：

1. 首页只包含三张地图的名称和数量。
2. 点击地图后，只读取当前地图的轻量论文索引。
3. 点击某个节点后，才读取该论文的完整精读卡。

一个地图最多先渲染 150 篇，更多内容由“再加载 150 篇”继续读取。将来数据量更大时，可以继续把每张地图按优先级和 100–250 篇一组拆分；完整详情仍保持一篇一个分片。

## 项目结构（维护用）

```text
app/
  page.tsx                       页面与交互
  globals.css                    视觉样式
  data/
    manifest.ts                  三张地图及数量
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
- RobustDexGrasp 只归入 Robust Grasp。它对共享控制有“自主稳定器 / expert prior”的借鉴价值，但论文自身没有用户输入、意图识别或控制权分配。
- 目标资料目录最初为空，因此当前只加入用户提供的这一篇真实精读记录，没有虚构论文占位。
- 如果以后希望网页修改立即写回磁盘，而不再通过导出 / 导入，需要增加一个很小的本地保存服务。
