#!/usr/bin/env node

// 🚀 全域禁用 Node.js 的棄用警告
process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning') {
    // 忽略所有 Deprecation 警告
    return;
  }
  console.warn(warning); // 其他警告仍顯示
});

import { Command } from 'commander';
import { runReview } from './commands/review';
import { runInteractiveMode } from './commands/interactive';
import { clearCache } from './core/promptManager';
import path from 'path';
import { readFileSync } from 'fs';

const program = new Command();

const packageJson = JSON.parse(
  readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8')
);

program
  .name('ai-review')
  .description('AI Code Reviewer CLI Tool')
  .version(packageJson.version); // 自動讀取版本號

program
  .command('review')
  .description('Run AI Code Reviewer for the latest changes')
  .option('--from <commit>', 'Specify the starting commit for the diff')
  .option('--to <commit>', 'Specify the ending commit for the diff')
  .option('--exclude <paths...>', 'Override exclude patterns (comma-separated)')
  .option('--show-diff', 'Display the diff data sent to AI', false)
  .option('--prompt-template <templateName>', 'Specify a prompt template to use')
  .action((options) => {
    runReview(options);
  });

program
  .command('interactive')
  .description('Run AI Code Reviewer in interactive mode')
  .action(() => {
    runInteractiveMode();
  });

program
  .command('clear-cache')
  .description('Clear the AI review prompt cache')
  .action(() => {
    clearCache();
  });
program.parse(process.argv);
