import simpleGit from 'simple-git';
import { logError } from '../utils/logger';

const git = simpleGit();

export async function getGitDiff(range: string, cliExcludes: string[] = []): Promise<string> {
  try {
    const excludePatterns = cliExcludes.map((pattern) => `:(exclude)${pattern}`);

    if (range === 'HEAD') {
      // 比較 HEAD 與當前工作區
      return await git.diff(['HEAD', ...excludePatterns]);
    }

    const [from, to] = range.split(' ');
    return await git.diff([from, to, ...excludePatterns]);
  } catch (error: unknown) {
    logError('取得 Git Diff 時發生錯誤', error);
    return '';
  }
}
