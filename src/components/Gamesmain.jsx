import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Gamesmain = () => {
  const [gameData, setGameData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await axios.get('https://mmo-games.p.rapidapi.com/games', {
          headers: {
            'x-rapidapi-key': 'cea8761024msh8b61fb9d9d086aep1cd5bajsnb6c064ef30c3',
            'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
          },
        });
        setGameData(response.data);
      } catch (error) {
        console.error('Failed to fetch games:', error);
        setError('Failed to load games.');
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const filteredData = gameData
    .filter((game) =>
      game.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === 'A_TO_Z') return a.title.localeCompare(b.title);
      if (filter === 'Z_TO_A') return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <main id="games__main">
      <section>
        <div className="container">
          <div className="row">
            <div className="game__header">
              <h1 className="header__title">All of Your Top and Favorite MMO's</h1>
              <h2 className="header__subtitle">Find Your MMO Here</h2>
              <div className="input__wrapper">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search by Name"
                  className="search__input"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <select
                  id="filter"
                  className="filter__option"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">Filter</option>
                  <option value="A_TO_Z">A TO Z</option>
                  <option value="Z_TO_A">Z TO A</option>
                </select>
              </div>
            </div>
            <div className="games">
              {loading ? (
                <p>Loading games...</p>
              ) : error ? (
                <p>{error}</p>
              ) : filteredData.length > 0 ? (
                filteredData.map((game) => (
                  <div key={game.id} className="game">
                    <Link to={`/game/${game.id}`}>
                      <figure className="game__img--wrapper">
                        <img
                          className="game__img"
                          src={game.thumbnail}
                          alt={game.title}
                        />
                      </figure>
                      <div className="game__title">{game.title}</div>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No games found</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Gamesmain;
