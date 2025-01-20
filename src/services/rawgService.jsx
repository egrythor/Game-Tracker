import axios from 'axios';

export const fetchGames = async (searchTerm) => {
  try {
    const response = await axios.get('http://localhost:3001/games', {
      params: { search: searchTerm },
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

