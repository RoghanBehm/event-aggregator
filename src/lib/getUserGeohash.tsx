import ngeohash from 'ngeohash';

interface UserLocation {
    latitude: number;
    longitude: number;
  }
  

  async function getUserGeohash(): Promise<string | null> {
    try {
      const location: UserLocation = await getUserLocation();
      const geohash = ngeohash.encode(location.latitude, location.longitude);
      return geohash;
    } catch (error) {
      console.error('Error getting user geohash:', error);
      return null;
    }
  }