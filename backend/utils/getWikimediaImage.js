import axios from 'axios';
import getUnsplashImage from './getUnsplashImage.js';

const getWikimediaImage = async (beachName) => {
  try {
    const searchTerm = `${beachName} beach india`;

    const apiUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(
      searchTerm
    )}&gsrlimit=1&prop=imageinfo&iiprop=url&origin=*`;

    const response = await axios.get(apiUrl);
    const pages = response.data.query?.pages;
    const firstPage = pages ? Object.values(pages)[0] : null;
    const wikiImageUrl = firstPage?.imageinfo?.[0]?.url || null;

    // Fallback to Unsplash if no Wikimedia image
    if (!wikiImageUrl) {
      return await getUnsplashImage(beachName);
    }

    return wikiImageUrl;
  } catch (error) {
    console.error('Wikimedia fetch error:', error.message);
    return await getUnsplashImage(beachName);
  }
};

export default getWikimediaImage;
