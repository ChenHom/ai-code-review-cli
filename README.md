# 📦 AI Code Review CLI Tool

A command-line interface (CLI) tool designed to automate code reviews using AI, helping developers quickly identify potential issues, optimize performance, and maintain code quality.

[中文](https://github.com/ChenHom/ai-code-reviewer-cli/blob/master/README.tw.md)

---

## 🚀 **Features**

- **AI-Powered Code Review:** Analyze code differences (diff) to identify potential bugs, performance issues, and security risks.
- **Interactive Mode:** Engage with AI in an interactive code review session.
- **Custom Prompt Templates:** Support for custom prompt templates to fit various review needs.
- **Cache Management:** Easily clear cached data to maintain updated settings.
- **Code Quality Metrics:** Provide code quality scores based on AI analysis to quickly assess code health.
- **Git Integration:** *(Coming Soon)* Automatically post review comments to Pull Requests and integrate with CI/CD workflows.

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

### 3️⃣ **Environment Variable Setup**

This tool requires an **OpenAI API key** provided via environment variables:

```bash
export OPENAI_KEY=your_openai_api_key
```

Or configure it in a `.env` file:

```env
OPENAI_KEY=your_openai_api_key
```

---

## 📖 **Usage**

### 🔍 **1. Run Code Review**

Perform code reviews using AI:

```bash
ai-review review --from HEAD~1 --to HEAD
```

**Optional Parameters:**

- `--from <commit>`: Specify the starting commit for the diff (default: `HEAD~1`)
- `--to <commit>`: Specify the ending commit for the diff (default: `HEAD`)
- `--exclude <paths...>`: Override default exclusion rules (comma-separated paths)
- `--show-diff`: Display the diff data sent to AI
- `--prompt-template <templateName>`: Use a specific prompt template
- `--show-quality-score`: Display AI-analyzed code quality scores

### 🤖 **2. Interactive Mode**

Start an interactive code review session with AI:

```bash
ai-review interactive
```

### 🗑️ **3. Clear Cache**

Clear cached data to ensure the latest settings are loaded:

```bash
ai-review clear-cache
```

### 📊 **4. Code Quality Metrics**

Display code quality scores in the review results:

```bash
ai-review review --show-quality-score
```

These metrics assess code readability, maintainability, potential issues, and performance.

### 🔗 **5. Git Integration**

⚠️ **This feature is under development. Stay tuned!**

Automatically post review comments to Pull Requests (planned support for GitHub/GitLab):

```bash
ai-review review --git-integration
```

Can be automated in CI/CD workflows to ensure consistent code quality.

---

## 🛠️ **Development Guide**

### Build the Project

```bash
npm run build
```

### Package as an Executable

```bash
npm run pkg
```

---

## ❓ **Troubleshooting**

- **Permission Issues:** Ensure the file has execute permissions (`chmod +x`).
- **Cache Issues:** Use the `clear-cache` command to reset the cache.
- **Missing Environment Variables:** Verify that `OPENAI_KEY` is correctly configured.
- **Deprecation Warnings:** Deprecation warnings are suppressed by default.

---

## 📄 **License**

ISC License

---
