# 🔥 The Mockingjay Lives — 反抗之鳥永不熄滅

> *"If we burn, you burn with us."*
> 「若我們燃燒，你也將與我們同焚。」

致敬《飢餓遊戲》反抗精神的個人紀念網站。

---

## ✨ 功能特色

- **Hero Section** — Mockingjay 火鳥 SVG 展翅燃燒動畫
- **The Districts** — 十二個區卡片 Grid，hover 火焰邊框效果
- **Sparks 語錄** — 經典台詞中英並排，抵抗傳單交錯排版
- **Tributes 角色** — 首都機密檔案被駭入風格，打字機解鎖效果
- **My Manifesto** — 燃燒羊皮紙質感個人宣言
- **灰燼粒子** — Canvas 灰燼緩緩飄落動態背景
- **自訂游標** — 箭頭形狀游標
- **載入畫面** — "Connecting to District 12..." 進度條
- **毛玻璃 Navbar** — 捲動時自動出現
- **Rue 致敬 Footer** — 三根手指圖示

---

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 本地開發

```bash
npm run dev
```

開啟瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

### 3. 建置生產版本

```bash
npm run build
npm start
```

---

## 📦 推上 GitHub

```bash
# 初始化 Git repository
git init
git add .
git commit -m "feat: The Mockingjay Lives — initial commit 🔥"

# 在 GitHub 建立新 repository，然後：
git remote add origin https://github.com/YOUR_USERNAME/mockingjay-memorial.git
git branch -M main
git push -u origin main
```

---

## ⚡ Vercel 部署

### 方法一：Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入並部署
vercel login
vercel

# 生產環境部署
vercel --prod
```

### 方法二：GitHub 自動部署（推薦）

1. 前往 [vercel.com](https://vercel.com) 並登入
2. 點擊 **"New Project"**
3. 選擇 **"Import Git Repository"**，連結你的 GitHub
4. 選擇 `mockingjay-memorial` repository
5. Framework Preset 選 **Next.js**（會自動偵測）
6. 點擊 **"Deploy"** 🚀

每次 `git push` 到 `main` branch，Vercel 會自動重新部署！

---

## 🎨 自訂你的宣言

在 `components/ManifestoSection.tsx` 中，找到以下文字並替換：

```tsx
// 找到這些 placeholder：
[YOUR_TEXT_HERE — 在此填入您的個人感言與反抗宣言]
[ADD YOUR OWN WORDS HERE — 加入您自己的話語]

// 替換為你的個人宣言文字
```

---

## 🛠 技術規格

| 技術 | 版本 |
|------|------|
| Next.js | 14.x (App Router) |
| React | 18.x |
| TypeScript | 5.x |
| Tailwind CSS | 3.x |
| Framer Motion | 11.x |
| 字體 | Cinzel, Playfair Display, Caveat, Noto Sans TC |

---

## 📁 專案結構

```
mockingjay-memorial/
├── app/
│   ├── layout.tsx          # 字體設定、metadata
│   ├── page.tsx            # 主頁面
│   └── globals.css         # 全域樣式、動畫
├── components/
│   ├── AshCanvas.tsx       # 灰燼粒子 Canvas
│   ├── LoadingScreen.tsx   # 載入畫面
│   ├── Navbar.tsx          # 導航列
│   ├── HeroSection.tsx     # 主視覺
│   ├── DistrictsSection.tsx # 十二個區
│   ├── SparksSection.tsx   # 火花語錄
│   ├── TributesSection.tsx # 角色致敬
│   ├── ManifestoSection.tsx # 反抗宣言
│   └── Footer.tsx          # 頁尾
├── public/                 # 靜態資源
├── tailwind.config.ts      # Tailwind 自訂設定
├── next.config.js
├── tsconfig.json
└── README.md
```

---

## 🔥 彩蛋

- **自訂游標**：箭頭形狀游標（CSS 自訂 SVG）
- **載入畫面**：District 12 連線動畫
- **Navbar**：捲動後毛玻璃效果
- **Footer**：三根手指致敬 Rue

---

> *"The Mockingjay lives."*
> 「反抗之鳥永不熄滅。」

Made with 🔥 in memory of the brave souls of Panem.
