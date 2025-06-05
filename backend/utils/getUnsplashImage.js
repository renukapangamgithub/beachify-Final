import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const getUnsplashImage = async (beachName) => {
  try {
    const searchTerm = `${beachName} beach india`;

    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query: searchTerm,
        orientation: 'landscape',
        per_page: 1,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    const imageUrl = response.data.results?.[0]?.urls?.regular || null;
    return imageUrl;
  } catch (error) {
    console.error('Unsplash image fetch error:', error.message);
    return null;
  }
};

export default getUnsplashImage;
