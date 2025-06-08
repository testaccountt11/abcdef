export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const API_KEY = 'AIzaSyD5oY333wwcPGX5eDeKRlM6CzbylkEvXyY';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = `Ты - полезный AI ассистент для образовательной платформы. 
Ты помогаешь студентам с выбором курсов, анализом их портфолио и даешь рекомендации по обучению.
Твои ответы должны быть:
- Профессиональными и дружелюбными
- Краткими, но информативными
- Сфокусированными на образовательных целях
- Мотивирующими к обучению

Если пользователь пишет на русском или казахском - отвечай на том же языке.`;

export class AIService {
  private static history: { role: string; text: string }[] = [
    { role: 'user', text: SYSTEM_PROMPT },
  ];

  static async sendMessage(message: string): Promise<string> {
    try {
      // Add user message to history
      this.history.push({ role: 'user', text: message });

      // Prepare the request body
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: this.history.map(msg => `${msg.role}: ${msg.text}`).join('\n')
              }
            ]
          }
        ]
      };

      // Make the API request
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error Response:', errorData);
        throw new Error(`API request failed: ${response.status} ${response.statusText}${errorData ? '\n' + JSON.stringify(errorData, null, 2) : ''}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error('Unexpected API response format:', data);
        throw new Error('Unexpected API response format');
      }

      const responseText = data.candidates[0].content.parts[0].text;

      // Add assistant response to history
      this.history.push({ role: 'assistant', text: responseText });

      // Keep only last 10 messages in history (including system prompt)
      if (this.history.length > 11) {
        this.history = [
          this.history[0],
          ...this.history.slice(-10)
        ];
      }

      return responseText;
    } catch (error) {
      console.error('Error in AI service:', error);
      throw error;
    }
  }

  static clearHistory() {
    this.history = [{ role: 'user', text: SYSTEM_PROMPT }];
  }
} 