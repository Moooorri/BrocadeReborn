import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function readText(filePath) {
  return readFileSync(join(root, filePath), "utf8");
}

function writeGenerated(filePath, content) {
  try {
    writeFileSync(join(root, filePath), content, "utf8");
  } catch (error) {
    if (error && error.code === "EPERM") {
      console.warn(`Skipped ${filePath} because it is currently locked.`);
      return;
    }
    throw error;
  }
}

function collectSvgAssets() {
  const entries = {};
  const groups = [
    "v2.0/data/main_motifs",
    "v2.0/data/sub_motifs",
    "v2.0/data/ground_textures",
  ];

  for (const group of groups) {
    for (const fileName of readdirSync(join(root, group)).filter((name) => name.endsWith(".svg")).sort()) {
      const key = `${group}/${fileName}`;
      entries[key] = readText(key);
    }
  }

  return `window.SONG_BROCADE_ASSETS = ${JSON.stringify(entries)};\n`;
}

const T = {
  title: "&#38182;&#24207;&#26032;&#29983;",
  preview: "&#32441;&#26679;&#39044;&#35272;",
  loading: "&#27491;&#22312;&#36733;&#20837;&#32032;&#26448;...",
  panel: "&#25511;&#21046;&#38754;&#26495;",
  subtitle: "",
  infoNav: "&#20449;&#24687;",
  aboutNav: "&#20851;&#20110;",
  themeToggle: "&#26085;/&#22812;",
  back: "&#36820;&#22238;",
  generateSection: "&#29983;&#25104;&#38754;&#26495;",
  infoSection: "&#20449;&#24687;&#23637;&#31034;",
  shareSection: "&#20998;&#20139;",
  skeletonSection: "&#39592;&#26550;",
  groundSection: "&#22320;&#32441;",
  backgroundSection: "&#32972;&#26223;",
  colorSection: "&#33394;&#31995;",
  palettePreset: "&#24403;&#21069;&#33394;&#31995;",
  paletteName: "&#33394;&#31995;&#21517;&#31216;",
  savePalette: "&#20445;&#23384;&#33394;&#31995;",
  renamePalette: "&#37325;&#21629;&#21517;",
  deletePalette: "&#21024;&#38500;",
  generate: "&#29983;&#25104;&#26032;&#32441;&#26679;",
  exportImage: "&#23548;&#20986;&#22270;&#29255;",
  exportLayers: "&#20998;&#23618;&#23548;&#20986;",
  exportFull: "&#23436;&#25972;&#22270;&#29255;",
  exportSvg: "&#23548;&#20986; SVG",
  exportBackground: "&#32972;&#26223;",
  exportGround: "&#22320;&#32441;",
  exportSkeleton: "&#39592;&#26550;",
  exportMotif: "&#22270;&#20803;",
  cardShare: "&#21345;&#29255;&#20998;&#20139;",
  cardStyle: "&#21345;&#29255;&#26679;&#24335;",
  cardStyleFigma: "&#35774;&#35745;&#31295;&#29256;",
  cardStyleStudio: "&#24403;&#21069;&#29256;",
  cardColor: "&#21345;&#29255;&#37197;&#33394;",
  cardColorOrange: "&#27225;&#33394;",
  cardColorGreen: "&#38738;&#32511;",
  cardColorYellow: "&#40644;&#32511;",
  cardColorJade: "&#27973;&#38738;",
  reset: "&#37325;&#32622;&#31579;&#36873;",
  layout: "&#39592;&#26550;&#25490;&#29256;&#32467;&#26500;",
  skeletonStyle: "&#39592;&#26550;&#32447;&#39118;&#26684;",
  randomLayout: "&#38543;&#26426;&#25490;&#29256;",
  randomStyle: "&#38543;&#26426;&#32447;&#22411;",
  fourAround: "&#22235;&#38533;&#20132;&#38169;&#24335;",
  badayun: "&#20843;&#36798;&#26197;&#24335;",
  sidayun: "&#22235;&#36798;&#26197;&#24335;",
  squareTianhua: "&#26041;&#26684;&#22635;&#33457;&#24335;",
  octagonTianhua: "&#20843;&#35282;&#22635;&#33457;&#24335;",
  ball: "&#29699;&#36335;&#36830;&#32493;&#24335;",
  turtleback: "&#40863;&#32972;&#36830;&#32493;&#24335;",
  diamondFill: "&#33777;&#26684;&#22635;&#33457;&#24335;",
  interlockRibbon: "&#30424;&#32486;&#36830;&#29615;&#24335;",
  singleLine: "&#21333;&#33394;&#32454;",
  monoDouble: "&#21333;&#33394;&#22797;",
  threeLine: "&#22841;&#33394;&#19977;&#37325;",
  haloDots: "&#23884;&#28857;&#26197;&#33394;",
  haloBands: "&#21333;&#23618;&#26197;&#33394;",
  doubleHalo: "&#21452;&#23618;&#26197;&#33394;",
  dotContour: "&#28857;&#29366;&#36718;&#24275;",
  lineWidth: "&#39592;&#26550;&#32447;&#24635;&#23485;",
  groundToggle: "&#22320;&#32441;&#31867;&#22411;",
  random: "&#38543;&#26426;",
  none: "&#26080;",
  groundHuixing: "&#22238;&#24418;&#32441;",
  groundWanzi: "&#19975;&#23383;&#32441;",
  groundGuibei: "&#40863;&#32972;&#32441;",
  groundLingge: "&#33777;&#26684;&#32441;",
  groundSuozi: "&#38145;&#23376;&#32441;",
  groundLianqian: "&#36830;&#38065;&#32441;",
  groundGongzi: "&#24037;&#23383;&#32441;",
  groundSize: "&#22320;&#32441;&#22823;&#23567;",
  groundOpacity: "&#22320;&#32441;&#36879;&#26126;&#24230;",
  groundStroke: "&#22320;&#32441;&#32447;&#26465;&#31895;&#32454;",
  groundColor: "&#22320;&#32441;&#33394;&#24425;",
  backgroundColor: "&#32972;&#26223;&#33394;&#24425;",
  groundGreen: "&#38738;&#32511;",
  groundPale: "&#27973;&#38738;",
  groundPaper: "&#31859;&#30333;",
  groundYellow: "&#40644;&#32511;",
  groundOrange: "&#27225;&#33394;",
  layoutInfo: "&#25490;&#29256;&#32467;&#26500;",
  skeletonInfo: "&#39592;&#26550;&#32447;&#22411;",
  groundInfo: "&#22320;&#32441;",
  assetInfo: "&#22270;&#20803;",
};

