import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Activity', path: '/activity' },
  { name: 'List Page', path: '/listPage' },
  { name: 'Import/Export', path: '/import-export' }
];

function Header() {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position='static'>
        <Toolbar>
          <Box sx={{ width: '25%', textAlign: 'left'}}>
            <Typography variant="h5">
                  Virtual Game Library
              </Typography>
          </Box>

            <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
              {navigation.map((nav) => (
                <MenuItem key={nav.name} component={Link} to={nav.path}>
                  <Typography sx={{ textAlign: 'center' }}>{nav.name}</Typography>
                </MenuItem>
              ))}
            </Box>

            <Box sx={{ width: '25%', textAlign: 'right'}}>
              <IconButton
                size='large'
                aria-controls='menu-app-bar'
                aria-haspopup='true'
                onClick={handleMenuClick}
                color='inherit'
              >
                  <MenuIcon />
              </IconButton>

              <Menu
                id='menu-app-bar'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {navigation.map((nav) => (
                  <MenuItem key={nav.name} component={Link} to={nav.path} onClick={handleMenuClose}>
                  {nav.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
        </Toolbar>
    </AppBar>
  );
}

export default Header;