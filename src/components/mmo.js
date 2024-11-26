import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [gameData, setGameData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("");

  // Fetch game data
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios.get("https://mmo-games.p.rapidapi.com/games", {
          headers: {
            Accept: "application/json",
            "x-rapidapi-key": "cea8761024msh8b61fb9d9d086aep1cd5bajsnb6c064ef30c3",
            "x-rapidapi-host": "mmo-games.p.rapidapi.com",
          },
        });
        setGameData(response.data);
        setFilteredData(response.data); // Clone data to allow filtering
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    }

    fetchGames();
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    const filtered = gameData.filter((game) =>
      game.title.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  // Handle filter selection
  const handleFilter = (event) => {
    const value = event.target.value;
    setFilter(value);

    let sortedGames = [...filteredData];
    if (value === "A_TO_Z") {
      sortedGames.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "Z_TO_A") {
      sortedGames.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredData(sortedGames);
  };

  return (
    <div className="gamesWrapper">
      <div className="controls">
        <input
          id="searchInput"
          type="text"
          placeholder="Search games..."
          value={searchValue}
          onChange={handleSearch}
        />
        <select id="filter" value={filter} onChange={handleFilter}>
          <option value="">Sort By</option>
          <option value="A_TO_Z">A to Z</option>
          <option value="Z_TO_A">Z to A</option>
        </select>
      </div>

      <div className="games">
        {filteredData.length > 0 ? (
          filteredData.map((game) => (
            <div key={game.id} className="game">
              <figure className="game__img--wrapper">
                <img
                  className="game__img"
                  src={game.thumbnail}
                  alt={game.title}
                />
              </figure>
              <div className="game__title">{game.title}</div>
            </div>
          ))
        ) : (
          <p>No games found</p>
        )}
      </div>
    </div>
  );
}

export default App;