function buildPaletteSectionHtml(mode) {
  const developerControls = mode === "developer"
    ? `            <label class="field" for="paletteName"><span>${T.paletteName}</span><input id="paletteName" class="text-input" type="text" value="${T.title}"></label>`
    : "";
  const developerActions = mode === "developer"
    ? `            <div class="palette-actions">
              <button id="savePaletteBtn" class="small-button" type="button">${T.savePalette}</button>
              <button id="renamePaletteBtn" class="small-button" type="button">${T.renamePalette}</button>
              <button id="deletePaletteBtn" class="small-button danger" type="button">${T.deletePalette}</button>
            </div>`
    : "";

  return `          <section class="control-section palette-section" aria-label="${T.colorSection}">
            <h2 class="control-section-title">${T.colorSection}</h2>
            <label class="field palette-preset-field" for="palettePreset"><span>${T.palettePreset}</span><select id="palettePreset"><option value="built-in-0">烟岚新翠</option></select></label>
${developerControls}
            <div class="palette-color-grid" aria-label="${T.colorSection}">
              <label><span class="palette-role">底色/主色</span><span class="palette-code">#EEF5F1</span><input class="palette-color-input" data-palette-index="2" type="color" value="#EEF5F1"></label>
              <label><span class="palette-role">主色1</span><span class="palette-code">#A2BBB3</span><input class="palette-color-input" data-palette-index="0" type="color" value="#A2BBB3"></label>
              <label><span class="palette-role">主色2</span><span class="palette-code">#5E9CBA</span><input class="palette-color-input" data-palette-index="1" type="color" value="#5E9CBA"></label>
              <label><span class="palette-role">辅色</span><span class="palette-code">#9A7B32</span><input class="palette-color-input" data-palette-index="3" type="color" value="#9A7B32"></label>
              <label><span class="palette-role">点缀色</span><span class="palette-code">#DAF386</span><input class="palette-color-input" data-palette-index="4" type="color" value="#DAF386"></label>
            </div>
${developerActions}
          </section>`;
}

function buildExportDialogHtml(mode) {
  if (mode !== "developer") return "";

  return `        <div id="exportImageDialog" class="export-image-dialog" hidden>
          <div class="export-preview-frame"><canvas id="exportPreviewCanvas" width="800" height="800"></canvas></div>
          <div class="export-layer-options" aria-label="${T.exportImage}">
            <label><input type="checkbox" name="exportLayer" value="motifs" checked><span>${T.exportMotif}</span></label>
            <label><input type="checkbox" name="exportLayer" value="skeleton" checked><span>${T.exportSkeleton}</span></label>
            <label><input type="checkbox" name="exportLayer" value="ground" checked><span>${T.exportGround}</span></label>
            <label><input type="checkbox" name="exportLayer" value="background" checked><span>${T.exportBackground}</span></label>
          </div>
          <div class="export-actions">
            <button id="exportLayeredBtn" class="button accent alt" type="button">${T.exportLayers}</button>
            <button id="exportCompositeBtn" class="button accent" type="button">${T.exportFull}</button>
            <button id="exportSvgBtn" class="button accent alt" type="button">${T.exportSvg}</button>
          </div>
        </div>`;
}

