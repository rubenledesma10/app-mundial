import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import PlayerCard from '../components/PlayerCard';
import PlayerFormModal from '../components/PlayerFormModal';

import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
} from '../services/playerService';

function HomeAdmin() {
  const { user } = useAuth();

  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const loadPlayers = async () => {
    const data = await getPlayers();
    setPlayers(data);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const handleOpenModal = () => {
    setSelectedPlayer(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlayer(null);
  };

  const handleSavePlayer = async (playerData) => {
    if (selectedPlayer) {
      await updatePlayer(selectedPlayer.id, playerData);
    } else {
      await createPlayer(playerData);
    }

    await loadPlayers();

    setOpenModal(false);
    setSelectedPlayer(null);
  };

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player);
    setOpenModal(true);
  };

  const handleDeletePlayer = async (id) => {
    const confirmDelete = window.confirm(
      '¿Seguro que querés eliminar este jugador?',
    );

    if (!confirmDelete) return;

    await deletePlayer(id);
    await loadPlayers();
  };

  const filteredPlayers = players.filter((player) =>
    `${player.first_name} ${player.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div style={{ padding: '30px' }}>
      <h1
        style={{
          color: 'white',
          textAlign: 'center',
        }}
      >
        Panel Administrador
      </h1>

      <p
        style={{
          color: 'white',
          textAlign: 'center',
        }}
      >
        Bienvenido {user?.first_name}
      </p>

      {/* button new player */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <button
          onClick={handleOpenModal}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            backgroundColor: '#1976d2',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Nuevo Jugador
        </button>
      </div>

      {/* search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '30px',
        }}
      >
        <input
          type="text"
          placeholder="Buscar jugador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '400px',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
          }}
        />
      </div>

      {/* players list */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredPlayers.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onEdit={handleEditPlayer}
            onDelete={handleDeletePlayer}
          />
        ))}
      </div>

      {/* Modal Crud jugador */}
      <PlayerFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSavePlayer}
        playerSelected={selectedPlayer}
      />
    </div>
  );
}

export default HomeAdmin;
