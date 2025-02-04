# 📦 AI Code Review CLI 工具

一個強大的命令列介面 (CLI) 工具，透過 AI 自動化進行程式碼審查，幫助開發者快速發現潛在問題、優化效能，並維持程式碼品質。

[English](https://github.com/ChenHom/ai-code-reviewer-cli/blob/master/README.md)

---

## 🚀 **功能特色**

- **AI 驅動的程式碼審查：** 分析程式碼差異 (diff)，找出潛在錯誤、效能問題及安全性風險。
- **互動模式：** 與 AI 進行互動式程式碼審查。
- **自訂提示模板：** 支援自訂提示 (prompt) 模板，適用於不同的審查需求。
- **快取管理：** 簡單清除快取以保持最新設定。
- **自動化版本管理：** 透過 `standard-version` 自動更新版本與變更紀錄。
- **程式碼品質指標：** 根據 AI 分析結果，提供程式碼品質評分，幫助快速了解程式碼健康狀況。
- **Git 整合：** 自動將審查結果留言至 Pull Request，並支援與 CI/CD 流程整合。

---

## ⚙️ **安裝方式**

### 1️⃣ **透過 NPM 全域安裝**

```bash
npm install -g ai-code-reviewer-cli
```

### 2️⃣ **確認安裝成功**

```bash
ai-review --help
```

### 3️⃣ **環境變數設定**

此工具需要在環境變數中提供 **OpenAI API 金鑰**：

```bash
export OPENAI_KEY=your_openai_api_key
```

或在 `.env` 檔案中設定：

```env
OPENAI_KEY=your_openai_api_key
```

---

## 📖 **使用說明**

### 🔍 **1. 執行程式碼審查**

使用 AI 進行程式碼差異的審查：

```bash
ai-review review --from HEAD~1 --to HEAD
```

**可選參數：**

- `--from <commit>`：指定差異比較的起始 commit
- `--to <commit>`：指定差異比較的結束 commit
- `--exclude <paths...>`：覆蓋預設排除規則（以逗號分隔路徑）
- `--show-diff`：顯示送出至 AI 的差異資料
- `--prompt-template <templateName>`：使用特定的提示模板

### 🤖 **2. 啟動互動模式**

進入與 AI 互動式的程式碼審查模式：

```bash
ai-review interactive
```

### 🗑️ **3. 清除快取**

清除快取資料以確保載入最新設定：

```bash
ai-review clear-cache
```

### 📊 **4. 程式碼品質指標**

在審查結果中顯示程式碼品質評分：

```bash
ai-review review --show-quality-score
```

此指標根據程式碼的可讀性、維護性、潛在錯誤及效能問題進行評分。

### 🔗 **5. Git 整合(待實作)**

將審查結果自動留言到 Pull Request（支援 GitHub/GitLab）：

```bash
ai-review review --git-integration
```

可在 CI/CD 流程中自動執行，確保程式碼品質的一致性。

---

## 🛠️ **開發指南**

### 編譯專案

```bash
npm run build
```

### 打包為可執行檔

```bash
npm run pkg
```

### 自動化版本管理

透過 `standard-version` 自動管理版本與變更紀錄。

- **建立新版本（修補版）：**

  ```bash
  npm run release -- --release-as patch
  ```

- **升級次版本或主要版本：**

  ```bash
  npm run release -- --release-as minor   # 次版本
  npm run release -- --release-as major   # 主要版本
  ```

- **推送至 Git 並發布至 NPM：**

  ```bash
  git push --follow-tags
  npm publish
  ```

每次執行 `release` 指令會自動更新 `package.json` 版本號，並產生 `CHANGELOG.md`。

---

## ❓ **常見問題排除**

- **權限問題：** 確保檔案具有執行權限（使用 `chmod +x` 設定）。
- **快取異常：** 使用 `clear-cache` 指令重置快取。
- **環境變數未設定：** 確認 `OPENAI_KEY` 是否正確設定。
- **棄用警告：** 預設已抑制不必要的警告訊息。

---

## 📄 **授權條款**

ISC 授權條款

---

## 🙌 **貢獻指南**

歡迎提交問題回報或拉取請求 (Pull Request) 來協助改進此工具！
