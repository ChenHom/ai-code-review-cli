import fs from 'fs/promises';
import path from 'path';

const GLOBAL_PROMPT_DIR = path.resolve(process.env.HOME || process.env.USERPROFILE || '.', '.ai-review/prompts');
const PROJECT_PROMPT_DIR = path.resolve(process.cwd(), 'prompts');

export function getDefaultPrompt(): string {
  return `
你是一位專業的程式碼審查 AI，請根據以下 Diff 提供程式碼審查建議：
請盡量提供台灣用語的正體中文說明且保持專業性與清晰度與具體、簡短且可操作的建議。`;
}

export async function getPromptTemplate(templateName?: string): Promise<string> {
  if (!templateName) {
    return '';
  }

  const cacheKey = `${PROJECT_PROMPT_DIR}/${templateName}.txt`;
  const cachedPrompt = await loadPromptFromCache(cacheKey);
  if (cachedPrompt) return cachedPrompt;

  const pathsToCheck = [
    path.join(PROJECT_PROMPT_DIR, `${templateName}.txt`),
    path.join(GLOBAL_PROMPT_DIR, `${templateName}.txt`),
  ];

  for (const filePath of pathsToCheck) {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      await savePromptToCache(cacheKey, content);
      return content.trim();
    } catch {
      continue; // 找不到則檢查下一個路徑
    }
  }

  console.warn(`⚠️ 找不到名為 "${templateName}" 的 Prompt 模板，將僅使用預設模板。`);
  return '';
}

// 🚀 組合預設 Prompt 與自訂 Prompt
export async function getFinalPrompt(templateName?: string): Promise<string> {
  const defaultPrompt = getDefaultPrompt();
  const customPrompt = await getPromptTemplate(templateName);

  return [defaultPrompt, customPrompt].filter(Boolean).join('\n\n').trim();
}

async function loadPromptFromCache(key: string): Promise<string | null> {
  try {
    const cache = JSON.parse(await fs.readFile('.ai-review-cache.json', 'utf-8'));
    return cache[key] || null;
  } catch {
    return null;
  }
}

async function savePromptToCache(key: string, content: string): Promise<void> {
  try {
    let cache: Record<string, string> = {};
    try {
      cache = JSON.parse(await fs.readFile('.ai-review-cache.json', 'utf-8'));
    } catch {}

    cache[key] = content;
    await fs.writeFile('.ai-review-cache.json', JSON.stringify(cache), 'utf-8');
  } catch {
    console.warn('⚠️ 無法寫入快取，將繼續執行而不快取。');
  }
}
