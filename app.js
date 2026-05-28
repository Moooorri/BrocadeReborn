const CANVAS_SIZE = 800;
const TILE_SIZE = 200;
const APP_MODE = window.SONG_BROCADE_APP_MODE === "developer" ? "developer" : "public";
const IS_DEVELOPER_VERSION = APP_MODE === "developer";
const MAIN_MOTIF_NUM = 9;
const SUB_MOTIF_NUM = 10;
const DEFAULT_SKELETON_TOTAL_WIDTH = 18;
const DIAMOND_FILL_DEFAULT_SKELETON_WIDTH = 8;
const DIAMOND_FILL_EXTENSION_WIDTH = 54;
const SHARE_EXPORT_WIDTH = 1206;

const builtInPalettes = [
  { name: "\u70df\u5c9a\u65b0\u7fe0", colors: ["#A2BBB3", "#5E9CBA", "#EEF5F1", "#9A7B32", "#DAF386"] },
  { name: "\u6a59\u91d1\u79cb\u5b9e", colors: ["#EEA04C", "#9D7939", "#CF8C20", "#4C594D", "#B0B087"] },
  { name: "\u9752\u74f7\u5c71\u5f71", colors: ["#DCCEA9", "#A8C6C6", "#A6B976", "#303649", "#9F5033"] },
  { name: "\u8910\u5ca9\u6708\u767d", colors: ["#91633B", "#404644", "#ADB18C", "#F7E4AC", "#A3CED6"] },
  { name: "\u51b0\u6e56\u7d2b\u85e4", colors: ["#7DCFD1", "#FEFAFF", "#C5F1EB", "#8461B1", "#ECD999"] },
  { name: "\u591c\u9676\u6674\u84dd", colors: ["#E5CDAC", "#D9723A", "#231A10", "#1C8CC3", "#E1AA9F"] },
  { name: "\u96ea\u539f\u6731\u58a8", colors: ["#8ED6F4", "#DC2F16", "#FDFAE0", "#040000", "#EDF7D7"] },
];
const defaultPalette = builtInPalettes[0].colors;
const defaultPaletteLabels = ["\u4e3b\u82721", "\u4e3b\u82722", "\u5e95\u8272/\u4e3b\u8272", "\u8f85\u8272", "\u70b9\u7f00\u8272"];
let targetColors = [...defaultPalette];
let currentPaletteKey = "default";
const templateColors = ["#FF0000", "#00FF00", "#FFA500", "#FF00FF", "#0000FF"];
const layoutNames = [
  "\u56db\u9685\u4ea4\u9519\u5f0f",
  "\u516b\u8fbe\u6655\u5f0f",
  "\u56db\u8fbe\u6655\u5f0f",
  "\u65b9\u683c\u586b\u82b1\u5f0f",
  "\u516b\u89d2\u586b\u82b1\u5f0f",
  "\u7403\u8def\u8fde\u7eed\u5f0f",
  "\u9f9f\u80cc\u8fde\u7eed\u5f0f",
  "\u83f1\u683c\u586b\u82b1\u5f0f",
  "\u76d8\u7ee6\u8fde\u73af\u5f0f",
];
const skeletonStyleNames = [
  "\u5355\u8272\u7ec6",
  "\u5355\u8272\u590d",
  "\u5939\u8272\u4e09\u91cd",
  "\u5d4c\u70b9\u6655\u8272",
  "\u5355\u5c42\u6655\u8272",
  "\u53cc\u5c42\u6655\u8272",
  "\u70b9\u72b6\u8f6e\u5ed3",
];
const layoutCardNames = [
  "\u56db\u9685\u4ea4\u9519\u5f0f\u9aa8\u67b6",
  "\u516b\u8fbe\u6655\u5f0f\u653e\u5c04\u9aa8\u67b6",
  "\u56db\u8fbe\u6655\u5f0f\u5341\u5b57\u9aa8\u67b6",
  "\u65b9\u683c\u586b\u82b1\u5f0f\u5929\u534e\u9526\u9aa8\u67b6",
  "\u516b\u89d2\u586b\u82b1\u5f0f\u5929\u534e\u9526\u9aa8\u67b6",
  "\u7403\u8def\u8fde\u7eed\u5f0f\u9aa8\u67b6",
  "\u9f9f\u80cc\u8fde\u7eed\u5f0f\u516d\u89d2\u9aa8\u67b6",
  "\u83f1\u683c\u586b\u82b1\u5f0f\u9aa8\u67b6",
  "\u76d8\u7ee6\u8fde\u73af\u5f0f\u82b1\u7ee6\u9aa8\u67b6",
];
const layoutDescriptions = [
  "\u4ee5\u56db\u5411\u8fb9\u7f18\u4e3a\u7ec4\u7ec7\u57fa\u7840\uff0c\u5f62\u6210\u4ea4\u9519\u5ef6\u5c55\u7684\u6392\u5e03\u5173\u7cfb\u3002",
  "\u4ee5\u4e2d\u5fc3\u70b9\u4e3a\u89c6\u89c9\u6838\u5fc3\uff0c\u5411\u516b\u65b9\u5c55\u5f00\uff0c\u5f62\u6210\u5747\u8861\u3001\u901a\u8fbe\u7684\u653e\u5c04\u79e9\u5e8f\u3002",
  "\u4ee5\u6a2a\u7eb5\u5341\u5b57\u65b9\u5411\u5c55\u5f00\uff0c\u5f62\u6210\u7a33\u5b9a\u3001\u7aef\u6b63\u7684\u7a7a\u95f4\u79e9\u5e8f\u3002",
  "\u4ee5\u65b9\u683c\u5355\u5143\u5206\u5272\u753b\u9762\uff0c\u5e76\u5728\u683c\u5185\u586b\u5165\u4e3b\u4f53\u56fe\u5f62\u3002",
  "\u4ee5\u516b\u89d2\u5f62\u5355\u5143\u7ec4\u7ec7\u753b\u9762\uff0c\u5f62\u6210\u66f4\u4e30\u5bcc\u7684\u4e2d\u5fc3\u805a\u5408\u5173\u7cfb\u3002",
  "\u4ee5\u5706\u5f62\u6216\u73af\u5f62\u5355\u5143\u8fde\u7eed\u6392\u5217\uff0c\u5f62\u6210\u73af\u73af\u76f8\u6263\u7684\u79e9\u5e8f\u3002",
  "\u4ee5\u516d\u8fb9\u5f62\u5355\u5143\u8fde\u7eed\u5d4c\u5957\u6392\u5217\uff0c\u5f62\u6210\u7a33\u5b9a\u800c\u5ef6\u5c55\u7684\u8702\u5de2\u5f0f\u79e9\u5e8f\u7ed3\u6784\u3002",
  "\u4ee5\u83f1\u5f62\u7f51\u683c\u5212\u5206\u7a7a\u95f4\uff0c\u5f62\u6210\u5bcc\u6709\u65b9\u5411\u6027\u7684\u8fde\u7eed\u79e9\u5e8f\u3002",
  "\u4ee5\u56de\u73af\u82b1\u7ee6\u7ec4\u7ec7\u753b\u9762\uff0c\u5f62\u6210\u4ea4\u7ec7\u5faa\u73af\u7684\u7ed3\u6784\u5173\u7cfb\u3002",
];
const cardLayoutInfoNames = [
  "\u56db\u9685\u4ea4\u9519",
  "\u516b\u8fbe\u6655",
  "\u56db\u8fbe\u6655",
  "\u65b9\u683c\u586b\u82b1",
  "\u516b\u89d2\u586b\u82b1",
  "\u7403\u8def\u8fde\u7eed",
  "\u9f9f\u80cc\u8fde\u7eed",
  "\u83f1\u683c\u586b\u82b1",
  "\u76d8\u7ee6\u8fde\u73af",
];
const publicHiddenLayoutIndexes = new Set(IS_DEVELOPER_VERSION ? [] : [0]);
const selectableLayoutIndexes = layoutNames
  .map((_, index) => index)
  .filter((index) => !publicHiddenLayoutIndexes.has(index));
const skeletonStyleCardNames = [
  "\u5355\u8272\u7ec6\u9aa8\u7ebf",
  "\u5355\u8272\u590d\u9aa8\u7ebf",
  "\u5939\u8272\u4e09\u91cd\u9aa8\u7ebf",
  "\u5d4c\u70b9\u6655\u8272\u9aa8\u7ebf",
  "\u5355\u5c42\u6655\u8272\u9aa8\u7ebf",
  "\u53cc\u5c42\u6655\u8272\u9aa8\u7ebf",
  "\u70b9\u72b6\u8f6e\u5ed3\u9aa8\u7ebf",
];
const recipeCardThemes = [
  { key: "amber", accent: "#F98B3F", soft: "#FFF1DF", ink: "#5C3A1E" },
  { key: "jade", accent: "#89B29C", soft: "#EEF7F0", ink: "#254437" },
  { key: "citrine", accent: "#C7CB45", soft: "#FBFBE8", ink: "#4D5217" },
  { key: "celadon", accent: "#6F9F8D", soft: "#F0F6EA", ink: "#244238" },
];
const recipeCardStyles = [
  { key: "figma", label: "\u8bbe\u8ba1\u7a3f\u7248" },
  { key: "figma-v2", label: "\u8bbe\u8ba1\u7a3f02" },
  { key: "studio", label: "\u5f53\u524d\u7248" },
];
const figmaCardThemes = [
  { key: "orange", label: "\u6a59\u8272", accent: "#FE8A36", accentDeep: "#985221", secondary: "#FE8A36", motif: "#89B29C", paper: "#FFF8F0", gradientStart: "#FFDDC2", gradientEnd: "#FFF8F0", watermark: "#FE8A36", watermarkEnd: "#985221", watermarkOpacity: 0.05, note: "#FE8A36" },
  { key: "green", label: "\u9752\u7eff", accent: "#7BBB9F", accentDeep: "#376E5B", secondary: "#7BBB9F", motif: "#89B29C", paper: "#FFF8F0", gradientStart: "rgba(123, 187, 159, 0.3)", gradientEnd: "#FFF8F0", watermark: "#7BBB9F", watermarkEnd: "#7BBB9F", watermarkOpacity: 0.1, note: "#7BBB9F" },
  { key: "yellow", label: "\u9ec4\u7eff", accent: "#D8D345", accentDeep: "#7C781A", secondary: "#D8D345", motif: "#89B29C", paper: "#FFF8F0", gradientStart: "rgba(216, 211, 69, 0.3)", gradientEnd: "#FFF8F0", watermark: "#D8D345", watermarkEnd: "#D8D345", watermarkOpacity: 0.15, note: "#D8D345" },
  { key: "jade", label: "\u6d45\u9752", accent: "#7BBB9F", accentDeep: "#376E5B", secondary: "#D8D345", motif: "#89B29C", paper: "#FFF8F0", gradientStart: "#FFF8F0", gradientEnd: "#FFF8F0", watermark: "#7BBB9F", watermarkEnd: "#7BBB9F", watermarkOpacity: 0.1, note: "#D8D345" },
];
const groundTextureMeta = [
  { file: "sd_huixing", displayName: "\u56de\u5f62\u7eb9", cardName: "\u56de\u5f62\u5730\u7eb9" },
  { file: "sd_wanzi", displayName: "\u4e07\u5b57\u7eb9", cardName: "\u4e07\u5b57\u8fde\u7eed\u7eb9" },
  { file: "sd_guibei", displayName: "\u9f9f\u80cc\u7eb9", cardName: "\u9f9f\u80cc\u5730\u7eb9" },
  { file: "sd_lingge", displayName: "\u83f1\u683c\u7eb9", cardName: "\u83f1\u683c\u5730\u7eb9" },
  { file: "sd_suozi", displayName: "\u9501\u5b50\u7eb9", cardName: "\u9501\u5b50\u5730\u7eb9" },
  { file: "sd_lianqian", displayName: "\u8fde\u94b1\u7eb9", cardName: "\u8fde\u94b1\u5730\u7eb9" },
  { file: "sd_gongzi", displayName: "\u5de5\u5b57\u7eb9", cardName: "\u5de5\u5b57\u8fde\u7eed\u7eb9" },
];
const assetBase = "v2.0/data";

const canvas = document.querySelector("#patternCanvas");
let ctx = canvas.getContext("2d");
const statusEl = document.querySelector("#status");
const patternCodeLabel = document.querySelector("#patternCodeLabel");
const generateBtn = document.querySelector("#generateBtn");
const tracebackBtn = document.querySelector("#tracebackBtn");
const exportBtn = document.querySelector("#exportBtn");
const exportFullBtn = document.querySelector("#exportFullBtn");
const cardShareBtn = document.querySelector("#cardShareBtn");
const recipeCardPreview = document.querySelector("#recipeCardPreview");
const exportImageDialog = document.querySelector("#exportImageDialog");
const exportPreviewCanvas = document.querySelector("#exportPreviewCanvas");
const exportLayerInputs = document.querySelectorAll("input[name='exportLayer']");
const exportLayeredBtn = document.querySelector("#exportLayeredBtn");
const exportCompositeBtn = document.querySelector("#exportCompositeBtn");
const exportSvgBtn = document.querySelector("#exportSvgBtn");
const resetBtn = document.querySelector("#resetBtn");
const infoBtn = document.querySelector("#infoBtn");
const aboutBtn = document.querySelector("#aboutBtn");
const themeToggle = document.querySelector("#themeToggle");
const panelScroll = document.querySelector(".panel-scroll");
const layoutSelect = document.querySelector("#layoutSelect");
const skeletonStyleSelect = document.querySelector("#skeletonStyleSelect");
const optionStrips = document.querySelectorAll(".option-strip[data-select-target]");
const groundModeInputs = document.querySelectorAll("input[name='groundMode']");
const lineWidthInput = document.querySelector("#lineWidth");
const lineWidthValue = document.querySelector("#lineWidthValue");
const groundSizeInput = document.querySelector("#groundSize");
const groundSizeValue = document.querySelector("#groundSizeValue");
const groundOpacityInput = document.querySelector("#groundOpacity");
const groundOpacityValue = document.querySelector("#groundOpacityValue");
const groundStrokeInput = document.querySelector("#groundStroke");
const groundStrokeValue = document.querySelector("#groundStrokeValue");
const groundColorSelect = document.querySelector("#groundColor");
const groundColorPreview = document.querySelector("#groundColorPreview");
const backgroundColorSelect = document.querySelector("#backgroundColor");
const backgroundColorPreview = document.querySelector("#backgroundColorPreview");
const palettePresetSelect = document.querySelector("#palettePreset");
const paletteNameInput = document.querySelector("#paletteName");
const savePaletteBtn = document.querySelector("#savePaletteBtn");
const renamePaletteBtn = document.querySelector("#renamePaletteBtn");
const deletePaletteBtn = document.querySelector("#deletePaletteBtn");
const paletteColorInputs = document.querySelectorAll(".palette-color-input");
const layoutInfo = document.querySelector("#layoutInfo");
const skeletonStyleInfo = document.querySelector("#skeletonStyleInfo");
const groundInfo = document.querySelector("#groundInfo");
const assetInfo = document.querySelector("#assetInfo");

function getDefaultSkeletonLayout() {
  return selectableLayoutIndexes[0] ?? 0;
}

function getRandomSkeletonLayout() {
  return selectableLayoutIndexes[randomIndex(selectableLayoutIndexes.length)] ?? getDefaultSkeletonLayout();
}

function normalizeSkeletonLayout(value) {
  const index = Number(value);
  return selectableLayoutIndexes.includes(index) ? index : getDefaultSkeletonLayout();
}

const state = {
  currentSkeletonLayout: getDefaultSkeletonLayout(),
  currentSkeletonStyle: 0,
  lineWidth: DEFAULT_SKELETON_TOTAL_WIDTH,
  drawGround: true,
  groundSize: 1,
  groundOpacity: 0.82,
  groundStrokeScale: 1.8,
  groundColor: targetColors[1],
  backgroundColor: targetColors[2],
  idxGround: 0,
  idxSub: 0,
  idxMain: 0,
  recipeCardStyle: "figma-v2",
  recipeCardTheme: 0,
  shareMode: "card",
  assets: null,
};
const standby = {
  layer: null,
  pattern: null,
  text: null,
  colorCanvas: null,
  skeletonCanvas: null,
  groundCanvas: null,
  motifCanvases: [],
  timer: null,
  frame: null,
  active: false,
  startedAt: 0,
  savedState: null,
  savedColors: null,
  restoreOnExit: false,
  textPosition: "bottom-center",
  tileOffsetX: 0,
  tileOffsetY: 0,
};
const STANDBY_IDLE_MS = 90000;
const STANDBY_CYCLE_MS = 24000;
const standbyTextPositions = ["top-left", "top-right", "bottom-left", "bottom-right", "bottom-center"];

function applyTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  document.body.dataset.theme = nextTheme;
  if (themeToggle) {
    const isLight = nextTheme === "light";
    themeToggle.textContent = isLight ? "夜" : "日";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "切换为暗夜模式" : "切换为白天模式");
  }
  try {
    localStorage.setItem("songBrocadeTheme", nextTheme);
  } catch {
    // Ignore storage errors in private or locked browsing contexts.
  }
}

function snapshotPatternState() {
  return {
    currentSkeletonLayout: state.currentSkeletonLayout,
    currentSkeletonStyle: state.currentSkeletonStyle,
    lineWidth: state.lineWidth,
    drawGround: state.drawGround,
    groundSize: state.groundSize,
    groundOpacity: state.groundOpacity,
    groundStrokeScale: state.groundStrokeScale,
    groundColor: state.groundColor,
    backgroundColor: state.backgroundColor,
    idxGround: state.idxGround,
    idxSub: state.idxSub,
    idxMain: state.idxMain,
  };
}

function restorePatternState(snapshot) {
  if (!snapshot) return;
  Object.assign(state, snapshot);
}

function initTheme() {
  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("songBrocadeTheme") || "dark";
  } catch {
    savedTheme = "dark";
  }
  applyTheme(savedTheme);
}

function makeAssetList() {
  const mainA = [];
  const mainB = [];
  const subA = [];
  const subB = [];
  const grounds = [];

  for (let i = 1; i <= MAIN_MOTIF_NUM; i += 1) {
    mainA.push(`${assetBase}/main_motifs/sb${i}_A.svg`);
    mainB.push(`${assetBase}/main_motifs/sb${i}_B.svg`);
  }
  for (let i = 1; i <= SUB_MOTIF_NUM; i += 1) {
    subA.push(`${assetBase}/sub_motifs/sc${i}_A.svg`);
    subB.push(`${assetBase}/sub_motifs/sc${i}_B.svg`);
  }
  groundTextureMeta.forEach((texture) => {
    grounds.push(`${assetBase}/ground_textures/${texture.file}.svg`);
  });

  return { mainA, mainB, subA, subB, grounds };
}

function setBusy(isBusy) {
  generateBtn.disabled = isBusy;
  if (tracebackBtn) tracebackBtn.disabled = isBusy;
  if (exportBtn) exportBtn.disabled = isBusy;
  if (exportFullBtn) exportFullBtn.disabled = isBusy;
  if (cardShareBtn) cardShareBtn.disabled = isBusy;
  resetBtn.disabled = isBusy;
}

function setStatus(message) {
  statusEl.textContent = message;
}

function showPage(page) {
  document.body.dataset.page = page;
}

function captureViewportState() {
  return {
    x: window.scrollX,
    y: window.scrollY,
    panelTop: panelScroll ? panelScroll.scrollTop : 0,
  };
}

function restoreViewportState(stateSnapshot) {
  const restore = () => {
    window.scrollTo(stateSnapshot.x, stateSnapshot.y);
    if (panelScroll) {
      panelScroll.scrollTop = stateSnapshot.panelTop;
    }
  };

  restore();
  requestAnimationFrame(restore);
  window.setTimeout(restore, 60);
}

function runWithoutJump(action) {
  const stateSnapshot = captureViewportState();
  const result = action();
  Promise.resolve(result).finally(() => restoreViewportState(stateSnapshot));
  return result;
}

function preventPreviewLabelJump(element) {
  if (!element) return;

  ["pointerdown", "mousedown", "touchstart", "click"].forEach((eventName) => {
    element.addEventListener(eventName, (event) => {
      event.preventDefault();
      event.stopPropagation();
      restoreViewportState(captureViewportState());
    }, { passive: false });
  });
}

function installKioskTouchGuards() {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      "content",
      "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
    );
  }

  const stopZoom = (event) => {
    event.preventDefault();
  };

  ["gesturestart", "gesturechange", "gestureend"].forEach((eventName) => {
    document.addEventListener(eventName, stopZoom, { passive: false });
  });

  document.addEventListener("touchstart", (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("touchmove", (event) => {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("wheel", (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("dblclick", stopZoom, { passive: false });

  let lastTouchEnd = 0;
  document.addEventListener("touchend", (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 350) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });

  let touchStartY = 0;
  let touchScrollable = null;

  const findScrollableAncestor = (element) => {
    let node = element;
    while (node && node !== document.body && node !== document.documentElement) {
      const style = window.getComputedStyle(node);
      const canScrollY = /(auto|scroll)/.test(style.overflowY) && node.scrollHeight > node.clientHeight;
      if (canScrollY) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  };

  document.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 1) return;
    touchStartY = event.touches[0].clientY;
    touchScrollable = findScrollableAncestor(event.target);
  }, { passive: true });

  document.addEventListener("touchmove", (event) => {
    if (event.touches.length !== 1) return;
    if (event.target instanceof Element && event.target.closest("input, select, textarea")) return;

    const deltaY = event.touches[0].clientY - touchStartY;
    if (!touchScrollable) {
      event.preventDefault();
      return;
    }

    const atTop = touchScrollable.scrollTop <= 0;
    const atBottom = touchScrollable.scrollTop + touchScrollable.clientHeight >= touchScrollable.scrollHeight - 1;
    if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
      event.preventDefault();
    }
  }, { passive: false });

  const keepViewportPinned = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  window.addEventListener("orientationchange", keepViewportPinned);
  window.addEventListener("resize", keepViewportPinned);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("scroll", keepViewportPinned);
    window.visualViewport.addEventListener("resize", keepViewportPinned);
  }
}

function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

function randomColor() {
  return targetColors[randomIndex(targetColors.length)];
}

function normalizeHex(value) {
  return value.toUpperCase();
}

