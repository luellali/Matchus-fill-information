# MatchUs 交互作品集 Web

一个用于扫码展示的窄屏优先交互作品集。项目基于 Vite、React 和 TypeScript 实现，将 Figma 中的四个移动端页面还原为真实 Web 组件，而不是整页截图：聊天、标签、性别选择、人格气泡、Toast、遮罩和页面导航均可交互。

## 项目说明

- 形态：单页应用（SPA），不依赖后端接口或数据库。
- 展示场景：将部署地址生成二维码，访问者通过手机浏览器或微信内置浏览器查看。
- 宽度策略：手机端占满可用宽度；宽屏环境下页面容器最大宽度为 `430px`。
- 路由策略：使用 URL hash 保存当前页面，不需要服务器配置 SPA fallback。
- 资源策略：图片仅用于局部角色插画，页面结构和交互均由 HTML、React 与 CSS 实现。

## Figma 设计稿

Figma 文件：[作品集 2026](https://www.figma.com/design/gCUTSWPvkCAcZj10eIM0px/%E4%BD%9C%E5%93%81%E9%9B%862026)

四个主要页面：

1. [推荐页与资料填写提示](https://www.figma.com/design/gCUTSWPvkCAcZj10eIM0px/%E4%BD%9C%E5%93%81%E9%9B%862026?node-id=1059-4527)
2. [聊天问答页](https://www.figma.com/design/gCUTSWPvkCAcZj10eIM0px/%E4%BD%9C%E5%93%81%E9%9B%862026?node-id=1059-4704)
3. [个人标签选择页](https://www.figma.com/design/gCUTSWPvkCAcZj10eIM0px/%E4%BD%9C%E5%93%81%E9%9B%862026?node-id=1004-3260)
4. [个性人设匹配页](https://www.figma.com/design/gCUTSWPvkCAcZj10eIM0px/%E4%BD%9C%E5%93%81%E9%9B%862026?node-id=1004-3524)

当前 Figma 文件只提供可读权限，因此设计 token 由画板视觉、页面截图和提供的局部素材推导。取得更高权限后，可以继续在 `src/styles/global.css` 中校准颜色、间距、阴影与圆角。

## 页面与交互

| 页面   | Hash        | 主要内容                               | 核心交互                                                              |
| ------ | ----------- | -------------------------------------- | --------------------------------------------------------------------- |
| 推荐页 | `#discover` | 推荐卡片、资料填写 Toast、模糊遮罩     | Toast 入场；点击非 CTA 区域后退场并重新弹出；点击“立即前往”进入聊天页 |
| 聊天页 | `#chat`     | 三轮问答、F/M 性别选择                 | 页面阶段指示；依次选择回答；选择性别后才显示“选择我的标签”            |
| 标签页 | `#tags`     | 家庭背景、成长背景、择偶偏向、兴趣爱好 | 标签可多选；至少选择 3 个标签后进入下一页                             |
| 人设页 | `#persona`  | 左侧身份气泡、右侧匹配气泡             | 左侧气泡静止；右侧白色气泡错峰浮动；至少选择 1 个后完成画像           |

补充操作方式：

- 手机端可在非交互控件区域左右滑动切换页面。
- 宽屏使用右侧导航；窄屏使用默认收起的右侧导航，按需展开，并在跳页后自动收起。
- 第二页开始支持键盘方向键切换页面。
- 可以通过 `/#discover`、`/#chat`、`/#tags`、`/#persona` 直接打开指定页面。

## 技术栈

- Vite 8
- React 19 + TypeScript 7
- Tailwind CSS v4（Vite plugin）
- shadcn/ui 目录结构与 CSS variables
- lucide-react 图标
- 原生 Pointer Events 手势
- Biome 2：格式化、lint 与 import 整理

## 开发环境

Vite 8 要求以下任一 Node.js 版本范围：

- Node.js `^20.19.0`
- Node.js `>=22.12.0`

本项目当前验证环境：

- Node.js `22.12.0`
- pnpm `10.30.3`

推荐使用 pnpm，并保持锁文件 `pnpm-lock.yaml` 不被其他包管理器覆盖。

## 本地开发

```bash
pnpm install
pnpm dev
```

开发服务器默认监听 `0.0.0.0`。通常可以访问：

- 本机：`http://localhost:5173`
- 同一局域网手机：终端中 Vite 输出的 Network 地址

如果 `5173` 已被占用，Vite 会自动选择其他端口，请以终端输出为准。

## 常用命令

| 命令                                   | 用途                                      |
| -------------------------------------- | ----------------------------------------- |
| `pnpm dev`                             | 启动开发服务器并监听局域网地址            |
| `pnpm check`                           | 检查格式、lint 与 import 顺序，不写入文件 |
| `pnpm check:write`                     | 全量格式化并应用安全修复                  |
| `pnpm lint`                            | 仅运行 Biome lint                         |
| `pnpm format`                          | 仅运行 Biome formatter                    |
| `pnpm typecheck`                       | 执行 TypeScript 全量类型检查              |
| `pnpm build`                           | 类型检查并生成生产构建                    |
| `pnpm verify`                          | 连续执行格式/lint、类型检查和生产构建      |
| `pnpm preview`                         | 本地预览 `dist/` 生产产物                 |
| `pnpm deploy:cloudbase -- -e <环境ID>` | 将 `dist/` 发布至 CloudBase 静态托管      |

项目根目录的 `biome.json` 是 IDE 插件与命令行共享的唯一代码规范来源。提交前建议执行 `pnpm verify`，它会依次完成格式/lint、类型检查和生产构建。

```bash
pnpm verify
```

## 项目结构

```text
.
├── docs/
│   └── deployment-cloudbase.md   # 腾讯云部署说明
├── src/
│   ├── assets/                   # 局部角色与性别插画
│   ├── components/
│   │   ├── portfolio/            # 作品集通用业务组件
│   │   ├── screens/              # 四个页面组件
│   │   └── ui/                   # shadcn/ui 基础组件
│   ├── hooks/                    # 手势等交互 hooks
│   ├── lib/                      # 通用工具方法
│   ├── styles/
│   │   └── global.css            # Tailwind 入口、设计 token 与全局动效
│   ├── App.tsx                   # 页面编排与导航状态
│   └── main.tsx                  # React 入口
├── biome.json                    # 格式化与 lint 规范
├── components.json               # shadcn/ui 配置
├── package.json
└── vite.config.ts
```

## 设计系统

全局设计 token 位于 `src/styles/global.css`，包括：

- 品牌主色、辅助色与渐变
- 页面背景与雾化背景
- 字体颜色与边框颜色
- 卡片、面板和胶囊圆角
- 卡片阴影与悬浮阴影
- 移动端安全区和页面水平间距
- 页面入场、Toast、遮罩和气泡浮动动画

组件使用 Tailwind utility class 和 CSS variables 消费这些 token，避免在多个 TypeScript 文件中重复维护同一套设计常量。

## 构建与本地预览

```bash
pnpm build
pnpm preview
```

生产产物位于 `dist/`。Vite 的 `base` 设置为 `./`，因此静态资源使用相对路径，既可部署在域名根目录，也可部署到子目录。

## 腾讯云 CloudBase 部署

项目已准备腾讯云 CloudBase 静态托管脚本，它不需要维护裸服务器，可以直接发布 Vite 的 `dist/`。但平台默认测试域名会先展示 CloudBase 的访问提示页；不绑定已备案的自定义域名时，无法保证扫码后直接进入作品集。因此它适合当前联调和临时确认，不应描述为无中间页的正式展示方案。

### CLI 发布

1. 在腾讯云 CloudBase 控制台创建环境。
2. 开通“静态网站托管”并记录环境 ID。
3. 安装 CloudBase CLI 并登录：

```bash
pnpm add -g @cloudbase/cli
tcb login
```

4. 检查、构建并发布：

```bash
pnpm check
pnpm typecheck
pnpm build
pnpm deploy:cloudbase -- -e <环境ID>
```

部署脚本使用：

- `--safe`：上传或校验失败时回滚。
- `--verify`：发布后验证远端文件。

### 控制台上传备选

如果来不及配置 CLI，可以运行 `pnpm build`，然后在 CloudBase“静态网站托管 → 文件管理”中上传 `dist/` 目录内的全部内容。需要确保 `index.html` 位于托管根目录，而不是形成 `dist/index.html`。

### 生成展示二维码

1. 在 CloudBase 控制台复制静态托管访问地址。
2. 使用根地址或带 `#discover` 的地址生成二维码。
3. 使用微信和常见手机浏览器各测试一次。
4. 确认图片、Toast 动画、四页导航和底部安全区显示正常。

仓库根目录的 `matchus-qrcode.png` 指向当前 CloudBase 测试地址。扫码会遇到上述访问提示页，这是托管平台行为，前端代码无法移除。长期正式使用时，应准备完成 ICP 备案的自定义域名并绑定到托管服务。

更完整的操作步骤、控制台上传方案和其他平台取舍见：[CloudBase 临时部署方案](docs/deployment-cloudbase.md)。

## 当前约束

- 项目为纯前端演示，用户选择不会持久化到服务器。
- 刷新页面会保留当前 hash 页面，但不会恢复页面内的选择状态。
- Figma token 目前基于只读稿件和截图推导，后续仍可继续进行像素级走查。
- CloudBase 默认域名存在强制访问提示页和频率限制，只适合联调；无备案条件下暂无可承诺“中国大陆稳定、无中间页”的公共静态托管方案。
