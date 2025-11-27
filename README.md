# inBox Note Hub (卡片笔记中心)

这是一个开源的卡片笔记共建项目，旨在整理和分享高质量的时间戳笔记（Timestamp Notes）。所有的笔记数据均存储为纯文本文件，支持一键导入到 **inBox 笔记 App**。

在线演示：[card.gudong.site](https://card.gudong.site)

## ✨ 特性

- **时间戳笔记格式**：兼容 inBox App 的导入标准。
- **纯文本存储**：Code as Data，所有笔记都在 `cards/` 目录下，方便维护和贡献。
- **分类清晰**：包含商业、哲学、文学、历史等多个模块。
- **中英双语 & 夜间模式**：自动适配。
- **AI 洞察**：集成 Gemini AI 对笔记进行深度解析（需配置 API Key）。

## 📂 项目结构

```
/
├── cards/                  # 核心数据目录
│   ├── entrepreneur/       # 商业巨擘 (txt文件)
│   ├── philosophy/         # 哲学思想 (txt文件)
│   ├── literature/         # 文学经典 (txt文件)
│   └── history/            # 历史智慧 (txt文件)
├── src/
│   ├── data.ts             # 集合的元数据配置 (Collections)
│   └── ...
└── ...
```

## 🤝 贡献指南 (Contribution)

我们非常欢迎社区贡献优质的笔记卡片！请遵循以下步骤：

### 1. 准备笔记文件
在 `cards/` 目录下找到合适的分类文件夹（如 `literature`），新建一个 `.txt` 文件（如 `luxun.txt`）。

文件内容格式严格如下（多条笔记之间自然换行即可）：

```text
2023-10-01 10:00:00
这里是笔记的正文内容，可以是名言、摘抄或感悟。
支持多行文本。
#标签1 #标签2

2023-10-01 10:05:00
这是第二条笔记。
必须以 YYYY-MM-DD HH:mm:ss 或类似的时间戳开头。
```

### 2. 注册集合 (更新 Metadata)
修改 `src/data.ts` 文件，在 `COLLECTIONS` 数组中添加你的新文件配置：

```typescript
{
  id: 'luxun',
  name: '鲁迅全集',
  nameEn: 'Lu Xun',
  description: '横眉冷对千夫指，俯首甘为孺子牛。',
  category: CategoryId.LITERATURE, // 对应分类ID
  author: 'Lu Xun',
  coverColor: 'bg-stone-600',      // 选择一个 Tailwind 颜色类
  filePath: '/cards/literature/luxun.txt', // 你的文件路径
  count: 10                        // 笔记大致数量
},
```

### 3. 提交 PR
将修改提交 Pull Request 到本仓库。

---

## 🚀 部署指南 (Deployment)

本项目推荐使用 **Cloudflare Pages** 进行部署，并绑定阿里云域名。

### 1. 准备工作
- 拥有一个 GitHub 账号并 Fork 本仓库。
- 拥有 Cloudflare 账号。
- 拥有阿里云域名 (例如 `gudong.site`)。

### 2. Cloudflare Pages 设置
1. 登录 Cloudflare Dashboard，进入 **Workers & Pages** -> **Pages**。
2. 点击 **Connect to Git**，选择你 Fork 的仓库。
3. **Build Settings (构建设置)**:
   - **Framework Preset**: Vite
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
4. 点击 **Save and Deploy**。

### 3. 绑定阿里云域名 (`card.gudong.site`)
1. 在 Cloudflare Pages 项目页面，点击 **Custom domains** -> **Set up a custom domain**。
2. 输入 `card.gudong.site`，点击 Continue。
3. Cloudflare 会生成一个目标域名（例如 `inbox-hub.pages.dev`）。
4. **登录阿里云域名控制台** -> 解析设置。
5. 添加一条记录：
   - **记录类型**: `CNAME`
   - **主机记录**: `card`
   - **记录值**: 填入 Cloudflare 提供的 `xxx.pages.dev`。
6. 回到 Cloudflare 点击 **Verify** 或 **Activate**。

### 4. 关注公众号
关注公众号 **咕咚同学**，回复 **Card** 获取更多部署技巧和最新卡片合集。

![咕咚同学](https://gudong.s3.bitiful.net/asset/gongzhonghao.jpg)
