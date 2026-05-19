const CANVAS_SIZE = 800;
const TILE_SIZE = 200;
const APP_MODE = window.SONG_BROCADE_APP_MODE === "developer" ? "developer" : "public";
const IS_DEVELOPER_VERSION = APP_MODE === "developer";
const MAIN_MOTIF_NUM = 9;
const SUB_MOTIF_NUM = 10;
const DEFAULT_SKELETON_TOTAL_WIDTH = 18;
const DIAMOND_FILL_DEFAULT_SKELETON_WIDTH = 8;
const DIAMOND_FILL_EXTENSION_WIDTH = 54;

const defaultPalette = ["#89B29C", "#D2E3E2", "#FDF7F2", "#C7CB45", "#F98B3F"];
const defaultPaletteLabels = ["\u9752\u7eff", "\u6d45\u9752", "\u7c73\u767d", "\u9ec4\u7eff", "\u6a59\u8272"];
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
  "\u4ee5\u4e2d\u5fc3\u4e3a\u6838\u5fc3\uff0c\u5411\u516b\u4e2a\u65b9\u5411\u653e\u5c04\u5c55\u5f00\uff0c\u5f3a\u8c03\u901a\u8fbe\u4e0e\u5747\u8861\u3002",
  "\u4ee5\u6a2a\u7eb5\u5341\u5b57\u65b9\u5411\u5c55\u5f00\uff0c\u5f62\u6210\u7a33\u5b9a\u3001\u7aef\u6b63\u7684\u7a7a\u95f4\u79e9\u5e8f\u3002",
  "\u4ee5\u65b9\u683c\u5355\u5143\u5206\u5272\u753b\u9762\uff0c\u5e76\u5728\u683c\u5185\u586b\u5165\u4e3b\u4f53\u56fe\u5f62\u3002",
  "\u4ee5\u516b\u89d2\u5f62\u5355\u5143\u7ec4\u7ec7\u753b\u9762\uff0c\u5f62\u6210\u66f4\u4e30\u5bcc\u7684\u4e2d\u5fc3\u805a\u5408\u5173\u7cfb\u3002",
  "\u4ee5\u5706\u5f62\u6216\u73af\u5f62\u5355\u5143\u8fde\u7eed\u6392\u5217\uff0c\u5f62\u6210\u73af\u73af\u76f8\u6263\u7684\u79e9\u5e8f\u3002",
  "\u4ee5\u516d\u89d2\u5f62\u9f9f\u80cc\u5355\u5143\u8fde\u7eed\u5bc6\u6392\uff0c\u4e3b\u7eb9\u5185\u5207\u4e8e\u683c\u5185\uff0c\u8f85\u7eb9\u8986\u76d6\u9aa8\u67b6\u4ea4\u63a5\u5904\u3002",
  "\u4ee5\u83f1\u5f62\u5355\u5143\u8fde\u7eed\u7ec4\u7ec7\u753b\u9762\uff0c\u5706\u5708\u4f4d\u586b\u5165\u4e3b\u7eb9\uff0c\u76f8\u4ea4\u70b9\u4ee5\u8f85\u7eb9\u70b9\u72b6\u8fde\u63a5\u3002",
  "\u4ee5\u516d\u8fb9\u5f62\u82b1\u7ee6\u5916\u6846\u8fde\u73af\u6392\u5217\uff0c\u6846\u5185\u4ee5\u56db\u7c7b\u56fe\u5143\u6309\u884c\u5e8f\u5faa\u73af\u586b\u5165\u3002",
];
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

const state = {
  currentSkeletonLayout: 0,
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
  recipeCardStyle: "figma",
  recipeCardTheme: 0,
  assets: null,
};

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
  exportBtn.disabled = isBusy;
  if (exportFullBtn) exportFullBtn.disabled = isBusy;
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
  palettePresetSelect.replaceChildren(new Option("\u9526\u5e8f\u65b0\u751f", "default"));
  saved.forEach((palette, index) => {
    palettePresetSelect.append(new Option(palette.name, String(index)));
  });
}

function applyPalette(colors, name = "") {
  targetColors = colors.map(normalizeHex);
  currentPaletteKey = isDefaultPalette() ? "default" : "custom";
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
    palettePresetSelect.value = String(saved.findIndex((palette) => palette.name === name));
  }
}

