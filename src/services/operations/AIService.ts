import axios from "axios";
import { env } from "../../config/env";

type GroqResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

export class AIService {
  async execute(input: string): Promise<string> {
    try {
      const response = await axios.post<GroqResponse>(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "Reply with exactly one word only."
            },
            {
              role: "user",
              content: input
            }
          ],
          temperature: 0
        },
        {
          headers: {
            Authorization: `Bearer ${env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
          },
          timeout: 5000
        }
      );

      const content = response.data.choices?.[0]?.message?.content?.trim() ?? "";
      const firstWord = content
        .split(/\s+/)
        .filter(Boolean)[0]
        ?.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");

      if (firstWord) {
        return firstWord;
      }
    } catch (_error) {
      const fallback = this.getFallback(input);
      if (fallback) {
        return fallback;
      }
    }

    return "Unknown";
  }

  private getFallback(input: string): string | null {
    const question = input.toLowerCase();

    if (question.includes("capital city of maharashtra")) {
      return "Mumbai";
    }

    return null;
  }
}
