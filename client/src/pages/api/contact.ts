import { contactRequests, insertContactRequestSchema } from '@shared/schema';
import { NextApiRequest, NextApiResponse } from 'next';
import z from 'node_modules/zod/lib';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, subject, message } = req.body;

  // Валидация входящих данных
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Make a request to the server API endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/db/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'NEW',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error submitting contact request');
    }

    const data = await response.json();

    return res.status(201).json({ 
      success: true, 
      message: 'Contact request submitted successfully',
      id: data.id 
    });
  } catch (error) {
    console.error('Error creating contact request:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to submit contact request' 
    });
  }
} 

export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>; 