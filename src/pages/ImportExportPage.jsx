import React from 'react';
import { Box, Button } from '@mui/material';

const ImportExportPage = () => {
  const exportDataToJSON = () => {
    const data = JSON.parse(localStorage.getItem('gameData')) || [];
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gameData.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importDataFromJSON = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        localStorage.setItem('gameData', JSON.stringify(data));
        // Optionally, update your state here if needed
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box sx={{ 
        backgroundColor: 'black', 
        color: 'white', 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        }}>
        <input
            accept="application/json"
            id="import-data-file"
            type="file"
            style={{ display: 'none' }}
            onChange={importDataFromJSON}
        />
        <label htmlFor="import-data-file">
            <Button variant='contained' color='primary' component="span">
            Import Data
            </Button>
        </label>
        <Button variant='contained' color='primary' onClick={exportDataToJSON} sx={{ mt: 2 }}>
            Export Data
        </Button>
    </Box>
  );
};

export default ImportExportPage;
