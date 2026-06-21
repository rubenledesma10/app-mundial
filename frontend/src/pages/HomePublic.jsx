import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { getPlayers } from '../services/playerService';
import PlayerCard from '../components/PlayerCard';

function HomePublic() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

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
      <h1 style={{ color: 'white', textAlign: 'center' }}>🏆 Mundial 2026</h1>

      <p
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '18px',
        }}
      >
        Sistema de Gestión de Jugadores y Selecciones del Mundial 2026
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
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '40px',
          gap: '15px',
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/login')}
        >
          Ver más jugadores
        </Button>

        <p style={{ color: 'white' }}>
          ¿No tenés cuenta?{' '}
          <span
            style={{
              color: '#1976d2',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={() => navigate('/register')}
          >
            Registrate gratis
          </span>
        </p>
      </div>
    </div>
  );
}

export default HomePublic;
