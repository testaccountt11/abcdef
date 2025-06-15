import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch('YOUR_COMPETITION_API_ENDPOINT', {
      headers: {
        'Authorization': `Bearer ${process.env.COMPETITION_API_KEY}`,
        'X-Api-Secret': process.env.COMPETITION_API_SECRET,
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching competitions:', error);
    res.status(500).json({ message: 'Error fetching competitions' });
  }
} 