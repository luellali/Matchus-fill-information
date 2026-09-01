# CloudBase 临时部署方案

## 结论

当前项目已经适配腾讯云 CloudBase 静态网站托管，并可直接使用平台分配的默认测试域名完成联调。

它具备以下工程便利：

- 不需要购买或维护裸服务器。
- 可以直接上传 Vite 生成的 `dist/`。
- 默认域名可立即部署，并自带 HTTPS 与 CDN。
- 项目使用 URL hash 保存页码，不依赖服务端 SPA 回退规则。

需要注意：默认测试域名会先展示 CloudBase 的「页面访问提示」，访问者需要再次确认才能进入网站。该中间页由平台注入，无法通过本项目的 HTML、路由或构建配置移除；绑定自定义域名则需要符合相应的 ICP 备案要求。默认域名还存在访问频率限制，因此它只适合联调和临时确认，不适合要求扫码直达的正式展示。

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

部署完成后，在 CloudBase 控制台的静态网站托管页面复制默认域名。生成二维码前，应先告知使用者会看到平台提示页。

## 控制台上传备选

如果 CLI 登录来不及，可以先运行：

```bash
pnpm build
```

然后在 CloudBase「静态网站托管 → 文件管理」中上传 `dist/` 内的全部内容。必须让 `index.html` 位于托管根目录，而不是上传成 `dist/index.html`。

## 当前方案边界

在“立即可用、无 ICP 备案、中国大陆稳定访问、扫码无中间页”四个条件同时成立时，目前没有可承诺长期稳定的公共静态托管方案。临时演示可继续使用 CloudBase 测试域名并接受中间页；正式展示则应使用已备案域名。

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