function normalizeHexColor(value) {
  const text = String(value || "").trim().replace(/^#/, "").toUpperCase();
  return /^[0-9A-F]{6}$/.test(text) ? `#${text}` : null;
}

function fromCodeNumber(value) {
  const parsed = parseInt(value, 36);
  if (!Number.isFinite(parsed)) {
    throw new Error("\u7f16\u53f7\u683c\u5f0f\u65e0\u6548");
  }
  return parsed;
}

const patternCodeFields = [
  ["layout", 4],
  ["skeletonStyle", 3],
  ["lineWidth", 6],
  ["drawGround", 1],
  ["idxGround", 3],
  ["idxSub", 4],
  ["idxMain", 4],
  ["groundSizeTenths", 5],
  ["groundOpacityPercent", 7],
  ["groundStrokeTenths", 6],
];
const COMPACT_PATTERN_CODE_WIDTH = 41;
const ANALYTICS_ENDPOINT = "/.netlify/functions/analytics";
const ANALYTICS_VISITOR_KEY = "songBrocadeVisitorId";
let visitTracked = false;

function getVisitorId() {
  try {
    const saved = localStorage.getItem(ANALYTICS_VISITOR_KEY);
    if (saved) return saved;
    const next = (crypto && crypto.randomUUID)
      ? crypto.randomUUID()
      : `visitor-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(ANALYTICS_VISITOR_KEY, next);
    return next;
  } catch {
    return "visitor-storage-unavailable";
  }
}

function getPatternAnalyticsPayload(extra = {}) {
  return {
    patternId: getPatternId(),
    appMode: APP_MODE,
    paletteColors: targetColors.map(normalizeHexColor).filter(Boolean),
    groundColor: normalizeHexColor(state.groundColor),
    backgroundColor: normalizeHexColor(state.backgroundColor),
    skeletonLayout: state.currentSkeletonLayout,
    skeletonLayoutName: layoutNames[state.currentSkeletonLayout] || "",
    skeletonStyle: state.currentSkeletonStyle,
    skeletonStyleName: skeletonStyleNames[state.currentSkeletonStyle] || "",
    lineWidth: state.lineWidth,
    drawGround: state.drawGround,
    groundTexture: state.drawGround ? state.idxGround : null,
    groundTextureName: state.drawGround ? (groundTextureMeta[state.idxGround]?.displayName || "") : "",
    groundSize: state.groundSize,
    groundOpacity: state.groundOpacity,
    groundStrokeScale: state.groundStrokeScale,
    subMotif: state.idxSub,
    mainMotif: state.idxMain,
    ...extra,
  };
}

function trackAnalyticsEvent(eventType, payload = {}) {
  const body = JSON.stringify({
    eventType,
    visitorId: getVisitorId(),
    page: location.pathname || "/",
    referrer: document.referrer || "",
    userAgent: navigator.userAgent || "",
    language: navigator.language || "",
    screen: {
      width: window.screen?.width || null,
      height: window.screen?.height || null,
      pixelRatio: window.devicePixelRatio || 1,
    },
    payload,
  });

  try {
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon(ANALYTICS_ENDPOINT, new Blob([body], { type: "application/json" }));
      if (sent) return;
    }
    fetch(ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics must never block the pattern tool.
  }
}

function appendPackedValue(payload, value, bits) {
  return (payload << BigInt(bits)) | BigInt(Math.max(0, Math.round(Number(value))));
}

function readPackedValue(payload, bits) {
  const mask = (1n << BigInt(bits)) - 1n;
  return {
    value: Number(payload & mask),
    next: payload >> BigInt(bits),
  };
}

function base36ToBigInt(value) {
  return String(value).split("").reduce((total, char) => {
    const digit = parseInt(char, 36);
    if (!Number.isInteger(digit) || digit < 0 || digit >= 36) {
      throw new Error("\u7f16\u53f7\u683c\u5f0f\u65e0\u6548");
    }
    return total * 36n + BigInt(digit);
  }, 0n);
}

function isLightColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  return (r * 0.299 + g * 0.587 + b * 0.114) > 170;
}

function isDefaultPalette() {
  return targetColors.every((color, index) => color === defaultPalette[index]);
}

function getPaletteLabel(index) {
  return isDefaultPalette() ? defaultPaletteLabels[index] : targetColors[index];
}

function applyRandomChipGradient() {
  const root = document.documentElement;
  targetColors.forEach((color, index) => {
    root.style.setProperty(`--palette-${index}`, color);
  });
}

function updateColorSelectOptions(select) {
  if (!select) return;

  Array.from(select.options).forEach((option) => {
    if (option.value === "random") return;
    const paletteIndex = Number(option.dataset.paletteIndex);
    if (Number.isInteger(paletteIndex) && targetColors[paletteIndex]) {
      option.value = targetColors[paletteIndex];
      option.textContent = getPaletteLabel(paletteIndex);
    }
  });
}

function updateColorOptionValues() {
  updateColorSelectOptions(groundColorSelect);
  updateColorSelectOptions(backgroundColorSelect);
}

function syncPaletteInputs() {
  paletteColorInputs.forEach((input) => {
    const index = Number(input.dataset.paletteIndex);
    if (Number.isInteger(index) && targetColors[index]) {
      input.value = targetColors[index];
      const label = input.closest("label");
      const text = label && label.querySelector(".palette-code");
      if (text) {
        text.textContent = targetColors[index];
      }
    }
  });
}

function readPaletteInputColors() {
  const colors = [...targetColors];
  paletteColorInputs.forEach((input) => {
    const index = Number(input.dataset.paletteIndex);
    if (Number.isInteger(index) && colors[index]) {
      colors[index] = normalizeHex(input.value);
    }
  });
  return colors;
}

function getSelectedPaletteColor(select, fallback) {
  if (!select || select.value === "random") return randomColor();
  const selectedOption = select.selectedOptions && select.selectedOptions[0];
  const paletteIndex = selectedOption ? Number(selectedOption.dataset.paletteIndex) : NaN;
  if (Number.isInteger(paletteIndex) && targetColors[paletteIndex]) {
    return targetColors[paletteIndex];
  }
  return select.value || fallback;
}

function getSavedPalettes() {
  try {
    return JSON.parse(localStorage.getItem("songBrocadePalettes") || "[]");
  } catch {
    return [];
  }
}

function setSavedPalettes(palettes) {
  localStorage.setItem("songBrocadePalettes", JSON.stringify(palettes));
}

function renderPalettePresetOptions() {
  if (!palettePresetSelect) return;
  const saved = getSavedPalettes();
  palettePresetSelect.replaceChildren();
  builtInPalettes.forEach((palette, index) => {
    palettePresetSelect.append(new Option(palette.name, `built-in-${index}`));
  });
  if (IS_DEVELOPER_VERSION) {
    saved.forEach((palette, index) => {
      palettePresetSelect.append(new Option(palette.name, `saved-${index}`));
    });
  }
}

function applyPalette(colors, name = "") {
  targetColors = colors.map(normalizeHex);
  currentPaletteKey = isDefaultPalette() ? "built-in-0" : "custom";
  if (paletteNameInput && name) {
    paletteNameInput.value = name;
  }
  syncPaletteInputs();
  updateColorOptionValues();
  applyRandomChipGradient();
  initOptionStrips();
  if (state.assets) {
    state.groundColor = groundColorSelect.value === "random" ? randomColor() : groundColorSelect.value;
    state.backgroundColor = backgroundColorSelect.value === "random" ? randomColor() : backgroundColorSelect.value;
    refreshAllAssets().then(() => {
      renderPattern();
      updateInfoPanel();
    });
  }
}

function saveCurrentPalette() {
  if (!IS_DEVELOPER_VERSION) return;
  const name = (paletteNameInput && paletteNameInput.value.trim()) || "\u81ea\u5b9a\u4e49\u8272\u7cfb";
  const saved = getSavedPalettes();
  const existingIndex = saved.findIndex((palette) => palette.name === name);
  const next = { name, colors: [...targetColors] };
  if (existingIndex >= 0) {
    saved[existingIndex] = next;
  } else {
    saved.push(next);
  }
  setSavedPalettes(saved);
  renderPalettePresetOptions();
  if (palettePresetSelect) {
    palettePresetSelect.value = `saved-${saved.findIndex((palette) => palette.name === name)}`;
  }
  trackAnalyticsEvent("save_palette", getPatternAnalyticsPayload({ paletteName: name }));
}

function renameCurrentPalette() {
  if (!IS_DEVELOPER_VERSION || !palettePresetSelect || !palettePresetSelect.value.startsWith("saved-")) return;
  const name = paletteNameInput && paletteNameInput.value.trim();
  if (!name) return;
  const saved = getSavedPalettes();
  const index = Number(palettePresetSelect.value.replace("saved-", ""));
  if (!saved[index]) return;
  saved[index] = { ...saved[index], name };
  setSavedPalettes(saved);
  renderPalettePresetOptions();
  palettePresetSelect.value = `saved-${index}`;
}

function deleteCurrentPalette() {
  if (!IS_DEVELOPER_VERSION || !palettePresetSelect || !palettePresetSelect.value.startsWith("saved-")) return;
  const saved = getSavedPalettes();
  const index = Number(palettePresetSelect.value.replace("saved-", ""));
  if (!saved[index]) return;
  saved.splice(index, 1);
  setSavedPalettes(saved);
  renderPalettePresetOptions();
  applyPalette(defaultPalette, builtInPalettes[0].name);
  palettePresetSelect.value = "built-in-0";
}

function applyPaletteChange() {
  targetColors = readPaletteInputColors();
  currentPaletteKey = isDefaultPalette() ? "default" : "custom";
  state.groundColor = getSelectedPaletteColor(groundColorSelect, state.groundColor);
  state.backgroundColor = getSelectedPaletteColor(backgroundColorSelect, state.backgroundColor);
  updateColorOptionValues();
  applyRandomChipGradient();
  initOptionStrips();
  if (state.assets) {
    refreshAllAssets().then(() => {
      renderPattern();
      updateInfoPanel();
    });
  }
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    return clean.split("").map((value) => parseInt(value + value, 16));
  }
  return [
    parseInt(clean.slice(0, 2), 16),
    parseInt(clean.slice(2, 4), 16),
    parseInt(clean.slice(4, 6), 16),
  ];
}

function distance(a, b) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
}

function nearestTargetColor(sourceColor) {
  const rgb = hexToRgb(sourceColor);
  const templates = templateColors.map(hexToRgb);
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  templates.forEach((template, index) => {
    const score = distance(rgb, template);
    if (score < bestDistance) {
      bestDistance = score;
      bestIndex = index;
    }
  });

  return targetColors[bestIndex];
}

function recolorSvgText(svgText, options = {}) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;
  const nodes = svg.querySelectorAll("*");

  nodes.forEach((node) => {
    const fill = node.getAttribute("fill");
    const stroke = node.getAttribute("stroke");

    if (fill && fill !== "none" && fill.startsWith("#")) {
      node.setAttribute("fill", options.ground ? options.groundColor || targetColors[0] : nearestTargetColor(fill));
    }

    if (stroke && stroke !== "none" && (options.ground || stroke.startsWith("#"))) {
      const mappedStroke = options.ground ? options.groundColor || targetColors[0] : nearestTargetColor(stroke);
      node.setAttribute("stroke", mappedStroke);
      if (options.ground) {
        node.setAttribute("stroke-opacity", "1");
        const currentWidth = parseFloat(node.getAttribute("stroke-width") || "0.6");
        const scale = options.groundStrokeScale || 1;
        node.setAttribute("stroke-width", String(Math.max(currentWidth * scale, 0.35)));
      }
    }
  });

  return new XMLSerializer().serializeToString(svg);
}

function svgTextToMonoLineDataUrl(svgText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;
  const nodes = svg.querySelectorAll("*");

  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  nodes.forEach((node) => {
    if (node.tagName.toLowerCase() === "defs") return;
    node.setAttribute("fill", "none");
    node.setAttribute("stroke", "#111111");
    node.setAttribute("stroke-width", "1.1");
    node.setAttribute("stroke-opacity", "1");
    node.setAttribute("vector-effect", "non-scaling-stroke");
    node.removeAttribute("opacity");
    node.removeAttribute("fill-opacity");
  });

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(new XMLSerializer().serializeToString(svg))}`;
}

function getAssetPreviewItem(label, url) {
  const svgText = getEmbeddedSvgText(url);
  if (!svgText) {
    return `<span class="asset-chip"><span class="asset-thumb missing" aria-label="${label}"></span></span>`;
  }

  return `<span class="asset-chip"><img class="asset-thumb" alt="${label}" title="${label}" src="${svgTextToMonoLineDataUrl(svgText)}"></span>`;
}

function updateAssetPreview() {
  const items = [];
  if (state.currentSkeletonLayout === 6) {
    const mainOffsets = [0, 1, 2, 3];
    const subOffsets = [0, 1];
    subOffsets.forEach((offset) => {
      const index = getWrappedIndex(state.idxSub, offset, SUB_MOTIF_NUM);
      items.push(getAssetPreviewItem(`Sc${index + 1}`, `${assetBase}/sub_motifs/sc${index + 1}_A.svg`));
    });
    mainOffsets.forEach((offset) => {
      const index = getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM);
      items.push(getAssetPreviewItem(`Sb${index + 1}`, `${assetBase}/main_motifs/sb${index + 1}_A.svg`));
    });
    assetInfo.innerHTML = `<div class="asset-preview-list">${items.join("")}</div>`;
    return;
  }
  if (state.currentSkeletonLayout === 7) {
    const nextMainIndex = getWrappedIndex(state.idxMain, 1, MAIN_MOTIF_NUM);
    items.push(getAssetPreviewItem(`Sc${state.idxSub + 1}`, `${assetBase}/sub_motifs/sc${state.idxSub + 1}_A.svg`));
    items.push(getAssetPreviewItem(`Sb${state.idxMain + 1}`, `${assetBase}/main_motifs/sb${state.idxMain + 1}_A.svg`));
    items.push(getAssetPreviewItem(`Sb${nextMainIndex + 1}`, `${assetBase}/main_motifs/sb${nextMainIndex + 1}_A.svg`));
    assetInfo.innerHTML = `<div class="asset-preview-list">${items.join("")}</div>`;
    return;
  }
  if (state.currentSkeletonLayout === 8) {
    [0, 1, 2, 3].forEach((offset) => {
      const index = getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM);
      items.push(getAssetPreviewItem(`Sb${index + 1}`, `${assetBase}/main_motifs/sb${index + 1}_A.svg`));
    });
    assetInfo.innerHTML = `<div class="asset-preview-list">${items.join("")}</div>`;
    return;
  }

  items.push(getAssetPreviewItem(`Sc${state.idxSub + 1}`, `${assetBase}/sub_motifs/sc${state.idxSub + 1}_A.svg`));
  if (state.currentSkeletonLayout === 4) {
    const cIndex = (state.idxSub + 3) % SUB_MOTIF_NUM;
    items.push(getAssetPreviewItem(`Sc${cIndex + 1}`, `${assetBase}/sub_motifs/sc${cIndex + 1}_A.svg`));
  }
  items.push(getAssetPreviewItem(`Sb${state.idxMain + 1}`, `${assetBase}/main_motifs/sb${state.idxMain + 1}_A.svg`));
  assetInfo.innerHTML = `<div class="asset-preview-list">${items.join("")}</div>`;
}

function updateGroundPreview() {
  if (!state.drawGround) {
    groundInfo.textContent = "\u65e0";
    return;
  }

  groundInfo.textContent = groundTextureMeta[state.idxGround]?.displayName || "\u672a\u547d\u540d\u5730\u7eb9";
}

function getPatternId() {
  if (!IS_DEVELOPER_VERSION) {
    const parts = [
      state.currentSkeletonLayout,
      state.currentSkeletonStyle,
      state.lineWidth,
      state.drawGround ? 1 : 0,
      state.drawGround ? state.idxGround : 0,
      state.idxSub,
      state.idxMain,
      state.groundSize,
      Math.round(state.groundOpacity * 100),
      Math.round(state.groundStrokeScale * 10),
      targetColors.indexOf(state.groundColor),
      targetColors.indexOf(state.backgroundColor),
    ];
    let hash = 0;
    parts.join("-").split("").forEach((char) => {
      hash = ((hash * 31) + char.charCodeAt(0)) >>> 0;
    });
    return `JXNS-${hash.toString(36).toUpperCase().padStart(6, "0").slice(-6)}`;
  }

  const data = {
    layout: state.currentSkeletonLayout,
    skeletonStyle: state.currentSkeletonStyle,
    lineWidth: state.lineWidth,
    drawGround: state.drawGround ? 1 : 0,
    idxGround: state.drawGround ? state.idxGround : 0,
    idxSub: state.idxSub,
    idxMain: state.idxMain,
    groundSizeTenths: Math.round(state.groundSize * 10),
    groundOpacityPercent: Math.round(state.groundOpacity * 100),
    groundStrokeTenths: Math.round(state.groundStrokeScale * 10),
  };
  const colors = [...targetColors, state.groundColor, state.backgroundColor]
    .map((color) => parseInt((normalizeHexColor(color) || "#000000").slice(1), 16));
  let payload = 0n;

  patternCodeFields.forEach(([key, bits]) => {
    payload = appendPackedValue(payload, data[key], bits);
  });
  colors.forEach((color) => {
    payload = appendPackedValue(payload, color, 24);
  });

  return `BRBN-${payload.toString(36).toUpperCase().padStart(COMPACT_PATTERN_CODE_WIDTH, "0")}`;
}

function validatePatternData(data) {
  if (!selectableLayoutIndexes.includes(data.layout)) {
    throw new Error("\u5f53\u524d\u7248\u672c\u4e0d\u652f\u6301\u8fd9\u4e2a\u9aa8\u67b6\u7f16\u53f7");
  }
  if (data.skeletonStyle < 0 || data.skeletonStyle >= skeletonStyleNames.length) throw new Error("\u9aa8\u67b6\u7ebf\u578b\u7f16\u53f7\u65e0\u6548");
  if (data.idxGround < 0 || data.idxGround >= groundTextureMeta.length) throw new Error("\u5730\u7eb9\u7f16\u53f7\u65e0\u6548");
  if (data.idxSub < 0 || data.idxSub >= SUB_MOTIF_NUM || data.idxMain < 0 || data.idxMain >= MAIN_MOTIF_NUM) throw new Error("\u56fe\u5143\u7f16\u53f7\u65e0\u6548");

  return data;
}

function parseCompactPatternId(cleaned) {
  const match = cleaned.match(/^BRBN-?([0-9A-Z]{1,41})$/);
  if (!match) return null;

  let payload = base36ToBigInt(match[1]);
  const colors = Array(7);
  for (let index = 6; index >= 0; index -= 1) {
    const result = readPackedValue(payload, 24);
    colors[index] = `#${result.value.toString(16).toUpperCase().padStart(6, "0")}`;
    payload = result.next;
  }

  const values = {};
  [...patternCodeFields].reverse().forEach(([key, bits]) => {
    const result = readPackedValue(payload, bits);
    values[key] = result.value;
    payload = result.next;
  });
  if (payload !== 0n) throw new Error("\u7f16\u53f7\u683c\u5f0f\u65e0\u6548");

  return validatePatternData({
    layout: values.layout,
    skeletonStyle: values.skeletonStyle,
    lineWidth: Math.min(48, Math.max(8, values.lineWidth)),
    drawGround: values.drawGround === 1,
    idxGround: values.idxGround,
    idxSub: values.idxSub,
    idxMain: values.idxMain,
    groundSize: normalizeGroundScale(values.groundSizeTenths / 10),
    groundOpacity: Math.min(1, Math.max(0.1, values.groundOpacityPercent / 100)),
    groundStrokeScale: Math.min(4, Math.max(0.4, values.groundStrokeTenths / 10)),
    paletteColors: colors.slice(0, 5),
    groundColor: colors[5],
    backgroundColor: colors[6],
  });
}

function parseLegacyPatternId(cleaned) {
  const match = cleaned.match(/^JXNS1-([0-9A-Z.]+)-([0-9A-F]{42})$/);
  if (!match) return null;

  const values = match[1].split(".").map(fromCodeNumber);
  if (values.length !== 10) {
    throw new Error("\u7f16\u53f7\u53c2\u6570\u4e0d\u5b8c\u6574");
  }

  const [layout, skeletonStyle, lineWidth, drawGround, idxGround, idxSub, idxMain, groundSizeTenths, groundOpacityPercent, groundStrokeTenths] = values;
  const colorText = match[2];
  const colors = [];
  for (let index = 0; index < 7; index += 1) {
    colors.push(`#${colorText.slice(index * 6, index * 6 + 6)}`);
  }

  return validatePatternData({
    layout,
    skeletonStyle,
    lineWidth: Math.min(48, Math.max(8, lineWidth)),
    drawGround: drawGround === 1,
    idxGround,
    idxSub,
    idxMain,
    groundSize: normalizeGroundScale(groundSizeTenths / 10),
    groundOpacity: Math.min(1, Math.max(0.1, groundOpacityPercent / 100)),
    groundStrokeScale: Math.min(4, Math.max(0.4, groundStrokeTenths / 10)),
    paletteColors: colors.slice(0, 5),
    groundColor: colors[5],
    backgroundColor: colors[6],
  });
}

function parsePatternId(patternId) {
  const cleaned = String(patternId || "").trim().toUpperCase().replace(/^PATTERN\s*\/\s*/, "").replace(/\s+/g, "");
  const parsed = parseCompactPatternId(cleaned) || parseLegacyPatternId(cleaned);
  if (!parsed) {
    throw new Error("\u8bf7\u8f93\u5165 BRBN \u7f16\u53f7\uff1b\u65e7\u7248 JXNS \u77ed\u7f16\u53f7\u65e0\u6cd5\u53cd\u89e3");
  }
  return parsed;
}

