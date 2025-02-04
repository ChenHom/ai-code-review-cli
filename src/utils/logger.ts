import fs from 'fs';
import path from 'path';

const LOG_FILE = path.resolve('logs/error.log');

export class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  static info(message: string) {
    console.log(`[INFO] [${this.getTimestamp()}] ${message}`);
  }

  static warn(message: string) {
    console.warn(`[WARN] [${this.getTimestamp()}] ${message}`);
  }

  static error(message: string, error?: unknown) {
    const errorMessage = this.formatError(error);
    console.error(`[ERROR] [${this.getTimestamp()}] ${message}`);
    if (errorMessage) {
      console.error(errorMessage);
      this.saveLog(message, errorMessage);
    }
  }

  private static formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.message}\n${error.stack}`;
    }
    return String(error);
  }

  private static saveLog(title: string, message: string) {
    const logEntry = `[${this.getTimestamp()}] ${title}\n${message}\n\n`;
    fs.appendFileSync(LOG_FILE, logEntry, 'utf-8');
  }
}
