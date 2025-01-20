import React, { useEffect, useState } from "react";
import { Box, Typography, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import GameTable from "../components/GameTable";

function ListPage() {
    const [games, setGames] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('dateAdded');

    useEffect(() => {
        const savedGames = JSON.parse(localStorage.getItem('gameData')) || [];
        const gamesWithDates = savedGames.map(game => ({ ...game, dateAdded: game.dateAdded || new Date().toISOString() }));
        setGames(gamesWithDates);
        localStorage.setItem('gameData', JSON.stringify(gamesWithDates));
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const filteredGames = games.filter(game => (filter ? game.progression === filter : true));

    const sortedGames = [...filteredGames].sort((a, b) => {
        if (sortOrder === 'alpha') {
            return a.name.localeCompare(b.name);
        }
        if (sortOrder === 'dateAdded') {
            return new Date(a.dateAdded) - new Date(b.dateAdded);
        }

        const scoreA = parseFloat(a.score);
        const scoreB = parseFloat(b.score);

        if (isNaN(scoreA) && isNaN(scoreB)) {
            return a.name.localeCompare(b.name);
        }
        //ascending end, descending start
        if (isNaN(scoreA)) {
            return sortOrder === 'asc' ? -1 : 1
        }
        if (isNaN(scoreB)) {
            return sortOrder === 'asc' ? 1: -1
        }

        if (sortOrder === 'asc') {
            return scoreA - scoreB;
        } else if (sortOrder === 'desc') {
            return scoreB - scoreA;
        } else {
            return 0; //no sorting
        }
    });

    return(
        <Box sx={{
            padding: '50px',
            backgroundColor: 'black',
            minHeight: '100vh'
        }}>
            <Typography variant="h2" color='silver' gutterBottom sx={{ textAlign: 'center' }}>
                Game List
            </Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 3,
                mb: 4
            }}>
                <FormControl variant="outlined" sx={{ minWidth: 200, color: 'silver' }}>
                    <InputLabel sx={{ 
                        color: 'silver',
                        '&.Mui-focused': {
                            color: 'silver'
                        }
                        }}>
                            <FilterListIcon /> Filter
                    </InputLabel>
                    <Select value={filter} onChange={handleFilterChange} label='Filter' sx={{
                        color: 'silver',
                        borderColor: 'silver',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'silver',
                        },
                        '& .MuiSelect-icon': {
                            color: 'silver',
                        },
                        '& .MuiInputLabel-root': {
                            color: 'silver',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'silver',
                        }
                    }}>
                        <MenuItem value=''><em>All</em></MenuItem>
                        <MenuItem value='Plan to Play'>Plan to Play</MenuItem>
                        <MenuItem value='Playing'>Playing</MenuItem>
                        <MenuItem value='Finished'>Finished</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 200, color: 'silver' }}>
                    <InputLabel sx={{ color: 'silver', '&.Mui-focused' : { color: 'silver' } }}><SortIcon /> Sort</InputLabel>
                    <Select value={sortOrder} onChange={handleSortChange} label='Sort' sx={{
                        color: 'silver',
                        borderColor: 'silver',
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline' : {
                            borderColor: 'silver',
                        },
                        '& .MuiSelect-icon': {
                            color: 'silver'
                        },
                        '& .MuiInputLabel-root': {
                            color: 'silver',
                        },
                        '& .MuiInputLabel-root.Mui-focused' : {
                            color: 'silver',
                        },
                    }}>
                        <MenuItem value='dateAdded'>By Date Added</MenuItem>
                        <MenuItem value='asc'>Score Ascending</MenuItem>
                        <MenuItem value='desc'>Score Descending</MenuItem>
                        <MenuItem value='alpha'>Alphabetical</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <GameTable games={sortedGames} />
        </Box>
    );
}

export default ListPage;