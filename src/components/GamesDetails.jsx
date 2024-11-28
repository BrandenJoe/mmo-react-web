import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GameDetails.css';

const GameDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Hook to navigate between routes
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the game details when the component mounts
    async function fetchGameDetails() {
      try {
        const response = await axios.get(
          `https://mmo-games.p.rapidapi.com/game?id=${id}`,
          {
            headers: {
              'x-rapidapi-key': 'cea8761024msh8b61fb9d9d086aep1cd5bajsnb6c064ef30c3',
              'x-rapidapi-host': 'mmo-games.p.rapidapi.com',
            },
          }
        );
        setGame(response.data);
      } catch (error) {
        console.error('Failed to fetch game details:', error);
        setError('Failed to load game details.');
      } finally {
        setLoading(false);
      }
    }

    fetchGameDetails();
  }, [id]);

  if (loading) return <p>Loading game details...</p>;
  if (error) return <p>{error}</p>;

  // Clean the description to remove inline styles
  const cleanDescription = game.description.replace(/style="[^"]*"/g, '');

  return (
  
    <div className="game-details">
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <h1>{game.title}</h1>
      <img src={game.thumbnail} alt={game.title} />
      {/* Render cleaned description */}
      <p dangerouslySetInnerHTML={{ __html: cleanDescription }} />
      <a href={game.game_url} target="_blank" rel="noopener noreferrer">
        Play Now
      </a>
    </div>
  );
};

export default GameDetails;
