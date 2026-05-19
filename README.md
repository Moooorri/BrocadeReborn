# SongBrocade Web 本地项目说明

## 当前保留文件

- `app.js`：核心生成逻辑，主要编辑这个文件。
- `styles.css`：界面样式。
- `v2.0/data/`：全部 SVG 素材。
- `build-ipad.mjs` / `build-ipad.cmd`：把源文件和素材打包成 iPad 单文件。
- `SongBrocade-iPad-offline.html`：iPad 上打开的最终单文件。
- `index.html`：电脑本地预览文件，由构建脚本生成。
- `assets-data.js`：构建脚本生成的素材内嵌数据。
- `local-server.mjs` / `start-web.cmd`：可选，本地服务器预览。

## 日常修改流程

1. 修改 `app.js`。
2. 如需调整界面，修改 `styles.css`。
3. 如需换素材，替换或增加 `v2.0/data/` 下的 SVG。
4. 双击 `build-ipad.cmd`，或运行：

```bash
node build-ipad.mjs
```

5. 检查重新生成的 `SongBrocade-iPad-offline.html`。

## 自己打包到 iPad

iPad 离线运行只需要这个文件：

```text
SongBrocade-iPad-offline.html
```

可以用 AirDrop、iCloud Drive、微信文件、邮件附件或数据线传到 iPad。除非想把源文件也带去备份，否则不需要压缩整个项目文件夹。

## iPad 实时预览修改效果

电脑和 iPad 连接同一个 Wi-Fi，然后在电脑上双击：

```text
start-web.cmd
```

终端里会显示类似下面的地址：

```text
LAN access: http://192.168.x.x:8000/
```

在 iPad 的 Safari 中打开这个 `LAN access` 地址。之后修改 `app.js`、`styles.css` 或 `v2.0/data/` 里的素材并保存，电脑会自动重新构建，iPad 页面会自动刷新。

如果没有看清地址，可以双击：

```text
show-ipad-address.cmd
```

选择 `192.168.x.x` 或 `10.x.x.x` 这类 IPv4 地址，在 iPad 输入：

```text
http://这个IPv4地址:8000/
```

如果 iPad 打不开：

- 确认电脑和 iPad 在同一个 Wi-Fi，不要让 iPad 使用蜂窝网络。
- 地址不要用 `localhost` 或 `127.0.0.1`，这两个只代表 iPad 自己。
- Windows 防火墙弹窗时，需要允许 Node.js / Python 在当前网络访问。
- 如果没有弹窗，手动到“Windows 安全中心 > 防火墙和网络保护 > 允许应用通过防火墙”，允许 Node.js 访问专用网络。
- 有些校园网、公司网、访客 Wi-Fi 会禁止设备互访，这种网络下 iPad 会打不开电脑地址。

## 当前关键功能

- 骨架排版：四周交错、八达晕、四达晕、方形填花型天华锦、八角形填花型天华锦、球路纹。
- 骨架线型：单色单线、单色双层、三线夹色、晕色嵌圆点、晕色渐变、双层晕色、圆点轮廓。
- 导出透明 PNG：不含底色和地纹。
- 导出完整 PNG：包含底色和地纹。
- 地纹控制：开关、尺寸、透明度、线条粗细、色彩。

## 地纹素材注意事项

- 默认读取 `v2.0/data/ground_textures/sd1.svg`、`sd2.svg`、`sd3.svg`。
- 如果新增 `sd4.svg` 等，需要同步修改 `app.js` 里的 `GROUND_MOTIF_NUM`。
- 地纹 SVG 可以使用纯线条，浏览器支持 `stroke` 和 `stroke-width`。
- 当前地纹色彩与粗细会由程序统一重写，线条版 SVG 更适合后续调节。
- SVG 最好保持正方形 `viewBox`，并确保上下左右可以无缝平铺。

## 下个窗口继续编辑时给 Codex 的提示

请继续编辑这个项目：

```text
D:\_Files_\_inbox\Codex_ying_SongBrocade
```

优先阅读：

```text
README.md
app.js
build-ipad.mjs
```

修改生成逻辑请改 `app.js`。修改 UI 样式请改 `styles.css`。修改后必须运行 `build-ipad.cmd` 或 `node build-ipad.mjs`，重新生成 `SongBrocade-iPad-offline.html`。

不要直接手改 `SongBrocade-iPad-offline.html` 和 `index.html`，它们是构建产物。

## 代码定位

- `layoutNames`：骨架排版名称。
- `skeletonStyleNames`：骨架线型名称。
- `createSkeletonSegments()`：骨架线段结构。
- `drawSkeletonLines()`：骨架线型绘制。
- `getSkeletonDotPoints()`：骨架圆点位置。
- `drawMotifsAtCell(x, y)`：各排版图元摆放。
- `recolorSvgText()`：SVG 改色和地纹线条粗细处理。
- `renderPattern()`：画布总渲染逻辑。
- `exportPng()`：PNG 导出逻辑。
