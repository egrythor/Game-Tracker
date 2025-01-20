import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Table, Typography } from "@mui/material";
import React, { useState } from "react";

function GameTable ({ games }) {
    const [sortConfig, setSortConfig] = useState({ key: 'dateAdded', direction: 'ascending' });

    const sortedGames = [...games].sort((a, b) => {
        if (sortConfig.key === 'score') {
            const scoreA = parseFloat(a.score);
            const scoreB = parseFloat(b.score);

            if (isNaN(scoreA) && isNaN(scoreB)) {
                return 0;
            }
            if (isNaN(scoreA)) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            if (isNaN(scoreB)) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            return sortConfig.direction === 'ascending' ? scoreA - scoreB : scoreB - scoreA;
        }

        const valueA = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : '';
        const valueB = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : '';

        if (valueA < valueB) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

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

    return (
        <TableContainer component={Box} sx={{
            backgroundColor: 'primary.main',
            borderRadius: '10px',
            border: '2px solid green',
            overflow: 'hidden'
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => requestSort('index')} sx={{ color: 'silver', cursor: 'pointer', textAlign: 'center' }}>#
                            {sortConfig.key === 'index'}
                        </TableCell>
                        <TableCell onClick={() => requestSort('name')} sx={{ color: 'silver', cursor: 'pointer', textAlign: 'center' }}>Name
                            {sortConfig.key === 'name' ? sortConfig.direction === 'ascending' ? <ArrowUpward /> : <ArrowDownward /> : null}
                        </TableCell>
                        <TableCell onClick={() => requestSort('score')} sx={{ color: 'silver', cursor: 'pointer', textAlign: 'center' }}>Score
                            {sortConfig.key === 'score' ? sortConfig.direction === 'ascending' ? <ArrowUpward /> : <ArrowDownward /> : null}
                        </TableCell>
                        <TableCell onClick={() => requestSort('progression')} sx={{ color: 'silver', cursor: 'pointer', textAlign: 'center' }}>Progression
                            {sortConfig.key === 'progression' ? sortConfig.direction === 'ascending' ? <ArrowUpward /> : <ArrowDownward /> : null}
                        </TableCell>
                        <TableCell sx={{ color: 'silver', textAlign: 'center' }}>Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedGames.map((game, index) => (
                        <TableRow key={index} sx={{ backgroundColor: index % 2 ? '#333' : '#444' }}>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '1.5rem' }}>{index + 1}</Typography>
                            </TableCell>
                            <TableCell sx={{ color: 'white' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {game.image && <img src={game.image} alt={`${game.name} cover`} style={{
                                        width: '250px',
                                        height: 'auto',
                                        marginRight: '10px',
                                        borderRadius: '5px'
                                        }} />}
                                    <Typography sx={{ fontSize: '1.5rem' }}>{game.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ color: 'white', textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '1.5rem' }}>{game.score}</Typography>
                            </TableCell>
                            <TableCell sx={{ color: getProgressionColor(game.progression), textAlign: 'center' }}>
                                <Typography sx={{ fontSize: '1.5rem' }}>{game.progression}</Typography>
                            </TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>
                                <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {game.tags && game.tags.map(tag => (
                                        <Typography key={tag} variant="caption" sx ={{
                                            color: 'white',
                                            backgroundColor: '#333',
                                            padding: '5px 10px',
                                            borderRadius: '5px',
                                            fontSize: '1rem'
                                        }}>
                                            {tag}
                                        </Typography>
                                    ))}
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default GameTable;