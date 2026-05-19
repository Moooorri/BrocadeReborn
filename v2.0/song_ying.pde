// ==========================================
// 宋锦参数化生成系统 V2.2 - 毕设终极完善版
// ==========================================

import controlP5.*;
import java.lang.reflect.Field;

// ==========================================
// 🛠️ 1. 资产数量配置区 (成对的算作 1 个单位)
// ==========================================
int MAIN_MOTIF_NUM    = 9; // 主纹对 (Sb1_A, Sb1_B ~ SbN_A, SbN_B)
int SUB_MOTIF_NUM     = 10; // 辅纹对 (Sc1_A, Sc1_B ~ ScN_A, ScN_B)
int GROUND_MOTIF_NUM  = 3; // 地纹 (Sd1 ~ SdN)

// ==========================================
// 🎨 2. 毕设专属五色色彩库配置 (HEX码)
// ==========================================
color[] targetColors = {
  #89B29C, // 0: 灰绿色  (映射 原纯红)
  #D2E3E2, // 1: 浅灰蓝色(映射 原纯绿)
  #FDF7F2, // 2: 米白色  (映射 原纯橙，也是底色)
  #C7CB45, // 3: 芥末黄  (映射 原洋红)
  #F98B3F  // 4: 亮橙色  (映射 原纯蓝)
};

// AI模板色基准(算法会寻找最接近的颜色，容错率极高)
int[] templateHex = { 0xFF0000, 0x00FF00, 0xFFA500, 0xFF00FF, 0x0000FF };

ControlP5 cp5;
PGraphics pg; 

// 动态创建图元数组 (主辅纹皆分 A/B 池)
PShape[] mainMotifsA    = new PShape[MAIN_MOTIF_NUM];
PShape[] mainMotifsB    = new PShape[MAIN_MOTIF_NUM];
PShape[] subMotifsA     = new PShape[SUB_MOTIF_NUM];
PShape[] subMotifsB     = new PShape[SUB_MOTIF_NUM];
PShape[] groundTextures = new PShape[GROUND_MOTIF_NUM];
HashMap<PShape, Integer> originalColors = new HashMap<PShape, Integer>();

String[] skeletonNames = {"原版交错排版", "AC错排排版"};
int tileSize = 200;
int currentSkeletonLayout;

// 抽取变量
int idxGround, idxSub, idxMain;
PShape globalGround, globalSubA, globalSubB, globalMainA, globalMainB;

boolean drawGround = true;
float groundSize = 50; 
boolean exportTransparentMode = false;

void setup() {
  size(1050, 800); 
  pg = createGraphics(800, 800); 
  
  // 1. 加载所有层级美术资产
  for (int i = 0; i < MAIN_MOTIF_NUM; i++) {
    mainMotifsA[i] = loadShape("data/main_motifs/sb" + (i+1) + "_A.svg");
    mainMotifsB[i] = loadShape("data/main_motifs/sb" + (i+1) + "_B.svg");
    cacheOriginalColors(mainMotifsA[i]);
    cacheOriginalColors(mainMotifsB[i]);
  }
  for (int i = 0; i < SUB_MOTIF_NUM; i++) {
    // 辅纹成对加载
    subMotifsA[i] = loadShape("data/sub_motifs/sc" + (i+1) + "_A.svg");
    subMotifsB[i] = loadShape("data/sub_motifs/sc" + (i+1) + "_B.svg");
    cacheOriginalColors(subMotifsA[i]);
    cacheOriginalColors(subMotifsB[i]);
  }
  for (int i = 0; i < GROUND_MOTIF_NUM; i++) {
    groundTextures[i] = loadShape("data/ground_textures/sd" + (i+1) + ".svg");
    cacheOriginalColors(groundTextures[i]);
  }

  setupUI();
  randomizeParameters();
  renderPG();
}

void draw() {
  background(40); 
  image(pg, 0, 0); 
  drawInfoPanel();
}

