# 📦 AI Code Review CLI 工具

一個命令列介面 (CLI) 工具，透過 AI 自動化進行程式碼審查，幫助開發者快速發現潛在問題、優化效能，並維持程式碼品質。

[English](README.md)

---

## 🚀 **功能特色**

- **AI 驅動的程式碼審查：** 分析程式碼差異 (diff)，找出潛在錯誤、效能問題及安全性風險。
- **互動模式：** 與 AI 進行互動式程式碼審查。
- **自訂提示模板：** 支援自訂提示 (prompt) 模板，適用於不同的審查需求。
- **快取管理：** 簡單清除快取以保持最新設定。

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

---

## 📖 **使用說明**

### 🔍 **1. 執行程式碼審查**

使用 AI 進行程式碼差異的審查：

```bash
ai-review review --from HEAD~1 --to HEAD
```

**可選參數：**

- `--from <commit>`：指定差異比較的起始 commit（預設：`HEAD~1`）
- `--to <commit>`：指定差異比較的結束 commit（預設：`HEAD`）
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

---

## ❓ **常見問題排除**

- **權限問題：** 確保檔案具有執行權限（使用 `chmod +x` 設定）。
- **快取異常：** 使用 `clear-cache` 指令重置快取。
- **棄用警告：** 預設已抑制不必要的警告訊息。

---

## 📄 **授權條款**

ISC 授權條款

---
