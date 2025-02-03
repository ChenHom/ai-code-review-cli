import simpleGit from 'simple-git';

const git = simpleGit();

export async function getGitDiff(range: string): Promise<string> {
  try {
    const [from, to] = range.split(' ');
    if (!from || !to) {
      throw new Error('❗ Invalid diff range. Please specify both --from and --to.');
    }

    // 確認 commit 是否存在
    await git.revparse([from]);
    await git.revparse([to]);

    const diffRange = `${from}..${to}`;
    const diff = await git.diff([diffRange]);
    return diff;
  } catch (error) {
    console.error('❌ Error while getting git diff:', error);
    return '';
  }
}
