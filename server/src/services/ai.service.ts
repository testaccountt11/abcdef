import { GoogleGenerativeAI } from '@google/generative-ai';
import { Config } from '../config/env.js';
import { PortfolioAnalysis, ChatResponse } from '../types/ai.types.js';
import { logger } from '../utils/logger.js';

export class AIService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private chat: any;

  constructor(config: Config) {
    this.genAI = new GoogleGenerativeAI(config.gemini.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    this.initChat();
  }

  private initChat() {
    this.chat = this.model.startChat({
      history: [
        {
          role: "user",
          parts: "You are a helpful AI assistant for an educational platform. You help students with course selection, portfolio analysis, and provide learning recommendations. Your responses should be professional, friendly, concise but informative, focused on educational goals, and motivating. If the user writes in Russian or Kazakh, respond in the same language.",
        },
        {
          role: "model",
          parts: "I understand. I will act as a professional educational assistant, following all the specified principles.",
        },
      ],
    });
  }

  async generateResponse(message: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }

  async generateStreamResponse(message: string): Promise<string> {
    // For now, we'll use the non-streaming version as Gemini's streaming API is different
    return this.generateResponse(message);
  }

  resetChat() {
    this.initChat();
  }

  async analyzeChat(message: string): Promise<ChatResponse> {
    try {
      const response = await this.generateResponse(message);
      
      // Анализируем ответ и извлекаем структурированные данные
      const analysis = this.extractAnalysisFromResponse(response || '');

      return {
        message: response || 'Извините, не удалось сгенерировать ответ',
        analysis: analysis
      };
    } catch (error) {
      logger.error('Error in AI chat analysis:', error);
      throw error;
    }
  }

  async analyzePortfolio(portfolioData: any): Promise<PortfolioAnalysis> {
    try {
      const response = await this.generateResponse(JSON.stringify(portfolioData));
      return this.parseAnalysisResponse(response || '');
    } catch (error) {
      logger.error('Error in portfolio analysis:', error);
      throw error;
    }
  }

  async getEducationRecommendations(analysis: PortfolioAnalysis): Promise<string[]> {
    try {
      const response = await this.generateResponse(JSON.stringify(analysis));
      return this.parseRecommendations(response || '');
    } catch (error) {
      logger.error('Error getting education recommendations:', error);
      throw error;
    }
  }

  private extractAnalysisFromResponse(response: string): PortfolioAnalysis | undefined {
    try {
      // Пытаемся найти JSON в ответе
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Если JSON не найден, пытаемся извлечь структурированные данные из текста
      const skills = this.extractListFromText(response, ['skills', 'навыки', 'умения']);
      const recommendations = this.extractListFromText(response, ['recommendations', 'рекомендации']);
      const educationPath = this.extractListFromText(response, ['education', 'обучение', 'образование']);
      const strengths = this.extractListFromText(response, ['strengths', 'сильные стороны']);
      const areasToImprove = this.extractListFromText(response, ['improve', 'улучшить', 'развивать']);

      return {
        skills,
        recommendations,
        educationPath,
        strengths,
        areasToImprove
      };
    } catch (error) {
      logger.error('Error extracting analysis from response:', error);
      return undefined;
    }
  }

  private extractListFromText(text: string, keywords: string[]): string[] {
    const lines = text.split('\n');
    const result: string[] = [];
    let isCapturing = false;

    for (const line of lines) {
      const lineLC = line.toLowerCase();
      
      // Начинаем захват, если находим ключевое слово
      if (!isCapturing && keywords.some(keyword => lineLC.includes(keyword))) {
        isCapturing = true;
        continue;
      }

      // Прекращаем захват при пустой строке или новом заголовке
      if (isCapturing && (line.trim() === '' || line.includes(':'))) {
        isCapturing = false;
        continue;
      }

      // Захватываем строку, если она начинается с маркера списка
      if (isCapturing && (line.trim().startsWith('-') || line.trim().startsWith('•'))) {
        result.push(line.trim().replace(/^[-•]\s*/, ''));
      }
    }

    return result;
  }

  private parseAnalysisResponse(response: string): PortfolioAnalysis {
    try {
      return JSON.parse(response);
    } catch (error) {
      logger.error('Error parsing analysis response:', error);
      throw new Error('Failed to parse analysis response');
    }
  }

  private parseRecommendations(response: string): string[] {
    try {
      const recommendations = this.extractListFromText(response, ['recommendations', 'рекомендации']);
      return recommendations.length > 0 ? recommendations : response.split('\n').filter(line => line.trim());
    } catch (error) {
      logger.error('Error parsing recommendations:', error);
      throw new Error('Failed to parse recommendations');
    }
  }
} 