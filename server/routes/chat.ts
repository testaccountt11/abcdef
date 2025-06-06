import express from 'express';
import fetch from 'node-fetch';

interface Message {
  role: string;
  text: string;
}

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages, apiKey } = req.body;

    if (!messages || !apiKey) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const lastMessage = messages[messages.length - 1];

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [{ text: messages.map((msg: Message) => `${msg.role}: ${msg.text}`).join('\n') }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error('Gemini API Error:', error);
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected API response format:', data);
      return res.status(500).json({ error: 'Unexpected API response format' });
    }

    res.json({ text: data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 