function updatePatternCodeLabel() {
  if (!patternCodeLabel) return;
  patternCodeLabel.textContent = `PATTERN / ${getPatternId()}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getRecipeCardHtml() {
  if (state.recipeCardStyle === "studio") {
    return getStudioRecipeCardHtml();
  }
  if (state.recipeCardStyle === "figma-v2") {
    return getFigmaV2RecipeCardHtml();
  }

  return getFigmaRecipeCardHtml();
}

function getRecipeCardData() {
  const groundType = state.drawGround ? groundTextureMeta[state.idxGround]?.cardName || "\u672a\u547d\u540d\u5730\u7eb9" : "\u65e0";
  const groundInfoName = state.drawGround ? groundTextureMeta[state.idxGround]?.displayName || "\u672a\u547d\u540d\u5730\u7eb9" : "\u7eaf\u8272\u65e0\u5730\u7eb9";
  return {
    groundType,
    groundInfoName,
    patternImage: canvas.toDataURL("image/png"),
    patternId: getPatternId(),
    layoutName: layoutCardNames[state.currentSkeletonLayout],
    layoutInfoName: cardLayoutInfoNames[state.currentSkeletonLayout] || layoutNames[state.currentSkeletonLayout],
    layoutShortName: layoutNames[state.currentSkeletonLayout],
    skeletonName: skeletonStyleCardNames[state.currentSkeletonStyle],
    skeletonInfoName: skeletonStyleNames[state.currentSkeletonStyle],
    motifName: `Sb${state.idxMain + 1} / Sc${state.idxSub + 1}`,
    groundColorLabel: getPaletteLabel(Math.max(0, targetColors.indexOf(state.groundColor))),
    backgroundColorLabel: getPaletteLabel(Math.max(0, targetColors.indexOf(state.backgroundColor))),
    description: layoutDescriptions[state.currentSkeletonLayout],
  };
}

function imageToRecipeCardDataUrl(image, size = 96) {
  if (!image) return "";
  const thumbCanvas = document.createElement("canvas");
  thumbCanvas.width = size;
  thumbCanvas.height = size;
  const thumbCtx = thumbCanvas.getContext("2d");
  thumbCtx.clearRect(0, 0, size, size);
  thumbCtx.drawImage(image, 0, 0, size, size);
  return thumbCanvas.toDataURL("image/png");
}

function getRecipeCardMotifImages() {
  if (!state.assets) return [];
  const images = [];
  const pushImage = (collection, index) => {
    const image = collection && collection[getWrappedIndex(index, 0, collection.length)];
    if (image) images.push(imageToRecipeCardDataUrl(image));
  };
  const pushPair = (index, sub = false) => {
    pushImage(sub ? state.assets.subA : state.assets.mainA, index);
    pushImage(sub ? state.assets.subB : state.assets.mainB, index);
  };

  if (state.currentSkeletonLayout === 6) {
    [0, 1].forEach((offset) => pushPair(state.idxSub + offset, true));
    [0, 1, 2, 3].forEach((offset) => pushPair(state.idxMain + offset));
    return images;
  }
  if (state.currentSkeletonLayout === 7) {
    pushPair(state.idxSub, true);
    pushPair(state.idxMain);
    pushPair(state.idxMain + 1);
    return images;
  }
  if (state.currentSkeletonLayout === 8) {
    [0, 1, 2, 3].forEach((offset) => pushPair(state.idxMain + offset));
    return images;
  }

  pushPair(state.idxSub, true);
  if (state.currentSkeletonLayout === 4) {
    pushPair(state.idxSub + 3, true);
  }
  pushPair(state.idxMain);
  return images;
}

function getFigmaRecipeCardHtml() {
  const data = getRecipeCardData();
  const theme = figmaCardThemes[state.recipeCardTheme % figmaCardThemes.length];
  const styleLabel = recipeCardStyles.find((style) => style.key === state.recipeCardStyle)?.label || "\u8bbe\u8ba1\u7a3f\u7248";

  return `
    <div class="recipe-card-placeholder recipe-card-figma recipe-card-figma-${theme.key}" style="--figma-accent: ${theme.accent}; --figma-accent-deep: ${theme.accentDeep}; --figma-secondary: ${theme.secondary}; --figma-motif: ${theme.motif}; --figma-paper: ${theme.paper}; --figma-gradient-start: ${theme.gradientStart}; --figma-gradient-end: ${theme.gradientEnd}; --figma-watermark: ${theme.watermark}; --figma-watermark-end: ${theme.watermarkEnd}; --figma-watermark-opacity: ${theme.watermarkOpacity}; --figma-note: ${theme.note};">
      <div class="figma-card-art">
        <img src="${data.patternImage}" alt="">
      </div>
      <div class="figma-card-watermark" aria-hidden="true"><span>\u9526</span><span>\u5e8f</span></div>
      <div class="figma-card-body">
        <div class="figma-card-main">
          <div class="figma-card-layout">${formatFigmaCardText(data.layoutName)}</div>
          <div class="figma-card-meta">${escapeHtml(data.skeletonName)}<br>${escapeHtml(data.groundType)}</div>
        </div>
        <div class="figma-card-code">${escapeHtml(data.patternId)} / ${escapeHtml(styleLabel)} / ${escapeHtml(theme.label)}</div>
        <p>${escapeHtml(data.description)}</p>
      </div>
    </div>
  `;
}

function getFigmaV2RecipeCardHtml() {
  const data = getRecipeCardData();
  const motifs = getRecipeCardMotifImages();
  const motifItems = motifs.map((src, index) => `
    <span class="figma-v2-motif"><img src="${src}" alt="\u56fe\u5143 ${index + 1}"></span>
  `).join("");

  return `
    <div class="recipe-card-placeholder recipe-card-figma-v2">
      <div class="figma-v2-art">
        <img src="${data.patternImage}" alt="">
      </div>
      <div class="figma-v2-motifs" aria-label="\u4f7f\u7528\u7684\u56fe\u5143">${motifItems}</div>
      <div class="figma-v2-footer">
        <div class="figma-v2-brand">
          <div class="figma-v2-brand-en">BROCADE<br>REBORN</div>
          <div class="figma-v2-brand-cn">\u9526\u5e8f<br>\u65b0\u751f</div>
        </div>
        <div class="figma-v2-meta">
          <section>
            <strong>\u9aa8\u67b6\u7ed3\u6784</strong>
            <span>Structure</span>
            <p>${escapeHtml(data.layoutInfoName)}</p>
          </section>
          <section>
            <strong>\u9aa8\u7ebf\u6837\u5f0f</strong>
            <span>Line Style</span>
            <p>${escapeHtml(data.skeletonInfoName)}</p>
          </section>
          <section>
            <strong>\u5730\u7eb9\u7c7b\u578b</strong>
            <span>Ground Pattern</span>
            <p>${escapeHtml(data.groundInfoName)}</p>
          </section>
          <section>
            <strong>\u7ed3\u6784\u8bf4\u660e</strong>
            <span>Description</span>
            <p>${escapeHtml(data.description)}</p>
          </section>
        </div>
      </div>
    </div>
  `;
}

function formatFigmaCardText(value) {
  const text = escapeHtml(value);
  if (text.endsWith("\u5929\u534e\u9526\u9aa8\u67b6")) return text.replace(/\u5929\u534e\u9526\u9aa8\u67b6$/, "<br>\u5929\u534e\u9526\u9aa8\u67b6");
  if (text.endsWith("\u653e\u5c04\u9aa8\u67b6")) return text.replace(/\u653e\u5c04\u9aa8\u67b6$/, "<br>\u653e\u5c04\u9aa8\u67b6");
  if (text.endsWith("\u5341\u5b57\u9aa8\u67b6")) return text.replace(/\u5341\u5b57\u9aa8\u67b6$/, "<br>\u5341\u5b57\u9aa8\u67b6");
  if (text.endsWith("\u9aa8\u67b6")) return text.replace(/\u9aa8\u67b6$/, "<br>\u9aa8\u67b6");
  return text;
}

function getRecipeCardControlsHtml() {
  const styleButtons = recipeCardStyles.map((style) => `
    <button class="share-card-choice${state.recipeCardStyle === style.key ? " is-selected" : ""}" type="button" data-card-style="${style.key}">${escapeHtml(style.label)}</button>
  `).join("");
  const themeButtons = figmaCardThemes.map((theme, index) => `
    <button class="share-card-choice share-card-swatch${state.recipeCardTheme === index ? " is-selected" : ""}" type="button" data-card-theme="${index}" style="--chip-color: ${theme.accent};" aria-label="${escapeHtml(theme.label)}"><span>${escapeHtml(theme.label)}</span></button>
  `).join("");

  return `
    <div class="share-card-controls" aria-label="\u5361\u7247\u9009\u9879">
      <div class="share-card-field">
        <span>\u5361\u7247\u6837\u5f0f</span>
        <div class="share-card-choice-row">${styleButtons}</div>
      </div>
      <div class="share-card-field"${state.recipeCardStyle === "figma" ? "" : " hidden"}>
        <span>\u5361\u7247\u914d\u8272</span>
        <div class="share-card-choice-row share-card-swatch-row">${themeButtons}</div>
      </div>
    </div>
  `;
}

function getShareDialogHtml() {
  const isCard = state.shareMode !== "original";
  const developerOriginalTools = !isCard && IS_DEVELOPER_VERSION ? `
    <div class="share-export-tools" aria-label="\u539f\u56fe\u56fe\u5c42">
      <div class="share-export-layer-options">
        <label><input type="checkbox" name="shareExportLayer" value="motifs" checked><span>\u56fe\u5143</span></label>
        <label><input type="checkbox" name="shareExportLayer" value="skeleton" checked><span>\u9aa8\u67b6</span></label>
        <label><input type="checkbox" name="shareExportLayer" value="ground" checked><span>\u5730\u7eb9</span></label>
        <label><input type="checkbox" name="shareExportLayer" value="background" checked><span>\u80cc\u666f</span></label>
      </div>
      <div class="share-export-tool-actions">
        <button class="button" type="button" data-share-layered-export>\u5206\u56fe\u5c42\u4e0b\u8f7d</button>
        <button class="button" type="button" data-share-svg-export>SVG \u4e0b\u8f7d</button>
      </div>
    </div>
  ` : "";
  const previewHtml = isCard
    ? `<div class="share-preview-content">${getRecipeCardHtml()}</div>`
    : `<div class="share-preview-content share-preview-original">${IS_DEVELOPER_VERSION ? `<canvas id="shareOriginalPreviewCanvas" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}"></canvas>` : `<img src="${canvas.toDataURL("image/png")}" alt="\u539f\u56fe">`}</div>`;

  return `
    <div class="share-dialog" role="dialog" aria-label="\u5206\u4eab">
      <div class="share-mode-tabs" role="tablist" aria-label="\u5206\u4eab\u7c7b\u578b">
        <button class="share-mode-tab${isCard ? " is-selected" : ""}" type="button" data-share-mode="card" role="tab" aria-selected="${isCard}">\u5361\u7247</button>
        <button class="share-mode-tab${!isCard ? " is-selected" : ""}" type="button" data-share-mode="original" role="tab" aria-selected="${!isCard}">\u539f\u56fe</button>
      </div>
      <div class="share-render-frame">${previewHtml}</div>
      ${developerOriginalTools}
      <div class="share-actions">
        <button class="button share-save-button" type="button" data-share-save>\u4fdd\u5b58</button>
        <button class="button share-send-button" type="button" data-share-send>\u5206\u4eab</button>
      </div>
      <div class="share-notice" data-share-notice aria-live="polite"></div>
      <button class="share-cancel-button" type="button" data-share-cancel>\u53d6\u6d88</button>
    </div>
  `;
}

function getStudioRecipeCardHtml() {
  const data = getRecipeCardData();
  const theme = recipeCardThemes[state.currentSkeletonLayout % recipeCardThemes.length];

  return `
    <div class="recipe-card-placeholder recipe-card-${theme.key}" style="--card-accent: ${theme.accent}; --card-soft: ${theme.soft}; --card-ink: ${theme.ink};">
      <div class="recipe-card-art">
        <img src="${data.patternImage}" alt="">
      </div>
      <div class="recipe-card-body">
        <div class="recipe-card-heading">
          <div>
            <div class="recipe-card-kicker">\u9526\u5e8f\u65b0\u751f\u7eb9\u6837\u5361</div>
            <div class="recipe-card-title">${escapeHtml(data.layoutShortName)}</div>
          </div>
          <div class="recipe-card-seal" aria-hidden="true"></div>
        </div>
        <div class="recipe-card-subtitle">${escapeHtml(data.skeletonName)}</div>
        <div class="recipe-card-marks" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="recipe-card-id">${escapeHtml(data.patternId)}</div>
        <div class="recipe-card-grid">
          <span>\u6838\u5fc3\u56fe\u5143</span><strong>${escapeHtml(data.motifName)}</strong>
          <span>\u9aa8\u67b6\u7ed3\u6784</span><strong>${escapeHtml(data.layoutName)}</strong>
          <span>\u5730\u7eb9\u7c7b\u578b</span><strong>${escapeHtml(data.groundType)}</strong>
          <span>\u8272\u5f69\u7ec4\u5408</span><strong>${escapeHtml(data.groundColorLabel)} / ${escapeHtml(data.backgroundColorLabel)}</strong>
        </div>
        <p>${escapeHtml(data.description)}</p>
      </div>
    </div>
  `;
}

function generateRecipeCard() {
  if (!recipeCardPreview) return;
  if (recipeCardPreview.parentElement !== document.body) {
    document.body.appendChild(recipeCardPreview);
  }
  recipeCardPreview.innerHTML = getShareDialogHtml();
  recipeCardPreview.hidden = false;
  updateShareOriginalPreview();
  setStatus("\u5206\u4eab\u9762\u677f\u5df2\u6253\u5f00\u3002");
  window.setTimeout(() => setStatus(""), 2200);
}

function closeRecipeCard() {
  if (!recipeCardPreview) return;
  recipeCardPreview.hidden = true;
}

function getSelectForStrip(strip) {
  return document.querySelector(`#${strip.dataset.selectTarget}`);
}

function syncOptionStrip(strip) {
  const select = getSelectForStrip(strip);
  if (!select) return;

  const target = strip.dataset.selectTarget;
  const resultValue = target === "layoutSelect"
    ? String(state.currentSkeletonLayout)
    : target === "skeletonStyleSelect"
      ? String(state.currentSkeletonStyle)
      : target === "groundColor"
        ? state.groundColor
        : target === "backgroundColor"
          ? state.backgroundColor
          : target === "recipeCardStyle"
            ? state.recipeCardStyle
            : target === "recipeCardTheme"
              ? String(state.recipeCardTheme)
              : null;

  strip.querySelectorAll(".option-chip").forEach((chip) => {
    const isSelected = chip.dataset.value === select.value;
    const isCurrentResult = resultValue !== null && chip.dataset.value === resultValue && !isSelected;
    chip.classList.toggle("is-selected", isSelected);
    chip.classList.toggle("is-current-result", isCurrentResult);
    chip.setAttribute("aria-selected", String(isSelected));
    chip.tabIndex = isSelected ? 0 : -1;
  });
}

function syncOptionStrips() {
  optionStrips.forEach(syncOptionStrip);
}

function createOptionChip(option, select) {
  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "option-chip";
  chip.dataset.value = option.value;
  chip.setAttribute("role", "option");
  chip.textContent = option.textContent;
  if (select.id === "groundColor" || select.id === "backgroundColor") {
    chip.style.setProperty("--chip-color", option.value);
    chip.classList.toggle("is-random-chip", option.value === "random");
    chip.classList.toggle("is-light-chip", option.value !== "random" && isLightColor(option.value));
  } else if (select.id === "recipeCardTheme") {
    const theme = figmaCardThemes[Number(option.value)];
    if (theme) {
      chip.style.setProperty("--chip-color", theme.accent);
      chip.classList.add("is-card-theme-chip");
      chip.classList.toggle("is-light-chip", isLightColor(theme.accent));
    }
  }
  chip.addEventListener("mousedown", (event) => {
    event.preventDefault();
  });
  chip.addEventListener("touchstart", () => {}, { passive: true });
  chip.addEventListener("click", (event) => {
    event.preventDefault();
    select.value = option.value;
    runWithoutJump(() => {
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });
  chip.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const chips = Array.from(chip.parentElement.querySelectorAll(".option-chip"));
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (chips.indexOf(chip) + direction + chips.length) % chips.length;
    chips[nextIndex].focus();
  });
  return chip;
}

function updateGroundColorPreview() {
  if (!groundColorPreview) return;

  groundColorPreview.style.setProperty("--preview-color", state.groundColor);
  groundColorPreview.style.setProperty("--preview-opacity", String(state.groundOpacity));
  groundColorPreview.textContent = `${Math.round(state.groundOpacity * 100)}%`;
}

function updateBackgroundColorPreview() {
  if (!backgroundColorPreview) return;

  backgroundColorPreview.style.setProperty("--preview-color", state.backgroundColor);
  backgroundColorPreview.style.setProperty("--preview-opacity", "1");
  backgroundColorPreview.textContent = "";
}

function initOptionStrips() {
  optionStrips.forEach((strip) => {
    const select = getSelectForStrip(strip);
    if (!select) return;

    strip.replaceChildren(...Array.from(select.options).map((option) => createOptionChip(option, select)));
    syncOptionStrip(strip);
  });
}

function configurePublicLayoutOptions() {
  if (!layoutSelect || IS_DEVELOPER_VERSION) return;

  Array.from(layoutSelect.options).forEach((option) => {
    if (option.value !== "random" && publicHiddenLayoutIndexes.has(Number(option.value))) {
      option.remove();
    }
  });
  if (layoutSelect.value !== "random") {
    layoutSelect.value = String(normalizeSkeletonLayout(layoutSelect.value));
  }
}

function svgTextToImage(svgText) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const timer = window.setTimeout(() => {
      reject(new Error("SVG \u7d20\u6750\u8f7d\u5165\u8d85\u65f6"));
    }, 12000);

    image.onload = () => {
      window.clearTimeout(timer);
      resolve(image);
    };
    image.onerror = () => {
      window.clearTimeout(timer);
      reject(new Error("SVG \u7d20\u6750\u65e0\u6cd5\u8f6c\u6362\u4e3a\u56fe\u7247"));
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
  });
}

async function loadSvgText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`\u65e0\u6cd5\u8bfb\u53d6\u7d20\u6750\uff1a${url}`);
  }
  return response.text();
}

function getEmbeddedSvgText(url) {
  return window.SONG_BROCADE_ASSETS && window.SONG_BROCADE_ASSETS[url];
}

async function loadSvgImage(url, options = {}) {
  const embeddedSvgText = getEmbeddedSvgText(url);
  const svgText = embeddedSvgText || await loadSvgText(url);
  const image = await svgTextToImage(recolorSvgText(svgText, options));
  image.songBrocadeUrl = url;
  return image;
}

function getGroundSvgOptions() {
  return {
    ground: true,
    groundColor: state.groundColor,
    groundStrokeScale: state.groundStrokeScale,
  };
}

function normalizeGroundScale(value) {
  const scale = Number(value);
  if (!Number.isFinite(scale)) return 1;
  const clamped = Math.min(2.5, Math.max(0.5, scale));
  return Math.abs(clamped - 1) <= 0.05 ? 1 : clamped;
}

function applyGroundTypeValue(value) {
  if (value === "none") {
    state.drawGround = false;
    return;
  }

  state.drawGround = true;
  if (value === "random") {
    const weightedIndex = randomIndex(groundTextureMeta.length + 2);
    if (weightedIndex < 2) {
      state.drawGround = false;
      return;
    }
    state.idxGround = weightedIndex - 2;
    return;
  }

  const groundIndex = groundTextureMeta.findIndex((texture) => texture.file === value);
  state.idxGround = groundIndex >= 0 ? groundIndex : 0;
}

function getGroundTileSize(ground) {
  const imageWidth = ground.naturalWidth || ground.width;
  const imageHeight = ground.naturalHeight || ground.height;
  const sourceWidth = Number.isFinite(imageWidth) && imageWidth > 0 ? imageWidth : 100;
  const sourceHeight = Number.isFinite(imageHeight) && imageHeight > 0 ? imageHeight : sourceWidth;
  const scale = Number.isFinite(state.groundSize) && state.groundSize > 0 ? state.groundSize : 1;
  const tileWidth = Math.max(1, Math.round(sourceWidth * scale));
  const tileHeight = Math.max(1, Math.round(sourceHeight * scale));

  return { width: tileWidth, height: tileHeight };
}

async function loadAssets() {
  const lists = makeAssetList();
  const loadMany = (urls, options) => Promise.all(urls.map((url) => loadSvgImage(url, options)));

  return {
    mainA: await loadMany(lists.mainA),
    mainB: await loadMany(lists.mainB),
    subA: await loadMany(lists.subA),
    subB: await loadMany(lists.subB),
    grounds: await loadMany(lists.grounds, getGroundSvgOptions()),
  };
}

async function refreshGroundAssets() {
  const lists = makeAssetList();
  state.assets.grounds = await Promise.all(lists.grounds.map((url) => loadSvgImage(url, getGroundSvgOptions())));
}

async function refreshAllAssets() {
  const lists = makeAssetList();
  const loadMany = (urls, options) => Promise.all(urls.map((url) => loadSvgImage(url, options)));

  state.assets = {
    mainA: await loadMany(lists.mainA),
    mainB: await loadMany(lists.mainB),
    subA: await loadMany(lists.subA),
    subB: await loadMany(lists.subB),
    grounds: await loadMany(lists.grounds, getGroundSvgOptions()),
  };
}

function drawCenteredImage(image, cx, cy, width, height) {
  const yOffset = image.songBrocadeUrl && image.songBrocadeUrl.includes("/main_motifs/sb2_")
    ? height * 0.045
    : 0;
  ctx.drawImage(image, cx - width / 2, cy - height / 2 + yOffset, width, height);
}

