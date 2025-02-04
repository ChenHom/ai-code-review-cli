import { getGitDiff } from '../core/diffProcessor';
import { reviewCodeWithAI } from '../core/openaiService';
import { getFinalPrompt } from '../core/promptManager';
import ora from 'ora';
import { Logger } from '../utils/logger';

interface ReviewOptions {
  from?: string;
  to?: string;
  exclude?: string[];
  showDiff?: boolean;
  promptTemplate?: string;
}

export async function runReview(options: ReviewOptions) {
  Logger.info('🚀 Starting AI Code Reviewer...');

  const cliExcludes = options.exclude || [];
  const diffRange = options.from && options.to ? `${options.from} ${options.to}` : 'HEAD';

  const spinner = ora('🤖 正在取得 Git Diff...').start();

  try {
    const diff = await getGitDiff(diffRange, cliExcludes);
    spinner.succeed('✅ 取得 Git Diff 完成！');

    if (!diff) {
      Logger.warn('⚠️ 沒有檢測到程式碼變更，請確認 Diff 範圍是否正確。');
      return;
    }

    if (options.showDiff) {
      Logger.info('\n📤 **傳送給 AI 的 Diff 資料:**\n' + diff);
    }

    const prompt = await getFinalPrompt(options.promptTemplate);

    spinner.start('🤖 AI 正在審查程式碼，請稍候...');
    const aiResponse = await reviewCodeWithAI(diff, prompt);

    spinner.succeed('✅ AI 審查完成！');
    Logger.info('\n📋 **AI Code Reviewer Result:**\n' + aiResponse);
  } catch (error) {
    spinner.fail('❌ AI 審查失敗！');
    Logger.error('AI 程式碼審查過程中發生錯誤', error);
  }
}
