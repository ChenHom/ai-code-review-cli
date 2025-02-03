import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function reviewCodeWithAI(diff: string, prompt: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: `請根據以下程式碼 Diff 提供審查建議：\n\n${diff}` },
      ],
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || '⚠️ 沒有獲得有效的回應。';
  } catch (error: any) {
    console.error('❌ Error while calling OpenAI API:', error.response?.data || error.message);
    return '⚠️ OpenAI API 呼叫失敗，請檢查設定或稍後再試。';
  }
}
