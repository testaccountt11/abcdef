interface PortfolioAnalysis {
  skills: string[];
  recommendations: string[];
  educationPath: string[];
  strengths: string[];
  areasToImprove: string[];
}

interface ChatResponse {
  message: string;
  analysis?: PortfolioAnalysis;
}

export async function analyzeMessage(message: string): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in AI service:', error);
    throw error;
  }
}

export async function analyzePortfolio(portfolioData: any): Promise<PortfolioAnalysis> {
  try {
    const response = await fetch('/api/ai/analyze-portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ portfolio: portfolioData }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in portfolio analysis:', error);
    throw error;
  }
}

export async function getEducationRecommendations(analysis: PortfolioAnalysis): Promise<string[]> {
  try {
    const response = await fetch('/api/ai/education-recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ analysis }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting education recommendations:', error);
    throw error;
  }
} 