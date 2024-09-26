import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query;

  try {
    const apiKey = process.env.TICKETMASTER_API_KEY || ''; 
    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events`, {
      params: {
        apikey: apiKey,
        city,
        locale: '*',
      },
    });
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching Ticketmaster data:", error);
    res.status(500).json({ error: 'Failed to fetch Ticketmaster events' });
  }
}
