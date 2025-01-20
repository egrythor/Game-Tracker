import { Button, TextField, Typography, Modal, Box, ListItem, ListItemText, List, MenuItem, Select } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { fetchGames } from '../services/rawgService';
import _ from 'lodash';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  backgroundColor: 'silver',
  borderRadius: '20px',
};

function AddGameModal({ open, handleClose, onAddGame }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState('');
  const [progression, setProgression] = useState('');
  const [score, setScore] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [scoreError, setScoreError] = useState('');

  const debouncedFetchGames = useCallback(
    _.debounce((term) => {
      if (term.trim()) {
        fetchGames(term)
          .then(response => setGames(response))
          .catch(error => console.error('Error fetching data', error));
      } else {
        setGames([]);
      }
    }, 500), []
  );

  useEffect(() => {
    debouncedFetchGames(searchTerm);
  }, [searchTerm, debouncedFetchGames]);

  const handleGameClick = (game) => {
    setSelectedGame(game.name);
    setSearchTerm(game.name);
    setGames([]);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsTyping(true);
  };

  const handleProgressionChange = (e) => {
    setProgression(e.target.value);
    if (e.target.value === 'Plan to Play') {
      setScore('-');
    } else {
      setScore('');
    }
  };

  const handleScoreChange = (e) => {
    setScore(e.target.value);
  };

  const clearModalData = () => {
    setSearchTerm('');
    setSelectedGame('');
    setProgression('');
    setScore('');
    setScoreError('');
  };

  const saveGameDataToLocal = (gameData) => {
    const existingData = JSON.parse(localStorage.getItem('gameData')) || [];
    if (!existingData.some(savedGame => savedGame.name === gameData.name)) {
      existingData.push(gameData);
      localStorage.setItem('gameData', JSON.stringify(existingData));
    }};

  const handleAddGame = () => {
    if (score !== '-' && (!Number.isInteger(Number(score)) || Number(score) < 1 || Number(score) > 10)) {
      setScoreError('Score must be a whole number between 1 and 10, or "-"');
      return;
    }  else {
      setScoreError('');
    }

    const game = games.find(game => game.name === selectedGame);
    if (!game) {
      alert('Please select a game from the list.');
      return;
    }

    const gameData = {
      name: selectedGame,
      progression: progression,
      score: score,
      image: game.image || '',
      tags: game.genres || [],
    };

    const existingGames = JSON.parse(localStorage.getItem('gameData')) || [];
    const isDuplicate = existingGames.some(savedGame => savedGame.name === gameData.name);
    if (isDuplicate) {
      alert('This game already exists in your library.');
      return;
    }

    onAddGame(gameData);
    saveGameDataToLocal(gameData);
    console.log('Game added: ', gameData);
    handleClose();
    clearModalData();
  };
  
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        clearModalData();
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ display: 'flex', justifyContent: 'center' }}>
          Add New Game
        </Typography>
        <TextField
          fullWidth
          label='Search Games'
          value={searchTerm || selectedGame}
          onChange={handleInputChange}
          sx={{ mt: 2, mb: 2 }}
        />
        {isTyping && searchTerm.trim() && games.length > 0 && (
          <Box sx={{ maxHeight: 200, overflow: 'auto' }}>
            <List>
              {games.map(game => (
                <ListItem button='true' key={game.id} onClick={() => handleGameClick(game)} sx={{ cursor: 'pointer' }}>
                  <ListItemText primary={game.name} />
                </ListItem>
              ))} 
            </List>
          </Box>
        )}
        <Select
          fullWidth
          displayEmpty
          value={progression}
          onChange={handleProgressionChange}
          sx={{ mb: 2 }}  
        >
          <MenuItem value='' disabled>
            Select Progression
          </MenuItem>
          <MenuItem value='Plan to Play'>Plan to play</MenuItem>
          <MenuItem value='Playing'>Playing</MenuItem>
          <MenuItem value='Finished'>Finished</MenuItem>
        </Select>
        <TextField 
          fullWidth 
          label='Score' 
          type='number'
          value={score}
          onChange={handleScoreChange}
          slotProps={{ min: 1, max: 10, step: 1 }}
          disabled={progression === 'Plan to Play'}
          sx={{ mb: 2 }} 
          helperText={scoreError}
          error={Boolean(scoreError)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant='contained' color='primary' size='large' onClick={handleAddGame}>
            Add Game
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddGameModal;