function drawRotatedCenteredImage(image, cx, cy, width, height, angle) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function drawCircleFrame(cx, cy, radius, options = {}) {
  ctx.save();
  if (options.fill) {
    ctx.fillStyle = options.fill;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = options.color || targetColors[0];
  ctx.lineWidth = options.width || 5;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();

  if (options.innerRadius) {
    ctx.lineWidth = options.innerWidth || Math.max(2, (options.width || 5) * 0.45);
    ctx.beginPath();
    ctx.arc(cx, cy, options.innerRadius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSquareFrame(cx, cy, size, options = {}) {
  ctx.save();
  if (options.fill) {
    ctx.fillStyle = options.fill;
    ctx.fillRect(cx - size / 2, cy - size / 2, size, size);
  }
  ctx.strokeStyle = options.color || targetColors[3];
  ctx.lineWidth = options.width || 6;
  ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
  ctx.restore();
}

function drawOctagonFrame(cx, cy, radius, options = {}) {
  const cut = options.cut || radius * 0.42;
  const points = [
    [cx - cut, cy - radius],
    [cx + cut, cy - radius],
    [cx + radius, cy - cut],
    [cx + radius, cy + cut],
    [cx + cut, cy + radius],
    [cx - cut, cy + radius],
    [cx - radius, cy + cut],
    [cx - radius, cy - cut],
  ];

  ctx.save();
  if (options.fill) {
    ctx.fillStyle = options.fill;
    ctx.beginPath();
    points.forEach(([px, py], index) => {
      if (index === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();
    ctx.fill();
  }

  ctx.strokeStyle = options.color || targetColors[0];
  ctx.lineWidth = options.width || 5;
  ctx.beginPath();
  points.forEach(([px, py], index) => {
    if (index === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function createOctagonACSegments() {
  const segments = [];
  const half = TILE_SIZE / 2;

  for (let x = 0; x < CANVAS_SIZE; x += TILE_SIZE) {
    for (let y = 0; y < CANVAS_SIZE; y += TILE_SIZE) {
      segments.push([x, y, x + half, y + half]);
      segments.push([x + half, y + half, x + TILE_SIZE, y + TILE_SIZE]);
      segments.push([x + TILE_SIZE, y, x + half, y + half]);
      segments.push([x + half, y + half, x, y + TILE_SIZE]);
    }
  }

  return segments;
}

function createOctagonBBSegments() {
  const segments = [];
  const half = TILE_SIZE / 2;

  for (let x = 0; x < CANVAS_SIZE; x += TILE_SIZE) {
    for (let y = 0; y < CANVAS_SIZE; y += TILE_SIZE) {
      segments.push([x + half, y, x, y + half]);
      segments.push([x + half, y, x + TILE_SIZE, y + half]);
      segments.push([x, y + half, x + half, y + TILE_SIZE]);
      segments.push([x + TILE_SIZE, y + half, x + half, y + TILE_SIZE]);
    }
  }

  return segments;
}

function getTurtlebackMetrics() {
  const radius = TILE_SIZE * 0.34;
  return {
    radius,
    width: Math.sqrt(3) * radius,
    rowHeight: radius * 1.5,
  };
}

function getTurtlebackHexPoints(cx, cy) {
  const { radius } = getTurtlebackMetrics();
  return [-90, -30, 30, 90, 150, 210].map((degree) => {
    const angle = degree * Math.PI / 180;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  });
}

function getWrappedIndex(base, offset, total) {
  return (base + offset) % total;
}

function getSkeletonLineWidth() {
  return state.currentSkeletonLayout === 7 ? DIAMOND_FILL_DEFAULT_SKELETON_WIDTH : state.lineWidth;
}

function getTurtlebackAuxRow(y) {
  const { radius } = getTurtlebackMetrics();
  const step = radius * 0.5;
  const rawRow = Math.round((y + radius) / step);
  return rawRow - Math.floor((rawRow + 1) / 3);
}

function getTurtlebackAuxMotif(row, upperMotifs, lowerMotifs) {
  const rowCycle = ((row % 4) + 4) % 4;
  return [upperMotifs[0], upperMotifs[1], lowerMotifs[0], lowerMotifs[1]][rowCycle];
}

function getInterlockRibbonMetrics() {
  const radius = TILE_SIZE * 0.36;
  return {
    radius,
    width: Math.sqrt(3) * radius,
    rowHeight: radius * 1.5,
  };
}

function forEachInterlockRibbonCenter(callback) {
  const { radius, width, rowHeight } = getInterlockRibbonMetrics();
  let row = 0;

  for (let cy = -radius * 0.3; cy <= CANVAS_SIZE + radius; cy += rowHeight) {
    const rowOffset = row % 2 === 0 ? 0 : width / 2;
    let col = 0;

    for (let cx = -width; cx <= CANVAS_SIZE + width; cx += width) {
      callback(cx + rowOffset, cy, row, col);
      col += 1;
    }

    row += 1;
  }
}

function getInterlockRibbonPoints(cx, cy) {
  const { radius } = getInterlockRibbonMetrics();
  return [-90, -30, 30, 90, 150, 210].map((degree) => {
    const angle = degree * Math.PI / 180;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  });
}

function getInterlockRibbonMotif(row, col, motifs) {
  const rowCycle = ((row % 4) + 4) % 4;
  const isEvenCol = col % 2 === 0;
  if (rowCycle === 0) return isEvenCol ? motifs.aUpper : motifs.bUpper;
  if (rowCycle === 1) return isEvenCol ? motifs.cUpper : motifs.dUpper;
  if (rowCycle === 2) return isEvenCol ? motifs.aLower : motifs.bLower;
  return isEvenCol ? motifs.cLower : motifs.dLower;
}

function getDiamondFillMetrics() {
  const half = TILE_SIZE * 0.48;
  return {
    halfWidth: half,
    halfHeight: half,
    colStep: half * 2,
    rowStep: half,
  };
}

function forEachDiamondFillCenter(callback) {
  const { halfWidth, halfHeight, colStep, rowStep } = getDiamondFillMetrics();
  let row = 0;

  for (let cy = -halfHeight; cy <= CANVAS_SIZE + halfHeight; cy += rowStep) {
    const rowOffset = row % 2 === 0 ? 0 : colStep / 2;
    let col = 0;

    for (let cx = -halfWidth; cx <= CANVAS_SIZE + halfWidth; cx += colStep) {
      callback(cx + rowOffset, cy, row, col);
      col += 1;
    }

    row += 1;
  }
}

function getDiamondFillPoints(cx, cy) {
  const { halfWidth, halfHeight } = getDiamondFillMetrics();
  return [
    [cx, cy - halfHeight],
    [cx + halfWidth, cy],
    [cx, cy + halfHeight],
    [cx - halfWidth, cy],
  ];
}

function createDiamondFillSegments() {
  const segments = [];
  const seen = new Set();

  function addSegment(x1, y1, x2, y2) {
    const a = [Math.round(x1 * 10) / 10, Math.round(y1 * 10) / 10];
    const b = [Math.round(x2 * 10) / 10, Math.round(y2 * 10) / 10];
    const key = `${a[0]},${a[1]}:${b[0]},${b[1]}`;
    const reverseKey = `${b[0]},${b[1]}:${a[0]},${a[1]}`;
    if (seen.has(key) || seen.has(reverseKey)) return;
    seen.add(key);
    segments.push([a[0], a[1], b[0], b[1]]);
  }

  forEachDiamondFillCenter((cx, cy) => {
    const points = getDiamondFillPoints(cx, cy);
    for (let i = 0; i < points.length; i += 1) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[(i + 1) % points.length];
      addSegment(x1, y1, x2, y2);
    }
  });

  return segments;
}

function getDiamondFillMainMotif(row, motifs) {
  const rowCycle = ((row % 4) + 4) % 4;
  return [motifs.aUpper, motifs.bUpper, motifs.aLower, motifs.bLower][rowCycle];
}

function isDiamondFillCircleRow(row) {
  const rowCycle = ((row % 4) + 4) % 4;
  return rowCycle === 0 || rowCycle === 2;
}

function getDiamondFillAuxMotif(y, upperMotif, lowerMotif) {
  const { halfHeight } = getDiamondFillMetrics();
  const row = Math.round((y + halfHeight) / halfHeight);
  return row % 2 === 0 ? upperMotif : lowerMotif;
}

function createDiamondFillCircleExtensionSegments() {
  const segments = [];
  const { halfWidth, halfHeight } = getDiamondFillMetrics();
  const circleRadius = Math.min(halfWidth, halfHeight) * 0.44;
  const halfLength = circleRadius * 0.51;
  const gap = Math.max(3, getDiamondFillExtensionLineUnit() * 0.28);

  forEachDiamondFillCenter((cx, cy, row) => {
    if (!isDiamondFillCircleRow(row)) return;
    const directions = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];

    directions.forEach(([sx, sy]) => {
      const ux = sx / Math.SQRT2;
      const uy = sy / Math.SQRT2;
      const startDistance = circleRadius + gap;
      const endDistance = startDistance + halfLength * 2;
      segments.push([
        cx + ux * startDistance,
        cy + uy * startDistance,
        cx + ux * endDistance,
        cy + uy * endDistance,
      ]);
    });
  });

  return segments;
}

function getDiamondFillCircleExtensionDots() {
  const dots = [];
  const seen = new Set();
  const { halfWidth, halfHeight } = getDiamondFillMetrics();
  const circleRadius = Math.min(halfWidth, halfHeight) * 0.44;
  const gap = Math.max(3, getDiamondFillExtensionLineUnit() * 0.28);
  const edgeDistance = (halfWidth + halfHeight) / Math.SQRT2;
  const offset = Math.max(0, edgeDistance - circleRadius - gap);

  function addDot(x, y) {
    const qx = Math.round(x * 10) / 10;
    const qy = Math.round(y * 10) / 10;
    const key = `${qx},${qy}`;
    if (seen.has(key)) return;
    seen.add(key);
    dots.push([qx, qy]);
  }

  forEachDiamondFillCenter((cx, cy, row) => {
    if (!isDiamondFillCircleRow(row)) return;
    [
      [1, -1],
      [1, 1],
      [-1, 1],
      [-1, -1],
    ].forEach(([sx, sy]) => {
      addDot(cx + sx * offset, cy + sy * offset);
    });
  });

  return dots;
}

function forEachTurtlebackCenter(callback) {
  const { radius, width, rowHeight } = getTurtlebackMetrics();
  let row = 0;

  for (let cy = -radius * 0.5; cy <= CANVAS_SIZE + radius; cy += rowHeight) {
    const rowOffset = row % 2 === 0 ? 0 : width / 2;
    let col = 0;

    for (let cx = -width; cx <= CANVAS_SIZE + width; cx += width) {
      callback(cx + rowOffset, cy, row, col);
      col += 1;
    }

    row += 1;
  }
}

function createTurtlebackSegments() {
  const segments = [];
  const seen = new Set();

  function addSegment(x1, y1, x2, y2) {
    const a = [Math.round(x1 * 10) / 10, Math.round(y1 * 10) / 10];
    const b = [Math.round(x2 * 10) / 10, Math.round(y2 * 10) / 10];
    const key = `${a[0]},${a[1]}:${b[0]},${b[1]}`;
    const reverseKey = `${b[0]},${b[1]}:${a[0]},${a[1]}`;
    if (seen.has(key) || seen.has(reverseKey)) return;
    seen.add(key);
    segments.push([a[0], a[1], b[0], b[1]]);
  }

  forEachTurtlebackCenter((cx, cy) => {
    const points = getTurtlebackHexPoints(cx, cy);
    for (let i = 0; i < points.length; i += 1) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[(i + 1) % points.length];
      addSegment(x1, y1, x2, y2);
    }
  });

  return segments;
}

function createSkeletonSegments() {
  const segments = [];
  const half = TILE_SIZE / 2;

  function addOrthogonalCell(x, y) {
      segments.push([x, y, x + half, y]);
      segments.push([x + half, y, x + TILE_SIZE, y]);
      segments.push([x, y + TILE_SIZE, x + half, y + TILE_SIZE]);
      segments.push([x + half, y + TILE_SIZE, x + TILE_SIZE, y + TILE_SIZE]);
      segments.push([x, y, x, y + half]);
      segments.push([x, y + half, x, y + TILE_SIZE]);
      segments.push([x + TILE_SIZE, y, x + TILE_SIZE, y + half]);
      segments.push([x + TILE_SIZE, y + half, x + TILE_SIZE, y + TILE_SIZE]);
      segments.push([x + half, y, x + half, y + half]);
      segments.push([x + half, y + half, x + half, y + TILE_SIZE]);
      segments.push([x, y + half, x + half, y + half]);
      segments.push([x + half, y + half, x + TILE_SIZE, y + half]);
  }

  function addDiagonalCell(x, y) {
      segments.push([x, y, x + half, y + half]);
      segments.push([x + half, y + half, x + TILE_SIZE, y + TILE_SIZE]);
      segments.push([x + TILE_SIZE, y, x + half, y + half]);
      segments.push([x + half, y + half, x, y + TILE_SIZE]);
  }

  function addEdgeDiagonalCell(x, y) {
      segments.push([x + half, y, x, y + half]);
      segments.push([x + half, y, x + TILE_SIZE, y + half]);
      segments.push([x, y + half, x + half, y + TILE_SIZE]);
      segments.push([x + TILE_SIZE, y + half, x + half, y + TILE_SIZE]);
  }

  if (state.currentSkeletonLayout === 5) {
    return segments;
  }

  if (state.currentSkeletonLayout === 6) {
    return createTurtlebackSegments();
  }

  if (state.currentSkeletonLayout === 7) {
    return createDiamondFillSegments();
  }

  if (state.currentSkeletonLayout === 8) {
    return segments;
  }

  for (let x = 0; x < CANVAS_SIZE; x += TILE_SIZE) {
    for (let y = 0; y < CANVAS_SIZE; y += TILE_SIZE) {
      if (state.currentSkeletonLayout === 3) {
        segments.push([x, y, x + TILE_SIZE, y]);
        segments.push([x, y + TILE_SIZE, x + TILE_SIZE, y + TILE_SIZE]);
        segments.push([x, y, x, y + TILE_SIZE]);
        segments.push([x + TILE_SIZE, y, x + TILE_SIZE, y + TILE_SIZE]);
      } else if (state.currentSkeletonLayout === 4) {
        addDiagonalCell(x, y);
      } else if (state.currentSkeletonLayout === 2) {
        addOrthogonalCell(x, y);
      } else if (state.currentSkeletonLayout === 0) {
        addOrthogonalCell(x, y);
      } else {
        addOrthogonalCell(x, y);
        addDiagonalCell(x, y);
      }
    }
  }

  return segments;
}

function strokeSegments(segments, strokeStyle, lineWidth, offset = 0) {
  ctx.save();
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.lineJoin = "miter";
  ctx.lineCap = "butt";
  ctx.beginPath();

  for (const [x1, y1, x2, y2] of segments) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    const ox = (-dy / length) * offset;
    const oy = (dx / length) * offset;
    ctx.moveTo(x1 + ox, y1 + oy);
    ctx.lineTo(x2 + ox, y2 + oy);
  }

  ctx.stroke();
  ctx.restore();
}

function drawBandSet(segments, bands) {
  for (const band of bands) {
    strokeSegments(segments, band.color, band.width, band.offset);
  }
}

function drawDottedSegments(segments, options = {}) {
  const radius = options.radius || Math.max(2, getFrameLineUnit() * 0.18);
  const spacing = options.spacing || radius * 3.4;
  const color = options.color || targetColors[0];
  const innerColor = options.innerColor || null;
  const innerRadius = options.innerRadius || radius * 0.48;

  segments.forEach(([x1, y1, x2, y2]) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    const steps = Math.max(1, Math.round(length / spacing));

    for (let i = 0; i <= steps; i += 1) {
      const t = steps === 0 ? 0 : i / steps;
      const px = x1 + dx * t;
      const py = y1 + dy * t;
      fillCircle(px, py, radius, color);
      if (innerColor) {
        fillCircle(px, py, innerRadius, innerColor);
      }
    }
  });
}

function drawDotContourSegments(segments) {
  const w = Math.max(6, getDiamondFillExtensionLineUnit() * 0.72);
  strokeSegments(segments, targetColors[1], w);
  strokeSegments(segments, targetColors[0], w * 0.62);
  strokeSegments(segments, targetColors[2], w * 0.24);

  segments.forEach(([x1, y1, x2, y2]) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    fillCircle(mx, my, w * 0.38, targetColors[1]);
    fillCircle(mx, my, w * 0.26, targetColors[0]);
    fillCircle(mx, my, w * 0.11, targetColors[4]);
  });
}

function makeInterlockRibbonPath(cx, cy) {
  const points = getInterlockRibbonPoints(cx, cy);
  const path = new Path2D();
  const scallop = getInterlockRibbonMetrics().radius * 0.2;

  points.forEach(([x1, y1], index) => {
    const [x2, y2] = points[(index + 1) % points.length];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = mx - cx;
    const dy = my - cy;
    const length = Math.hypot(dx, dy) || 1;
    const controlX = mx + (dx / length) * scallop;
    const controlY = my + (dy / length) * scallop;

    if (index === 0) path.moveTo(x1, y1);
    path.quadraticCurveTo(controlX, controlY, x2, y2);
  });

  path.closePath();
  return path;
}

function drawInterlockRibbonFrame(cx, cy) {
  const { radius } = getInterlockRibbonMetrics();
  const path = makeInterlockRibbonPath(cx, cy);
  const ribbonWidth = Math.max(8, getFrameLineUnit() * 0.95);
  const ringRadius = radius * 0.18;

  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = targetColors[1];
  ctx.lineWidth = ribbonWidth;
  ctx.stroke(path);
  ctx.strokeStyle = targetColors[0];
  ctx.lineWidth = ribbonWidth * 0.52;
  ctx.stroke(path);
  ctx.strokeStyle = targetColors[2];
  ctx.lineWidth = ribbonWidth * 0.18;
  ctx.stroke(path);
  ctx.restore();

  getInterlockRibbonPoints(cx, cy).forEach(([px, py], index) => {
    const motifColor = index % 2 === 0 ? targetColors[3] : targetColors[4];
    drawCircleFrame(px, py, ringRadius, {
      color: targetColors[0],
      width: Math.max(2, ribbonWidth * 0.16),
      fill: targetColors[2],
    });
    fillCircle(px, py, ringRadius * 0.42, motifColor);
  });
}

function drawInterlockRibbonSkeleton() {
  forEachInterlockRibbonCenter((cx, cy) => {
    drawInterlockRibbonFrame(cx, cy);
  });
}

function drawRingDot(x, y, rings) {
  for (const ring of rings) {
    ctx.beginPath();
    ctx.fillStyle = ring.color;
    ctx.arc(x, y, ring.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function fillCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

function getFrameLineUnit() {
  return getSkeletonLineWidth() / 2.02;
}

function getDiamondFillExtensionLineUnit() {
  return DIAMOND_FILL_EXTENSION_WIDTH / 2.02;
}

function getSkeletonDotPoints() {
  const points = [];
  const seen = new Set();
  const anchors = createMotifAnchors();

  if (state.currentSkeletonLayout === 4) {
    return getSegmentMidpoints(createOctagonACSegments());
  }

  function addPoint(px, py) {
    if (px < -1 || py < -1 || px > CANVAS_SIZE + 1 || py > CANVAS_SIZE + 1) return;
    const qx = Math.round(px * 10) / 10;
    const qy = Math.round(py * 10) / 10;
    const key = `${qx},${qy}`;
    if (!seen.has(key)) {
      seen.add(key);
      points.push([qx, qy]);
    }
  }

  function adjustPointToMotifEdges(x1, y1, x2, y2) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    const ux = dx / length;
    const uy = dy / length;
    const searchDistance = TILE_SIZE * 0.82;
    const maxPerpendicular = TILE_SIZE * 0.18;
    let negativeAnchor = null;
    let positiveAnchor = null;

    for (const anchor of anchors) {
      const ax = anchor.x - mx;
      const ay = anchor.y - my;
      const projection = ax * ux + ay * uy;
      const perpendicular = Math.abs(ax * -uy + ay * ux);

      if (Math.abs(projection) < 1 || Math.abs(projection) > searchDistance || perpendicular > maxPerpendicular) {
        continue;
      }

      if (projection < 0 && (!negativeAnchor || Math.abs(projection) < Math.abs(negativeAnchor.projection))) {
        negativeAnchor = { ...anchor, projection };
      }
      if (projection > 0 && (!positiveAnchor || Math.abs(projection) < Math.abs(positiveAnchor.projection))) {
        positiveAnchor = { ...anchor, projection };
      }
    }

    if (!negativeAnchor || !positiveAnchor) {
      return [mx, my];
    }

    const negativeEdge = negativeAnchor.projection + negativeAnchor.r;
    const positiveEdge = positiveAnchor.projection - positiveAnchor.r;
    if (positiveEdge <= negativeEdge) {
      return [mx, my];
    }

    const edgeMid = (negativeEdge + positiveEdge) / 2;
    return [mx + ux * edgeMid, my + uy * edgeMid];
  }

  for (const [x1, y1, x2, y2] of createSkeletonSegments()) {
    const [px, py] = adjustPointToMotifEdges(x1, y1, x2, y2);
    addPoint(px, py);
  }

  return points;
}

function createMotifAnchors() {
  const anchors = [];

  if (state.currentSkeletonLayout === 6) {
    const { radius } = getTurtlebackMetrics();
    const seen = new Set();

    function addAnchor(x, y, r) {
      const qx = Math.round(x * 10) / 10;
      const qy = Math.round(y * 10) / 10;
      const key = `${qx},${qy},${Math.round(r * 10) / 10}`;
      if (seen.has(key)) return;
      seen.add(key);
      anchors.push({ x: qx, y: qy, r });
    }

    forEachTurtlebackCenter((cx, cy) => {
      addAnchor(cx, cy, radius * 0.56);
      getTurtlebackHexPoints(cx, cy).forEach(([px, py]) => {
        addAnchor(px, py, radius * 0.18);
      });
    });

    return anchors;
  }

  if (state.currentSkeletonLayout === 7) {
    const { halfWidth, halfHeight } = getDiamondFillMetrics();
    const seen = new Set();

    function addAnchor(x, y, r) {
      const qx = Math.round(x * 10) / 10;
      const qy = Math.round(y * 10) / 10;
      const key = `${qx},${qy}`;
      if (seen.has(key)) return;
      seen.add(key);
      anchors.push({ x: qx, y: qy, r });
    }

    forEachDiamondFillCenter((cx, cy) => {
      addAnchor(cx, cy, Math.min(halfWidth, halfHeight) * 0.62);
      getDiamondFillPoints(cx, cy).forEach(([px, py]) => {
        addAnchor(px, py, Math.min(halfWidth, halfHeight) * 0.18);
      });
    });

    return anchors;
  }

  for (let x = 0; x <= CANVAS_SIZE; x += TILE_SIZE) {
    for (let y = 0; y <= CANVAS_SIZE; y += TILE_SIZE) {
      anchors.push({ x, y, r: TILE_SIZE * 0.19 });
    }
  }

  for (let x = 0; x < CANVAS_SIZE; x += TILE_SIZE) {
    for (let y = 0; y < CANVAS_SIZE; y += TILE_SIZE) {
      anchors.push({ x: x + TILE_SIZE / 2, y: y + TILE_SIZE / 2, r: TILE_SIZE * 0.28 });

      if (state.currentSkeletonLayout === 0) {
        anchors.push({ x: x + TILE_SIZE * 0.25, y: y + TILE_SIZE * 0.25, r: TILE_SIZE * 0.15 });
        anchors.push({ x: x + TILE_SIZE * 0.75, y: y + TILE_SIZE * 0.25, r: TILE_SIZE * 0.15 });
        anchors.push({ x: x + TILE_SIZE * 0.25, y: y + TILE_SIZE * 0.75, r: TILE_SIZE * 0.15 });
        anchors.push({ x: x + TILE_SIZE * 0.75, y: y + TILE_SIZE * 0.75, r: TILE_SIZE * 0.15 });
      } else {
        anchors.push({ x: x + TILE_SIZE / 2, y, r: TILE_SIZE * 0.13 });
        anchors.push({ x, y: y + TILE_SIZE / 2, r: TILE_SIZE * 0.13 });
      }
    }
  }

  return anchors;
}

function drawSkeletonDots(mode) {
  const w = getSkeletonLineWidth();

  ctx.save();
  for (const [x, y] of getSkeletonDotPoints()) {
    if (mode === "halo") {
      drawRingDot(x, y, [
        { radius: w * 0.45, color: targetColors[0] },
        { radius: w * 0.34, color: targetColors[3] },
        { radius: w * 0.22, color: targetColors[2] },
        { radius: w * 0.14, color: targetColors[4] },
      ]);
    } else {
      drawRingDot(x, y, [
        { radius: w * 0.27, color: targetColors[2] },
        { radius: w * 0.18, color: targetColors[4] },
      ]);
    }
  }
  ctx.restore();
}

function drawContourSkeleton(segments, points = getSkeletonDotPoints()) {
  const w = getSkeletonLineWidth();
  const outerWidth = w;
  const greenWidth = w * 0.74;
  const gapWidth = w * 0.35;

  strokeSegments(segments, targetColors[1], outerWidth);
  for (const [x, y] of points) {
    fillCircle(x, y, outerWidth / 2, targetColors[1]);
  }

  strokeSegments(segments, targetColors[0], greenWidth);
  for (const [x, y] of points) {
    fillCircle(x, y, greenWidth / 2, targetColors[0]);
  }

  strokeSegments(segments, targetColors[2], gapWidth);
  for (const [x, y] of points) {
    fillCircle(x, y, gapWidth * 0.9, targetColors[2]);
    fillCircle(x, y, w * 0.11, targetColors[4]);
  }
}

function getSegmentMidpoints(segments) {
  const points = [];
  const seen = new Set();

  for (const [x1, y1, x2, y2] of segments) {
    const px = Math.round(((x1 + x2) / 2) * 10) / 10;
    const py = Math.round(((y1 + y2) / 2) * 10) / 10;
    const key = `${px},${py}`;
    if (!seen.has(key)) {
      seen.add(key);
      points.push([px, py]);
    }
  }

  return points;
}

function drawFixedOctagonACSkeleton() {
  if (state.currentSkeletonLayout !== 4) return;

  const segments = createOctagonACSegments();
  drawContourSkeleton(segments, getSegmentMidpoints(segments));
}

function drawOctagonTileFrames() {
  if (state.currentSkeletonLayout !== 4) return;

  const frameWidth = Math.max(3, getFrameLineUnit() * 0.5);
  const squareSize = TILE_SIZE * 0.28;
  const lineGap = Math.max(2, frameWidth * 0.75);
  const axisRadius = TILE_SIZE / 2 - squareSize / 2 - lineGap;
  const cut = squareSize / 2;
  const fillColor = "rgba(253, 247, 242, 0.28)";

  for (let x = 0; x < CANVAS_SIZE; x += TILE_SIZE) {
    for (let y = 0; y < CANVAS_SIZE; y += TILE_SIZE) {
      const cx = x + TILE_SIZE / 2;
      const cy = y + TILE_SIZE / 2;
      drawOctagonFrame(cx, cy, axisRadius, {
        color: targetColors[3],
        width: frameWidth,
        cut,
        fill: fillColor,
      });
      drawOctagonFrame(x, y, axisRadius, {
        color: targetColors[0],
        width: frameWidth,
        cut,
      });
      drawOctagonFrame(x + TILE_SIZE, y, axisRadius, {
        color: targetColors[0],
        width: frameWidth,
        cut,
      });
      drawOctagonFrame(x, y + TILE_SIZE, axisRadius, {
        color: targetColors[0],
        width: frameWidth,
        cut,
      });
      drawOctagonFrame(x + TILE_SIZE, y + TILE_SIZE, axisRadius, {
        color: targetColors[0],
        width: frameWidth,
        cut,
      });
    }
  }
}

function drawSkeletonLines() {
  if (state.currentSkeletonLayout === 8) {
    drawInterlockRibbonSkeleton();
    return;
  }

  const segments = createSkeletonSegments();
  const total = getSkeletonLineWidth();
  const threeGap = total * 0.11;
  const threeThin = total * 0.12;
  const threeCenter = total - 2 * (threeGap + threeThin);

  if (state.currentSkeletonStyle === 0) {
    strokeSegments(segments, targetColors[0], total);
    return;
  }

  if (state.currentSkeletonStyle === 1) {
    const strokeWidth = Math.max(2, total * 0.28);
    const offset = (total - strokeWidth) / 2;
    strokeSegments(segments, targetColors[0], strokeWidth, offset);
    strokeSegments(segments, targetColors[0], strokeWidth, -offset);
    return;
  }

  if (state.currentSkeletonStyle === 2) {
    drawBandSet(segments, [
      { color: targetColors[3], width: threeCenter, offset: 0 },
      { color: targetColors[0], width: threeThin, offset: threeCenter / 2 + threeGap },
      { color: targetColors[0], width: threeThin, offset: -threeCenter / 2 - threeGap },
    ]);
    return;
  }

  if (state.currentSkeletonStyle === 3) {
    drawBandSet(segments, [
      { color: targetColors[3], width: threeCenter, offset: 0 },
      { color: targetColors[0], width: threeThin, offset: threeCenter / 2 + threeGap },
      { color: targetColors[0], width: threeThin, offset: -threeCenter / 2 - threeGap },
    ]);
    drawSkeletonDots("simple");
    return;
  }

  if (state.currentSkeletonStyle === 4) {
    const centerWide = total * 0.42;
    const mid = total * 0.13;
    const gap = total * 0.0475;
    const greenOffset = centerWide / 2 + gap;
    const orangeOffset = greenOffset + mid + gap;
    drawBandSet(segments, [
      { color: targetColors[3], width: centerWide, offset: 0 },
      { color: targetColors[0], width: mid, offset: greenOffset },
      { color: targetColors[0], width: mid, offset: -greenOffset },
      { color: targetColors[4], width: mid, offset: orangeOffset },
      { color: targetColors[4], width: mid, offset: -orangeOffset },
    ]);
    drawSkeletonDots("halo");
    return;
  }

  if (state.currentSkeletonStyle === 5) {
    const centerWide = total * 0.32;
    const mid = total * 0.115;
    const thin = total * 0.06;
    const gap = (total - centerWide - mid * 4 - thin * 2) / 6;
    const centerOffset = centerWide / 2 + gap + mid / 2;
    const orangeOffset = centerWide / 2 + gap + mid + gap + thin / 2;
    const paleOffset = centerWide / 2 + gap + mid + gap + thin + gap + mid / 2;
    drawBandSet(segments, [
      { color: targetColors[3], width: centerWide, offset: 0 },
      { color: targetColors[4], width: mid, offset: centerOffset },
      { color: targetColors[4], width: mid, offset: -centerOffset },
      { color: targetColors[0], width: thin, offset: orangeOffset },
      { color: targetColors[0], width: thin, offset: -orangeOffset },
      { color: targetColors[1], width: mid, offset: paleOffset },
      { color: targetColors[1], width: mid, offset: -paleOffset },
    ]);
    drawSkeletonDots("simple");
    return;
  }

  drawContourSkeleton(segments);
}

function drawTurtlebackMotifs() {
  const { radius } = getTurtlebackMetrics();
  const mainMotifsA = [0, 1, 2, 3].map((offset) => state.assets.mainA[getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM)]);
  const mainMotifsB = [0, 1, 2, 3].map((offset) => state.assets.mainB[getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM)]);
  const subMotifsA = [0, 1].map((offset) => state.assets.subA[getWrappedIndex(state.idxSub, offset, SUB_MOTIF_NUM)]);
  const subMotifsB = [0, 1].map((offset) => state.assets.subB[getWrappedIndex(state.idxSub, offset, SUB_MOTIF_NUM)]);
  const mainSize = radius * 1.38;
  const vertexSize = Math.max(18, radius * 0.42);
  const vertexSeen = new Set();

  function addPoint(seen, x, y, draw) {
    if (x < -radius || y < -radius || x > CANVAS_SIZE + radius || y > CANVAS_SIZE + radius) return;
    const qx = Math.round(x * 10) / 10;
    const qy = Math.round(y * 10) / 10;
    const key = `${qx},${qy}`;
    if (seen.has(key)) return;
    seen.add(key);
    draw(qx, qy);
  }

  forEachTurtlebackCenter((cx, cy, row, col) => {
    if (cx >= -radius && cy >= -radius && cx <= CANVAS_SIZE + radius && cy <= CANVAS_SIZE + radius) {
      const rowCycle = ((row % 4) + 4) % 4;
      const columnPhase = ((col % 2) + 2) % 2;
      const motifOffset = (rowCycle % 2) * 2 + columnPhase;
      const motifSet = rowCycle >= 2 ? mainMotifsB : mainMotifsA;
      const motif = motifSet[motifOffset];
      drawCenteredImage(motif, cx, cy, mainSize, mainSize);
    }

    getTurtlebackHexPoints(cx, cy).forEach(([px, py]) => {
      addPoint(vertexSeen, px, py, (qx, qy) => {
        const motif = getTurtlebackAuxMotif(getTurtlebackAuxRow(qy), subMotifsA, subMotifsB);
        drawCenteredImage(motif, qx, qy, vertexSize, vertexSize);
      });
    });
  });
}

function drawDiamondFillMotifs() {
  const { halfWidth, halfHeight } = getDiamondFillMetrics();
  const nextMainIndex = getWrappedIndex(state.idxMain, 1, MAIN_MOTIF_NUM);
  const mainMotifs = {
    aUpper: state.assets.mainA[state.idxMain],
    bUpper: state.assets.mainA[nextMainIndex],
    aLower: state.assets.mainB[state.idxMain],
    bLower: state.assets.mainB[nextMainIndex],
  };
  const subUpper = state.assets.subA[state.idxSub];
  const subLower = state.assets.subB[state.idxSub];
  const circleRadius = Math.min(halfWidth, halfHeight) * 0.44;
  const innerRadius = circleRadius - Math.max(2, getFrameLineUnit() * 0.34);
  const circleMotifSize = Math.max(10, innerRadius * 2);
  const diamondMotifSize = Math.min(halfWidth, halfHeight) * 0.96;
  const subSize = Math.max(18, Math.min(halfWidth, halfHeight) * 0.46);
  const pointRadius = subSize * 0.5;
  const seenPoints = new Set();
  const extensionSegments = createDiamondFillCircleExtensionSegments();

  drawDotContourSegments(extensionSegments);

  function addIntersection(x, y, motif) {
    if (x < -pointRadius || y < -pointRadius || x > CANVAS_SIZE + pointRadius || y > CANVAS_SIZE + pointRadius) return;
    const qx = Math.round(x * 10) / 10;
    const qy = Math.round(y * 10) / 10;
    const key = `${qx},${qy}`;
    if (seenPoints.has(key)) return;
    seenPoints.add(key);
    drawCenteredImage(motif, qx, qy, subSize, subSize);
  }

  forEachDiamondFillCenter((cx, cy, row, col) => {
    const isCircleCell = isDiamondFillCircleRow(row);
    const motif = getDiamondFillMainMotif(row, mainMotifs);

    if (cx >= -halfWidth && cy >= -halfHeight && cx <= CANVAS_SIZE + halfWidth && cy <= CANVAS_SIZE + halfHeight) {
      if (isCircleCell) {
        drawCircleFrame(cx, cy, circleRadius, {
          color: targetColors[3],
          width: Math.max(3, getFrameLineUnit() * 0.5),
          fill: targetColors[2],
        });
        drawCircleFrame(cx, cy, innerRadius, {
          color: targetColors[0],
          width: Math.max(2, getFrameLineUnit() * 0.34),
        });
        drawCenteredImage(motif, cx, cy, circleMotifSize, circleMotifSize);
      } else {
        drawCenteredImage(motif, cx, cy, diamondMotifSize, diamondMotifSize);
      }
    }

    getDiamondFillPoints(cx, cy).forEach(([px, py]) => {
      addIntersection(px, py, getDiamondFillAuxMotif(py, subUpper, subLower));
    });
  });
}

function drawInterlockRibbonMotifs() {
  const { radius } = getInterlockRibbonMetrics();
  const motifIndices = [0, 1, 2, 3].map((offset) => getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM));
  const motifs = {
    aUpper: state.assets.mainA[motifIndices[0]],
    bUpper: state.assets.mainA[motifIndices[1]],
    cUpper: state.assets.mainA[motifIndices[2]],
    dUpper: state.assets.mainA[motifIndices[3]],
    aLower: state.assets.mainB[motifIndices[0]],
    bLower: state.assets.mainB[motifIndices[1]],
    cLower: state.assets.mainB[motifIndices[2]],
    dLower: state.assets.mainB[motifIndices[3]],
  };
  const motifSize = radius * 0.96;

  forEachInterlockRibbonCenter((cx, cy, row, col) => {
    if (cx < -radius || cy < -radius || cx > CANVAS_SIZE + radius || cy > CANVAS_SIZE + radius) return;
    drawCenteredImage(getInterlockRibbonMotif(row, col, motifs), cx, cy, motifSize, motifSize);
  });
}


function drawMotifsAtCell(x, y) {
  const quarter = TILE_SIZE / 4;
  const mainSize = TILE_SIZE * 0.45;
  const subSize = TILE_SIZE * 0.25;
  const mainA = state.assets.mainA[state.idxMain];
  const mainB = state.assets.mainB[state.idxMain];
  const subA = state.assets.subA[state.idxSub];
  const subB = state.assets.subB[state.idxSub];

  if (state.currentSkeletonLayout === 0) {
    drawCenteredImage(subA, x + quarter, y + quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    drawCenteredImage(subA, x + TILE_SIZE - quarter, y + TILE_SIZE - quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    drawCenteredImage(subB, x + TILE_SIZE - quarter, y + quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    drawCenteredImage(subB, x + quarter, y + TILE_SIZE - quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    drawCenteredImage(mainA, x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE * 0.6, TILE_SIZE * 0.6);
    drawCenteredImage(mainB, x, y, TILE_SIZE * 0.4, TILE_SIZE * 0.4);
    return;
  }

  if (state.currentSkeletonLayout === 1) {
    drawCenteredImage(mainB, x, y, mainSize, mainSize);
    drawCenteredImage(mainA, x + TILE_SIZE / 2, y + TILE_SIZE / 2, mainSize, mainSize);
    drawCenteredImage(subA, x + TILE_SIZE / 2, y, subSize, subSize);
    drawCenteredImage(subB, x, y + TILE_SIZE / 2, subSize, subSize);
    return;
  }

  if (state.currentSkeletonLayout === 2) {
    drawCenteredImage(mainA, x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE * 0.58, TILE_SIZE * 0.58);
    drawCenteredImage(mainB, x, y, TILE_SIZE * 0.42, TILE_SIZE * 0.42);
    drawCenteredImage(subA, x + TILE_SIZE / 2, y + TILE_SIZE, subSize, subSize);
    drawCenteredImage(subB, x, y + TILE_SIZE / 2, subSize, subSize);
    return;
  }

  if (state.currentSkeletonLayout === 3) {
    const cx = x + TILE_SIZE / 2;
    const cy = y + TILE_SIZE / 2;
    const ringWidth = Math.max(5, getFrameLineUnit() * 0.82);
    const bRingWidth = Math.max(3, ringWidth * 0.52);
    const cRingWidth = Math.max(3, ringWidth * 0.48);
    const bigRadius = TILE_SIZE * 0.4;
    const smallRadius = TILE_SIZE * 0.2;
    const squareSize = TILE_SIZE * 0.285;
    const fillColor = targetColors[2];
    const bMotif = state.assets.subA[state.idxSub];
    const cMotif = state.assets.subB[state.idxSub];
    const bIntrusion = Math.max(0, smallRadius - TILE_SIZE / 2 + bigRadius);
    const mainMotifSize = Math.max(10, (bigRadius - bIntrusion - ringWidth * 0.92) * 2);
    const smallMotifSize = Math.max(8, (smallRadius - bRingWidth * 1.25) * 2);
    const squareMotifSize = Math.max(8, squareSize - cRingWidth * 1.9);

    drawCircleFrame(cx, cy, bigRadius, {
      color: targetColors[1],
      width: ringWidth,
      fill: fillColor,
    });
    drawCenteredImage(mainA, cx, cy, mainMotifSize, mainMotifSize);

    [
      [cx, y],
      [x + TILE_SIZE, cy],
      [cx, y + TILE_SIZE],
      [x, cy],
    ].forEach(([px, py]) => {
      drawCircleFrame(px, py, smallRadius, {
        color: targetColors[0],
        width: bRingWidth,
        fill: fillColor,
      });
      drawCenteredImage(bMotif, px, py, smallMotifSize, smallMotifSize);
    });

    [
      [x, y],
      [x + TILE_SIZE, y],
      [x, y + TILE_SIZE],
      [x + TILE_SIZE, y + TILE_SIZE],
    ].forEach(([px, py]) => {
      drawSquareFrame(px, py, squareSize, {
        color: targetColors[3],
        width: cRingWidth,
        fill: fillColor,
      });
      drawCenteredImage(cMotif, px, py, squareMotifSize, squareMotifSize);
    });
    return;
  }

  if (state.currentSkeletonLayout === 4) {
    const cx = x + TILE_SIZE / 2;
    const cy = y + TILE_SIZE / 2;
    const col = Math.round(x / TILE_SIZE);
    const row = Math.round(y / TILE_SIZE);
    const cIndex = (state.idxSub + 3) % SUB_MOTIF_NUM;
    const bMotifUpper = state.assets.subA[state.idxSub];
    const bMotifLower = state.assets.subB[state.idxSub];
    const cMotifUpper = state.assets.subA[cIndex];
    const cMotifLower = state.assets.subB[cIndex];
    const aMotif = row % 2 === 0 ? mainA : mainB;
    const frameWidth = Math.max(4, getFrameLineUnit() * 0.58);
    const fillColor = targetColors[1];
    const bFillColor = targetColors[2];
    const aFillColor = targetColors[3];
    const frameColor = targetColors[0];
    const bFrameColor = targetColors[1];
    const squareSize = TILE_SIZE * 0.28;
    const bigRadius = squareSize * 0.875;
    const cRadius = squareSize * 0.75;
    const acFillColor = targetColors[2];
    const mainMotifSize = Math.max(10, (bigRadius - frameWidth * 1.15) * 2);
    const cMotifSize = Math.max(8, (cRadius - frameWidth * 1.1) * 2);
    const bMotifSize = Math.max(8, squareSize - frameWidth * 2.1);

    drawCircleFrame(cx, cy, bigRadius, {
      color: frameColor,
      width: frameWidth,
      fill: aFillColor,
    });
    drawCenteredImage(aMotif, cx, cy, mainMotifSize, mainMotifSize);

    [
      [cx, y, bMotifLower],
      [x + TILE_SIZE, cy, bMotifUpper],
      [cx, y + TILE_SIZE, bMotifLower],
      [x, cy, bMotifUpper],
    ].forEach(([px, py, motif]) => {
      drawSquareFrame(px, py, squareSize, {
        color: bFrameColor,
        width: frameWidth,
        fill: bFillColor,
      });
      drawCenteredImage(motif, px, py, bMotifSize, bMotifSize);
    });

    [
      [x, y, (row + col) % 2 === 0 ? cMotifUpper : cMotifLower],
      [x + TILE_SIZE, y, (row + col + 1) % 2 === 0 ? cMotifUpper : cMotifLower],
      [x, y + TILE_SIZE, (row + col + 1) % 2 === 0 ? cMotifUpper : cMotifLower],
      [x + TILE_SIZE, y + TILE_SIZE, (row + col) % 2 === 0 ? cMotifUpper : cMotifLower],
    ].forEach(([px, py, motif]) => {
      drawCircleFrame(px, py, cRadius, {
        color: frameColor,
        width: frameWidth,
        fill: acFillColor,
      });
      drawCenteredImage(motif, px, py, cMotifSize, cMotifSize);
    });
    return;
  }

  const cx = x + TILE_SIZE / 2;
  const cy = y + TILE_SIZE / 2;
  const ringWidth = Math.max(4, getFrameLineUnit() * 0.6);
  const bigRadius = TILE_SIZE * 0.35;
  const smallRadius = TILE_SIZE * 0.13;
  const squareSize = TILE_SIZE * 0.34;
  const fillColor = targetColors[2];
  const bMotif = state.assets.subA[state.idxSub];
  const cMotif = state.assets.subB[state.idxSub];
  const dMotif = state.assets.subA[(state.idxSub + 3) % SUB_MOTIF_NUM];
  const mainMotifSize = Math.max(10, (bigRadius - ringWidth * 2.2) * 2);
  const smallMotifSize = Math.max(8, (smallRadius - ringWidth * 0.85) * 2);
  const squareMotifSize = Math.max(8, squareSize - ringWidth * 2.2);

  drawCircleFrame(cx, cy, bigRadius, {
    color: targetColors[0],
    width: ringWidth,
    fill: fillColor,
    innerRadius: bigRadius - ringWidth * 1.8,
    innerWidth: Math.max(2.5, ringWidth * 0.55),
  });
  drawCenteredImage(mainA, cx, cy, mainMotifSize, mainMotifSize);

  drawCircleFrame(x, cy, smallRadius, { color: targetColors[0], width: Math.max(3, ringWidth * 0.75), fill: fillColor });
  drawCenteredImage(bMotif, x, cy, smallMotifSize, smallMotifSize);
  drawCircleFrame(x + TILE_SIZE, cy, smallRadius, { color: targetColors[0], width: Math.max(3, ringWidth * 0.75), fill: fillColor });
  drawCenteredImage(bMotif, x + TILE_SIZE, cy, smallMotifSize, smallMotifSize);

  drawCircleFrame(cx, y, smallRadius, { color: targetColors[1], width: Math.max(3, ringWidth * 0.75), fill: fillColor });
  drawCenteredImage(cMotif, cx, y, smallMotifSize, smallMotifSize);
  drawCircleFrame(cx, y + TILE_SIZE, smallRadius, { color: targetColors[1], width: Math.max(3, ringWidth * 0.75), fill: fillColor });
  drawCenteredImage(cMotif, cx, y + TILE_SIZE, smallMotifSize, smallMotifSize);

  drawSquareFrame(x, y, squareSize, { color: targetColors[3], width: ringWidth, fill: fillColor });
  drawCenteredImage(dMotif, x, y, squareMotifSize, squareMotifSize);
  drawSquareFrame(x + TILE_SIZE, y, squareSize, { color: targetColors[3], width: ringWidth, fill: fillColor });
  drawCenteredImage(dMotif, x + TILE_SIZE, y, squareMotifSize, squareMotifSize);
  drawSquareFrame(x, y + TILE_SIZE, squareSize, { color: targetColors[3], width: ringWidth, fill: fillColor });
  drawCenteredImage(dMotif, x, y + TILE_SIZE, squareMotifSize, squareMotifSize);
  drawSquareFrame(x + TILE_SIZE, y + TILE_SIZE, squareSize, { color: targetColors[3], width: ringWidth, fill: fillColor });
  drawCenteredImage(dMotif, x + TILE_SIZE, y + TILE_SIZE, squareMotifSize, squareMotifSize);
}

function renderPattern({ transparent = false, targetCanvas = canvas, layers = null } = {}) {
  const previousCtx = ctx;
  ctx = targetCanvas.getContext("2d");
  const activeLayers = {
    background: layers?.background ?? !transparent,
    ground: layers?.ground ?? !transparent,
    skeleton: layers?.skeleton ?? true,
    motifs: layers?.motifs ?? true,
  };

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  if (activeLayers.background && !transparent) {
    ctx.fillStyle = state.backgroundColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  if (activeLayers.ground && state.drawGround) {
    const ground = state.assets.grounds[state.idxGround];
    const tileSize = getGroundTileSize(ground);
    const tileCanvas = document.createElement("canvas");
    tileCanvas.width = tileSize.width;
    tileCanvas.height = tileSize.height;
    const tileCtx = tileCanvas.getContext("2d");
    tileCtx.drawImage(ground, 0, 0, tileSize.width, tileSize.height);
    const pattern = ctx.createPattern(tileCanvas, "repeat");

    ctx.save();
    ctx.globalAlpha = state.groundOpacity;
    if (pattern) {
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
    ctx.restore();
  }

  if (activeLayers.skeleton) {
    drawOctagonTileFrames();
    drawSkeletonLines();
  }

  if (activeLayers.motifs) {
    if (state.currentSkeletonLayout === 6) {
      drawTurtlebackMotifs();
    } else if (state.currentSkeletonLayout === 7) {
      drawDiamondFillMotifs();
    } else if (state.currentSkeletonLayout === 8) {
      drawInterlockRibbonMotifs();
    } else {
      for (let x = 0; x <= CANVAS_SIZE; x += TILE_SIZE) {
        for (let y = 0; y <= CANVAS_SIZE; y += TILE_SIZE) {
          drawMotifsAtCell(x, y);
        }
      }
    }
  }

  ctx = previousCtx;
}

function updateInfoPanel() {
  layoutInfo.textContent = layoutNames[state.currentSkeletonLayout];
  skeletonStyleInfo.textContent = skeletonStyleNames[state.currentSkeletonStyle];
  updateGroundPreview();
  updateAssetPreview();
  updateGroundColorPreview();
  updateBackgroundColorPreview();
  updatePatternCodeLabel();
  if (recipeCardPreview && !recipeCardPreview.hidden) {
    recipeCardPreview.innerHTML = getShareDialogHtml();
    updateShareOriginalPreview();
  }
  if (exportImageDialog && !exportImageDialog.hidden) {
    updateExportPreview();
  }
  syncOptionStrips();
}

function randomizeParameters() {
  const layoutValue = layoutSelect.value;
  const skeletonStyleValue = skeletonStyleSelect.value;
  const groundValue = document.querySelector("input[name='groundMode']:checked").value;

  state.groundSize = normalizeGroundScale(groundSizeInput.value);
  state.lineWidth = Number(lineWidthInput.value);
  state.groundOpacity = Number(groundOpacityInput.value) / 100;
  state.groundStrokeScale = Number(groundStrokeInput.value) / 10;
  state.groundColor = groundColorSelect.value === "random" ? randomColor() : groundColorSelect.value;
  state.backgroundColor = backgroundColorSelect.value === "random" ? randomColor() : backgroundColorSelect.value;
  state.currentSkeletonLayout = layoutValue === "random" ? getRandomSkeletonLayout() : normalizeSkeletonLayout(layoutValue);
  state.currentSkeletonStyle = skeletonStyleValue === "random" ? randomIndex(skeletonStyleNames.length) : Number(skeletonStyleValue);

  applyGroundTypeValue(groundValue);
  state.idxSub = randomIndex(SUB_MOTIF_NUM);
  state.idxMain = randomIndex(MAIN_MOTIF_NUM);
}

async function generatePattern() {
  randomizeParameters();
  setBusy(true);
  try {
    await refreshGroundAssets();
    renderPattern();
    updateInfoPanel();
    setStatus("");
  } finally {
    setBusy(false);
  }
}

function applySkeletonStyleControls() {
  if (!state.assets) return;

  const skeletonStyleValue = skeletonStyleSelect.value;
  state.currentSkeletonStyle = skeletonStyleValue === "random" ? randomIndex(skeletonStyleNames.length) : Number(skeletonStyleValue);
  state.lineWidth = Number(lineWidthInput.value);
  renderPattern();
  updateInfoPanel();
}

function applyLineWidthControl() {
  lineWidthValue.textContent = lineWidthInput.value;
  if (!state.assets) return;

  state.lineWidth = Number(lineWidthInput.value);
  renderPattern();
  updateInfoPanel();
}

function applyGroundSizeControl() {
  const scale = normalizeGroundScale(groundSizeInput.value);
  groundSizeInput.value = String(scale);
  groundSizeValue.textContent = scale.toFixed(1);
  if (!state.assets) return;

  state.groundSize = scale;
  renderPattern();
  updateInfoPanel();
}

function applyGroundModeControl() {
  const groundValue = document.querySelector("input[name='groundMode']:checked").value;
  applyGroundTypeValue(groundValue);
  renderPattern();
  updateInfoPanel();
}

function applyGroundOpacityControl() {
  groundOpacityValue.textContent = groundOpacityInput.value;
  if (!state.assets) return;

  state.groundOpacity = Number(groundOpacityInput.value) / 100;
  updateGroundColorPreview();
  renderPattern();
  updateInfoPanel();
}

async function applyGroundStrokeControl() {
  groundStrokeValue.textContent = (Number(groundStrokeInput.value) / 10).toFixed(1);
  if (!state.assets) return;

  state.groundStrokeScale = Number(groundStrokeInput.value) / 10;
  setBusy(true);
  setStatus("\u6b63\u5728\u66f4\u65b0\u5730\u7eb9\u7c97\u7ec6...");
  try {
    await refreshGroundAssets();
    renderPattern();
    updateInfoPanel();
    setStatus("");
  } finally {
    setBusy(false);
  }
}

async function applyGroundColorControl() {
  if (!state.assets) return;

  state.groundColor = groundColorSelect.value === "random" ? randomColor() : groundColorSelect.value;
  setBusy(true);
  setStatus("\u6b63\u5728\u66f4\u65b0\u5730\u7eb9\u8272\u5f69...");
  try {
    await refreshGroundAssets();
    renderPattern();
    updateInfoPanel();
    setStatus("");
  } finally {
    setBusy(false);
  }
}

function applyBackgroundColorControl() {
  if (!state.assets) return;

  state.backgroundColor = backgroundColorSelect.value === "random" ? randomColor() : backgroundColorSelect.value;
  renderPattern();
  updateInfoPanel();
}

function resetFilters() {
  layoutSelect.value = "random";
  skeletonStyleSelect.value = "random";
  document.querySelector("input[name='groundMode'][value='random']").checked = true;
  lineWidthInput.value = String(DEFAULT_SKELETON_TOTAL_WIDTH);
  lineWidthValue.textContent = String(DEFAULT_SKELETON_TOTAL_WIDTH);
  groundSizeInput.value = "1";
  groundSizeValue.textContent = "1.0";
  groundOpacityInput.value = "82";
  groundOpacityValue.textContent = "82";
  groundStrokeInput.value = "18";
  groundStrokeValue.textContent = "1.8";
  groundColorSelect.value = targetColors[1];
  backgroundColorSelect.value = targetColors[2];
  syncOptionStrips();
}

async function applyPatternTracebackCode(patternId) {
  const data = parsePatternId(patternId);

  targetColors = data.paletteColors.map(normalizeHex);
  currentPaletteKey = isDefaultPalette() ? "built-in-0" : "custom";
  if (paletteNameInput && !isDefaultPalette()) {
    paletteNameInput.value = "\u7f16\u53f7\u56de\u6eaf\u8272\u7cfb";
  }

  layoutSelect.value = String(data.layout);
  skeletonStyleSelect.value = String(data.skeletonStyle);
  lineWidthInput.value = String(data.lineWidth);
  lineWidthValue.textContent = String(data.lineWidth);
  groundSizeInput.value = String(data.groundSize);
  groundSizeValue.textContent = data.groundSize.toFixed(1);
  groundOpacityInput.value = String(Math.round(data.groundOpacity * 100));
  groundOpacityValue.textContent = String(Math.round(data.groundOpacity * 100));
  groundStrokeInput.value = String(Math.round(data.groundStrokeScale * 10));
  groundStrokeValue.textContent = data.groundStrokeScale.toFixed(1);

  const groundModeValue = data.drawGround ? groundTextureMeta[data.idxGround]?.file : "none";
  const groundModeInput = document.querySelector(`input[name='groundMode'][value='${groundModeValue}']`);
  if (groundModeInput) groundModeInput.checked = true;

  syncPaletteInputs();
  updateColorOptionValues();
  groundColorSelect.value = data.groundColor;
  backgroundColorSelect.value = data.backgroundColor;
  applyRandomChipGradient();
  initOptionStrips();

  state.currentSkeletonLayout = data.layout;
  state.currentSkeletonStyle = data.skeletonStyle;
  state.lineWidth = data.lineWidth;
  state.drawGround = data.drawGround;
  state.idxGround = data.idxGround;
  state.idxSub = data.idxSub;
  state.idxMain = data.idxMain;
  state.groundSize = data.groundSize;
  state.groundOpacity = data.groundOpacity;
  state.groundStrokeScale = data.groundStrokeScale;
  state.groundColor = data.groundColor;
  state.backgroundColor = data.backgroundColor;

  setBusy(true);
  setStatus("\u6b63\u5728\u56de\u6eaf\u7f16\u53f7...");
  try {
    await refreshAllAssets();
    renderPattern();
    updateInfoPanel();
    setStatus("\u5df2\u56de\u6eaf\u5230\u8be5\u7f16\u53f7\u7684\u642d\u914d\u3002");
    window.setTimeout(() => setStatus(""), 2200);
  } finally {
    setBusy(false);
  }
}

function openPatternTracebackPrompt() {
  if (!IS_DEVELOPER_VERSION) return;

  const value = window.prompt("\u8bf7\u8f93\u5165\u8981\u56de\u6eaf\u7684\u7f16\u53f7", getPatternId());
  if (!value) return;

  applyPatternTracebackCode(value).catch((error) => {
    console.error(error);
    setStatus(error.message || "\u7f16\u53f7\u56de\u6eaf\u5931\u8d25\u3002");
    window.setTimeout(() => setStatus(""), 3600);
  });
}

function getExportLayerState() {
  const layers = {
    background: true,
    ground: true,
    skeleton: true,
    motifs: true,
  };
  const activeLayerInputs = recipeCardPreview && !recipeCardPreview.hidden
    ? recipeCardPreview.querySelectorAll("input[name='shareExportLayer']")
    : [];

  const inputs = activeLayerInputs.length ? activeLayerInputs : exportLayerInputs;
  inputs.forEach((input) => {
    layers[input.value] = input.checked;
  });

  return layers;
}

function makeExportCanvas() {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = CANVAS_SIZE;
  exportCanvas.height = CANVAS_SIZE;
  return exportCanvas;
}

function makeSharePatternCanvas(layers = null) {
  const baseCanvas = makeExportCanvas();
  const activeLayers = layers || {
    background: true,
    ground: true,
    skeleton: true,
    motifs: true,
  };

  renderPattern({
    targetCanvas: baseCanvas,
    transparent: !activeLayers.background,
    layers: activeLayers,
  });

  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = SHARE_EXPORT_WIDTH;
  outputCanvas.height = SHARE_EXPORT_WIDTH;
  const outputCtx = outputCanvas.getContext("2d");
  outputCtx.drawImage(baseCanvas, 0, 0, SHARE_EXPORT_WIDTH, SHARE_EXPORT_WIDTH);
  return outputCanvas;
}

function createStandbyLayer() {
  if (standby.layer) return standby.layer;

  const layer = document.createElement("div");
  layer.id = "standbyScreensaver";
  layer.className = "standby-screensaver";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = `
    <div class="standby-field" aria-hidden="true">
      <div class="standby-pattern">
        <canvas class="standby-canvas standby-color" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}"></canvas>
        <canvas class="standby-canvas standby-skeleton" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}"></canvas>
        <canvas class="standby-canvas standby-ground" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}"></canvas>
        <div class="standby-motifs"></div>
      </div>
      <div class="standby-copy" data-position="bottom-center">
        <div>DIGITAL LOOM STANDBY</div>
        <div>TOUCH TO CONTINUE</div>
        <span>\u6570\u5b57\u7ec7\u673a\u5f85\u673a\u4e2d</span>
        <span>\u89e6\u6478\u7ee7\u7eed\u751f\u6210</span>
      </div>
    </div>`;

  document.body.appendChild(layer);
  standby.layer = layer;
  standby.pattern = layer.querySelector(".standby-pattern");
  standby.text = layer.querySelector(".standby-copy");
  standby.colorCanvas = layer.querySelector(".standby-color");
  standby.skeletonCanvas = layer.querySelector(".standby-skeleton");
  standby.groundCanvas = layer.querySelector(".standby-ground");
  return layer;
}

function makeStandbyTile(layers, transparent = true) {
  const tile = document.createElement("canvas");
  tile.width = CANVAS_SIZE;
  tile.height = CANVAS_SIZE;
  const tileCtx = tile.getContext("2d");
  tileCtx.clearRect(0, 0, tile.width, tile.height);
  renderPattern({
    targetCanvas: tile,
    transparent,
    layers,
  });
  return tile;
}

function sizeStandbyCanvas(canvas) {
  canvas.width = Math.max(1, Math.ceil(window.innerWidth));
  canvas.height = Math.max(1, Math.ceil(window.innerHeight));
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function drawStandbyTiledLayer(targetCanvas, tileCanvas) {
  sizeStandbyCanvas(targetCanvas);
  const targetCtx = targetCanvas.getContext("2d");
  const pattern = targetCtx.createPattern(tileCanvas, "repeat");
  targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
  targetCtx.save();
  targetCtx.translate(-standby.tileOffsetX, -standby.tileOffsetY);
  if (pattern) {
    targetCtx.fillStyle = pattern;
    targetCtx.fillRect(
      standby.tileOffsetX,
      standby.tileOffsetY,
      targetCanvas.width + CANVAS_SIZE,
      targetCanvas.height + CANVAS_SIZE,
    );
  }
  targetCtx.restore();
}

function drawStandbyMotifDiagonalCanvases() {
  const motifWrap = standby.layer.querySelector(".standby-motifs");
  const viewportWidth = Math.max(1, Math.ceil(window.innerWidth));
  const viewportHeight = Math.max(1, Math.ceil(window.innerHeight));
  const startX = -((standby.tileOffsetX % TILE_SIZE) + TILE_SIZE);
  const startY = -((standby.tileOffsetY % TILE_SIZE) + TILE_SIZE);
  const cols = Math.ceil((viewportWidth - startX) / TILE_SIZE) + 1;
  const rows = Math.ceil((viewportHeight - startY) / TILE_SIZE) + 1;
  const diagonals = Array.from({ length: cols + rows - 1 }, () => []);
  const previousCtx = ctx;

  motifWrap.replaceChildren();
  standby.motifCanvases = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      diagonals[row + col].push([
        startX + col * TILE_SIZE,
        startY + row * TILE_SIZE,
      ]);
    }
  }

  diagonals.forEach((points, index) => {
    const motifCanvas = document.createElement("canvas");
    sizeStandbyCanvas(motifCanvas);
    motifCanvas.className = "standby-canvas standby-motif";
    motifCanvas.dataset.diagonal = String(index);
  const motifCtx = motifCanvas.getContext("2d");
  motifCtx.clearRect(0, 0, motifCanvas.width, motifCanvas.height);
  motifCtx.globalCompositeOperation = "source-over";
    ctx = motifCtx;
    points.forEach(([x, y]) => {
      drawMotifsAtCell(x, y);
    });
    motifWrap.append(motifCanvas);
    standby.motifCanvases.push(motifCanvas);
  });
  ctx = previousCtx;
}

function randomStandbyPalette() {
  const palette = builtInPalettes[randomIndex(builtInPalettes.length)].colors;
  return palette.map((color) => normalizeHex(color));
}

async function prepareStandbyPattern() {
  standby.textPosition = standbyTextPositions[randomIndex(standbyTextPositions.length)];
  standby.text.dataset.position = standby.textPosition;
  targetColors = randomStandbyPalette();
  applyRandomChipGradient();

  state.currentSkeletonLayout = getRandomSkeletonLayout();
  state.currentSkeletonStyle = randomIndex(skeletonStyleNames.length);
  state.lineWidth = 10 + randomIndex(15);
  state.drawGround = true;
  state.groundSize = [0.8, 0.9, 1, 1.1, 1.2][randomIndex(5)];
  state.groundOpacity = 0.28 + randomIndex(26) / 100;
  state.groundStrokeScale = 0.8 + randomIndex(11) / 10;
  state.idxGround = randomIndex(groundTextureMeta.length);
  state.idxSub = randomIndex(SUB_MOTIF_NUM);
  state.idxMain = randomIndex(MAIN_MOTIF_NUM);
  state.groundColor = targetColors[[0, 1, 3][randomIndex(3)]];
  state.backgroundColor = targetColors[2];
  standby.tileOffsetX = randomIndex(CANVAS_SIZE);
  standby.tileOffsetY = randomIndex(CANVAS_SIZE);
  standby.layer.style.setProperty("--standby-ground", state.backgroundColor);
  standby.layer.classList.toggle("is-dark-ground", !isLightColor(state.backgroundColor));
  standby.layer.classList.toggle("is-light-ground", isLightColor(state.backgroundColor));

  await refreshAllAssets();
  if (!standby.active) return;
  drawStandbyTiledLayer(standby.colorCanvas, makeStandbyTile({ background: true, ground: false, skeleton: false, motifs: false }, false));
  drawStandbyTiledLayer(standby.skeletonCanvas, makeStandbyTile({ background: false, ground: false, skeleton: true, motifs: false }, true));
  drawStandbyTiledLayer(standby.groundCanvas, makeStandbyTile({ background: false, ground: true, skeleton: false, motifs: false }, true));
  drawStandbyMotifDiagonalCanvases();
}

function easeInOut(value) {
  const t = Math.min(1, Math.max(0, value));
  return t * t * (3 - 2 * t);
}

function setStandbyFrame(progress) {
  const colorIn = easeInOut(Math.min(progress / 0.1, 1));
  const colorOut = easeInOut(Math.min(Math.max((progress - 0.97) / 0.03, 0), 1));
  const colorVisible = progress < 0.97 ? colorIn : 1 - colorOut;
  const skeletonIn = easeInOut(Math.min(Math.max((progress - 0.08) / 0.28, 0), 1));
  const skeletonOut = easeInOut(Math.min(Math.max((progress - 0.92) / 0.05, 0), 1));
  const groundIn = easeInOut(Math.min(Math.max((progress - 0.22) / 0.16, 0), 1));
  const groundOut = easeInOut(Math.min(Math.max((progress - 0.86) / 0.06, 0), 1));
  const motifPhaseEnd = 0.72;
  const motifFadeStart = 0.74;
  const layerExitStart = 0.86;
  const skeletonVisible = progress < layerExitStart ? skeletonIn : 1 - skeletonOut;
  const skeletonClip = skeletonVisible * 100;
  const groundVisible = progress < layerExitStart ? groundIn : 1 - groundOut;

  standby.colorCanvas.style.opacity = String(colorVisible * 0.9);
  standby.skeletonCanvas.style.opacity = String(skeletonVisible * 0.72);
  standby.skeletonCanvas.style.clipPath = `inset(0 0 ${100 - skeletonClip}% 0)`;
  standby.groundCanvas.style.opacity = String(groundVisible * 0.5);
  standby.text.style.opacity = String(0.24 + colorVisible * 0.34);

  const count = Math.max(1, standby.motifCanvases.length);
  const appearStep = count > 1 ? 0.24 / (count - 1) : 0;
  const disappearStep = count > 1 ? 0.1 / (count - 1) : 0;
  standby.motifCanvases.forEach((motifCanvas, index) => {
    const appearStart = 0.34 + index * appearStep;
    const appear = easeInOut(Math.min(Math.max((progress - appearStart) / 0.1, 0), 1));
    const disappearIndex = count - index - 1;
    const disappearStart = motifFadeStart + disappearIndex * disappearStep;
    const disappear = easeInOut(Math.min(Math.max((progress - disappearStart) / 0.08, 0), 1));
    motifCanvas.style.opacity = String((progress < motifPhaseEnd ? appear : 1 - disappear) * 0.84);
  });
}

async function runStandbyCycle() {
  if (!standby.active) return;
  await prepareStandbyPattern();
  if (!standby.active) return;
  standby.startedAt = performance.now();

  const animate = (time) => {
    if (!standby.active) return;
    const progress = Math.min(1, (time - standby.startedAt) / STANDBY_CYCLE_MS);
    setStandbyFrame(progress);
    if (progress >= 1) {
      window.setTimeout(() => {
        if (standby.active) runStandbyCycle();
      }, 700);
      return;
    }
    standby.frame = window.requestAnimationFrame(animate);
  };
  standby.frame = window.requestAnimationFrame(animate);
}

function restoreFromStandby() {
  if (!standby.restoreOnExit || !standby.savedColors) return;
  targetColors = [...standby.savedColors];
  restorePatternState(standby.savedState);
  standby.restoreOnExit = false;
  syncPaletteInputs();
  updateColorOptionValues();
  applyRandomChipGradient();
  refreshAllAssets().then(() => {
    renderPattern();
    updateInfoPanel();
  });
}

function enterStandbyMode() {
  if (standby.active || !state.assets) return;
  createStandbyLayer();
  standby.savedState = snapshotPatternState();
  standby.savedColors = [...targetColors];
  standby.restoreOnExit = true;
  standby.active = true;
  document.body.classList.add("is-standby-active");
  standby.layer.setAttribute("aria-hidden", "false");
  runStandbyCycle().catch((error) => {
    console.error(error);
    exitStandbyMode();
  });
}

function exitStandbyMode() {
  if (!standby.active) return;
  standby.active = false;
  window.cancelAnimationFrame(standby.frame);
  document.body.classList.remove("is-standby-active");
  if (standby.layer) standby.layer.setAttribute("aria-hidden", "true");
  restoreFromStandby();
}

function restartStandbyTimer() {
  window.clearTimeout(standby.timer);
  standby.timer = window.setTimeout(enterStandbyMode, STANDBY_IDLE_MS);
}

function installStandbyScreensaver() {
  createStandbyLayer();
  ["click", "touchstart", "touchmove", "mousemove", "keydown", "scroll"].forEach((eventName) => {
    window.addEventListener(eventName, () => {
      if (standby.active) {
        exitStandbyMode();
      }
      restartStandbyTimer();
    }, { passive: true, capture: true });
  });
  window.addEventListener("resize", () => {
    if (standby.active) {
      prepareStandbyPattern().catch((error) => console.error(error));
    }
  }, { passive: true });
  restartStandbyTimer();
}

const exportLayerOrder = [
  ["motifs", "motif"],
  ["skeleton", "skeleton"],
  ["ground", "ground"],
  ["background", "background"],
];

const svgPaintOrder = [
  ["background", "background"],
  ["ground", "ground"],
  ["skeleton", "skeleton"],
  ["motifs", "motif"],
];

function canvasToBlobAsync(sourceCanvas) {
  return new Promise((resolve) => {
    if (!sourceCanvas.toBlob) {
      resolve(null);
      return;
    }
    sourceCanvas.toBlob((blob) => resolve(blob), "image/png");
  });
}

async function downloadCanvas(sourceCanvas, fileName) {
  const link = document.createElement("a");
  const blob = await canvasToBlobAsync(sourceCanvas);

  link.download = fileName;
  if (blob) {
    const url = URL.createObjectURL(blob);
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    return;
  }

  link.href = sourceCanvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function downloadBlob(blob, fileName) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getDocumentCssText() {
  return Array.from(document.styleSheets).map((sheet) => {
    try {
      return Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n");
    } catch {
      return "";
    }
  }).join("\n");
}

function inlineComputedStyles(source, clone) {
  if (!(source instanceof Element) || !(clone instanceof Element)) return;
  const computed = window.getComputedStyle(source);
  const styleText = Array.from(computed).map((property) => {
    return `${property}:${computed.getPropertyValue(property)};`;
  }).join("");
  clone.setAttribute("style", styleText);

  Array.from(source.children).forEach((child, index) => {
    inlineComputedStyles(child, clone.children[index]);
  });
}

function loadImageFromUrl(url, image = new Image()) {
  return new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("\u5206\u4eab\u56fe\u7247\u751f\u6210\u5931\u8d25"));
    image.src = url;
  });
}

async function elementToPngBlob(element, outputWidth = SHARE_EXPORT_WIDTH) {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const rect = element.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rect.width));
  const height = Math.max(1, Math.ceil(rect.height));
  const outputHeight = Math.round(height * (outputWidth / width));
  const clone = element.cloneNode(true);
  inlineComputedStyles(element, clone);
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.style.maxWidth = "none";
  clone.style.maxHeight = "none";
  const serializedElement = new XMLSerializer().serializeToString(clone);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="margin:0;width:${width}px;height:${height}px;background:transparent;">${serializedElement}</div>
      </foreignObject>
    </svg>
  `;
  const image = new Image();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
  await loadImageFromUrl(url, image);

  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = outputWidth;
  outputCanvas.height = outputHeight;
  const outputCtx = outputCanvas.getContext("2d");
  outputCtx.drawImage(image, 0, 0, outputWidth, outputHeight);
  URL.revokeObjectURL(url);
  return canvasToBlobAsync(outputCanvas);
}

function getSharePreviewElement() {
  return recipeCardPreview && recipeCardPreview.querySelector(".share-preview-content > .recipe-card-placeholder");
}

function drawWrappedCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 6) {
  const lines = getWrappedCanvasLines(ctx, text, maxWidth, maxLines);
  lines.forEach((lineText, index) => {
    ctx.fillText(lineText, x, y + index * lineHeight);
  });
}

function getWrappedCanvasLines(ctx, text, maxWidth, maxLines = 6) {
  const chars = String(text).split("");
  const lines = [];
  let line = "";
  const leadingPunctuation = "\uff0c\u3002\uff1b\uff1a\uff01\uff1f\u3001,.!?:;";

  chars.forEach((char) => {
    const testLine = `${line}${char}`;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      if (leadingPunctuation.includes(char)) {
        line += char;
        lines.push(line);
        line = "";
      } else {
        lines.push(line);
        line = char;
      }
    } else {
      line = testLine;
    }
  });
  if (line) lines.push(line);

  return lines.slice(0, maxLines);
}

function drawImageCover(ctx, image, x, y, width, height) {
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const scale = Math.max(width / sourceWidth, height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function setShareDialogNotice(message) {
  const notice = recipeCardPreview && recipeCardPreview.querySelector("[data-share-notice]");
  if (notice) {
    notice.textContent = message;
  }
  setStatus(message);
  window.setTimeout(() => {
    if (notice && notice.textContent === message) notice.textContent = "";
    setStatus("");
  }, 2600);
}

function canvasFontFromElement(element, scale) {
  const style = window.getComputedStyle(element);
  const fontStyle = style.fontStyle || "normal";
  const fontWeight = style.fontWeight || "400";
  const fontSize = parseFloat(style.fontSize || "12") * scale;
  const fontFamily = style.fontFamily || "sans-serif";
  return `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
}

function getElementFontMetrics(element, scale) {
  const style = window.getComputedStyle(element);
  return {
    color: style.color || "#000000",
    font: canvasFontFromElement(element, scale),
    lineHeight: (parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.2) * scale,
  };
}

function drawElementText(ctx, element, cardRect, scale, options = {}) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const metrics = getElementFontMetrics(element, scale);
  const x = (rect.left - cardRect.left) * scale;
  const y = (rect.top - cardRect.top) * scale;
  ctx.font = metrics.font;
  ctx.fillStyle = metrics.color;
  ctx.textBaseline = "top";

  const textLines = options.lines || String(element.textContent || "").split(/\n/);
  textLines.forEach((line, index) => {
    ctx.fillText(line.trim(), x, y + index * metrics.lineHeight);
  });
}

function drawWrappedElementText(ctx, element, cardRect, scale, maxLines = 8) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);
  const x = (rect.left - cardRect.left) * scale;
  const maxWidth = rect.width * scale;
  const lineHeight = (parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.35) * scale;
  ctx.font = canvasFontFromElement(element, scale);
  ctx.fillStyle = style.color || "#000000";
  ctx.textBaseline = "top";
  const lines = getWrappedCanvasLines(ctx, element.textContent || "", maxWidth, maxLines);
  const y = (rect.bottom - cardRect.top) * scale - lines.length * lineHeight;
  lines.forEach((lineText, index) => {
    ctx.fillText(lineText, x, y + index * lineHeight);
  });
}

function drawMetaSectionBlock(ctx, section, cardRect, scale) {
  const title = section.querySelector("strong");
  const label = section.querySelector("span");
  const body = section.querySelector("p");
  if (!title || !label || !body) return;

  const sectionRect = section.getBoundingClientRect();
  const bodyRect = body.getBoundingClientRect();
  const x = (sectionRect.left - cardRect.left) * scale;
  const titleMetrics = getElementFontMetrics(title, scale);
  const labelMetrics = getElementFontMetrics(label, scale);
  const bodyMetrics = getElementFontMetrics(body, scale);
  const bodyWidth = bodyRect.width * scale;

  ctx.font = bodyMetrics.font;
  const bodyLines = getWrappedCanvasLines(ctx, body.textContent || "", bodyWidth, 8);
  const bodyMarginTop = (bodyRect.top - label.getBoundingClientRect().bottom) * scale;
  const blockHeight = titleMetrics.lineHeight + labelMetrics.lineHeight + bodyMarginTop + bodyLines.length * bodyMetrics.lineHeight;
  let y = (sectionRect.bottom - cardRect.top) * scale - blockHeight;

  ctx.textBaseline = "top";
  ctx.fillStyle = titleMetrics.color;
  ctx.font = titleMetrics.font;
  ctx.fillText(title.textContent.trim(), x, y);
  y += titleMetrics.lineHeight;

  ctx.fillStyle = labelMetrics.color;
  ctx.font = labelMetrics.font;
  ctx.fillText(label.textContent.trim().toUpperCase(), x, y);
  y += labelMetrics.lineHeight + bodyMarginTop;

  ctx.fillStyle = bodyMetrics.color;
  ctx.font = bodyMetrics.font;
  bodyLines.forEach((lineText, index) => {
    ctx.fillText(lineText, x, y + index * bodyMetrics.lineHeight);
  });
}

async function renderVisibleFigmaV2CardCanvas(element, outputWidth = SHARE_EXPORT_WIDTH) {
  const cardRect = element.getBoundingClientRect();
  const scale = outputWidth / cardRect.width;
  const outputHeight = Math.round(cardRect.height * scale);
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = outputWidth;
  outputCanvas.height = outputHeight;
  const outputCtx = outputCanvas.getContext("2d");

  outputCtx.fillStyle = "#ffffff";
  outputCtx.fillRect(0, 0, outputWidth, outputHeight);

  const art = element.querySelector(".figma-v2-art");
  const artImg = art && art.querySelector("img");
  if (art && artImg) {
    const artRect = art.getBoundingClientRect();
    const image = await loadImageFromUrl(artImg.src);
    const x = (artRect.left - cardRect.left) * scale;
    const y = (artRect.top - cardRect.top) * scale;
    const w = artRect.width * scale;
    const h = artRect.height * scale;
    outputCtx.save();
    outputCtx.beginPath();
    outputCtx.rect(x, y, w, h);
    outputCtx.clip();
    drawImageCover(outputCtx, image, x, y, w, h);
    outputCtx.restore();
  }

  for (const motifImg of element.querySelectorAll(".figma-v2-motif img")) {
    const motifRect = motifImg.getBoundingClientRect();
    const image = await loadImageFromUrl(motifImg.src);
    outputCtx.drawImage(
      image,
      (motifRect.left - cardRect.left) * scale,
      (motifRect.top - cardRect.top) * scale,
      motifRect.width * scale,
      motifRect.height * scale
    );
  }

  const brandEn = element.querySelector(".figma-v2-brand-en");
  if (brandEn) drawElementText(outputCtx, brandEn, cardRect, scale, { lines: ["BROCADE", "REBORN"] });
  const brandCn = element.querySelector(".figma-v2-brand-cn");
  if (brandCn) drawElementText(outputCtx, brandCn, cardRect, scale, { lines: ["\u9526\u5e8f", "\u65b0\u751f"] });

  element.querySelectorAll(".figma-v2-meta section").forEach((section) => {
    drawMetaSectionBlock(outputCtx, section, cardRect, scale);
  });

  return outputCanvas;
}

async function renderFigmaV2CardCanvas(outputWidth = SHARE_EXPORT_WIDTH) {
  const data = getRecipeCardData();
  const outputHeight = Math.round(outputWidth * 923 / 624);
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = outputWidth;
  outputCanvas.height = outputHeight;
  const outputCtx = outputCanvas.getContext("2d");
  const uiScale = outputWidth / 500;
  const patternImage = await loadImageFromUrl(data.patternImage);

  outputCtx.fillStyle = "#ffffff";
  outputCtx.fillRect(0, 0, outputWidth, outputHeight);

  const artX = outputWidth * 0.06;
  const artY = outputHeight * 0.04;
  const artW = outputWidth * 0.878;
  const artH = outputHeight * 0.7082;
  outputCtx.fillStyle = "#8f8f8f";
  outputCtx.fillRect(artX, artY, artW, artH);
  outputCtx.save();
  outputCtx.beginPath();
  outputCtx.rect(artX, artY, artW, artH);
  outputCtx.clip();
  drawImageCover(outputCtx, patternImage, artX, artY, artW, artH);
  outputCtx.restore();

  const motifSources = getRecipeCardMotifImages();
  const motifSize = 16 * uiScale;
  let motifX = outputWidth * 0.06;
  const motifY = outputHeight * 0.7725;
  for (const src of motifSources) {
    const image = await loadImageFromUrl(src);
    outputCtx.drawImage(image, motifX, motifY, motifSize, motifSize);
    motifX += motifSize + 9 * uiScale;
  }

  const footerX = outputWidth * 0.06;
  const footerW = outputWidth * 0.88;
  const footerBottomY = outputHeight * (1 - 0.055);
  const brandX = footerX;
  const brandBottomY = footerBottomY;
  outputCtx.fillStyle = "#000000";
  outputCtx.textBaseline = "top";
  const brandEnSize = 7 * uiScale;
  const brandEnLine = brandEnSize * 1.2;
  const brandCnSize = 11 * uiScale;
  const brandCnLine = brandCnSize * 1.08;
  const brandGap = 10 * uiScale;
  const brandHeight = brandEnLine * 2 + brandGap + brandCnLine * 2;
  let brandY = brandBottomY - brandHeight;

  outputCtx.font = `400 ${brandEnSize}px "Ogg TRIAL", "Times New Roman", serif`;
  outputCtx.fillText("BROCADE", brandX, brandY);
  outputCtx.fillText("REBORN", brandX, brandY + brandEnLine);
  brandY += brandEnLine * 2 + brandGap;

  outputCtx.font = `400 ${brandCnSize}px "TingMing", "Songti SC", "SimSun", serif`;
  outputCtx.fillText("\u9526\u5e8f", brandX, brandY);
  outputCtx.fillText("\u65b0\u751f", brandX, brandY + brandCnLine);

  const metaW = footerW * 0.776;
  const metaX = footerX + footerW - metaW;
  const gap = metaW * 0.07;
  const columnTotal = metaW - gap * 3;
  const fractions = [1.03, 0.88, 0.9, 1];
  const fractionTotal = fractions.reduce((sum, value) => sum + value, 0);
  const widths = fractions.map((value) => columnTotal * value / fractionTotal);
  const columns = [
    { title: "\u9aa8\u67b6\u7ed3\u6784", en: "STRUCTURE", body: data.layoutInfoName, lines: 2 },
    { title: "\u9aa8\u7ebf\u6837\u5f0f", en: "LINE STYLE", body: data.skeletonInfoName, lines: 2 },
    { title: "\u5730\u7eb9\u7c7b\u578b", en: "GROUND PATTERN", body: data.groundInfoName, lines: 2 },
    { title: "\u7ed3\u6784\u8bf4\u660e", en: "DESCRIPTION", body: data.description, lines: 7 },
  ];

  const titleSize = 7.5 * uiScale;
  const titleLine = titleSize * 1.35;
  const enSize = 5 * uiScale;
  const enLine = enSize * 1.2;
  const bodySize = 7.4 * uiScale;
  const bodyLine = bodySize * 1.35;
  columns.forEach((column, index) => {
    const x = metaX + widths.slice(0, index).reduce((sum, value) => sum + value, 0) + gap * index;
    const maxWidth = widths[index];
    outputCtx.font = `400 ${bodySize}px "PingFang SC", "Microsoft YaHei", sans-serif`;
    const bodyLines = getWrappedCanvasLines(outputCtx, column.body, maxWidth, column.lines);
    const blockHeight = titleLine + enLine + bodyLine * bodyLines.length + 1 * uiScale;
    const baseY = footerBottomY - blockHeight;
    outputCtx.font = `400 ${titleSize}px "PingFang SC", "Microsoft YaHei", sans-serif`;
    outputCtx.fillText(column.title, x, baseY);
    outputCtx.font = `400 ${enSize}px "Ogg TRIAL", "Times New Roman", serif`;
    outputCtx.fillText(column.en, x, baseY + titleLine);
    outputCtx.font = `400 ${bodySize}px "PingFang SC", "Microsoft YaHei", sans-serif`;
    bodyLines.forEach((lineText, lineIndex) => {
      outputCtx.fillText(lineText, x, baseY + titleLine + enLine + 1 * uiScale + lineIndex * bodyLine);
    });
  });

  return outputCanvas;
}

async function getCurrentShareBlob() {
  if (state.shareMode === "original") {
    const layers = IS_DEVELOPER_VERSION ? getExportLayerState() : null;
    return canvasToBlobAsync(makeSharePatternCanvas(layers));
  }

  const element = getSharePreviewElement();
  if (!element) return null;
  try {
    return await elementToPngBlob(element, SHARE_EXPORT_WIDTH);
  } catch (error) {
    console.warn("\u7f51\u9875 DOM \u5bfc\u51fa\u5931\u8d25\uff0c\u6539\u7528\u53ef\u89c6\u5361\u7247\u6d4b\u91cf\u5bfc\u51fa\u3002", error);
    if (state.recipeCardStyle === "figma-v2") {
      return canvasToBlobAsync(await renderVisibleFigmaV2CardCanvas(element, SHARE_EXPORT_WIDTH));
    }
    throw error;
  }
}

function getCurrentShareFileName() {
  const suffix = state.shareMode === "original" ? "full" : "card";
  return `${getPatternId()}_01_${suffix}.png`;
}

async function saveCurrentShareImage() {
  setShareDialogNotice("\u6b63\u5728\u751f\u6210\u4e0b\u8f7d\u56fe\u7247...");
  const blob = await getCurrentShareBlob();
  if (!blob) {
    setShareDialogNotice("\u4fdd\u5b58\u56fe\u7247\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\u3002");
    return;
  }
  downloadBlob(blob, getCurrentShareFileName());
  trackAnalyticsEvent("save_share_image", getPatternAnalyticsPayload({
    shareMode: state.shareMode,
    cardStyle: state.recipeCardStyle,
    cardTheme: state.recipeCardTheme,
    fileName: getCurrentShareFileName(),
  }));
  setShareDialogNotice(`\u5df2\u751f\u6210 ${SHARE_EXPORT_WIDTH}px \u5bbd\u7684\u4e0b\u8f7d\u56fe\u7247\u3002`);
}

async function shareCurrentShareImage() {
  const blob = await getCurrentShareBlob();
  if (!blob) return;
  const file = new File([blob], getCurrentShareFileName(), { type: "image/png" });

  if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
    await navigator.share({ title: "\u9526\u5e8f\u65b0\u751f", files: [file] });
    return;
  }

  await saveCurrentShareImage();
}

function downloadTextFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function renderSingleLayerCanvas(layerKey) {
  const exportCanvas = makeExportCanvas();
  renderPattern({
    targetCanvas: exportCanvas,
    transparent: layerKey !== "background",
    layers: {
      background: layerKey === "background",
      ground: layerKey === "ground",
      skeleton: layerKey === "skeleton",
      motifs: layerKey === "motifs",
    },
  });
  return exportCanvas;
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function getSvgAssetText(url, options = {}) {
  const svgText = getEmbeddedSvgText(url);
  return svgText ? recolorSvgText(svgText, options) : "";
}

function hashSvgId(value) {
  let hash = 0;
  String(value).split("").forEach((char) => {
    hash = ((hash * 31) + char.charCodeAt(0)) >>> 0;
  });
  return hash.toString(36);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function uniquifySvgIds(svgText, prefix) {
  const ids = Array.from(new Set(Array.from(svgText.matchAll(/\sid="([^"]+)"/g)).map((match) => match[1])));
  let output = svgText;

  ids.forEach((id) => {
    const nextId = `${prefix}-${id}`;
    const safeId = escapeRegExp(id);
    output = output.replace(new RegExp(`id="${safeId}"`, "g"), `id="${nextId}"`);
    output = output.replace(new RegExp(`url\\(#${safeId}\\)`, "g"), `url(#${nextId})`);
    output = output.replace(new RegExp(`href="#${safeId}"`, "g"), `href="#${nextId}"`);
    output = output.replace(new RegExp(`xlink:href="#${safeId}"`, "g"), `xlink:href="#${nextId}"`);
  });

  return output;
}

function getSvgParts(svgText) {
  if (!svgText) return null;
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.documentElement;
  if (!svg || svg.nodeName.toLowerCase() !== "svg") return null;
  let viewBox = svg.getAttribute("viewBox");
  const width = parseFloat(svg.getAttribute("width") || "100");
  const height = parseFloat(svg.getAttribute("height") || String(width || 100));
  if (!viewBox) viewBox = `0 0 ${width || 100} ${height || width || 100}`;
  return { viewBox, inner: svg.innerHTML };
}

function svgAssetElement(url, cx, cy, width, height) {
  const prefix = `asset-${hashSvgId(`${url}-${cx}-${cy}-${width}-${height}`)}`;
  const svgText = uniquifySvgIds(getSvgAssetText(url), prefix);
  const parts = getSvgParts(svgText);
  if (!parts) return "";
  const yOffset = url.includes("/main_motifs/sb2_") ? height * 0.045 : 0;
  return `<svg x="${roundSvg(cx - width / 2)}" y="${roundSvg(cy - height / 2 + yOffset)}" width="${roundSvg(width)}" height="${roundSvg(height)}" viewBox="${escapeAttr(parts.viewBox)}" overflow="visible">${parts.inner}</svg>`;
}

function roundSvg(value) {
  return Math.round(value * 1000) / 1000;
}

function svgStrokeSegments(segments, strokeStyle, lineWidth, offset = 0) {
  const lines = [];
  for (const [x1, y1, x2, y2] of segments) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    const ox = (-dy / length) * offset;
    const oy = (dx / length) * offset;
    lines.push(`<line x1="${roundSvg(x1 + ox)}" y1="${roundSvg(y1 + oy)}" x2="${roundSvg(x2 + ox)}" y2="${roundSvg(y2 + oy)}"/>`);
  }
  return `<g fill="none" stroke="${escapeAttr(strokeStyle)}" stroke-width="${roundSvg(lineWidth)}" stroke-linecap="butt" stroke-linejoin="miter">\n${lines.join("\n")}\n</g>`;
}

function svgCircleFrame(cx, cy, radius, options = {}) {
  const fill = options.fill ? `<circle cx="${roundSvg(cx)}" cy="${roundSvg(cy)}" r="${roundSvg(radius)}" fill="${escapeAttr(options.fill)}"/>` : "";
  const stroke = `<circle cx="${roundSvg(cx)}" cy="${roundSvg(cy)}" r="${roundSvg(radius)}" fill="none" stroke="${escapeAttr(options.color || targetColors[0])}" stroke-width="${roundSvg(options.width || 5)}"/>`;
  const inner = options.innerRadius ? `<circle cx="${roundSvg(cx)}" cy="${roundSvg(cy)}" r="${roundSvg(options.innerRadius)}" fill="none" stroke="${escapeAttr(options.color || targetColors[0])}" stroke-width="${roundSvg(options.innerWidth || Math.max(2, (options.width || 5) * 0.45))}"/>` : "";
  return `${fill}${stroke}${inner}`;
}

function svgSquareFrame(cx, cy, size, options = {}) {
  const x = cx - size / 2;
  const y = cy - size / 2;
  const fill = options.fill ? `<rect x="${roundSvg(x)}" y="${roundSvg(y)}" width="${roundSvg(size)}" height="${roundSvg(size)}" fill="${escapeAttr(options.fill)}"/>` : "";
  const stroke = `<rect x="${roundSvg(x)}" y="${roundSvg(y)}" width="${roundSvg(size)}" height="${roundSvg(size)}" fill="none" stroke="${escapeAttr(options.color || targetColors[3])}" stroke-width="${roundSvg(options.width || 6)}"/>`;
  return `${fill}${stroke}`;
}

function svgOctagonFrame(cx, cy, radius, options = {}) {
  const cut = options.cut || radius * 0.42;
  const points = [
    [cx - cut, cy - radius],
    [cx + cut, cy - radius],
    [cx + radius, cy - cut],
    [cx + radius, cy + cut],
    [cx + cut, cy + radius],
    [cx - cut, cy + radius],
    [cx - radius, cy + cut],
    [cx - radius, cy - cut],
  ].map(([x, y]) => `${roundSvg(x)},${roundSvg(y)}`).join(" ");
  return `<polygon points="${points}" fill="${options.fill ? escapeAttr(options.fill) : "none"}" stroke="${escapeAttr(options.color || targetColors[0])}" stroke-width="${roundSvg(options.width || 5)}" stroke-linejoin="miter"/>`;
}

function svgBandSet(segments, bands) {
  return bands.map((band) => svgStrokeSegments(segments, band.color, band.width, band.offset)).join("\n");
}

function svgDottedSegments(segments, options = {}) {
  const radius = options.radius || Math.max(2, getFrameLineUnit() * 0.18);
  const spacing = options.spacing || radius * 3.4;
  const color = escapeAttr(options.color || targetColors[0]);
  const innerColor = options.innerColor ? escapeAttr(options.innerColor) : null;
  const innerRadius = options.innerRadius || radius * 0.48;
  const dots = [];

  segments.forEach(([x1, y1, x2, y2]) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.hypot(dx, dy) || 1;
    const steps = Math.max(1, Math.round(length / spacing));

    for (let i = 0; i <= steps; i += 1) {
      const t = steps === 0 ? 0 : i / steps;
      const px = roundSvg(x1 + dx * t);
      const py = roundSvg(y1 + dy * t);
      dots.push(`<circle cx="${px}" cy="${py}" r="${roundSvg(radius)}" fill="${color}"/>`);
      if (innerColor) {
        dots.push(`<circle cx="${px}" cy="${py}" r="${roundSvg(innerRadius)}" fill="${innerColor}"/>`);
      }
    }
  });

  return dots.join("\n");
}

function svgDotContourSegments(segments) {
  const w = Math.max(6, getDiamondFillExtensionLineUnit() * 0.72);
  const dots = segments.map(([x1, y1, x2, y2]) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    return [
      `<circle cx="${roundSvg(mx)}" cy="${roundSvg(my)}" r="${roundSvg(w * 0.38)}" fill="${escapeAttr(targetColors[1])}"/>`,
      `<circle cx="${roundSvg(mx)}" cy="${roundSvg(my)}" r="${roundSvg(w * 0.26)}" fill="${escapeAttr(targetColors[0])}"/>`,
      `<circle cx="${roundSvg(mx)}" cy="${roundSvg(my)}" r="${roundSvg(w * 0.11)}" fill="${escapeAttr(targetColors[4])}"/>`,
    ].join("\n");
  }).join("\n");

  return [
    svgStrokeSegments(segments, targetColors[1], w),
    svgStrokeSegments(segments, targetColors[0], w * 0.62),
    svgStrokeSegments(segments, targetColors[2], w * 0.24),
    dots,
  ].join("\n");
}

function svgInterlockRibbonPathData(cx, cy) {
  const points = getInterlockRibbonPoints(cx, cy);
  const scallop = getInterlockRibbonMetrics().radius * 0.2;
  const commands = [];

  points.forEach(([x1, y1], index) => {
    const [x2, y2] = points[(index + 1) % points.length];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const dx = mx - cx;
    const dy = my - cy;
    const length = Math.hypot(dx, dy) || 1;
    const controlX = mx + (dx / length) * scallop;
    const controlY = my + (dy / length) * scallop;

    if (index === 0) commands.push(`M ${roundSvg(x1)} ${roundSvg(y1)}`);
    commands.push(`Q ${roundSvg(controlX)} ${roundSvg(controlY)} ${roundSvg(x2)} ${roundSvg(y2)}`);
  });

  commands.push("Z");
  return commands.join(" ");
}

function svgInterlockRibbonSkeleton() {
  const parts = [];
  const { radius } = getInterlockRibbonMetrics();
  const ribbonWidth = Math.max(8, getFrameLineUnit() * 0.95);
  const ringRadius = radius * 0.18;

  forEachInterlockRibbonCenter((cx, cy) => {
    const d = svgInterlockRibbonPathData(cx, cy);
    parts.push(`<path d="${d}" fill="none" stroke="${escapeAttr(targetColors[1])}" stroke-width="${roundSvg(ribbonWidth)}" stroke-linecap="round" stroke-linejoin="round"/>`);
    parts.push(`<path d="${d}" fill="none" stroke="${escapeAttr(targetColors[0])}" stroke-width="${roundSvg(ribbonWidth * 0.52)}" stroke-linecap="round" stroke-linejoin="round"/>`);
    parts.push(`<path d="${d}" fill="none" stroke="${escapeAttr(targetColors[2])}" stroke-width="${roundSvg(ribbonWidth * 0.18)}" stroke-linecap="round" stroke-linejoin="round"/>`);
    getInterlockRibbonPoints(cx, cy).forEach(([px, py], index) => {
      const motifColor = index % 2 === 0 ? targetColors[3] : targetColors[4];
      parts.push(`<circle cx="${roundSvg(px)}" cy="${roundSvg(py)}" r="${roundSvg(ringRadius)}" fill="${escapeAttr(targetColors[2])}" stroke="${escapeAttr(targetColors[0])}" stroke-width="${roundSvg(Math.max(2, ribbonWidth * 0.16))}"/>`);
      parts.push(`<circle cx="${roundSvg(px)}" cy="${roundSvg(py)}" r="${roundSvg(ringRadius * 0.42)}" fill="${escapeAttr(motifColor)}"/>`);
    });
  });

  return parts.join("\n");
}

function svgRingDot(x, y, rings) {
  return rings.map((ring) => `<circle cx="${roundSvg(x)}" cy="${roundSvg(y)}" r="${roundSvg(ring.radius)}" fill="${escapeAttr(ring.color)}"/>`).join("");
}

function svgSkeletonDots(mode) {
  const w = getSkeletonLineWidth();
  return getSkeletonDotPoints().map(([x, y]) => {
    if (mode === "halo") {
      return svgRingDot(x, y, [
        { radius: w * 0.45, color: targetColors[0] },
        { radius: w * 0.34, color: targetColors[3] },
        { radius: w * 0.22, color: targetColors[2] },
        { radius: w * 0.14, color: targetColors[4] },
      ]);
    }
    return svgRingDot(x, y, [
      { radius: w * 0.27, color: targetColors[2] },
      { radius: w * 0.18, color: targetColors[4] },
    ]);
  }).join("\n");
}

function svgContourSkeleton(segments, points = getSkeletonDotPoints()) {
  const w = getSkeletonLineWidth();
  const outerWidth = w;
  const greenWidth = w * 0.74;
  const gapWidth = w * 0.35;
  const circles = (radius, color) => points.map(([x, y]) => `<circle cx="${roundSvg(x)}" cy="${roundSvg(y)}" r="${roundSvg(radius)}" fill="${escapeAttr(color)}"/>`).join("\n");
  return [
    svgStrokeSegments(segments, targetColors[1], outerWidth),
    circles(outerWidth / 2, targetColors[1]),
    svgStrokeSegments(segments, targetColors[0], greenWidth),
    circles(greenWidth / 2, targetColors[0]),
    svgStrokeSegments(segments, targetColors[2], gapWidth),
    circles(gapWidth * 0.9, targetColors[2]),
    circles(w * 0.11, targetColors[4]),
  ].join("\n");
}

function svgSkeletonLayer() {
  if (state.currentSkeletonLayout === 8) {
    return svgInterlockRibbonSkeleton();
  }

  const parts = [];
  const segments = createSkeletonSegments();
  const total = getSkeletonLineWidth();
  const threeGap = total * 0.11;
  const threeThin = total * 0.12;
  const threeCenter = total - 2 * (threeGap + threeThin);

  if (state.currentSkeletonLayout === 4) {
    const frameWidth = Math.max(3, getFrameLineUnit() * 0.5);
    const squareSize = TILE_SIZE * 0.28;
    const lineGap = Math.max(2, frameWidth * 0.75);
    const axisRadius = TILE_SIZE / 2 - squareSize / 2 - lineGap;
    const cut = squareSize / 2;
    const fillColor = "rgba(253, 247, 242, 0.28)";

    for (let x = 0; x < CANVAS_SIZE; x += TILE_SIZE) {
      for (let y = 0; y < CANVAS_SIZE; y += TILE_SIZE) {
        const cx = x + TILE_SIZE / 2;
        const cy = y + TILE_SIZE / 2;
        parts.push(svgOctagonFrame(cx, cy, axisRadius, { color: targetColors[3], width: frameWidth, cut, fill: fillColor }));
        parts.push(svgOctagonFrame(x, y, axisRadius, { color: targetColors[0], width: frameWidth, cut }));
        parts.push(svgOctagonFrame(x + TILE_SIZE, y, axisRadius, { color: targetColors[0], width: frameWidth, cut }));
        parts.push(svgOctagonFrame(x, y + TILE_SIZE, axisRadius, { color: targetColors[0], width: frameWidth, cut }));
        parts.push(svgOctagonFrame(x + TILE_SIZE, y + TILE_SIZE, axisRadius, { color: targetColors[0], width: frameWidth, cut }));
      }
    }
  }

  if (state.currentSkeletonStyle === 0) parts.push(svgStrokeSegments(segments, targetColors[0], total));
  else if (state.currentSkeletonStyle === 1) {
    const strokeWidth = Math.max(2, total * 0.28);
    const offset = (total - strokeWidth) / 2;
    parts.push(svgStrokeSegments(segments, targetColors[0], strokeWidth, offset));
    parts.push(svgStrokeSegments(segments, targetColors[0], strokeWidth, -offset));
  } else if (state.currentSkeletonStyle === 2) {
    parts.push(svgBandSet(segments, [
      { color: targetColors[3], width: threeCenter, offset: 0 },
      { color: targetColors[0], width: threeThin, offset: threeCenter / 2 + threeGap },
      { color: targetColors[0], width: threeThin, offset: -threeCenter / 2 - threeGap },
    ]));
  } else if (state.currentSkeletonStyle === 3) {
    parts.push(svgBandSet(segments, [
      { color: targetColors[3], width: threeCenter, offset: 0 },
      { color: targetColors[0], width: threeThin, offset: threeCenter / 2 + threeGap },
      { color: targetColors[0], width: threeThin, offset: -threeCenter / 2 - threeGap },
    ]));
    parts.push(svgSkeletonDots("simple"));
  } else if (state.currentSkeletonStyle === 4) {
    const centerWide = total * 0.42;
    const mid = total * 0.13;
    const gap = total * 0.0475;
    const greenOffset = centerWide / 2 + gap;
    const orangeOffset = greenOffset + mid + gap;
    parts.push(svgBandSet(segments, [
      { color: targetColors[3], width: centerWide, offset: 0 },
      { color: targetColors[0], width: mid, offset: greenOffset },
      { color: targetColors[0], width: mid, offset: -greenOffset },
      { color: targetColors[4], width: mid, offset: orangeOffset },
      { color: targetColors[4], width: mid, offset: -orangeOffset },
    ]));
    parts.push(svgSkeletonDots("halo"));
  } else if (state.currentSkeletonStyle === 5) {
    const centerWide = total * 0.32;
    const mid = total * 0.115;
    const thin = total * 0.06;
    const gap = (total - centerWide - mid * 4 - thin * 2) / 6;
    const centerOffset = centerWide / 2 + gap + mid / 2;
    const orangeOffset = centerWide / 2 + gap + mid + gap + thin / 2;
    const paleOffset = centerWide / 2 + gap + mid + gap + thin + gap + mid / 2;
    parts.push(svgBandSet(segments, [
      { color: targetColors[3], width: centerWide, offset: 0 },
      { color: targetColors[4], width: mid, offset: centerOffset },
      { color: targetColors[4], width: mid, offset: -centerOffset },
      { color: targetColors[0], width: thin, offset: orangeOffset },
      { color: targetColors[0], width: thin, offset: -orangeOffset },
      { color: targetColors[1], width: mid, offset: paleOffset },
      { color: targetColors[1], width: mid, offset: -paleOffset },
    ]));
    parts.push(svgSkeletonDots("simple"));
  } else {
    parts.push(svgContourSkeleton(segments));
  }

  return parts.join("\n");
}

function svgMotifsAtCell(x, y, urls) {
  const parts = [];
  const quarter = TILE_SIZE / 4;
  const mainSize = TILE_SIZE * 0.45;
  const subSize = TILE_SIZE * 0.25;
  const { mainA, mainB, subA, subB } = urls;
  const addAsset = (url, cx, cy, width, height) => parts.push(svgAssetElement(url, cx, cy, width, height));

  if (state.currentSkeletonLayout === 0) {
    addAsset(subA, x + quarter, y + quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    addAsset(subA, x + TILE_SIZE - quarter, y + TILE_SIZE - quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    addAsset(subB, x + TILE_SIZE - quarter, y + quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    addAsset(subB, x + quarter, y + TILE_SIZE - quarter, TILE_SIZE * 0.3, TILE_SIZE * 0.3);
    addAsset(mainA, x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE * 0.6, TILE_SIZE * 0.6);
    addAsset(mainB, x, y, TILE_SIZE * 0.4, TILE_SIZE * 0.4);
    return parts.join("\n");
  }

  if (state.currentSkeletonLayout === 1) {
    addAsset(mainB, x, y, mainSize, mainSize);
    addAsset(mainA, x + TILE_SIZE / 2, y + TILE_SIZE / 2, mainSize, mainSize);
    addAsset(subA, x + TILE_SIZE / 2, y, subSize, subSize);
    addAsset(subB, x, y + TILE_SIZE / 2, subSize, subSize);
    return parts.join("\n");
  }

  if (state.currentSkeletonLayout === 2) {
    addAsset(mainA, x + TILE_SIZE / 2, y + TILE_SIZE / 2, TILE_SIZE * 0.58, TILE_SIZE * 0.58);
    addAsset(mainB, x, y, TILE_SIZE * 0.42, TILE_SIZE * 0.42);
    addAsset(subA, x + TILE_SIZE / 2, y + TILE_SIZE, subSize, subSize);
    addAsset(subB, x, y + TILE_SIZE / 2, subSize, subSize);
    return parts.join("\n");
  }

  if (state.currentSkeletonLayout === 3) {
    const cx = x + TILE_SIZE / 2;
    const cy = y + TILE_SIZE / 2;
    const ringWidth = Math.max(5, getFrameLineUnit() * 0.82);
    const bRingWidth = Math.max(3, ringWidth * 0.52);
    const cRingWidth = Math.max(3, ringWidth * 0.48);
    const bigRadius = TILE_SIZE * 0.4;
    const smallRadius = TILE_SIZE * 0.2;
    const squareSize = TILE_SIZE * 0.285;
    const fillColor = targetColors[2];
    const bIntrusion = Math.max(0, smallRadius - TILE_SIZE / 2 + bigRadius);
    const mainMotifSize = Math.max(10, (bigRadius - bIntrusion - ringWidth * 0.92) * 2);
    const smallMotifSize = Math.max(8, (smallRadius - bRingWidth * 1.25) * 2);
    const squareMotifSize = Math.max(8, squareSize - cRingWidth * 1.9);
    parts.push(svgCircleFrame(cx, cy, bigRadius, { color: targetColors[1], width: ringWidth, fill: fillColor }));
    addAsset(mainA, cx, cy, mainMotifSize, mainMotifSize);
    [[cx, y], [x + TILE_SIZE, cy], [cx, y + TILE_SIZE], [x, cy]].forEach(([px, py]) => {
      parts.push(svgCircleFrame(px, py, smallRadius, { color: targetColors[0], width: bRingWidth, fill: fillColor }));
      addAsset(subA, px, py, smallMotifSize, smallMotifSize);
    });
    [[x, y], [x + TILE_SIZE, y], [x, y + TILE_SIZE], [x + TILE_SIZE, y + TILE_SIZE]].forEach(([px, py]) => {
      parts.push(svgSquareFrame(px, py, squareSize, { color: targetColors[3], width: cRingWidth, fill: fillColor }));
      addAsset(subB, px, py, squareMotifSize, squareMotifSize);
    });
    return parts.join("\n");
  }

  if (state.currentSkeletonLayout === 4) {
    const cx = x + TILE_SIZE / 2;
    const cy = y + TILE_SIZE / 2;
    const col = Math.round(x / TILE_SIZE);
    const row = Math.round(y / TILE_SIZE);
    const cIndex = (state.idxSub + 3) % SUB_MOTIF_NUM;
    const cMotifUpper = `${assetBase}/sub_motifs/sc${cIndex + 1}_A.svg`;
    const cMotifLower = `${assetBase}/sub_motifs/sc${cIndex + 1}_B.svg`;
    const aMotif = row % 2 === 0 ? mainA : mainB;
    const frameWidth = Math.max(4, getFrameLineUnit() * 0.58);
    const squareSize = TILE_SIZE * 0.28;
    const bigRadius = squareSize * 0.875;
    const cRadius = squareSize * 0.75;
    const mainMotifSize = Math.max(10, (bigRadius - frameWidth * 1.15) * 2);
    const cMotifSize = Math.max(8, (cRadius - frameWidth * 1.1) * 2);
    const bMotifSize = Math.max(8, squareSize - frameWidth * 2.1);
    parts.push(svgCircleFrame(cx, cy, bigRadius, { color: targetColors[0], width: frameWidth, fill: targetColors[3] }));
    addAsset(aMotif, cx, cy, mainMotifSize, mainMotifSize);
    [[cx, y, subB], [x + TILE_SIZE, cy, subA], [cx, y + TILE_SIZE, subB], [x, cy, subA]].forEach(([px, py, motif]) => {
      parts.push(svgSquareFrame(px, py, squareSize, { color: targetColors[1], width: frameWidth, fill: targetColors[2] }));
      addAsset(motif, px, py, bMotifSize, bMotifSize);
    });
    [[x, y, (row + col) % 2 === 0 ? cMotifUpper : cMotifLower], [x + TILE_SIZE, y, (row + col + 1) % 2 === 0 ? cMotifUpper : cMotifLower], [x, y + TILE_SIZE, (row + col + 1) % 2 === 0 ? cMotifUpper : cMotifLower], [x + TILE_SIZE, y + TILE_SIZE, (row + col) % 2 === 0 ? cMotifUpper : cMotifLower]].forEach(([px, py, motif]) => {
      parts.push(svgCircleFrame(px, py, cRadius, { color: targetColors[0], width: frameWidth, fill: targetColors[2] }));
      addAsset(motif, px, py, cMotifSize, cMotifSize);
    });
    return parts.join("\n");
  }

  const cx = x + TILE_SIZE / 2;
  const cy = y + TILE_SIZE / 2;
  const ringWidth = Math.max(4, getFrameLineUnit() * 0.6);
  const bigRadius = TILE_SIZE * 0.35;
  const smallRadius = TILE_SIZE * 0.13;
  const squareSize = TILE_SIZE * 0.34;
  const fillColor = targetColors[2];
  const dMotif = `${assetBase}/sub_motifs/sc${((state.idxSub + 3) % SUB_MOTIF_NUM) + 1}_A.svg`;
  const mainMotifSize = Math.max(10, (bigRadius - ringWidth * 2.2) * 2);
  const smallMotifSize = Math.max(8, (smallRadius - ringWidth * 0.85) * 2);
  const squareMotifSize = Math.max(8, squareSize - ringWidth * 2.2);
  parts.push(svgCircleFrame(cx, cy, bigRadius, { color: targetColors[0], width: ringWidth, fill: fillColor, innerRadius: bigRadius - ringWidth * 1.8, innerWidth: Math.max(2.5, ringWidth * 0.55) }));
  addAsset(mainA, cx, cy, mainMotifSize, mainMotifSize);
  [[x, cy, subA, targetColors[0]], [x + TILE_SIZE, cy, subA, targetColors[0]], [cx, y, subB, targetColors[1]], [cx, y + TILE_SIZE, subB, targetColors[1]]].forEach(([px, py, motif, color]) => {
    parts.push(svgCircleFrame(px, py, smallRadius, { color, width: Math.max(3, ringWidth * 0.75), fill: fillColor }));
    addAsset(motif, px, py, smallMotifSize, smallMotifSize);
  });
  [[x, y], [x + TILE_SIZE, y], [x, y + TILE_SIZE], [x + TILE_SIZE, y + TILE_SIZE]].forEach(([px, py]) => {
    parts.push(svgSquareFrame(px, py, squareSize, { color: targetColors[3], width: ringWidth, fill: fillColor }));
    addAsset(dMotif, px, py, squareMotifSize, squareMotifSize);
  });
  return parts.join("\n");
}

function svgTurtlebackMotifs(urls) {
  const parts = [];
  const { radius } = getTurtlebackMetrics();
  const mainMotifsA = [0, 1, 2, 3].map((offset) => `${assetBase}/main_motifs/sb${getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM) + 1}_A.svg`);
  const mainMotifsB = [0, 1, 2, 3].map((offset) => `${assetBase}/main_motifs/sb${getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM) + 1}_B.svg`);
  const subMotifsA = [0, 1].map((offset) => `${assetBase}/sub_motifs/sc${getWrappedIndex(state.idxSub, offset, SUB_MOTIF_NUM) + 1}_A.svg`);
  const subMotifsB = [0, 1].map((offset) => `${assetBase}/sub_motifs/sc${getWrappedIndex(state.idxSub, offset, SUB_MOTIF_NUM) + 1}_B.svg`);
  const mainSize = radius * 1.38;
  const vertexSize = Math.max(18, radius * 0.42);
  const vertexSeen = new Set();
  const addAsset = (url, cx, cy, assetWidth, assetHeight) => parts.push(svgAssetElement(url, cx, cy, assetWidth, assetHeight));

  function addPoint(seen, x, y, draw) {
    if (x < -radius || y < -radius || x > CANVAS_SIZE + radius || y > CANVAS_SIZE + radius) return;
    const qx = Math.round(x * 10) / 10;
    const qy = Math.round(y * 10) / 10;
    const key = `${qx},${qy}`;
    if (seen.has(key)) return;
    seen.add(key);
    draw(qx, qy);
  }

  forEachTurtlebackCenter((cx, cy, row, col) => {
    if (cx >= -radius && cy >= -radius && cx <= CANVAS_SIZE + radius && cy <= CANVAS_SIZE + radius) {
      const rowCycle = ((row % 4) + 4) % 4;
      const columnPhase = ((col % 2) + 2) % 2;
      const motifOffset = (rowCycle % 2) * 2 + columnPhase;
      const motifSet = rowCycle >= 2 ? mainMotifsB : mainMotifsA;
      const motif = motifSet[motifOffset];
      addAsset(motif, cx, cy, mainSize, mainSize);
    }

    getTurtlebackHexPoints(cx, cy).forEach(([px, py]) => {
      addPoint(vertexSeen, px, py, (qx, qy) => {
        const motif = getTurtlebackAuxMotif(getTurtlebackAuxRow(qy), subMotifsA, subMotifsB);
        addAsset(motif, qx, qy, vertexSize, vertexSize);
      });
    });
  });

  return parts.join("\n");
}

function svgDiamondFillMotifs() {
  const parts = [];
  const { halfWidth, halfHeight } = getDiamondFillMetrics();
  const nextMainIndex = getWrappedIndex(state.idxMain, 1, MAIN_MOTIF_NUM);
  const mainMotifs = {
    aUpper: `${assetBase}/main_motifs/sb${state.idxMain + 1}_A.svg`,
    bUpper: `${assetBase}/main_motifs/sb${nextMainIndex + 1}_A.svg`,
    aLower: `${assetBase}/main_motifs/sb${state.idxMain + 1}_B.svg`,
    bLower: `${assetBase}/main_motifs/sb${nextMainIndex + 1}_B.svg`,
  };
  const subUpper = `${assetBase}/sub_motifs/sc${state.idxSub + 1}_A.svg`;
  const subLower = `${assetBase}/sub_motifs/sc${state.idxSub + 1}_B.svg`;
  const circleRadius = Math.min(halfWidth, halfHeight) * 0.44;
  const innerRadius = circleRadius - Math.max(2, getFrameLineUnit() * 0.34);
  const circleMotifSize = Math.max(10, innerRadius * 2);
  const diamondMotifSize = Math.min(halfWidth, halfHeight) * 0.96;
  const subSize = Math.max(18, Math.min(halfWidth, halfHeight) * 0.46);
  const pointRadius = subSize * 0.5;
  const circleOuterWidth = Math.max(3, getFrameLineUnit() * 0.5);
  const circleInnerWidth = Math.max(2, getFrameLineUnit() * 0.34);
  const seenPoints = new Set();
  const addAsset = (url, cx, cy, assetWidth, assetHeight) => parts.push(svgAssetElement(url, cx, cy, assetWidth, assetHeight));

  parts.push(svgDotContourSegments(createDiamondFillCircleExtensionSegments()));

  function addIntersection(x, y, motif) {
    if (x < -pointRadius || y < -pointRadius || x > CANVAS_SIZE + pointRadius || y > CANVAS_SIZE + pointRadius) return;
    const qx = Math.round(x * 10) / 10;
    const qy = Math.round(y * 10) / 10;
    const key = `${qx},${qy}`;
    if (seenPoints.has(key)) return;
    seenPoints.add(key);
    addAsset(motif, qx, qy, subSize, subSize);
  }

  forEachDiamondFillCenter((cx, cy, row, col) => {
    const isCircleCell = isDiamondFillCircleRow(row);
    const motif = getDiamondFillMainMotif(row, mainMotifs);

    if (cx >= -halfWidth && cy >= -halfHeight && cx <= CANVAS_SIZE + halfWidth && cy <= CANVAS_SIZE + halfHeight) {
      if (isCircleCell) {
        parts.push(svgCircleFrame(cx, cy, circleRadius, { color: targetColors[3], width: circleOuterWidth, fill: targetColors[2] }));
        parts.push(svgCircleFrame(cx, cy, innerRadius, { color: targetColors[0], width: circleInnerWidth }));
        addAsset(motif, cx, cy, circleMotifSize, circleMotifSize);
      } else {
        addAsset(motif, cx, cy, diamondMotifSize, diamondMotifSize);
      }
    }

    getDiamondFillPoints(cx, cy).forEach(([px, py]) => {
      addIntersection(px, py, getDiamondFillAuxMotif(py, subUpper, subLower));
    });
  });

  return parts.join("\n");
}

function svgInterlockRibbonMotifs() {
  const parts = [];
  const { radius } = getInterlockRibbonMetrics();
  const motifIndices = [0, 1, 2, 3].map((offset) => getWrappedIndex(state.idxMain, offset, MAIN_MOTIF_NUM));
  const motifs = {
    aUpper: `${assetBase}/main_motifs/sb${motifIndices[0] + 1}_A.svg`,
    bUpper: `${assetBase}/main_motifs/sb${motifIndices[1] + 1}_A.svg`,
    cUpper: `${assetBase}/main_motifs/sb${motifIndices[2] + 1}_A.svg`,
    dUpper: `${assetBase}/main_motifs/sb${motifIndices[3] + 1}_A.svg`,
    aLower: `${assetBase}/main_motifs/sb${motifIndices[0] + 1}_B.svg`,
    bLower: `${assetBase}/main_motifs/sb${motifIndices[1] + 1}_B.svg`,
    cLower: `${assetBase}/main_motifs/sb${motifIndices[2] + 1}_B.svg`,
    dLower: `${assetBase}/main_motifs/sb${motifIndices[3] + 1}_B.svg`,
  };
  const motifSize = radius * 0.96;

  forEachInterlockRibbonCenter((cx, cy, row, col) => {
    if (cx < -radius || cy < -radius || cx > CANVAS_SIZE + radius || cy > CANVAS_SIZE + radius) return;
    parts.push(svgAssetElement(getInterlockRibbonMotif(row, col, motifs), cx, cy, motifSize, motifSize));
  });

  return parts.join("\n");
}

function svgMotifLayer() {
  const urls = {
    mainA: `${assetBase}/main_motifs/sb${state.idxMain + 1}_A.svg`,
    mainB: `${assetBase}/main_motifs/sb${state.idxMain + 1}_B.svg`,
    subA: `${assetBase}/sub_motifs/sc${state.idxSub + 1}_A.svg`,
    subB: `${assetBase}/sub_motifs/sc${state.idxSub + 1}_B.svg`,
  };
  const parts = [];
  if (state.currentSkeletonLayout === 6) {
    return svgTurtlebackMotifs(urls);
  }
  if (state.currentSkeletonLayout === 7) {
    return svgDiamondFillMotifs();
  }
  if (state.currentSkeletonLayout === 8) {
    return svgInterlockRibbonMotifs();
  }
  for (let x = 0; x <= CANVAS_SIZE; x += TILE_SIZE) {
    for (let y = 0; y <= CANVAS_SIZE; y += TILE_SIZE) {
      parts.push(svgMotifsAtCell(x, y, urls));
    }
  }
  return parts.join("\n");
}

function svgGroundLayer() {
  if (!state.drawGround) return "";
  const layerCanvas = renderSingleLayerCanvas("ground");
  const href = layerCanvas.toDataURL("image/png");
  return `<image href="${href}" x="0" y="0" width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" preserveAspectRatio="none"/>`;
}

function svgLayerContent(layerKey) {
  if (layerKey === "background") return `<rect width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" fill="${escapeAttr(state.backgroundColor)}"/>`;
  if (layerKey === "ground") return svgGroundLayer();
  if (layerKey === "skeleton") return svgSkeletonLayer();
  if (layerKey === "motifs") return svgMotifLayer();
  return "";
}

function updateExportPreview() {
  if (!exportPreviewCanvas || !state.assets) return;
  const layers = getExportLayerState();
  renderPattern({
    targetCanvas: exportPreviewCanvas,
    transparent: !layers.background,
    layers,
  });
}

function updateShareOriginalPreview() {
  const shareCanvas = recipeCardPreview && recipeCardPreview.querySelector("#shareOriginalPreviewCanvas");
  if (!shareCanvas || !state.assets) return;
  const layers = getExportLayerState();
  renderPattern({
    targetCanvas: shareCanvas,
    transparent: !layers.background,
    layers,
  });
}

function openExportImageDialog() {
  if (!exportImageDialog) return;
  closeRecipeCard();
  exportImageDialog.hidden = false;
  updateExportPreview();
}

function closeExportImageDialog() {
  if (!exportImageDialog) return;
  exportImageDialog.hidden = true;
}

async function exportLayeredPngs() {
  if (!state.assets) return;
  const selectedLayers = getExportLayerState();
  const patternId = getPatternId();
  let count = 0;

  for (const [key, name] of exportLayerOrder) {
    if (!selectedLayers[key]) continue;
    const exportCanvas = renderSingleLayerCanvas(key);
    await downloadCanvas(exportCanvas, `${patternId}_${String(count + 1).padStart(2, "0")}_${name}.png`);
    count += 1;
  }

  setStatus(count ? `\u5df2\u89e6\u53d1 ${count} \u4e2a\u5206\u5c42 PNG \u5bfc\u51fa\u3002` : "\u8bf7\u5148\u52fe\u9009\u8981\u5bfc\u51fa\u7684\u56fe\u5c42\u3002");
  window.setTimeout(() => setStatus(""), 2600);
}

async function exportCompositePng() {
  if (!state.assets) return;
  const exportCanvas = makeExportCanvas();
  renderPattern({
    targetCanvas: exportCanvas,
    transparent: false,
    layers: {
      background: true,
      ground: true,
      skeleton: true,
      motifs: true,
    },
  });
  await downloadCanvas(exportCanvas, `${getPatternId()}_01_full.png`);
  setStatus("\u5df2\u89e6\u53d1\u5b8c\u6574 PNG \u5bfc\u51fa\u3002");
  window.setTimeout(() => setStatus(""), 2600);
}

function exportLayeredSvg() {
  if (!state.assets) return;
  const selectedLayers = getExportLayerState();
  const selectedPaintLayers = svgPaintOrder.filter(([key]) => selectedLayers[key]);

  if (!selectedPaintLayers.length) {
    setStatus("\u8bf7\u5148\u52fe\u9009\u8981\u5bfc\u51fa\u7684\u56fe\u5c42\u3002");
    window.setTimeout(() => setStatus(""), 2600);
    return;
  }

  const groups = selectedPaintLayers.map(([key, name]) => {
    const content = svgLayerContent(key);
    return `    <g id="layer-${name}" data-layer="${name}">\n${content}\n    </g>`;
  }).join("\n");
  const svg = `<svg width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" viewBox="0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}" xmlns="http://www.w3.org/2000/svg">\n  <g id="export-layers" data-pattern-id="${getPatternId()}">\n${groups}\n  </g>\n</svg>\n`;

  downloadTextFile(svg, `${getPatternId()}_01_layers.svg`, "image/svg+xml;charset=utf-8");
  setStatus("\u5df2\u89e6\u53d1 SVG \u5bfc\u51fa\u3002");
  window.setTimeout(() => setStatus(""), 2600);
}

async function boot() {
  try {
    setBusy(true);
    setStatus("\u6b63\u5728\u8f7d\u5165\u7d20\u6750...");
    state.assets = await loadAssets();
    generatePattern();
    if (!visitTracked) {
      visitTracked = true;
      trackAnalyticsEvent("visit", {
        appMode: APP_MODE,
        initialPattern: getPatternAnalyticsPayload(),
      });
    }
  } catch (error) {
    console.error(error);
    setStatus(`${error.message}\u3002\u5982\u679c\u5728 iPad \u4e0a\u4f7f\u7528\uff0c\u8bf7\u6253\u5f00\u65b0\u7248\u79bb\u7ebf\u5305\u91cc\u7684 index.html\u3002`);
  } finally {
    setBusy(false);
  }
}

generateBtn.addEventListener("click", generatePattern);
if (exportBtn) {
  exportBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (IS_DEVELOPER_VERSION) {
      openExportImageDialog();
      return;
    }
    closeRecipeCard();
    exportCompositePng();
  });
}
if (exportFullBtn) {
  exportFullBtn.addEventListener("click", exportCompositePng);
}
if (cardShareBtn) {
  cardShareBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    closeExportImageDialog();
    generateRecipeCard();
  });
}
if (recipeCardPreview) {
  recipeCardPreview.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target === recipeCardPreview) {
      closeRecipeCard();
      return;
    }

    const modeButton = event.target.closest("[data-share-mode]");
    if (modeButton) {
      state.shareMode = modeButton.dataset.shareMode === "original" ? "original" : "card";
      recipeCardPreview.innerHTML = getShareDialogHtml();
      updateShareOriginalPreview();
      return;
    }

    if (event.target.closest("input[name='shareExportLayer']")) {
      updateShareOriginalPreview();
      return;
    }

    if (event.target.closest("[data-share-layered-export]")) {
      if (IS_DEVELOPER_VERSION) exportLayeredPngs();
      return;
    }

    if (event.target.closest("[data-share-svg-export]")) {
      if (IS_DEVELOPER_VERSION) exportLayeredSvg();
      return;
    }

    if (event.target.closest("[data-share-cancel]")) {
      closeRecipeCard();
      return;
    }

    if (event.target.closest("[data-share-save]")) {
      saveCurrentShareImage().catch((error) => {
        console.error(error);
        setStatus("\u4fdd\u5b58\u56fe\u7247\u5931\u8d25\u3002");
      });
      return;
    }

    if (event.target.closest("[data-share-send]")) {
      shareCurrentShareImage().catch((error) => {
        console.error(error);
        setStatus("\u5206\u4eab\u5931\u8d25\uff0c\u5df2\u5c1d\u8bd5\u4fdd\u5b58\u56fe\u7247\u3002");
      });
      return;
    }

    const styleButton = event.target.closest("[data-card-style]");
    if (styleButton) {
      state.recipeCardStyle = styleButton.dataset.cardStyle;
      recipeCardPreview.innerHTML = getShareDialogHtml();
      updateShareOriginalPreview();
      return;
    }

    const themeButton = event.target.closest("[data-card-theme]");
    if (themeButton) {
      state.recipeCardTheme = Number(themeButton.dataset.cardTheme) || 0;
      recipeCardPreview.innerHTML = getShareDialogHtml();
      updateShareOriginalPreview();
    }
  });
}
if (exportImageDialog) {
  exportImageDialog.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}
