interface QualityScore {
  readability: number;
  maintainability: number;
  potentialIssues: number;
  performance: number;
  comments: string;
}

export function calculateOverallScore(score: QualityScore): number {
  const total =
    score.readability +
    score.maintainability +
    score.potentialIssues +
    score.performance;
  return Math.round(total / 4);
}

export function formatQualityScore(score: QualityScore): string {
  const overallScore = calculateOverallScore(score);

  return `
📊 Code Quality Score: ${overallScore}/100
-------------------------------
- 📝 Readability:       ${score.readability}
- 🛠️ Maintainability:   ${score.maintainability}
- 🚩 Potential Issues:  ${score.potentialIssues}
- ⚡ Performance:       ${score.performance}
-------------------------------
💡 Comments:
${score.comments}
  `;
}

// 模擬 AI 回應解析
export function parseAIResponse(response: string) {
  const scoreRegex = /📝 Readability:\s*(\d+).*?🛠️ Maintainability:\s*(\d+).*?🚩 Potential Issues:\s*(\d+).*?⚡ Performance:\s*(\d+)/s;
  const match = response.match(scoreRegex);

  if (!match) {
    throw new Error('無法解析 AI 回應，請確認格式是否正確。');
  }

  return {
    readability: parseInt(match[1], 10),
    maintainability: parseInt(match[2], 10),
    potentialIssues: parseInt(match[3], 10),
    performance: parseInt(match[4], 10),
    comments: response.split('Comments:')[1]?.trim() || '',
  };
}
