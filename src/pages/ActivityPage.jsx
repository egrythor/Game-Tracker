import React, { useEffect, useRef, useState } from 'react';
import GameTile from '../components/GameTile';
import GameInfo from '../components/GameInfo';
import { Box, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Link } from 'react-router-dom';

function ActivityPage() {
  const [games, setGames] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('gameData')) || [];
    setGames(savedGames);
  }, []);

  const handleAddGame = (gameData) => {
    const existingGame = games.find(game => game.name === gameData.name);
    if (existingGame) {
      alert('This game already exists in your library.');
      return;
    }
    
    const updatedGames = [gameData, ...games];
    setGames(updatedGames);
    localStorage.setItem('gameData', JSON.stringify(updatedGames));
  };

  const handleDeleteGame = (index) => {
    const updatedGames = games.filter((_, i) => i !== index);
    setGames(updatedGames);
    localStorage.setItem('gameData', JSON.stringify(updatedGames));
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -1780,
        behavior: 'smooth'
      });
    }
  };
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 1780,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ padding: '50px', backgroundColor: 'black', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <Typography variant='h2' color='silver' gutterBottom sx={{ textAlign: 'center' }}>
        Activities
      </Typography>
      <Typography variant='h6' color='silver' gutterBottom sx={{ textAlign: 'center', paddingBottom: '40px' }}>
        Welcome to the activity page! Here you can add new games to the list and track your recent changes.<br />
        All your data is stored in the browser so remember to 
        <Link to='/import-export' style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', paddingLeft: '5px', paddingRight: '5px' }}>
          <Typography variant='h6' color='white'>
            Export your data
          </Typography>
          <ImportExportIcon sx={{ color: 'white' }}/>
        </Link>
        when changing devices or clearing cache.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconButton onClick={scrollLeft}>
          <ArrowBackIcon sx={{ color: 'white' }} />
        </IconButton>
        <Box 
          ref={containerRef}
          sx={{ 
            display: 'flex',
            overflowX: 'auto',
            gap: '20px',
            scrollSnapType: 'x mandatory',
            paddingBottom: '20px',
            flexWrap: 'nowrap',
            '@media (max-width: 550px': {
              flexDirection: 'column',
              alignItems: 'center'
            }
            }}>
            {games.map((game, index) => (
              <GameInfo key={index} {...game} onDelete={() => handleDeleteGame(index)} />
            ))}
        </Box>
        <IconButton onClick={scrollRight}>
            <ArrowForwardIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <GameTile onAddGame={handleAddGame} />
  </Box>
  );
}

export default ActivityPage;
