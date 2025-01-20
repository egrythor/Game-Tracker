import React, { useEffect, useState } from "react";
import { fetchGames } from '../services/igdbService'

function GameList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames()
            .then(response => setGames(response.data))
            .catch(error => console.error('Error fetching data', error));
    }, []);

    return (
        <div>
            <h1>Game List</h1>
            <ul>
                {games.map(game => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GameList;