import fs from 'fs';
import path from 'path';

const LOG_FILE = path.resolve('error.log');

export function logInfo(message: string) {
  console.log(`ℹ️  ${message}`);
}

export function logError(message: string, error?: unknown) {
  const errorMessage = formatError(error);
  console.error(`❌ ${message}`);
  if (errorMessage) {
    console.error(errorMessage);
    saveLog(message, errorMessage);
  }
}

// 格式化錯誤訊息
function formatError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.message}\n${error.stack}`;
  }
  return String(error);
}

// 儲存錯誤日誌到檔案
function saveLog(title: string, message: string) {
  const logEntry = `[${new Date().toISOString()}] ${title}\n${message}\n\n`;
  fs.appendFileSync(LOG_FILE, logEntry, 'utf-8');
}
