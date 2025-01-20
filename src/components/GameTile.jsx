import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AddGameModal from "./AddGameModal";

function GameTile({ onAddGame }) {

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', borderTop: '3px solid grey' }}>
            <Box
                onClick={handleOpen}
                sx={{
                    width: '60%',
                    height: '150px',
                    border: '2px solid gray',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '75px auto',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 100, 0, 0.1)',
                    },
                }}>
                <AddIcon sx={{ fontSize: '48px', color: 'gray' }}/>
                <Typography color='silver' fontSize={24}>Add New Game</Typography>
            </Box>
            <AddGameModal open={open} handleClose={handleClose} onAddGame={onAddGame} />
        </Box>
    )
}

export default GameTile;