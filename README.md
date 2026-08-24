# Flashleaf 官方網站專案說明文件 (Website Project Overview)

本資料夾為 **Flashleaf App 官方靜態網站** 的原始碼與靜態資源，主要部署於 GitHub Pages（網址：`https://summerflowersstudio-tw.github.io/flashleaves/`）。
網站架構針對 **傳統 SEO** 與 **AEO / GEO（AI 搜尋與生成式引擎最佳化）** 進行深度設計。

---

## 檔案架構與用途說明

| 檔案 / 資料夾 | 類型 | 用途與說明 |
| :--- | :--- | :--- |
| **`content.json`** | 核心資料 | **網站文案與內容中心 (Single Source of Truth)**。<br>首頁所有的文字、SEO 標籤、定價方案、常見問答（FAQ）、功能特色說明等皆集中於此檔維護。 |
| **`build.js`** | 建置腳本 | **靜態網站生成器 (Static Site Generator)**。<br>讀取 `content.json` 的內容，注入 HTML 模板與 Schema.org JSON-LD 結構化資料，自動編譯輸出為 `index.html`。 |
| **`index.html`** | 網頁 (首頁) | **網站首頁（由 `build.js` 自動生成）**。<br>包含 TailwindCSS 樣式、語意化標籤、SEO/AEO 結構化資料。**（建議修改 `content.json` 後透過 build 腳本重新產生，避免手動修改被覆蓋）** |
| **`privacy.html`** | 網頁 (靜態) | **隱私權政策頁面 (Privacy Policy)**。<br>符合 Google Play / App Store 上架規範的隱私權說明文件。 |
| **`terms.html`** | 網頁 (靜態) | **服務條款頁面 (Terms of Service)**。<br>使用者規範、訂閱購買說明與免責聲明。 |
| **`robots.txt`** | 爬蟲規則 | **搜尋引擎與 AI 爬蟲指引檔**。<br>配置搜尋引擎（Google、Bing）與 AI 爬蟲（GPTBot、ClaudeBot、PerplexityBot 等）的抓取權限與 Sitemap 位置。 |
| **`sitemap.xml`** | 網站地圖 | **XML 網站地圖**。<br>列出首頁、隱私政策、服務條款之 URL，供搜尋引擎爬蟲快速索引。 |
| **`package.json`** | Node.js 設定 | **專案配置檔**。<br>定義了建置指令 `npm run build`。 |
| **`website.code-workspace`** | 編輯器設定 | **VS Code 工作區配置檔**。 |
| **`.codegraph/`** | 工具索引 | **CodeGraph 索引目錄**。<br>供 AI 快速探勘程式碼結構、符號依賴與呼叫鏈。 |
| **`.agents/rules/`** | Agent 規則 | **Antigravity IDE 專案規範**。<br>定義 AI 在修改程式碼前必須透過 CodeGraph 進行架構探勘的行為規則。 |

---

## 常用工作流程

### 1. 修改首頁文字或 FAQ
1. 打開 `content.json` 編輯對應的文字區塊。
2. 在終端機執行建置指令：
   ```bash
   npm run build
   # 或
   node build.js
   ```
3. 確認 `index.html` 已成功更新。

### 2. 更新 CodeGraph 索引
在程式碼或檔案有大幅異動後，可於終端機執行：
```bash
codegraph sync
```
