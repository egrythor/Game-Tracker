import { Button, Typography, Box } from '@mui/material';
import React from 'react';
import gamingImage from '../img/homePagePhoto.jpg';
import { Link } from 'react-router-dom';

function Home () {

    const media = gamingImage;

    return (
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'black',
            color: 'silver',
            height: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          >
            <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', height: '100vh'}}>
                <Box>
                    <Typography variant='h2' component='h1' gutterBottom sx={{ padding: '200px', paddingBottom: '80px', paddingTop: '150px' }}>
                        Welcome to the Virtual Game Library
                    </Typography>
                    <Typography variant='h6' gutterBottom sx={{ paddingLeft: '200px', paddingBottom: '100px', maxWidth: '80%', marginBottom: '20px' }}>
                        Your personal space to track your gaming journey. Search for games, mark your progress, and plan your next adventure!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant='contained' color='primary' sx={{ padding: '30px', borderRadius: '20px' }} key='Home' component={Link} to='/activity'>
                            <Typography variant='h6' sx={{ color: 'white', textDecoration: 'none' }} >
                                Let's Get Started
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
                    <img src={media} alt='Gaming representation' style={{ maxWidth: '100vh', maxHeight: '100vh', height: 'auto', }}/>
                </Box>
            </Box>
        </Box>
    )
}

export default Home