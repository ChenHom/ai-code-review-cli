import { getGitDiff } from '../core/diffProcessor';

interface ReviewOptions {
  from: string;
  to: string;
}

export async function runReview(options: ReviewOptions) {
  console.log('🚀 Starting AI Code Review...');

  const diffRange = `${options.from} ${options.to}`;
  const diff = await getGitDiff(diffRange);
  console.log('🔍 Diff obtained:\n', diff);
}
