import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { getPlayers } from '../services/playerService';
import PlayerCard from '../components/PlayerCard';

function HomePrivate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const loadPlayers = async () => {
      const data = await getPlayers();

      const destacados = [...data]
        .sort((a, b) => b.goals - a.goals)
        .slice(0, 4);

      setPlayers(destacados);
    };

    loadPlayers();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1
        style={{
          color: 'white',
          textAlign: 'center',
        }}
      >
        Bienvenido {user?.first_name}
      </h1>

      <p
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '18px',
        }}
      >
        Has iniciado sesión correctamente.
      </p>

      <h2
        style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        ⭐ Jugadores Destacados
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} isPublic={true} />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px',
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/players')}
        >
          Ver todos los jugadores
        </Button>
      </div>
    </div>
  );
}

export default HomePrivate;
