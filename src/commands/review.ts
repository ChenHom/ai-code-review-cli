import { getGitDiff } from '../core/diffProcessor';
import { reviewCodeWithAI } from '../core/openaiService';
import { getDefaultPrompt } from '../core/promptManager';
import ora from 'ora';
import { logError } from '../utils/logger';

interface ReviewOptions {
  from?: string;
  to?: string;
  exclude?: string[];
  showDiff?: boolean;
}

export async function runReview(options: ReviewOptions) {
  console.log('🚀 Starting AI Code Review...');

  const cliExcludes = options.exclude || [];

  const spinner = ora('🤖 正在取得 Git Diff...').start();

  try {
    let diff: string;

    if (options.from && options.to) {
      // 比較指定的 Commit 範圍
      diff = await getGitDiff(`${options.from} ${options.to}`, cliExcludes);
    } else {
      // 預設：比對 HEAD 與工作區的差異
      diff = await getGitDiff('HEAD', cliExcludes);
    }

    spinner.succeed('✅ 取得 Git Diff 完成！');

    if (!diff) {
      console.log('⚠️ 沒有檢測到程式碼變更，請確認 Diff 範圍是否正確。');
      return;
    }

    if (options.showDiff) {
      console.log('\n📤 **傳送給 AI 的 Diff 資料:**\n');
      console.log(diff);
    }

    const prompt = getDefaultPrompt();
    spinner.start('🤖 AI 正在審查程式碼，請稍候...');
    const aiResponse = await reviewCodeWithAI(diff, prompt);

    spinner.succeed('✅ AI 審查完成！');
    console.log('\n📋 **AI Code Review Result:**\n');
    console.log(aiResponse);
  } catch (error) {
    spinner.fail('❌ AI 審查失敗！');
    logError('AI 程式碼審查過程中發生錯誤', error);
  }
}
