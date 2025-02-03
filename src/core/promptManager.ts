export function getDefaultPrompt(): string {
  return `
你是一位專業的程式碼審查 AI，請根據以下 Diff 提供程式碼審查建議，重點包括：
- 潛在的錯誤或漏洞
- 性能優化建議
- 程式碼風格與一致性
- 安全性問題
請盡量提供具體且可操作的建議。
  `.trim();
}