exportLayerInputs.forEach((input) => {
  input.addEventListener("change", updateExportPreview);
});
if (exportLayeredBtn) {
  exportLayeredBtn.addEventListener("click", () => {
    if (IS_DEVELOPER_VERSION) exportLayeredPngs();
  });
}
if (exportCompositeBtn) {
  exportCompositeBtn.addEventListener("click", exportCompositePng);
}
if (exportSvgBtn) {
  exportSvgBtn.addEventListener("click", () => {
    if (IS_DEVELOPER_VERSION) exportLayeredSvg();
  });
}
document.addEventListener("click", (event) => {
  if (recipeCardPreview && !recipeCardPreview.hidden && event.target !== cardShareBtn && !recipeCardPreview.contains(event.target)) {
    closeRecipeCard();
  }
  if (exportImageDialog && !exportImageDialog.hidden && event.target !== exportBtn && !exportImageDialog.contains(event.target)) {
    closeExportImageDialog();
  }
});
resetBtn.addEventListener("click", () => {
  resetFilters();
  generatePattern();
});
if (tracebackBtn && IS_DEVELOPER_VERSION) {
  tracebackBtn.addEventListener("click", openPatternTracebackPrompt);
}
if (infoBtn) {
  infoBtn.addEventListener("click", () => {
    showPage("info");
  });
}
if (aboutBtn) {
  aboutBtn.addEventListener("click", () => {
    showPage("about");
  });
}
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme === "light" ? "light" : "dark";
    applyTheme(currentTheme === "light" ? "dark" : "light");
  });
}
document.querySelectorAll("[data-back-home]").forEach((button) => {
  button.addEventListener("click", () => {
    showPage("home");
  });
});
canvas.addEventListener("click", generatePattern);
groundSizeInput.addEventListener("input", () => {
  applyGroundSizeControl();
});
groundOpacityInput.addEventListener("input", () => {
  applyGroundOpacityControl();
});
groundStrokeInput.addEventListener("input", () => {
  applyGroundStrokeControl();
});
groundColorSelect.addEventListener("change", () => {
  runWithoutJump(() => {
    syncOptionStrips();
    return applyGroundColorControl();
  });
});
backgroundColorSelect.addEventListener("change", () => {
  runWithoutJump(() => {
    syncOptionStrips();
    applyBackgroundColorControl();
  });
});
paletteColorInputs.forEach((input) => {
  input.addEventListener("input", applyPaletteChange);
});
if (palettePresetSelect) {
  palettePresetSelect.addEventListener("change", () => {
    if (palettePresetSelect.value.startsWith("built-in-")) {
      const palette = builtInPalettes[Number(palettePresetSelect.value.replace("built-in-", ""))] || builtInPalettes[0];
      applyPalette(palette.colors, palette.name);
      return;
    }
    if (IS_DEVELOPER_VERSION && palettePresetSelect.value.startsWith("saved-")) {
      const palette = getSavedPalettes()[Number(palettePresetSelect.value.replace("saved-", ""))];
      if (!palette) return;
      applyPalette(palette.colors, palette.name);
    }
  });
}
if (savePaletteBtn) {
  savePaletteBtn.addEventListener("click", saveCurrentPalette);
}
if (renamePaletteBtn) {
  renamePaletteBtn.addEventListener("click", renameCurrentPalette);
}
if (deletePaletteBtn) {
  deletePaletteBtn.addEventListener("click", deleteCurrentPalette);
}
lineWidthInput.addEventListener("input", () => {
  applyLineWidthControl();
});
groundModeInputs.forEach((input) => {
  input.addEventListener("click", () => {
    runWithoutJump(() => {
      document.body.dataset.page = "home";
      applyGroundModeControl();
    });
  });
});
layoutSelect.addEventListener("change", () => {
  syncOptionStrips();
  generatePattern();
});
skeletonStyleSelect.addEventListener("change", () => {
  syncOptionStrips();
  applySkeletonStyleControls();
});

installKioskTouchGuards();
initTheme();
renderPalettePresetOptions();
  syncPaletteInputs();
  updateColorOptionValues();
  applyRandomChipGradient();
  configurePublicLayoutOptions();
  initOptionStrips();
  preventPreviewLabelJump(groundColorPreview);
  preventPreviewLabelJump(backgroundColorPreview);
  installStandbyScreensaver();

boot();
