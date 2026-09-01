# MatchUs 交互作品集 Web

窄屏优先的 Vite + React 单页应用。页面布局、按钮、标签、聊天气泡与人格气泡均为真实 Web 组件；没有使用整页图片。

## 技术栈

- Vite + React + TypeScript
- Tailwind CSS v4（Vite plugin）
- shadcn/ui 目录结构与 CSS variables
- 原生 Pointer Events 实现触摸滑动

## 目录

```text
src/
  components/
    ui/          shadcn/ui 基础组件
    portfolio/   作品集通用组件
    screens/     四个独立页面
  hooks/         交互 hooks
  lib/           token 与工具方法
  styles/        全局设计 token
```

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

构建产物位于 `dist/`。Vite 使用相对资源路径，因此产物可上传到 CloudBase 根路径或子路径，也可部署到其他纯静态资源托管。

## CloudBase 静态托管

先在腾讯云创建 CloudBase 环境并开通静态网站托管，然后执行：

```bash
pnpm build
pnpm add -g @cloudbase/cli
tcb login
pnpm deploy:cloudbase -- -e <环境ID>
```

默认域名适合本次临时二维码展示，但官方将其定位为开发/测试用途并设有访问频率限制。完整选择依据、控制台上传方法和正式上线注意事项见 [CloudBase 临时部署方案](docs/deployment-cloudbase.md)。

## 设计 token

第一版 token 位于 `src/styles/global.css`，包括品牌色、渐变、圆角、阴影、边框和移动端页面内边距。当前 Figma 文件仅有公开查看权限，因此这一版数值来自画板视觉推导；取得 Figma 编辑权限后可在同一处完成精确替换。
