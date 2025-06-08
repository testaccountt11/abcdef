declare module '@google/generative-ai' {
  export class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(config: { model: string }): GenerativeModel;
  }

  export interface GenerationConfig {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
  }

  export interface ChatHistory {
    role: string;
    parts: Array<{ text: string }>;
  }

  export interface GenerationContent {
    contents: Array<{
      role: string;
      parts: Array<{ text: string }>;
    }>;
  }

  export interface GenerativeModel {
    startChat(config: {
      history: ChatHistory[];
      generationConfig?: GenerationConfig;
    }): Promise<ChatSession>;
    generateContent(content: string | GenerationContent): Promise<ContentResponse>;
  }

  export interface ChatSession {
    sendMessage(message: Array<{ text: string }>): Promise<ChatResponse>;
  }

  export interface ChatResponse {
    response: {
      text(): string;
    };
  }

  export interface ContentResponse {
    response: {
      text(): string;
    };
  }
} 