// ------------------------------------------
// UI 与交互逻辑
// ------------------------------------------
void setupUI() {
  cp5 = new ControlP5(this);
  PFont font = createFont("SansSerif", 14);
  ControlFont cfont = new ControlFont(font, 14);
  cp5.setFont(cfont);
  textFont(font);

  // 【修复】：从下往上创建 UI，确保顶部下拉菜单图层在最前面，不再被遮挡

  cp5.addScrollableList("uiSkeletonLayout")
     .setPosition(825, 360)
     .setSize(200, 120)
     .setBarHeight(35)
     .setItemHeight(35)
     .setLabel("骨架排版结构 (Layout Structure)")
     .addItem("🎲 随机排版 (Random)", 0)
     .addItem("1. 原版交错 (0类)", 1)
     .addItem("2. AC错排 (1类)", 2)
     .setValue(0)
     .close();

  cp5.addScrollableList("uiGround")
     .setPosition(825, 300)
     .setSize(200, 120)
     .setBarHeight(35)
     .setItemHeight(35)
     .setLabel("筛选地纹 (Ground Style)")
     .addItem("🎲 随机状态 (Random)", 0)
     .addItem("1. 开启地纹 (On)", 1)
     .addItem("2. 关闭地纹 (Off)", 2)
     .setValue(0)
     .close();

  cp5.addSlider("uiGroundSize")
     .setPosition(825, 240)
     .setSize(150, 20)
     .setRange(20, 100) 
     .setValue(50)
     .setLabel("地纹尺寸")
     .getCaptionLabel().align(ControlP5.RIGHT_OUTSIDE, ControlP5.CENTER).setPaddingX(10);

  cp5.addButton("clearFilters")
     .setPosition(825, 180)
     .setSize(200, 35)
     .setLabel("一键重置筛选 (RESET FILTERS)");

  cp5.addButton("generateBtn")
     .setPosition(825, 110)
     .setSize(200, 50)
     .setColorBackground(color(44, 168, 100)) 
     .setLabel("生成新纹样 (GENERATE)");

  cp5.addButton("exportPNGBtn")
     .setPosition(825, 40)
     .setSize(200, 50)
     .setColorBackground(color(220, 100, 100)) 
     .setLabel("导出透明底PNG (SAVE PNG)");
}

void clearFilters() {
  cp5.get(ScrollableList.class, "uiSkeletonLayout").setValue(0);
  cp5.get(ScrollableList.class, "uiGround").setValue(0);
  cp5.get(Slider.class, "uiGroundSize").setValue(50);
}

void generateBtn() { 
  randomizeParameters(); 
  renderPG();            
}

void mousePressed() {
  if (mouseX < 800) { 
    randomizeParameters();
    renderPG();
  }
}

void exportPNGBtn() {
  exportTransparentMode = true; 
  renderPG();                   
  
  String filename = "export/SongBrocade_" + year() + nf(month(),2) + nf(day(),2) + "_" + nf(hour(),2) + nf(minute(),2) + nf(second(),2) + ".png";
  pg.save(filename);
  println("✅ 成功导出透明 PNG: " + filename);
  
  exportTransparentMode = false; 
  renderPG();                    
}

void drawInfoPanel() {
  fill(255);
  textSize(16);
  text("— 毕设纹样参数信息 —", 830, 520);
  
  textSize(14);
  fill(200);
  text("排版结构: " + skeletonNames[currentSkeletonLayout], 830, 555);
  text("地纹状态: " + (drawGround ? "开启 (尺寸: "+int(groundSize)+")" : "关闭"), 830, 585);
  
  fill(150, 200, 255);
  text("当前组合图元编码:", 830, 630);
  
  fill(220);
  String eq = drawGround ? ("Sd" + (idxGround+1) + " + ") : "";
  // 辅纹A/B信息
  eq += "Sc" + (idxSub+1) + "_A + Sc" + (idxSub+1) + "_B + ";
  // 主纹A/B信息
  eq += "Sb" + (idxMain+1) + "_A + Sb" + (idxMain+1) + "_B";
  
  text(eq, 830, 660, 200, 100); // 加入边界约束，自动换行
}

