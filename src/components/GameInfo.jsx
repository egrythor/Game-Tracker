import { Typography, Box, Button } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const getProgressionColor = (progression) => {
    switch (progression) {
        case 'Plan to Play':
            return 'grey';
        case 'Playing':
            return 'green';
        case 'Finished':
            return '#0594FDFF';
        default:
            return 'black';
    }
};

const GameInfo = ({ name, progression, score, image, tags, onDelete }) => {
    return (
        <Box sx={{
            position: 'relative',
            border: '1px solid gray',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#clclcl',
            borderRadius: '10px',
            width: '550px',
            flexShrink: 0,
            '&:hover .delete-icon': {
                opacity: 1,
                pointerEvents: 'auto',
            },
            '&:hover': {
                transform: 'scale(0.98)',
            },
            transition: 'transform .3s',
        }}>
            <Button
                className='delete-icon'
                variant="contained"
                color="secondary"
                size="small"
                onClick={onDelete}
                sx={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    minWidth: '24px',
                    width: '24px',
                    minHeight: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity .3s',
                }}
                >
                <CloseIcon sx={{ fontSize: '20px' }} />
            </Button>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flex: '1 1 60%', maxWidth: '60%', marginRight: '20px' }}>
                    {image && <img src={image} alt={`${name} cover`} style={{ width: '100%', height: 'auto', borderRadius: '10px' }} />}
                </Box>
                <Box sx={{
                    flex: '1 1 40%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around'
                }}>
                    <Typography variant="h5" sx={{ color: 'white' }}>{name}</Typography>
                    <Typography variant="body1" sx={{ color: getProgressionColor(progression) }}>Progression: {progression}</Typography>
                    <Typography variant="body1" sx={{ color: 'white' }}>Score: {score}</Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: '10px',
                        flexWrap: 'wrap',
                        marginTop: '10px'
                    }}>
                        {tags && tags.map(tag => (
                            <Typography key={tag} variant="caption" sx={{
                                color: 'white',
                                backgroundColor: '#333',
                                padding: '5px 10px',
                                borderRadius: '5px'
                            }}>
                                {tag}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default GameInfo;