function renameCurrentPalette() {
  if (!palettePresetSelect || palettePresetSelect.value === "default") return;
  const name = paletteNameInput && paletteNameInput.value.trim();
  if (!name) return;
  const saved = getSavedPalettes();
  const index = Number(palettePresetSelect.value);
  if (!saved[index]) return;
  saved[index] = { ...saved[index], name };
  setSavedPalettes(saved);
  renderPalettePresetOptions();
  palettePresetSelect.value = String(index);
}

function deleteCurrentPalette() {
  if (!palettePresetSelect || palettePresetSelect.value === "default") return;
  const saved = getSavedPalettes();
  const index = Number(palettePresetSelect.value);
  if (!saved[index]) return;
  saved.splice(index, 1);
  setSavedPalettes(saved);
  renderPalettePresetOptions();
  applyPalette(defaultPalette, "\u9526\u5e8f\u65b0\u751f");
  palettePresetSelect.value = "default";
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
    node.setAttribute("stroke-width", "2");
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

  return getFigmaRecipeCardHtml();
}

function getRecipeCardData() {
  const groundType = state.drawGround ? groundTextureMeta[state.idxGround]?.cardName || "\u672a\u547d\u540d\u5730\u7eb9" : "\u65e0";
  return {
    groundType,
    patternImage: canvas.toDataURL("image/png"),
    patternId: getPatternId(),
    layoutName: layoutCardNames[state.currentSkeletonLayout],
    layoutShortName: layoutNames[state.currentSkeletonLayout],
    skeletonName: skeletonStyleCardNames[state.currentSkeletonStyle],
    motifName: `Sb${state.idxMain + 1} / Sc${state.idxSub + 1}`,
    groundColorLabel: getPaletteLabel(Math.max(0, targetColors.indexOf(state.groundColor))),
    backgroundColorLabel: getPaletteLabel(Math.max(0, targetColors.indexOf(state.backgroundColor))),
    description: layoutDescriptions[state.currentSkeletonLayout],
  };
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
  recipeCardPreview.innerHTML = `${getRecipeCardHtml()}${getRecipeCardControlsHtml()}`;
  recipeCardPreview.hidden = false;
  setStatus("\u5361\u7247\u5360\u4f4d\u56fe\u5df2\u751f\u6210\u3002");
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
    recipeCardPreview.innerHTML = `${getRecipeCardHtml()}${getRecipeCardControlsHtml()}`;
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
  state.currentSkeletonLayout = layoutValue === "random" ? randomIndex(layoutNames.length) : Number(layoutValue);
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

function getExportLayerState() {
  const layers = {
    background: true,
    ground: true,
    skeleton: true,
    motifs: true,
  };

  exportLayerInputs.forEach((input) => {
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
  } catch (error) {
    console.error(error);
    setStatus(`${error.message}\u3002\u5982\u679c\u5728 iPad \u4e0a\u4f7f\u7528\uff0c\u8bf7\u6253\u5f00\u65b0\u7248\u79bb\u7ebf\u5305\u91cc\u7684 index.html\u3002`);
  } finally {
    setBusy(false);
  }
}

generateBtn.addEventListener("click", generatePattern);
exportBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  if (IS_DEVELOPER_VERSION) {
    openExportImageDialog();
    return;
  }
  closeRecipeCard();
  exportCompositePng();
});
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
    const styleButton = event.target.closest("[data-card-style]");
    if (styleButton) {
      state.recipeCardStyle = styleButton.dataset.cardStyle;
      recipeCardPreview.innerHTML = `${getRecipeCardHtml()}${getRecipeCardControlsHtml()}`;
      return;
    }

    const themeButton = event.target.closest("[data-card-theme]");
    if (themeButton) {
      state.recipeCardTheme = Number(themeButton.dataset.cardTheme) || 0;
      recipeCardPreview.innerHTML = `${getRecipeCardHtml()}${getRecipeCardControlsHtml()}`;
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
    if (palettePresetSelect.value === "default") {
      applyPalette(defaultPalette, "\u9526\u5e8f\u65b0\u751f");
      return;
    }
    const palette = getSavedPalettes()[Number(palettePresetSelect.value)];
    if (palette) {
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
  initOptionStrips();
  preventPreviewLabelJump(groundColorPreview);
  preventPreviewLabelJump(backgroundColorPreview);

boot();
