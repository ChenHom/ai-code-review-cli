import inquirer from 'inquirer';
import { runReview } from './review';
import { getAvailablePromptTemplates } from '../core/promptManager';
import { parseAIResponse, formatQualityScore } from '../core/qualityScoreService'; // 確認已匯入

export async function runInteractiveMode() {
  console.log('🚀 歡迎使用 AI Code Reviewer\n');

  const templates = await getAvailablePromptTemplates();

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'promptTemplate',
      message: '請選擇要使用的 Prompt 模板：',
      choices: [...templates, '使用預設模板'],
    },
    {
      type: 'list',
      name: 'diffRange',
      message: '請選擇要比對的範圍：',
      choices: [
        { name: 'HEAD~1 到 HEAD', value: { from: 'HEAD~1', to: 'HEAD' } },
        { name: 'HEAD~2 到 HEAD', value: { from: 'HEAD~2', to: 'HEAD' } },
        { name: '僅比較 HEAD', value: { from: 'HEAD' } },
        { name: '自訂範圍', value: 'custom' },
      ],
    },
    {
      type: 'input',
      name: 'customRange',
      message: '請輸入自訂範圍 (格式: from to)：',
      when: (answers) => answers.diffRange === 'custom',
      validate: (input) => {
        const parts = input.trim().split(' ');
        return parts.length === 2 || '請輸入正確的格式 (例如: HEAD~1 HEAD)';
      },
    },
    {
      type: 'confirm',
      name: 'showDiff',
      message: '是否顯示 Diff 資料？',
      default: false,
    },
    {
      type: 'confirm',
      name: 'showQualityScore',
      message: '是否顯示程式碼品質評分？',
      default: false,
    },
  ]);

  const reviewOptions: any = {
    promptTemplate: answers.promptTemplate !== '使用預設模板' ? answers.promptTemplate : undefined,
    showDiff: answers.showDiff,
    showQualityScore: answers.showQualityScore,
  };

  if (answers.diffRange === 'custom') {
    const [from, to] = answers.customRange.trim().split(' ');
    reviewOptions.from = from;
    reviewOptions.to = to;
  } else {
    reviewOptions.from = answers.diffRange.from;
    reviewOptions.to = answers.diffRange.to;
  }

  await runReview(reviewOptions);
}
