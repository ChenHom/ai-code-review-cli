import inquirer from 'inquirer';
import { runReview } from './review';
import { getAvailablePromptTemplates } from '../core/promptManager';

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
        return parts.length === 2 || '請輸入正確格式（如：HEAD~3 HEAD）';
      },
    },
    {
      type: 'confirm',
      name: 'showDiff',
      message: '是否要顯示傳送給 AI 的 Diff？',
      default: false,
    },
  ]);

  const { promptTemplate, diffRange, customRange, showDiff } = answers;

  const range =
    diffRange === 'custom'
      ? { from: customRange.split(' ')[0], to: customRange.split(' ')[1] }
      : diffRange;

  await runReview({
    from: range.from,
    to: range.to,
    showDiff,
    promptTemplate: promptTemplate === '使用預設模板' ? undefined : promptTemplate,
  });
}
