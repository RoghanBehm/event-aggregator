import axios from 'axios';

export const fetchTicketmasterEvents = async (apiKey: string, city: string) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json`;
  
  try {
    const response = await axios.get(url, {
      params: {
        apikey: apiKey,
        city,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events from Ticketmaster');
  }
};



export const fetchAutoComplete = async (apiKey: string, input: string) => {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json`;
  
  try {
    const response = await axios.get(url, {
      params: {
        apikey: apiKey,
        keyword: input,
        includeSpellCheck: "yes",
        
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events from Ticketmaster');
  }
};
