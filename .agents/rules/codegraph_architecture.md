---
trigger: always_on
---

# Rule: 架構先行與 CodeGraph 依賴探勘 (Architecture First with CodeGraph)

在開始任何程式碼實作、重構或 Bug 修復之前，**必須優先使用 CodeGraph 掌握專案架構與依賴關係**，禁止在未釐清上下文時盲目修改。

---

## 1. 觸發時機 (Mandatory Pre-condition)

在滿足以下條件時，**寫任何程式碼前必須先調用 CodeGraph**：
- 專案根目錄存在 `.codegraph/` 資料夾。
- 任務涉及：新增功能、修改既有邏輯、重構、Bug 修復或模組整合。

> ⚠️ **例外**：純粹的文件修改、typo 修正或無關程式邏輯的單純配置微調除外。

---

## 2. 執行流程 (Investigation Workflow)

在撰寫程式碼前，必須依序完成以下步驟：

### Step 1: 探勘進入點與符號架構
優先使用 MCP 工具 `codegraph_explore`（或 shell 指令 `codegraph explore "<目標名稱>"`）查詢：
- 相關 JS 邏輯、建置腳本（如 `build.js`）或頁面結構符號與定義。
- 目標函式、常數或模組宣告與上下文。

### Step 2: 梳理上下游呼叫鏈 (Call Graph & Dependencies)
透過 CodeGraph 確認：
- **上游呼叫者 (Callers)**：哪些頁面或腳本會引用或依賴這段程式碼？修改後是否會影響其他部分（如 content 生成或 build 流程）？
- **下游依賴 (Callees)**：此功能調用了哪些底層函式、資料結構（如 `content.json`）或共用模組？

### Step 3: 定義改動邊界 (Surgical Boundary)
- 根據 CodeGraph 解析出的依賴路徑，明確列出本次修改**真正需要改動的最小檔案集合**。
- 禁止以 grep 搜尋片段字串後就跳過上下游分析直接盲改。

---

## 3. 禁止事項 (Anti-Patterns)

- ❌ **禁止在未檢視上下游呼叫鏈前直接產生或修改程式碼**。
- ❌ **禁止單純依賴全域搜尋 (grep/find) 取代 CodeGraph 架構分析**。
- ❌ **禁止破壞現有架構約定與資料流向**。

---

## 4. 思考與輸出規範

在提出修改方案或開始寫程式時，應簡短在思考或回覆中體現架構理解：
1. **涉及模組與角色**（由 CodeGraph 查出的關鍵常數/函式/檔案）。
2. **影響範圍評估**（上游依賴影響、下游調用變更）。
3. **改動計畫**。
