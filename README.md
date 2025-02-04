# 📦 AI Code Review CLI Tool

A powerful command-line interface (CLI) tool designed to perform automated code reviews using AI. This tool helps developers quickly identify potential issues, optimize performance, and maintain code quality.

[中文](./README.tw.md)

---

## 🚀 **Features**

- **AI-Powered Code Review:** Analyze code diffs for potential bugs, performance issues, and security vulnerabilities.
- **Interactive Mode:** Engage with the AI in an interactive session.
- **Prompt Customization:** Use custom prompt templates for specific review styles.
- **Cache Management:** Easily clear cached data.

---

## ⚙️ **Installation**

### 1️⃣ **Global Installation via NPM**

```bash
npm install -g ai-code-reviewer-cli
```

### 2️⃣ **Verify Installation**

```bash
ai-review --help
```

---

## 📖 **Usage**

### 🔍 **1. Review Command**

Run AI-powered code reviews:

```bash
ai-review review --from HEAD~1 --to HEAD
```

**Options:**
- `--from <commit>`: Specify the starting commit (default: `HEAD~1`)
- `--to <commit>`: Specify the ending commit (default: `HEAD`)
- `--exclude <paths...>`: Override exclude patterns (comma-separated)
- `--show-diff`: Display the diff data sent to AI
- `--prompt-template <templateName>`: Use a specific prompt template

### 🤖 **2. Interactive Mode**

Start an interactive code review session:

```bash
ai-review interactive
```

### 🗑️ **3. Clear Cache**

Clear cached data to refresh settings:

```bash
ai-review clear-cache
```

---

## 🛠️ **Development**

### Build the Project:

```bash
npm run build
```

### Package as Executable:

```bash
npm run pkg
```

---

## ❓ **Troubleshooting**

- **Permission Issues:** Ensure the file is executable (`chmod +x`).
- **Cache Problems:** Use `clear-cache` to reset.
- **Deprecation Warnings:** These are suppressed by default.

---

## 📄 **License**

MIT License

---