// ------------------------------------------
// 数据逻辑
// ------------------------------------------
void randomizeParameters() {
  int uiLayVal   = (int)cp5.get(ScrollableList.class, "uiSkeletonLayout").getValue();
  int uiGrndVal  = (int)cp5.get(ScrollableList.class, "uiGround").getValue();
  
  groundSize = cp5.get(Slider.class, "uiGroundSize").getValue();

  if (uiLayVal == 0) { currentSkeletonLayout = int(random(2)); } 
  else { currentSkeletonLayout = uiLayVal - 1; }
  
  if (uiGrndVal == 0) { drawGround = (random(1) > 0.5); }
  else if (uiGrndVal == 1) { drawGround = true; }
  else { drawGround = false; }

  idxGround = int(random(groundTextures.length));
  
  // 核心：抽取主辅纹编号，A和B自动成对匹配
  idxMain   = int(random(MAIN_MOTIF_NUM));
  idxSub    = int(random(SUB_MOTIF_NUM));

  globalGround = groundTextures[idxGround];
  globalSubA   = subMotifsA[idxSub];
  globalSubB   = subMotifsB[idxSub];
  globalMainA  = mainMotifsA[idxMain];
  globalMainB  = mainMotifsB[idxMain];
}

// ------------------------------------------
// 渲染逻辑
// ------------------------------------------
void renderPG() {
  pg.beginDraw();
  pg.shapeMode(CENTER);
  
  if (exportTransparentMode) {
    pg.clear(); 
  } else {
    pg.background(targetColors[2]); 
  }

  // 1. 全局平铺地纹
  if (!exportTransparentMode && drawGround && globalGround != null) {
    recolorSVG(globalGround);
    for (float gx = 0; gx <= pg.width; gx += groundSize) {
      for (float gy = 0; gy <= pg.height; gy += groundSize) {
        pg.shape(globalGround, gx + groundSize/2, gy + groundSize/2, groundSize, groundSize);
      }
    }
  }

  // 2. 绘制代码骨架线（三线夹色逻辑）
  color outerColor = targetColors[0]; 
  color innerColor = targetColors[3]; 
  
  pg.stroke(outerColor);
  pg.strokeWeight(9); 
  pg.noFill();
  drawAllGridLines(pg);

  pg.stroke(innerColor);
  pg.strokeWeight(3); 
  pg.noFill();
  drawAllGridLines(pg);

  // 3. 循环绘制主辅纹
  for (int x = 0; x <= pg.width; x += tileSize) {
    for (int y = 0; y <= pg.height; y += tileSize) {
      drawMotifs(pg, x, y);
    }
  }
  pg.endDraw();
}

void drawAllGridLines(PGraphics canvas) {
  for (int x = 0; x <= canvas.width; x += tileSize) {
    for (int y = 0; y <= canvas.height; y += tileSize) {
      canvas.rect(x, y, tileSize, tileSize);
      canvas.line(x + tileSize/2, y,         x + tileSize/2, y + tileSize);
      canvas.line(x,             y + tileSize/2, x + tileSize, y + tileSize/2);
      canvas.line(x, y,          x + tileSize, y + tileSize);
      canvas.line(x + tileSize,  y,           x,              y + tileSize);
    }
  }
}

