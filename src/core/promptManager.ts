import fs from 'fs/promises';
import path from 'path';

const GLOBAL_PROMPT_DIR = path.resolve(process.env.HOME || process.env.USERPROFILE || '.', '.ai-review/prompts');
const PROJECT_PROMPT_DIR = path.resolve(process.cwd(), 'prompts');
const CACHE_FILE = '.ai-review-cache.json';

export async function getAvailablePromptTemplates(): Promise<string[]> {
  const projectTemplates = await readTemplateNames(PROJECT_PROMPT_DIR);
  const globalTemplates = await readTemplateNames(GLOBAL_PROMPT_DIR);

  return [...new Set([...projectTemplates, ...globalTemplates])];
}

async function readTemplateNames(dir: string): Promise<string[]> {
  try {
    const cacheKey = `${dir}-templates`;
    const cachedTemplates = await loadPromptFromCache(cacheKey);
    if (cachedTemplates) return cachedTemplates;

    const files = await fs.readdir(dir);
    const templates = files
      .filter(file => file.endsWith('.txt'))
      .map(file => path.basename(file, '.txt'));

    await savePromptToCache(cacheKey, templates);
    return templates;
  } catch {
    return [];
  }
}

// 🚀 組合預設 Prompt 與自訂 Prompt
export async function getFinalPrompt(templateName?: string): Promise<string> {
  const defaultPrompt = getDefaultPrompt();
  const customPrompt = await getPromptTemplate(templateName);

  return [defaultPrompt, customPrompt].filter(Boolean).join('\n\n').trim();
}

export function getDefaultPrompt(): string {
  return `
你是一位專業的程式碼審查 AI，請根據以下 Diff 提供程式碼審查建議：
請盡量提供台灣用語的正體中文說明且保持專業性與清晰度與具體、簡短且可操作的建議。`
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
      continue;
    }
  }

  console.warn(`⚠️ 找不到名為 "${templateName}" 的 Prompt 模板，將僅使用預設模板。`);
  return '';
}

async function loadPromptFromCache(key: string): Promise<any | null> {
  try {
    const cache = JSON.parse(await fs.readFile(CACHE_FILE, 'utf-8'));
    return cache[key] || null;
  } catch {
    return null;
  }
}

async function savePromptToCache(key: string, content: any): Promise<void> {
  try {
    let cache: Record<string, string> = {};
    try {
      cache = JSON.parse(await fs.readFile(CACHE_FILE, 'utf-8'));
    } catch { }

    cache[key] = content;
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache), 'utf-8');
  } catch {
    console.warn('⚠️ 無法寫入快取，將繼續執行而不快取。');
  }
}

export async function clearCache(): Promise<void> {
  try {
    await fs.unlink(CACHE_FILE);
    console.log('✅ 快取已成功清除！');
  } catch (error) {
    console.warn('⚠️ 無法清除快取，可能因檔案不存在或權限問題。');
  }
}
