import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import GameListPage from './pages/ActivityPage';
import ListPage from './pages/ListPage';
import ImportExportPage from './pages/ImportExportPage';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/activity' element={<GameListPage />} />
            <Route path='/listPage/' element={<ListPage />} />
            <Route path='/import-export' element={<ImportExportPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;