void drawMotifs(PGraphics canvas, float x, float y) {
  float quarter = tileSize / 4.0;
  float mainSize = tileSize * 0.45; 
  float subSize  = tileSize * 0.25; 

  if (currentSkeletonLayout == 0) {
    // 【原版交错】中心A色，四周B色。对角线辅纹交叉排列A/B。
    if (globalSubA != null) {
      recolorSVG(globalSubA);
      canvas.shape(globalSubA, x + quarter, y + quarter, tileSize*0.3, tileSize*0.3); // 左上
      canvas.shape(globalSubA, x + tileSize - quarter, y + tileSize - quarter, tileSize*0.3, tileSize*0.3); // 右下
    }
    if (globalSubB != null) {
      recolorSVG(globalSubB);
      canvas.shape(globalSubB, x + tileSize - quarter, y + quarter, tileSize*0.3, tileSize*0.3); // 右上
      canvas.shape(globalSubB, x + quarter, y + tileSize - quarter, tileSize*0.3, tileSize*0.3); // 左下
    }
    
    if (globalMainA != null) {
      recolorSVG(globalMainA);
      canvas.shape(globalMainA, x + tileSize/2, y + tileSize/2, tileSize*0.6, tileSize*0.6);
    }
    if (globalMainB != null) {
      recolorSVG(globalMainB);
      canvas.shape(globalMainB, x, y, tileSize*0.4, tileSize*0.4);
    }
    
  } else {
    // 【AC错排】中心A色，交点B色。边线中点辅纹交叉排列A/B。
    if (globalMainB != null) {
      recolorSVG(globalMainB);
      canvas.shape(globalMainB, x, y, mainSize, mainSize); 
    }
    if (globalMainA != null) {
      recolorSVG(globalMainA);
      canvas.shape(globalMainA, x + tileSize/2, y + tileSize/2, mainSize, mainSize);
    }
    
    if (globalSubA != null) {
      recolorSVG(globalSubA);
      canvas.shape(globalSubA, x + tileSize/2, y, subSize, subSize); // 上横线中点
    }
    if (globalSubB != null) {
      recolorSVG(globalSubB);
      canvas.shape(globalSubB, x, y + tileSize/2, subSize, subSize); // 左竖线中点
    }
  }
}

// ------------------------------------------
// 缓存与 5 色重上色算法 (全新欧氏距离吸附算法)
// ------------------------------------------
void cacheOriginalColors(PShape shp) {
  if (shp == null) return;
  if (shp.getChildCount() > 0) {
    for (int i = 0; i < shp.getChildCount(); i++) {
      cacheOriginalColors(shp.getChild(i));
    }
  } else {
    int hexColor = readFillColor(shp);
    originalColors.put(shp, hexColor);
  }
}

void recolorSVG(PShape shp) {
  if (shp == null) return;
  if (shp.getChildCount() > 0) {
    for (int i = 0; i < shp.getChildCount(); i++) {
      recolorSVG(shp.getChild(i));
    }
  } else {
    int hexColor = originalColors.containsKey(shp) ? originalColors.get(shp) : 0;
    
    // 提取 RGB 通道
    int r = (hexColor >> 16) & 0xFF;
    int g = (hexColor >> 8) & 0xFF;
    int b = hexColor & 0xFF;

    int bestMatch = 0;
    float minDistance = Float.MAX_VALUE;

    // 计算色彩距离，寻找最接近的模板色
    for (int i = 0; i < 5; i++) {
      int tr = (templateHex[i] >> 16) & 0xFF;
      int tg = (templateHex[i] >> 8) & 0xFF;
      int tb = templateHex[i] & 0xFF;

      float dist = sq(r - tr) + sq(g - tg) + sq(b - tb);
      if (dist < minDistance) {
        minDistance = dist;
        bestMatch = i;
      }
    }
    
    // 直接吸附并填充为最接近的目标色
    shp.setFill(targetColors[bestMatch]);
    shp.setStroke(false);
  }
}

int readFillColor(PShape shp) {
  try {
    Field f = processing.core.PShape.class.getDeclaredField("fillColor");
    f.setAccessible(true);
    return f.getInt(shp) & 0xFFFFFF;
  } catch (Exception e1) {
    try {
      return shp.getFill(0) & 0xFFFFFF;
    } catch (Exception e2) {
      return 0;
    }
  }
}
