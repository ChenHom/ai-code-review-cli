import simpleGit from 'simple-git';
import { Logger } from '../utils/logger';

const git = simpleGit();

export async function getGitDiff(range: string, cliExcludes: string[] = []): Promise<string> {
  try {
    const rangeParts = range.split(' ').filter(Boolean);
    const from = rangeParts[0] || 'HEAD';
    const to = rangeParts.length > 1 ? rangeParts[1] : '';

    const excludePatterns = cliExcludes.map((pattern) => `:(exclude)${pattern}`);

    let diff: string;
    if (to) {
      diff = await git.diff([from, to, ...excludePatterns]);
    } else {
      diff = await git.diff([from, ...excludePatterns]);
    }

    return diff;
  } catch (error: unknown) {
    Logger.error('取得 Git Diff 時發生錯誤', error);
    return '';
  }
}
