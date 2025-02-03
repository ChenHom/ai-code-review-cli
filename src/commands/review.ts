import { getGitDiff } from '../core/diffProcessor';
import { reviewCodeWithAI } from '../core/openaiService';
import { getDefaultPrompt } from '../core/promptManager';
import ora from 'ora';

interface ReviewOptions {
  from: string;
  to: string;
}

export async function runReview(options: ReviewOptions) {
  console.log('🚀 Starting AI Code Review...');

  const diffRange = `${options.from} ${options.to}`;
  const diff = await getGitDiff(diffRange);

  if (!diff) {
    console.log('⚠️ 沒有檢測到程式碼變更，請確認 Diff 範圍是否正確。');
    return;
  }

  const spinner = ora('🤖 AI 正在審查程式碼，請稍候...').start();

  try {
    const prompt = getDefaultPrompt();
    const aiResponse = await reviewCodeWithAI(diff, prompt);
    spinner.succeed('✅ AI 審查完成！');

    console.log('\n📋 **AI Code Review Result:**\n');
    console.log(aiResponse);
  } catch (error) {
    spinner.fail('❌ AI 審查失敗！');
    console.error(error);
  }
}
