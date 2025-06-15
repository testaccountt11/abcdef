import express from 'express';
import axios from 'axios';

const router = express.Router();
const API_TOKEN = 'OPQJC3ZIRSGY44OTGII5';
const TIMEPAD_API_URL = 'https://api.timepad.ru/v1';

router.get('/events', async (req, res) => {
  try {
    const { skip = 0, limit = 20 } = req.query;
    
    // Получаем текущую дату для фильтрации будущих событий
    const now = new Date().toISOString();
    
    const response = await axios.get(`${TIMEPAD_API_URL}/events`, {
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
      },
      params: {
        limit,
        skip,
        sort: '+starts_at',
        starts_at_min: now,
        fields: ['description', 'poster_image', 'location', 'organization', 'tickets_limit', 'registration_data'].join(','),
        organization_ids: '',
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('TimePad API Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch events from TimePad',
      details: error.response?.data || error.message 
    });
  }
});

export default router; 