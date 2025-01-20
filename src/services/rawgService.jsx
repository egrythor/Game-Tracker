import axios from 'axios';

const clientId = import.meta.env.VITE_CLIENT_ID;

const rawgService = axios.create({
  baseURL: 'https://api.rawg.io/api/',
  headers: {
    'User-Agent': 'YourAppName',
  },
});

export const fetchGames = async (searchTerm) => {
  try {
    const response = await rawgService.get('games', {
      params: {
        key: clientId,
        search: searchTerm,
      },
    });
    return response.data.results ? response.data.results.map(game => ({
      name: game.name,
      image: game.background_image,
      genres: game.genres.map(genre => genre.name),
      id: game.id,
    })) : [];
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};

