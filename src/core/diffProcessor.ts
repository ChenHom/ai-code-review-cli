import simpleGit from 'simple-git';

const git = simpleGit();

export async function getGitDiff(range: string): Promise<string> {
  try {
    const [from, to] = range.split(' ');  // 拆分範圍
    const diff = await git.diff([from, to]);  // 分別傳入 'HEAD~1' 和 'HEAD'
    return diff;
  } catch (error) {
    console.error('❌ Error while getting git diff:', error);
    return '';
  }
}
