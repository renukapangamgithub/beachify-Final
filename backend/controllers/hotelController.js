import axios from 'axios';
import dotenv from 'dotenv';
import Hotel from '../models/hotelModel.js';

dotenv.config();

let tokenCache = {
  access_token: null,
  expires_at: null,
};

// Get and cache Amadeus token
async function getAccessToken() {
  const now = Date.now();
  if (tokenCache.access_token && tokenCache.expires_at > now) {
    return tokenCache.access_token;
  }

  const response = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }
  );

  const { access_token, expires_in } = response.data;
  tokenCache = {
    access_token,
    expires_at: now + expires_in * 1000,
  };

  return access_token;
}

// Fetch all hotels from local DB
export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get hotels near lat/lng using Amadeus
export const getHotelsNearLocation = async (req, res) => {
  try {
    const { lat, lng, radiusInMeters = 5000 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Please provide lat and lng query parameters.' });
    }

    const token = await getAccessToken();

    const response = await axios.get(
      'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          radius: radiusInMeters / 1000, // in KM
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching real-time hotels:', error.response?.data || error.message);
    res.status(500).json({ error: 'Amadeus API error' });
  }
};

// Search hotels by location name (e.g., "Goa", "Juhu Beach")
export const searchHotelsByTextLocation = async (req, res) => {
  try {
    const { location, radiusInMeters = 5000 } = req.query;

    if (!location) {
      return res.status(400).json({ error: 'Please provide a location in the query.' });
    }

    const token = await getAccessToken();

    // Removed 'POINT_OF_INTEREST' since it causes invalid data error
    const subTypes = ['CITY', 'AIRPORT'];
    let geoData = null;

    for (const subType of subTypes) {
      try {
        const geoRes = await axios.get(
          'https://test.api.amadeus.com/v1/reference-data/locations',
          {
            headers: { Authorization: `Bearer ${token}` },
            params: {
              keyword: location,
              subType,
            },
          }
        );

        if (geoRes.data.data?.length > 0 && geoRes.data.data[0].geoCode) {
          geoData = geoRes.data.data[0];
          break;
        }
      } catch (err) {
        console.warn(`Amadeus lookup failed for subType ${subType}:`, err.response?.data || err.message);
        // Try next subtype
      }
    }

    // If no valid geoData from Amadeus, fallback to Nominatim OpenStreetMap
    if (!geoData || !geoData.geoCode) {
      console.log('Falling back to Nominatim for location:', location);

      const fallbackRes = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
        {
          headers: {
            'User-Agent': 'Beachify/1.0 (contact@yourdomain.com)', // Add your contact/email here
          },
        }
      );

      if (!fallbackRes.data || fallbackRes.data.length === 0) {
        return res.status(404).json({ error: 'Location not found via Amadeus or Nominatim.' });
      }

      const fallbackLoc = fallbackRes.data[0];
      geoData = {
        geoCode: {
          latitude: parseFloat(fallbackLoc.lat),
          longitude: parseFloat(fallbackLoc.lon),
        },
      };
    }

    const { latitude, longitude } = geoData.geoCode;

    const hotelRes = await axios.get(
      'https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          latitude,
          longitude,
          radius: radiusInMeters / 1000,
        },
      }
    );

    res.json(hotelRes.data);
  } catch (error) {
    console.error('Error in searchHotelsByTextLocation:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error searching for hotels' });
  }
};

