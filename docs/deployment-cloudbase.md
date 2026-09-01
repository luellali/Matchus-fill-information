# CloudBase 临时部署方案

## 结论

当前项目优先使用腾讯云 CloudBase 静态网站托管，并直接使用平台分配的默认域名。

这个方案适合本次临时二维码展示：

- 不需要购买或维护裸服务器。
- 可以直接上传 Vite 生成的 `dist/`。
- 默认域名可立即访问，并自带 HTTPS 与 CDN。
- 项目使用 URL hash 保存页码，不依赖服务端 SPA 回退规则。

需要注意：CloudBase 官方把默认域名定位为开发、测试用途，并存在访问频率限制。它适合短期作品展示，不应当被视为免备案的长期正式生产域名。

## 最短发布流程

### 1. 创建环境

1. 登录腾讯云并完成实名认证。
2. 进入 CloudBase 控制台。
3. 创建一个云开发环境。
4. 开通「静态网站托管」。
5. 记录环境 ID。

### 2. 安装并登录 CLI

```bash
pnpm add -g @cloudbase/cli
tcb login
```

登录命令会打开腾讯云授权页面；无浏览器环境时会提供设备码登录。

### 3. 构建并发布

```bash
pnpm build
pnpm deploy:cloudbase -- -e <环境ID>
```

项目脚本会把 `dist/` 发布到托管根目录，同时启用：

- `--safe`：上传或校验失败时回滚。
- `--verify`：发布后校验远端文件。

部署完成后，在 CloudBase 控制台的静态网站托管页面复制默认域名，再用它生成二维码。

## 控制台上传备选

如果 CLI 登录来不及，可以先运行：

```bash
pnpm build
```

然后在 CloudBase「静态网站托管 → 文件管理」中上传 `dist/` 内的全部内容。必须让 `index.html` 位于托管根目录，而不是上传成 `dist/index.html`。

## 为什么暂不选 EdgeOne Pages

当加速区域包含中国大陆时，EdgeOne Pages 的系统预览链接有效期只有 3 小时；长期稳定访问需要绑定已备案的自定义域名。它不适合当前没有备案、又需要立即分享二维码的情况。

## 正式上线时

长期使用时应准备已完成 ICP 备案的自定义域名，再绑定到 CloudBase。默认域名存在访问频率限制，官方不建议用于正式生产流量。

## 官方资料

- https://docs.cloudbase.net/hosting/web-hosting-static
- https://docs.cloudbase.net/cli-v1/hosting
- https://docs.cloudbase.net/cli-v1/install
- https://docs.cloudbase.net/hosting/manage
- https://edgeone.ai/document/175201428435140608
