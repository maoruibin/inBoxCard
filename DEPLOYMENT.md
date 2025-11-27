# 🚀 Cloudflare Pages 部署指南

## 📋 部署前检查清单

- [ ] 代码已推送到 GitHub
- [ ] 已安装 Node.js (v16+) 和 npm/pnpm
- [ ] 拥有 Cloudflare 账户
- [ ] 拥有阿里云域名 (可选，可后续添加)

## 🔧 第一步：连接 GitHub 仓库

1. **登录 Cloudflare Dashboard**
   - 访问 https://dash.cloudflare.com/
   - 使用你的账号登录

2. **进入 Pages 管理**
   - 左侧菜单：**Workers & Pages** → **Pages**
   - 点击 **Create application** → **Connect to Git**

3. **授权 GitHub**
   - 选择 **GitHub**
   - 授权 Cloudflare 访问你的 GitHub 账户
   - 选择 Fork 后的 **inBoxCard** 仓库

## ⚙️ 第二步：配置构建设置

在 **Create production branch** 页面填写：

| 配置项 | 值 |
|------|-----|
| **Framework preset** | `Vite` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (或不填) |
| **Node.js version** | `18.x` 或更高 |

## 🔐 第三步：配置环境变量（可选）

如果要使用 Gemini AI 功能：

1. 在部署前，点击 **Settings** → **Environment variables**
2. 添加：
   - **Variable name**: `VITE_GEMINI_API_KEY`
   - **Value**: 你的 Google Gemini API Key
   - **Environments**: 选择 `Production`
3. 点击 **Save**

> 获取 API Key: https://ai.google.dev/

## 🚀 第四步：部署

1. 点击 **Save and Deploy**
2. Cloudflare 会自动：
   - 拉取最新代码
   - 执行构建命令
   - 部署到全球 CDN

部署通常需要 **2-5 分钟**，完成后你会看到一个 `.pages.dev` 域名。

## 🌐 第五步：绑定自定义域名（以 card.gudong.site 为例）

### 在 Cloudflare Pages 中：

1. 打开你的 Pages 项目
2. 点击 **Custom domains**
3. 点击 **Set up a custom domain**
4. 输入 `card.gudong.site`，点击 **Continue**
5. Cloudflare 会生成一个 CNAME 记录值（例如：`inbox-hub.pages.dev`）
6. **复制这个值**，等一会儿再验证

### 在阿里云域名控制台中：

1. 登录阿里云：https://dc.console.aliyun.com
2. 找到 `gudong.site` 域名，点击 **DNS 解析**
3. 点击 **添加记录**，填写：
   - **记录类型**: `CNAME`
   - **主机记录**: `card` (不是 card.gudong.site)
   - **记录值**: 粘贴 Cloudflare 提供的值（如 `inbox-hub.pages.dev`）
   - **TTL**: 保持默认 `10分钟`
4. 点击 **确认**

4. 回到 Cloudflare Pages，点击 **Verify domain** 或 **Activate domain**

> ⏱️ DNS 解析可能需要 5-30 分钟生效，请耐心等待

## ✅ 验证部署

部署完成后，你可以通过以下方式验证：

```bash
# 测试 .pages.dev 域名
curl https://inbox-hub.pages.dev

# 测试自定义域名
curl https://card.gudong.site

# 或直接在浏览器打开
# https://card.gudong.site
```

## 🔄 自动部署

配置完成后，**每次你推送代码到 GitHub main 分支**，Cloudflare 会**自动构建并部署**。

## 📱 本地测试

部署前，建议先在本地测试：

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建测试
npm run build
npm run preview
```

## 🆘 常见问题

### Q: 部署失败，显示 "Build failed"
**A**: 检查构建日志，通常是：
- 缺少依赖：运行 `npm install`
- TypeScript 错误：运行 `npm run build` 本地检查
- 环境变量问题：确保 `VITE_` 前缀

### Q: 域名解析超时
**A**: 
- 检查 DNS 记录是否正确（CNAME，不是 A 记录）
- 等待 DNS 生效（通常 5-30 分钟）
- 使用 `nslookup card.gudong.site` 或 https://dnschecker.org 检查

### Q: 资源 404（如 `/cards/xxx.txt`）
**A**: 
- 确认 `vite.config.ts` 中 `viteStaticCopy` 配置正确
- 检查 `cards/` 文件夹是否已上传到 GitHub
- 本地 `npm run build` 验证 `dist/cards/` 是否存在

### Q: 自定义域名不生效
**A**:
- Cloudflare Dashboard 检查 DNS 记录是否已激活
- 清除浏览器缓存，或用隐私模式测试
- 检查域名 DNS 托管是否在 Cloudflare（需要修改 NS 记录）

## 📚 更多资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#cloudflare-pages)
- [Cloudflare DNS 管理](https://developers.cloudflare.com/dns/)

---

**一旦部署成功，你的 inBox Note Hub 就可以被全世界访问了！🎉**
