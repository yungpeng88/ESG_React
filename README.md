# ESG React Frontend

ESG (Environmental, Social, Governance) Portal 前端應用程式，使用 React 和 Vite 建立。

## 專案概述

這是一個從 ASP.NET Core MVC 轉換而來的 React 前端應用程式，用於管理和展示 ESG 相關的排放源資料。

## 功能特色

- **響應式設計**: 支援桌面、平板和手機裝置
- **現代化 UI**: 使用 CSS3 動畫和轉場效果
- **分頁式介面**: 支援 Scope 1+2、Scope 3 和其他類別
- **卡片式佈局**: 直觀的資料展示方式
- **國際化支援**: 中英文雙語介面

## 排放源類別

### Scope 1+2
- 燃料 (Fuel)
- 燃氣 (Fuel Gas)
- 化糞池 (Septic Tank)
- 滅火器 (Fire Extinguisher)
- 冷媒 (Refrigerant)
- 電力 (Electricity)

### Scope 3
- 水 (Water)
- 廢棄物 (Waste)
- 商務旅行 (Business Travel)

## 技術規格

- **React**: 19.1.0
- **Vite**: 7.0.4
- **CSS3**: 現代化樣式和動畫
- **響應式設計**: 支援多種裝置尺寸

## 安裝與執行

### 先決條件
- Node.js (建議版本 18.0.0 或以上)
- npm 或 yarn 套件管理器

### 安裝步驟

1. 複製專案
`ash
git clone [repository-url]
cd ESG_React
`

2. 安裝相依套件
`ash
npm install
`

3. 執行開發伺服器
`ash
npm run dev
`

4. 在瀏覽器中開啟 http://localhost:5173

### 建置專案
`ash
npm run build
`

### 預覽建置結果
`ash
npm run preview
`

## 專案結構

`
ESG_React/
 public/
    assets/
       img/          # SVG 圖示
    index.html
 src/
    App.jsx          # 主要應用程式元件
    App.css          # 應用程式樣式
    main.jsx         # 應用程式進入點
 package.json
 vite.config.js
 README.md
`

## 開發指南

### 新增排放源類別
1. 在 App.jsx 中的 emissionData 物件新增資料
2. 在 public/assets/img/ 目錄中新增對應的 SVG 圖示
3. 確保圖示遵循現有的設計規範

### 樣式自訂
- 主要樣式定義在 src/App.css
- 使用 CSS 變數進行主題色彩管理
- 支援響應式設計的中斷點

### 國際化
- 目前支援中文和英文介面
- 可以擴充至其他語言支援

## 瀏覽器支援

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 授權

Copyright  2025 Compal Electronics. All rights reserved.
