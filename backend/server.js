const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const clientId = process.env.VITE_CLIENT_ID;

app.get('/games', async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: clientId,
        search: searchTerm,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).send('Error fetching games');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
