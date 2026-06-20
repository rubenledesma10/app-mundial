import { useState } from 'react'
import { Button, Container, Typography } from '@mui/material'
import PlayerFormModal from '../components/PlayerFormModal'
import PlayerCard from '../components/PlayerCard'
import './AdminPlayersPage.css'

const mockPlayers = [
  {
    id: 1,
    first_name: 'Lionel',
    last_name: 'Messi',
    position: 'Delantero',
    tshirt_number: 10,
    current_club: 'Inter Miami',
    goals: 15,
    assists: 8,
  },
  {
    id: 2,
    first_name: 'Kylian',
    last_name: 'Mbappé',
    position: 'Delantero',
    tshirt_number: 9,
    current_club: 'Real Madrid',
    goals: 12,
    assists: 4,
  },
]

function AdminPlayersPage() {
  const [openModal, setOpenModal] = useState(false)
  const [players, setPlayers] = useState(mockPlayers)
  const [selectedPlayer, setSelectedPlayer] = useState(null)

  const handleOpenModal = () => {
    setSelectedPlayer(null)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSavePlayer = (playerData) => {
  if (selectedPlayer) {
    const updatedPlayers = players.map((player) =>
      player.id === selectedPlayer.id
        ? { ...player, ...playerData }
        : player
    )

    setPlayers(updatedPlayers)
  } else {
      const newPlayer = {
        ...playerData,
        id: Date.now(),
      }

      setPlayers([...players, newPlayer])
    }

    setOpenModal(false)
    setSelectedPlayer(null)
  }

  const handleEditPlayer = (player) => {
    setSelectedPlayer(player)
    setOpenModal(true)
  }

  const handleDeletePlayer = (id) => {
  const confirmDelete = window.confirm('¿Seguro que querés eliminar este jugador?')

  if (!confirmDelete) return

  const filteredPlayers = players.filter((player) => player.id !== id)
    setPlayers(filteredPlayers)
  }

  return (
    <Container className="admin-players-page">
      <Typography variant="h4" className="admin-players-title">
        Panel Administrador - Jugadores
      </Typography>

      <Button variant="contained" onClick={handleOpenModal}>
        Nuevo Jugador
      </Button>

      <div className="players-container">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onEdit={handleEditPlayer}
            onDelete={handleDeletePlayer}
          />
        ))}
      </div>

      <PlayerFormModal
        open={openModal}
        onClose={handleCloseModal}
        onSave={handleSavePlayer}
        playerSelected={selectedPlayer}
      />
    </Container>
  )
}

export default AdminPlayersPage