function buildHtml(css, assets, app, { mode }) {
  const paletteSection = buildPaletteSectionHtml(mode);
  const exportDialog = buildExportDialogHtml(mode);

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">
  <title>${T.title}</title>
  <style>${css}</style>
</head>
<body data-page="home" data-app-mode="${mode}">
  <main class="app-shell">
    <header class="top-nav" aria-label="&#39029;&#38754;&#23548;&#33322;">
      <button class="nav-pill" type="button" id="infoBtn">${T.infoNav}</button>
      <div class="brand-lockup"><h1>${T.title}</h1></div>
      <button class="nav-pill" type="button" id="aboutBtn">${T.aboutNav}</button>
      <button class="theme-toggle" type="button" id="themeToggle" aria-label="${T.themeToggle}" aria-pressed="false">日</button>
    </header>
    <section class="stage" aria-label="${T.preview}">
      <div class="preview-frame">
        <div id="patternCodeLabel" class="pattern-code-label" aria-hidden="true">PATTERN / --</div>
        <canvas id="patternCanvas" width="800" height="800"></canvas>
        <div id="status" class="status" role="status">${T.loading}</div>
      </div>
      <section class="info-panel" id="infoPanel" aria-label="${T.infoSection}">
        <dl class="info"><div><dt>${T.layoutInfo}</dt><dd id="layoutInfo">-</dd></div><div><dt>${T.skeletonInfo}</dt><dd id="skeletonStyleInfo">-</dd></div><div><dt>${T.groundInfo}</dt><dd id="groundInfo">-</dd></div><div><dt>${T.assetInfo}</dt><dd id="assetInfo">-</dd></div></dl>
      </section>
    </section>
    <aside class="side-stack" aria-label="${T.panel}">
      <div class="parameter-stack">
        <section class="action-panel" aria-label="${T.generateSection}">
          <button id="generateBtn" class="button primary" type="button">${T.generate}</button>
          <button id="resetBtn" class="button secondary" type="button">${T.reset}</button>
        </section>
        <section class="panel" aria-label="${T.panel}">
          <div class="panel-scroll">
          <div class="controls">
${paletteSection}
          <section class="control-section skeleton-section" aria-label="${T.skeletonSection}">
            <h2 class="control-section-title">${T.skeletonSection}</h2>
            <label class="field" for="layoutSelect"><span>${T.layout}</span><select id="layoutSelect" class="native-select"><option value="random">${T.randomLayout}</option><option value="0">${T.fourAround}</option><option value="1">${T.badayun}</option><option value="2">${T.sidayun}</option><option value="3">${T.squareTianhua}</option><option value="4">${T.octagonTianhua}</option><option value="5">${T.ball}</option><option value="6">${T.turtleback}</option><option value="7">${T.diamondFill}</option><option value="8">${T.interlockRibbon}</option></select><div class="option-strip" data-select-target="layoutSelect" role="listbox" aria-label="${T.layout}"></div></label>
            <label class="field" for="skeletonStyleSelect"><span>${T.skeletonStyle}</span><select id="skeletonStyleSelect" class="native-select"><option value="random">${T.randomStyle}</option><option value="0">${T.singleLine}</option><option value="1">${T.monoDouble}</option><option value="2">${T.threeLine}</option><option value="3">${T.haloDots}</option><option value="4">${T.haloBands}</option><option value="5">${T.doubleHalo}</option><option value="6">${T.dotContour}</option></select><div class="option-strip" data-select-target="skeletonStyleSelect" role="listbox" aria-label="${T.skeletonStyle}"></div></label>
            <label class="field range-field" for="lineWidth"><span>${T.lineWidth} <output id="lineWidthValue">18</output></span><input id="lineWidth" type="range" min="8" max="48" value="18"></label>
          </section>
          <section class="control-section ground-section" aria-label="${T.groundSection}">
            <h2 class="control-section-title">${T.groundSection}</h2>
            <fieldset class="field segmented-field"><legend>${T.groundToggle}</legend><div class="segmented-control" role="radiogroup" aria-label="${T.groundToggle}"><label><input type="radio" name="groundMode" value="random" checked><span>${T.random}</span></label><label><input type="radio" name="groundMode" value="none"><span>${T.none}</span></label><label><input type="radio" name="groundMode" value="sd_huixing"><span>${T.groundHuixing}</span></label><label><input type="radio" name="groundMode" value="sd_wanzi"><span>${T.groundWanzi}</span></label><label><input type="radio" name="groundMode" value="sd_guibei"><span>${T.groundGuibei}</span></label><label><input type="radio" name="groundMode" value="sd_lingge"><span>${T.groundLingge}</span></label><label><input type="radio" name="groundMode" value="sd_suozi"><span>${T.groundSuozi}</span></label><label><input type="radio" name="groundMode" value="sd_lianqian"><span>${T.groundLianqian}</span></label><label><input type="radio" name="groundMode" value="sd_gongzi"><span>${T.groundGongzi}</span></label></div></fieldset>
            <label class="field range-field" for="groundSize"><span>${T.groundSize} <output id="groundSizeValue">1.0</output></span><input id="groundSize" type="range" min="0.5" max="2.5" step="0.1" value="1"></label>
            <label class="field range-field" for="groundOpacity"><span>${T.groundOpacity} <output id="groundOpacityValue">82</output>%</span><input id="groundOpacity" type="range" min="10" max="100" value="82"></label>
            <label class="field range-field" for="groundStroke"><span>${T.groundStroke} <output id="groundStrokeValue">1.8</output></span><input id="groundStroke" type="range" min="4" max="40" value="18"></label>
            <label class="field color-field" for="groundColor"><span>${T.groundColor}</span><select id="groundColor" class="native-select"><option value="random">${T.random}</option><option value="#FDF7F2" data-palette-index="2">${T.groundPaper}</option><option value="#89B29C" data-palette-index="0">${T.groundGreen}</option><option value="#D2E3E2" data-palette-index="1" selected>${T.groundPale}</option><option value="#C7CB45" data-palette-index="3">${T.groundYellow}</option><option value="#F98B3F" data-palette-index="4">${T.groundOrange}</option></select><div class="color-current" id="groundColorPreview" aria-label="${T.groundColor}"></div><div class="option-strip color-strip" data-select-target="groundColor" role="listbox" aria-label="${T.groundColor}"></div></label>
          </section>
          <section class="control-section background-section" aria-label="${T.backgroundSection}">
            <h2 class="control-section-title">${T.backgroundSection}</h2>
            <label class="field color-field" for="backgroundColor"><span>${T.backgroundColor}</span><select id="backgroundColor" class="native-select"><option value="random">${T.random}</option><option value="#FDF7F2" data-palette-index="2" selected>${T.groundPaper}</option><option value="#89B29C" data-palette-index="0">${T.groundGreen}</option><option value="#D2E3E2" data-palette-index="1">${T.groundPale}</option><option value="#C7CB45" data-palette-index="3">${T.groundYellow}</option><option value="#F98B3F" data-palette-index="4">${T.groundOrange}</option></select><div class="color-current" id="backgroundColorPreview" aria-label="${T.backgroundColor}"></div><div class="option-strip color-strip" data-select-target="backgroundColor" role="listbox" aria-label="${T.backgroundColor}"></div></label>
          </section>
          </div>
          </div>
        </section>
      </div>
      <section class="share-panel" aria-label="${T.shareSection}">
        <button id="cardShareBtn" class="button card-share" type="button">${T.cardShare}</button>
        <button id="exportBtn" class="button accent" type="button">${T.exportImage}</button>
        <div id="recipeCardPreview" class="recipe-card-preview" hidden></div>
${exportDialog}
      </section>
    </aside>
    <section class="content-page content-page-info" aria-label="${T.infoNav}">
      <button class="back-button" type="button" data-back-home>${T.back}</button>
    </section>
    <section class="content-page content-page-about" aria-label="${T.aboutNav}">
      <button class="back-button" type="button" data-back-home>${T.back}</button>
    </section>
  </main>
  <script>window.SONG_BROCADE_APP_MODE = ${JSON.stringify(mode)};</script>
  <script>${assets}</script>
  <script>${app}</script>
</body>
</html>
`;
}

const css = readText("styles.css");
const app = readText("app.js");
const assets = collectSvgAssets();
const publicHtml = buildHtml(css, assets, app, { mode: "public" });
const developerHtml = buildHtml(css, assets, app, { mode: "developer" });

writeGenerated("assets-data.js", assets);
writeGenerated("index.html", `\ufeff${publicHtml}`);
writeGenerated("SongBrocade-iPad-offline.html", `\ufeff${publicHtml}`);
writeGenerated("developer-local.html", `\ufeff${developerHtml}`);

console.log("Built iPad offline files:");
console.log("- assets-data.js");
console.log("- index.html (public)");
console.log("- SongBrocade-iPad-offline.html (public)");
console.log("- developer-local.html (local developer only)");
